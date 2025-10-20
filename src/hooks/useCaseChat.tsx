import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  case_id: string;
  sender_id: string;
  content: string;
  read: boolean;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

export function useCaseChat(caseId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (caseId) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [caseId]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('case_messages')
        .select(`
          *,
          profiles:sender_id (
            full_name
          )
        `)
        .eq('case_id', caseId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel(`case-messages-${caseId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'case_messages', filter: `case_id=eq.${caseId}` },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('case_messages')
        .insert({
          case_id: caseId,
          sender_id: user?.id,
          content: content.trim()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const markAsRead = async (messageIds: string[]) => {
    try {
      const { error } = await supabase
        .from('case_messages')
        .update({ read: true })
        .in('id', messageIds);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const getUnreadCount = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return messages.filter(m => !m.read && m.sender_id !== user?.id).length;
  }, [messages]);

  return {
    messages,
    loading,
    sending,
    sendMessage,
    markAsRead,
    getUnreadCount
  };
}
