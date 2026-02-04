import { Request, Response } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { db } from '../db';

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
type ContactBaseRow = RowDataPacket & { id: number; name: string; email: string; created_at: Date };
type CallRequestRow = ContactBaseRow & {
  firm: string;
  role: string;
  phone: string | null;
  drafting_support: string | null;
  other_service: string | null;
  message: string | null;
};
type RedlineRequestRow = ContactBaseRow & { deadline: string; description: string };

export const submitCallRequest = async (req: Request, res: Response) => {
  const { name, firm, role, email, phone, draftingSupport, otherService, message } = req.body;

  if (!isNonEmptyString(name) || !isNonEmptyString(firm) || !isNonEmptyString(role) || !isNonEmptyString(email)) {
    return res.status(400).json({ error: 'name, firm, role, and email are required' });
  }

  const draftingSupportArray = Array.isArray(draftingSupport)
    ? draftingSupport.filter(isNonEmptyString)
    : [];

  const payload = {
    name: name.trim(),
    firm: firm.trim(),
    role: role.trim(),
    email: email.trim(),
    phone: isNonEmptyString(phone) ? phone.trim() : null,
    draftingSupport: draftingSupportArray.length ? JSON.stringify(draftingSupportArray) : null,
    otherService: isNonEmptyString(otherService) ? otherService.trim() : null,
    message: isNonEmptyString(message) ? message.trim() : null,
    createdAt: new Date(),
  };

  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO call_requests
      (name, firm, role, email, phone, drafting_support, other_service, message, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.name,
      payload.firm,
      payload.role,
      payload.email,
      payload.phone,
      payload.draftingSupport,
      payload.otherService,
      payload.message,
      payload.createdAt,
    ]
  );

  return res.status(201).json({
    id: result.insertId,
    ...payload,
  });
};

export const submitRedlineRequest = async (req: Request, res: Response) => {
  const { name, email, deadline, description } = req.body;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(deadline) || !isNonEmptyString(description)) {
    return res.status(400).json({ error: 'name, email, deadline, and description are required' });
  }

  const payload = {
    name: name.trim(),
    email: email.trim(),
    deadline: deadline.trim(),
    description: description.trim(),
    createdAt: new Date(),
  };

  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO redline_requests (name, email, deadline, description, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [payload.name, payload.email, payload.deadline, payload.description, payload.createdAt]
  );

  return res.status(201).json({
    id: result.insertId,
    ...payload,
  });
};

export const listContactRequests = async (_req: Request, res: Response) => {
  const [callRows] = await db.query<CallRequestRow[]>(
    'SELECT id, name, firm, role, email, phone, drafting_support, other_service, message, created_at FROM call_requests ORDER BY created_at DESC'
  );
  const [redlineRows] = await db.query<RedlineRequestRow[]>(
    'SELECT id, name, email, deadline, description, created_at FROM redline_requests ORDER BY created_at DESC'
  );

  const parseDraftingSupport = (value: unknown): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(isNonEmptyString);
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed.filter(isNonEmptyString);
        }
      } catch {
        // Fallback to treating the raw string as a single entry when JSON parsing fails
        return [value];
      }
      return [value];
    }
    return [];
  };

  return res.json({
    callRequests: callRows.map((row) => ({
      id: row.id,
      name: row.name,
      firm: row.firm,
      role: row.role,
      email: row.email,
      phone: row.phone,
      draftingSupport: parseDraftingSupport(row.drafting_support),
      otherService: row.other_service,
      message: row.message,
      createdAt: row.created_at,
    })),
    redlineRequests: redlineRows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      deadline: row.deadline,
      description: row.description,
      createdAt: row.created_at,
    })),
  });
};
