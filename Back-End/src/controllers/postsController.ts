import { Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { db } from '../db';

type PostRow = RowDataPacket & {
  id: number;
  title: string;
  content_html: string;
  slug: string;
  image_data: Buffer | null;
  image_mime?: string | null;
  created_at: Date;
  updated_at: Date;
};

const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'post';

const buildUniqueSlug = async (base: string, idToExclude?: number): Promise<string> => {
  const normalized = slugify(base);
  let candidate = normalized;
  let suffix = 1;

  // Ensure uniqueness by checking existing slugs; skip current post on update
  while (true) {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT id FROM posts WHERE slug = ?' + (idToExclude ? ' AND id != ?' : ''),
      idToExclude ? [candidate, idToExclude] : [candidate]
    );
    if (!rows.length) return candidate;
    suffix += 1;
    candidate = `${normalized}-${suffix}`;
  }
};

export const listPosts = async (_req: Request, res: Response) => {
  const [rows] = await db.query<PostRow[]>(
    'SELECT id, title, slug, content_html, created_at, updated_at FROM posts ORDER BY created_at DESC'
  );
  const posts = rows.map((row) => ({
    id: row.id,
    title: row.title,
    contentHtml: row.content_html,
    slug: row.slug,
    // Image is exposed via endpoint to avoid sending blobs in list
    imageUrl: `/api/posts/${row.id}/image`,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
  res.json(posts);
};

export const getPostImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [rows] = await db.query<PostRow[]>('SELECT image_data, image_mime FROM posts WHERE id = ?', [id]);
  if (!rows.length || !rows[0].image_data) {
    return res.status(404).json({ error: 'Image not found' });
  }
  const mime = rows[0].image_mime || 'application/octet-stream';
  res.setHeader('Content-Type', mime);
  res.send(rows[0].image_data);
};

export const createPost = async (req: Request, res: Response) => {
  const { title, contentHtml } = req.body;

  if (!title || !contentHtml) {
    return res.status(400).json({ error: 'title and contentHtml are required' });
  }

  const now = new Date();
  const imageData = req.file?.buffer || null;
  const imageMime = req.file?.mimetype || null;
  const slug = await buildUniqueSlug(title);

  const [result] = await db.query<ResultSetHeader>(
    'INSERT INTO posts (title, slug, content_html, image_data, image_mime, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, slug, contentHtml, imageData, imageMime, now, now]
  );

  res.status(201).json({
    id: result.insertId,
    title,
    contentHtml,
    slug,
    imageUrl: `/api/posts/${result.insertId}/image`,
    createdAt: now,
    updatedAt: now,
  });
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, contentHtml } = req.body;
  const [rows] = await db.query<PostRow[]>('SELECT * FROM posts WHERE id = ?', [id]);
  if (!rows.length) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const post = rows[0];
  const nextTitle = title ?? post.title;
  const nextContent = contentHtml ?? post.content_html;
  // Preserve existing slug unless title changes and no explicit slug provided
  const nextSlug = title ? await buildUniqueSlug(title, post.id) : post.slug;
  const nextImageData = req.file ? req.file.buffer : post.image_data;
  const nextImageMime = req.file ? req.file.mimetype : post.image_mime || null;
  const now = new Date();

  await db.query(
    'UPDATE posts SET title = ?, slug = ?, content_html = ?, image_data = ?, image_mime = ?, updated_at = ? WHERE id = ?',
    [nextTitle, nextSlug, nextContent, nextImageData, nextImageMime, now, id]
  );

  res.json({
    id: Number(id),
    title: nextTitle,
    contentHtml: nextContent,
    slug: nextSlug,
    imageUrl: `/api/posts/${id}/image`,
    createdAt: post.created_at,
    updatedAt: now,
  });
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [result] = await db.query<ResultSetHeader>('DELETE FROM posts WHERE id = ?', [id]);
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.status(204).send();
};
