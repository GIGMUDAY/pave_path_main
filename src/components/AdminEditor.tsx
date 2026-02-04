'use client';

import { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type AdminEditorProps = {
  initialTitle?: string;
  initialContentHtml?: string;
  initialImageUrl?: string;
  onSave: (data: { title: string; contentHtml: string; imageFile?: File; existingImageUrl?: string }) => Promise<void>;
  onCancel?: () => void;
};

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean'],
];

export const AdminEditor = ({
  initialTitle = '',
  initialContentHtml = '',
  initialImageUrl = '',
  onSave,
  onCancel,
}: AdminEditorProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [contentHtml, setContentHtml] = useState(initialContentHtml);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modules = useMemo(() => ({ toolbar: toolbarOptions }), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!contentHtml.trim()) {
      setError('Content is required.');
      return;
    }

    try {
      setIsSaving(true);
      await onSave({
        title: title.trim(),
        contentHtml,
        imageFile,
        existingImageUrl: imageFile ? undefined : imageUrl?.trim() || undefined,
      });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground"
          placeholder="Enter post title"
          disabled={isSaving}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Content</label>
        <ReactQuill
          theme="snow"
          value={contentHtml}
          onChange={setContentHtml}
          modules={modules}
          className="bg-background text-foreground"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Featured image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setImageFile(file || undefined);
            if (file) {
              setImageUrl(URL.createObjectURL(file));
            }
          }}
          className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground"
          disabled={isSaving}
        />
        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full max-w-sm rounded-md border border-border/60 object-cover"
            />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground disabled:opacity-60"
        >
          {isSaving ? 'Saving…' : 'Save'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 rounded-md border border-border text-foreground disabled:opacity-60"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AdminEditor;
