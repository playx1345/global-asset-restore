import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UserRole {
  role: string;
}

export function useUserRole() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoles() {
      if (!user) {
        setRoles([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (error) throw error;

        setRoles(data?.map((r: UserRole) => r.role) || []);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setRoles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, [user]);

  const isAdmin = () => roles.includes('admin');
  const hasRole = (role: string) => roles.includes(role);

  return {
    roles,
    loading,
    isAdmin,
    hasRole,
  };
}
