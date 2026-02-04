import { useEffect, useState, useCallback, useMemo } from 'react';
import AdminEditor from '@/components/AdminEditor';
import AdminPostList from '@/components/AdminPostList';
import { toast } from '@/components/ui/sonner';
import { CheckCircle2 } from 'lucide-react';
import AdminNav from '@/components/AdminNav';

type Post = {
  id: string | number;
  title: string;
  contentHtml: string;
  imageUrl?: string;
};

type EditorPayload = {
  title: string;
  contentHtml: string;
  imageFile?: File;
  existingImageUrl?: string;
};

type UserRow = {
  id: number;
  email: string;
  role?: string;
  created_at?: string;
};

type CallRequest = {
  id: number;
  name: string;
  firm: string;
  role: string;
  email: string;
  phone: string | null;
  draftingSupport: string[];
  otherService: string | null;
  message: string | null;
  createdAt: string;
};

type RedlineRequest = {
  id: number;
  name: string;
  email: string;
  deadline: string;
  description: string;
  createdAt: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const Admin = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<'password' | 'add-user' | 'all-users' | 'contacts'>('password');

  // Add your existing state and functions here
  // ...

  // Add your existing useEffect hooks here
  // ...

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {authMode === 'login' ? 'Admin Login' : 'Register Admin'}
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={(e) => {
            e.preventDefault();
            if (authMode === 'login') {
              // Handle login
            } else {
              // Handle register
            }
          }}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              disabled={authLoading}
            >
              {authLoading ? 'Loading...' : authMode === 'login' ? 'Login' : 'Register'}
            </button>
            <button
              type="button"
              className="mt-4 text-sm text-blue-600 hover:underline"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            >
              {authMode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">
        <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur mb-6">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="/pave_logo.jpg" 
                alt="PavePath logo" 
                className="h-8 w-auto rounded-md border border-border/50 bg-background" 
              />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Admin Console
                </p>
                <p className="text-sm font-semibold text-foreground">
                  PavePath
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {userEmail}
              </span>
              <button 
                onClick={() => {
                  setToken(null);
                  localStorage.removeItem('adminToken');
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Add your admin panel content here */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome to Admin Panel</h2>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
