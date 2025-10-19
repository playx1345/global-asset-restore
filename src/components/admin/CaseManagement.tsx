import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CaseDetailDialog } from '@/components/admin/CaseDetailDialog';
import { Button } from '@/components/ui/button';

interface Case {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  assigned_to: string | null;
  profiles: {
    full_name: string;
  };
  assigned_profile?: {
    full_name: string;
  } | null;
}

export default function CaseManagement() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchCases();
  }, []);

  async function fetchCases() {
    try {
      const { data, error } = await supabase
        .from('cases')
        .select(`
          *,
          profiles!cases_client_id_fkey (
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch assigned profiles separately
      const casesWithAssignments = await Promise.all(
        (data || []).map(async (caseItem) => {
          if (caseItem.assigned_to) {
            const { data: assignedProfile } = await supabase
              .from('profiles')
              .select('full_name')
              .eq('id', caseItem.assigned_to)
              .single();
            
            return { ...caseItem, assigned_profile: assignedProfile };
          }
          return { ...caseItem, assigned_profile: null };
        })
      );

      setCases(casesWithAssignments);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleCaseClick(caseId: string) {
    setSelectedCaseId(caseId);
    setDialogOpen(true);
  }

  const filteredCases = statusFilter === 'all' 
    ? cases 
    : cases.filter((c) => c.status === statusFilter);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cases</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell className="font-medium">{caseItem.title}</TableCell>
                <TableCell>{caseItem.profiles?.full_name || 'Unknown'}</TableCell>
                <TableCell>
                  {caseItem.assigned_profile?.full_name || (
                    <span className="text-muted-foreground text-sm">Unassigned</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(caseItem.status)}>
                    {caseItem.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(caseItem.priority)}>
                    {caseItem.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(caseItem.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCaseClick(caseItem.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CaseDetailDialog
        caseId={selectedCaseId}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onUpdate={fetchCases}
      />
    </div>
  );
}
