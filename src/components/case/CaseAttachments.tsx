import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Trash2, FileText, Image as ImageIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

interface Attachment {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

interface CaseAttachmentsProps {
  caseId: string;
  isAdmin: boolean;
}

export function CaseAttachments({ caseId, isAdmin }: CaseAttachmentsProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAttachments();
    subscribeToAttachments();
  }, [caseId]);

  const fetchAttachments = async () => {
    try {
      const { data, error } = await supabase
        .from('case_attachments')
        .select(`
          *,
          profiles:user_id (
            full_name
          )
        `)
        .eq('case_id', caseId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAttachments(data || []);
    } catch (error) {
      console.error('Error fetching attachments:', error);
      toast({
        title: "Error",
        description: "Failed to load attachments",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const subscribeToAttachments = () => {
    const channel = supabase
      .channel('case-attachments')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'case_attachments', filter: `case_id=eq.${caseId}` },
        () => fetchAttachments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();

    for (const file of Array.from(files)) {
      // Validate file size (10MB)
      if (file.size > 10485760) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive"
        });
        continue;
      }

      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/zip'
      ];

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an allowed file type`,
          variant: "destructive"
        });
        continue;
      }

      try {
        // Upload file to storage
        const filePath = `${caseId}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('case-attachments')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Create database record
        const { error: dbError } = await supabase
          .from('case_attachments')
          .insert({
            case_id: caseId,
            user_id: user?.id,
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
            mime_type: file.type
          });

        if (dbError) throw dbError;

        toast({
          title: "Success",
          description: `${file.name} uploaded successfully`
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive"
        });
      }
    }

    setUploading(false);
  };

  const handleDownload = async (attachment: Attachment) => {
    try {
      const { data, error } = await supabase.storage
        .from('case-attachments')
        .createSignedUrl(attachment.file_path, 3600);

      if (error) throw error;

      window.open(data.signedUrl, '_blank');
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (attachment: Attachment) => {
    if (!isAdmin) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('case-attachments')
        .remove([attachment.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('case_attachments')
        .delete()
        .eq('id', attachment.id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File deleted successfully"
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive"
      });
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [caseId]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <ImageIcon className="h-8 w-8 text-primary" />;
    }
    return <FileText className="h-8 w-8 text-primary" />;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-border'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop files here, or click to select
        </p>
        <input
          type="file"
          id="file-upload"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
          disabled={uploading}
        />
        <Button
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Select Files'}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Max 10MB per file. Allowed: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, GIF, ZIP
        </p>
      </div>

      {/* Attachments List */}
      {attachments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No attachments yet
        </div>
      ) : (
        <div className="space-y-2">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex-shrink-0">
                {getFileIcon(attachment.mime_type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{attachment.file_name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(attachment.file_size)} • Uploaded by {attachment.profiles.full_name} •{' '}
                  {formatDistanceToNow(new Date(attachment.created_at), { addSuffix: true })}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(attachment)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                {isAdmin && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(attachment)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
