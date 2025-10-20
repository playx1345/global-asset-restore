import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { CaseComments } from '@/components/case/CaseComments';
import { CaseAttachments } from '@/components/case/CaseAttachments';
import { CaseChat } from '@/components/case/CaseChat';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

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
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (open && caseId) {
      fetchCaseData();
      fetchAdmins();
      subscribeToRealtime();
    }
  }, [open, caseId]);

  const subscribeToRealtime = () => {
    if (!caseId) return;
    
    const channel = supabase
      .channel(`case-${caseId}`)
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'cases', filter: `id=eq.${caseId}` },
        () => fetchCaseData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

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
      const { data: adminRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      if (rolesError) throw rolesError;

      const adminIds = adminRoles?.map((r) => r.user_id) || [];

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

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <Skeleton className="h-8 w-64" />
          </DialogHeader>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!caseData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{caseData.title}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Client: {caseData.profiles?.full_name || 'Unknown'}
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{caseData.description}</p>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Status</label>
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
                  <label className="text-sm font-medium">Priority</label>
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

                <div>
                  <label className="text-sm font-medium">Assigned To</label>
                  <Select
                    value={caseData.assigned_to || 'unassigned'}
                    onValueChange={(value) => updateCase('assigned_to', value === 'unassigned' ? null : value)}
                    disabled={updating}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
                  <label className="text-sm font-medium">Created</label>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(caseData.created_at), 'PPpp')}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="mt-4">
              <CaseComments caseId={caseId!} clientId={caseData.client_id} />
            </TabsContent>

            <TabsContent value="attachments" className="mt-4">
              <CaseAttachments caseId={caseId!} isAdmin={true} />
            </TabsContent>

            <TabsContent value="chat" className="mt-4">
              <CaseChat caseId={caseId!} currentUserId={user?.id || ''} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
