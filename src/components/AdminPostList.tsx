'use client';

import { useState } from 'react';
import AdminEditor from './AdminEditor';

type PostRecord = {
  id: string | number;
  title: string;
  contentHtml: string;
  imageUrl?: string;
};

type PostInput = {
  title: string;
  contentHtml: string;
  imageUrl?: string;
};

type AdminEditorPayload = PostInput & { imageFile?: File; existingImageUrl?: string };

type AdminPostListProps = {
  posts: PostRecord[];
  onUpdate: (id: string, data: AdminEditorPayload) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const stripHtml = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const Preview = ({ html }: { html: string }) => {
  const text = stripHtml(html);
  const truncated = text.length > 160 ? `${text.slice(0, 160)}…` : text;
  return <p className="text-sm text-muted-foreground">{truncated}</p>;
};

const AdminPostList = ({ posts, onUpdate, onDelete }: AdminPostListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await onDelete(id);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSave = async (id: string, data: AdminEditorPayload) => {
    await onUpdate(id, data);
    setEditingId(null);
  };

  if (!posts.length) {
    return <p className="text-sm text-muted-foreground">No posts yet.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg border border-border/70 p-4 bg-card">
          {editingId === post.id ? (
            <AdminEditor
              initialTitle={post.title}
              initialContentHtml={post.contentHtml}
              initialImageUrl={post.imageUrl}
              onSave={(data) => handleSave(post.id, data)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                  {post.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="w-full max-w-sm rounded-md border border-border/60 object-cover"
                      />
                    </div>
                  )}
                  <Preview html={post.contentHtml} />
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setEditingId(post.id)}
                    className="px-3 py-1.5 rounded-md border border-border text-foreground"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={isDeleting === post.id}
                    className="px-3 py-1.5 rounded-md bg-destructive text-destructive-foreground disabled:opacity-60"
                  >
                    {isDeleting === post.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminPostList;
