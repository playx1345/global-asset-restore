import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { CaseComments } from '@/components/case/CaseComments';

interface Profile {
  id: string;
  full_name: string;
}

interface Case {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  assigned_to: string | null;
  client_id: string;
  profiles: {
    full_name: string;
  };
}

interface CaseDetailDialogProps {
  caseId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate?: () => void;
}

export function CaseDetailDialog({ caseId, open, onOpenChange, onUpdate }: CaseDetailDialogProps) {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [admins, setAdmins] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (open && caseId) {
      fetchCaseData();
      fetchAdmins();
    }
  }, [open, caseId]);

  async function fetchCaseData() {
    if (!caseId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cases')
        .select(`
          *,
          profiles!cases_client_id_fkey (
            full_name
          )
        `)
        .eq('id', caseId)
        .single();

      if (error) throw error;
      setCaseData(data);
    } catch (error) {
      console.error('Error fetching case:', error);
      toast({
        title: 'Error',
        description: 'Failed to load case details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchAdmins() {
    try {
      // First get all admin user IDs
      const { data: adminRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      if (rolesError) throw rolesError;

      const adminIds = adminRoles?.map((r) => r.user_id) || [];

      // Then fetch their profiles
      if (adminIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', adminIds);

        if (profilesError) throw profilesError;
        setAdmins(profiles || []);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  }

  async function updateCase(field: string, value: string | null) {
    if (!caseId) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('cases')
        .update({ [field]: value })
        .eq('id', caseId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Case updated successfully',
      });

      fetchCaseData();
      onUpdate?.();
    } catch (error) {
      console.error('Error updating case:', error);
      toast({
        title: 'Error',
        description: 'Failed to update case',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  }

  if (!caseData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{caseData.title}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-6">
            {/* Case Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Client</h3>
                <p>{caseData.profiles?.full_name || 'Unknown'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                <p className="text-sm">{caseData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Status</h3>
                  <Select
                    value={caseData.status}
                    onValueChange={(value) => updateCase('status', value)}
                    disabled={updating}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Priority</h3>
                  <Select
                    value={caseData.priority}
                    onValueChange={(value) => updateCase('priority', value)}
                    disabled={updating}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Assigned To</h3>
                <Select
                  value={caseData.assigned_to || 'unassigned'}
                  onValueChange={(value) =>
                    updateCase('assigned_to', value === 'unassigned' ? null : value)
                  }
                  disabled={updating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {admins.map((admin) => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Created</h3>
                <p className="text-sm">
                  {new Date(caseData.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <Separator />

            {/* Comments Section */}
            <CaseComments caseId={caseId!} clientId={caseData.client_id} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
