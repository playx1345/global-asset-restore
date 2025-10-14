import Navigation from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Portal() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Portal</h1>
          <p className="text-muted-foreground mb-8">
            Hello, {user?.user_metadata?.full_name || 'User'}! This is your client portal.
          </p>
          
          <div className="grid gap-6">
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">Your Information</h2>
              <p className="text-muted-foreground">Email: {user?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
