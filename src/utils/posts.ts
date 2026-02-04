const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export type BlogPost = {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
};

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'post';

export const normalizeImageUrl = (url?: string) => {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `${API_BASE}${url}`;
};

export const mapApiPost = (raw: any): BlogPost => {
  const title = raw?.title ?? 'Untitled post';
  const cleanText = stripHtml(raw?.contentHtml ?? raw?.content_html ?? '');
  const excerpt = cleanText.length > 200 ? `${cleanText.slice(0, 200)}...` : cleanText || title;
  const readTimeMinutes = Math.max(1, Math.round(cleanText.split(/\s+/).filter(Boolean).length / 200));
  const baseDate =
    raw?.createdAt ??
    raw?.created_at ??
    raw?.updatedAt ??
    raw?.updated_at ??
    new Date().toISOString();
  const backendSlug = raw?.slug;

  return {
    id: raw?.id,
    slug: backendSlug || `${slugify(title)}-${raw?.id}`,
    title,
    excerpt,
    contentHtml: raw?.contentHtml ?? raw?.content_html ?? '',
    author: raw?.author ?? 'PavePath Team',
    date: baseDate,
    readTime: `${readTimeMinutes} min read`,
    category: raw?.category ?? 'General',
    image: normalizeImageUrl(raw?.imageUrl ?? raw?.image_url),
  };
};

export const fetchPosts = async (): Promise<BlogPost[]> => {
  const res = await fetch(`${API_BASE}/api/posts`);
  if (!res.ok) {
    throw new Error(`Failed to load posts (${res.status})`);
  }
  const data = await res.json();
  return (Array.isArray(data) ? data : []).map(mapApiPost);
};

export { API_BASE as apiBase };
