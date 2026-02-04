import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2/promise';
import { db } from '../db';

type UserRow = RowDataPacket & {
  id: number;
  email: string;
  role?: string;
  created_at?: Date;
};

type PostRow = RowDataPacket & {
  id: number;
  title: string;
  slug?: string;
  created_at?: Date;
  updated_at?: Date;
};

export const getOverview = async (_req: Request, res: Response) => {
  try {
    const [users] = await db.query<UserRow[]>('SELECT id, email, role, created_at FROM users ORDER BY created_at DESC');
    const [posts] = await db.query<PostRow[]>(
      'SELECT id, title, slug, created_at, updated_at FROM posts ORDER BY created_at DESC'
    );

    res.json({ users, posts });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('getOverview error:', err);
    res.status(500).json({ error: 'Internal server error', detail: message });
  }
};
