import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Stats {
  totalUsers: number;
  totalCases: number;
  casesByStatus: {
    pending: number;
    in_progress: number;
    resolved: number;
    closed: number;
  };
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalCases: 0,
    casesByStatus: { pending: 0, in_progress: 0, resolved: 0, closed: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const [usersResult, casesResult] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('cases').select('status'),
      ]);

      const totalUsers = usersResult.count || 0;
      const cases = casesResult.data || [];
      
      const casesByStatus = {
        pending: cases.filter((c) => c.status === 'pending').length,
        in_progress: cases.filter((c) => c.status === 'in_progress').length,
        resolved: cases.filter((c) => c.status === 'resolved').length,
        closed: cases.filter((c) => c.status === 'closed').length,
      };

      setStats({
        totalUsers,
        totalCases: cases.length,
        casesByStatus,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCases}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.casesByStatus.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.casesByStatus.in_progress}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(stats.casesByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="capitalize">{status.replace('_', ' ')}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
