import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { db } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const jwtOptions: SignOptions = { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] };

type UserRow = RowDataPacket & {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
  role?: string;
};

type JwtPayload = {
  sub: number;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
};

const normalizeRole = (role?: string): string => {
  const value = (role || '').toLowerCase();
  if (value === 'superadmin') return 'superadmin';
  if (value === 'admin') return 'admin';
  return 'user';
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice('Bearer '.length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded !== 'object' || !decoded) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }
    const base = decoded as jwt.JwtPayload;
    if (!base.email || base.sub === undefined || base.sub === null) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    const userPayload: JwtPayload = {
      sub: typeof base.sub === 'string' ? Number(base.sub) : (base.sub as number),
      email: String(base.email),
      role: base.role ? String(base.role) : undefined,
      iat: base.iat,
      exp: base.exp,
    };
    // Attach minimal user info for downstream handlers
    (req as Request & { user?: JwtPayload }).user = userPayload;
    return next();
  } catch (err) {
    console.error('auth verify error:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireSuperadmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as Request & { user?: JwtPayload }).user;
  if (!user || user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Superadmin role required' });
  }
  return next();
};

const getUserByEmail = async (email: string) => {
  const [rows] = await db.query<UserRow[]>('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const getUserById = async (id: number) => {
  const [rows] = await db.query<UserRow[]>('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

export const register = async (req: Request, res: Response) => {
  try {
    console.log('register hit', req.body);
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const roleValue = normalizeRole(role);
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO users (email, password_hash, role, created_at) VALUES (?, ?, ?, ?)',
      [email, hash, roleValue, new Date()]
    );

    const token = jwt.sign({ sub: result.insertId, email, role: roleValue }, JWT_SECRET, jwtOptions);
    res.status(201).json({ token, user: { id: result.insertId, email, role: roleValue } });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('register error:', err);
    res.status(500).json({ error: 'Internal server error', detail: message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log('login hit', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Enforce role-based access (only admin/superadmin may sign in here)
    const allowedRoles = new Set(['admin', 'superadmin']);
    const userRole = user.role ?? 'user';
    if (!allowedRoles.has(userRole)) {
      return res.status(403).json({ error: 'Insufficient role to access admin' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, jwtOptions);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role ?? 'user' } });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('login error:', err);
    res.status(500).json({ error: 'Internal server error', detail: message });
  }
};

// Admin-only: create a user (email + password) without signing them in.
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    // Force admin/superadmin from the admin panel; do not allow plain "user" here
    const normalized = normalizeRole(role);
    const roleValue = normalized === 'user' ? 'admin' : normalized;
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO users (email, password_hash, role, created_at) VALUES (?, ?, ?, ?)',
      [email, hash, roleValue, new Date()]
    );

    res.status(201).json({ user: { id: result.insertId, email, role: roleValue } });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('createUser error:', err);
    res.status(500).json({ error: 'Internal server error', detail: message });
  }
};

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query<UserRow[]>('SELECT id, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('listUsers error:', err);
    res.status(500).json({ error: 'Internal server error', detail: message });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role, password } = req.body as { role?: string; password?: string };

    if (!role && !password) {
      return res.status(400).json({ error: 'role or password is required' });
    }

    const updates: string[] = [];
    const params: Array<string | number> = [];
    let roleValue: string | undefined;

    if (role) {
      roleValue = normalizeRole(role);
      if (!['admin', 'superadmin'].includes(roleValue)) {
        return res.status(400).json({ error: 'Invalid role' });
      }
      updates.push('role = ?');
      params.push(roleValue);
    }

    if (password && typeof password === 'string') {
      const trimmed = password.trim();
      if (trimmed.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }
      const hash = await bcrypt.hash(trimmed, 10);
      updates.push('password_hash = ?');
      params.push(hash);
    }

    if (!updates.length) {
      return res.status(400).json({ error: 'Nothing to update' });
    }

    params.push(id);
    const [result] = await db.query<ResultSetHeader>(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: Number(id),
      ...(roleValue ? { role: roleValue } : {}),
      ...(password ? { passwordUpdated: true } : {}),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('updateUserRole error:', err);
    res.status(500).json({ error: 'Internal server error', detail: message });
  }
};

export const updateOwnPassword = async (req: Request, res: Response) => {
  try {
    const authUser = (req as Request & { user?: JwtPayload }).user;
    if (!authUser?.sub) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { currentPassword, newPassword } = req.body as { currentPassword?: string; newPassword?: string };
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'currentPassword and newPassword are required' });
    }
    if (newPassword.trim().length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const user = await getUserById(Number(authUser.sub));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const newHash = await bcrypt.hash(newPassword.trim(), 10);
    await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, user.id]);

    res.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('updateOwnPassword error:', err);
    res.status(500).json({ error: 'Internal server error', detail: message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await db.query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('deleteUser error:', err);
    res.status(500).json({ error: 'Internal server error', detail: message });
  }
};
