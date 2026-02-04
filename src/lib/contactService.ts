export interface CallFormData {
  name: string;
  firm: string;
  role: string;
  email: string;
  phone: string;
  draftingSupport: string[];
  otherService: string;
  message: string;
}

export interface RedlineFormData {
  name: string;
  email: string;
  deadline: string;
  description: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const postJson = async (path: string, body: Record<string, unknown>) => {
  const url = `${API_BASE_URL.replace(/\/$/, '')}${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    const message = (detail as { error?: string; detail?: string }).error || res.statusText || 'Request failed';
    throw new Error(message);
  }
};

export const saveCallRequest = async (formData: CallFormData): Promise<void> => {
  await postJson('/api/contact/call', {
    name: formData.name,
    firm: formData.firm,
    role: formData.role,
    email: formData.email,
    phone: formData.phone,
    draftingSupport: formData.draftingSupport,
    otherService: formData.otherService,
    message: formData.message,
  });
};

export const saveRedlineRequest = async (formData: RedlineFormData): Promise<void> => {
  await postJson('/api/contact/redline', {
    name: formData.name,
    email: formData.email,
    deadline: formData.deadline,
    description: formData.description,
  });
};

