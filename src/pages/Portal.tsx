import Navigation from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminStats from '@/components/admin/AdminStats';
import UserManagement from '@/components/admin/UserManagement';
import CaseManagement from '@/components/admin/CaseManagement';
import ClientProfile from '@/components/client/ClientProfile';
import ClientCases from '@/components/client/ClientCases';

export default function Portal() {
  const { user } = useAuth();
  const { isAdmin, loading } = useUserRole();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {isAdmin() ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Portal</h1>
              <p className="text-muted-foreground">
                Manage users, cases, and view system statistics
              </p>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="cases">Cases</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-6">
                <AdminStats />
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <UserManagement />
              </TabsContent>

              <TabsContent value="cases" className="mt-6">
                <CaseManagement />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Hello, {user?.user_metadata?.full_name || 'User'}!
              </p>
            </div>

            <ClientProfile />
            <ClientCases />
          </div>
        )}
      </main>
    </div>
  );
}
