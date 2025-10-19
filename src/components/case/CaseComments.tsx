import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
  user_id: string;
}

interface CaseCommentsProps {
  caseId: string;
  clientId: string;
}

export function CaseComments({ caseId, clientId }: CaseCommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (caseId) {
      fetchComments();
      subscribeToComments();
    }
  }, [caseId]);

  async function fetchComments() {
    try {
      const { data, error } = await supabase
        .from('case_comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles:user_id (
            full_name
          )
        `)
        .eq('case_id', caseId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load comments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  function subscribeToComments() {
    const channel = supabase
      .channel(`case_comments:${caseId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'case_comments',
          filter: `case_id=eq.${caseId}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('case_comments').insert({
        case_id: caseId,
        user_id: user.id,
        content: newComment.trim(),
      });

      if (error) throw error;

      setNewComment('');
      toast({
        title: 'Success',
        description: 'Comment added successfully',
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to add comment',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments</h3>

      {/* Comments List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {comment.profiles?.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {comment.profiles?.full_name || 'Unknown User'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={submitting}
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={submitting || !newComment.trim()}>
          {submitting ? 'Adding...' : 'Add Comment'}
        </Button>
      </form>
    </div>
  );
}
