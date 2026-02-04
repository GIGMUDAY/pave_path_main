import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import AdminEditor from '@/components/AdminEditor';
import AdminPostList from '@/components/AdminPostList';
import { toast } from '@/components/ui/sonner';
import { CheckCircle2 } from 'lucide-react';

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

import AdminNav from '@/components/AdminNav';

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
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'superadmin'>('admin');
  const [newUserLoading, setNewUserLoading] = useState(false);
  const [newUserMessage, setNewUserMessage] = useState<string | null>(null);
  const [createEditorKey, setCreateEditorKey] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingUserRole, setEditingUserRole] = useState<'admin' | 'superadmin'>('admin');
  const [editingUserPassword, setEditingUserPassword] = useState('');
  const [editingUserLoading, setEditingUserLoading] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUserEmail, setEditingUserEmail] = useState('');
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [deleteUserEmail, setDeleteUserEmail] = useState<string | null>(null);
  const [deletingUser, setDeletingUser] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [contactLoading, setContactLoading] = useState(false);
  const [callRequests, setCallRequests] = useState<CallRequest[]>([]);
  const [redlineRequests, setRedlineRequests] = useState<RedlineRequest[]>([]);

  const showSuccess = (title: string, description?: string) =>
    toast.success(title, {
      description,
      position: 'top-center',
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      className: 'text-base font-semibold',
    });

  const showError = (title: string, description?: string) =>
    toast.error(title, {
      description,
      position: 'top-center',
      className: 'text-base font-semibold',
    });

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedEmail = localStorage.getItem('auth_email');
    const savedRole = localStorage.getItem('auth_role');
    if (savedToken) setToken(savedToken);
    if (savedEmail) setUserEmail(savedEmail);
    if (savedRole) setUserRole(savedRole);
  }, []);


  const authHeaders = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  const currentPanel = useMemo(() => {
    const path = location.pathname.replace(/^\/admin\/?/, '');
    if (!path || path === 'dashboard') return 'dashboard';
    if (path.startsWith('create-post')) return 'create-post';
    if (path.startsWith('contact-requests')) return 'contact-requests';
    if (path.startsWith('add-user')) return 'add-user';
    if (path.startsWith('all-users')) return 'all-users';
    if (path.startsWith('change-password')) return 'change-password';
    return 'dashboard';
  }, [location.pathname]);

  const isSuperadmin = userRole === 'superadmin';

  const fetchPosts = useCallback(async () => {
    setLoadingPosts(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/posts`, { headers: { ...authHeaders } });
      if (!res.ok) {
        throw new Error(`Failed to load posts (${res.status})`);
      }
      const data = await res.json();
      const normalizeImageUrl = (url?: string) => {
        if (!url) return undefined;
        return url.startsWith('http') ? url : `${API_BASE}${url}`;
      };

      setPosts(
        (data as any[]).map((p) => ({
          id: p.id,
          title: p.title,
          contentHtml: p.contentHtml ?? p.content_html ?? '',
          imageUrl: normalizeImageUrl(p.imageUrl ?? p.image_url),
        }))
      );
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoadingPosts(false);
    }
  }, [authHeaders]);

  const fetchUsers = useCallback(async () => {
    if (!token || userRole !== 'superadmin') {
      setUsers([]);
      return;
    }
    setLoadingUsers(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/users`, { headers: { ...authHeaders } });
      if (!res.ok) {
        throw new Error(`Failed to load users (${res.status})`);
      }
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  }, [authHeaders, token, userRole]);

  const fetchContacts = useCallback(async () => {
    if (!token || userRole !== 'superadmin') {
      setCallRequests([]);
      setRedlineRequests([]);
      return;
    }
    setContactLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact/all`, { headers: { ...authHeaders } });
      if (!res.ok) {
        throw new Error(`Failed to load contact requests (${res.status})`);
      }
      const data = await res.json();
      setCallRequests(Array.isArray(data?.callRequests) ? data.callRequests : []);
      setRedlineRequests(Array.isArray(data?.redlineRequests) ? data.redlineRequests : []);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to load contact requests');
      showError('Contact fetch failed', err instanceof Error ? err.message : 'Unable to load contact requests.');
    } finally {
      setContactLoading(false);
    }
  }, [authHeaders, token, userRole]);

  useEffect(() => {
    if (token) {
      fetchPosts();
      if (userRole === 'superadmin') {
        fetchUsers();
        fetchContacts();
      } else {
        setUsers([]);
        setCallRequests([]);
        setRedlineRequests([]);
      }
    } else {
      setPosts([]);
      setUsers([]);
      setCallRequests([]);
      setRedlineRequests([]);
    }
  }, [token, userRole, fetchPosts, fetchUsers, fetchContacts]);

  const handleAuth = async () => {
    setAuthLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/${authMode === 'login' ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body?.error || 'Authentication failed');
      }
      const { token: newToken, user } = body;
      setToken(newToken);
      setUserEmail(user?.email || email);
      setUserRole(user?.role || null);
      localStorage.setItem('auth_token', newToken);
      localStorage.setItem('auth_email', user?.email || email);
      if (user?.role) {
        localStorage.setItem('auth_role', user.role);
      } else {
        localStorage.removeItem('auth_role');
      }
      await fetchPosts();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUserEmail(null);
    setUserRole(null);
    setPosts([]);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_email');
    localStorage.removeItem('auth_role');
  };

  const createPost = async (data: EditorPayload) => {
    setError(null);
    const form = new FormData();
    form.append('title', data.title);
    form.append('contentHtml', data.contentHtml);
    if (data.imageFile) {
      form.append('image', data.imageFile);
    }

    const res = await fetch(`${API_BASE}/api/posts`, {
      method: 'POST',
      headers: { ...authHeaders },
      body: form,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.error || `Create failed (${res.status})`);
    }
    showSuccess('Post created', 'Your post has been published.');
    setCreateEditorKey((k) => k + 1);
    await fetchPosts();
  };

  const updatePost = async (id: string | number, data: EditorPayload) => {
    setError(null);
    const form = new FormData();
    form.append('title', data.title);
    form.append('contentHtml', data.contentHtml);
    if (data.imageFile) {
      form.append('image', data.imageFile);
    }
    const res = await fetch(`${API_BASE}/api/posts/${id}`, {
      method: 'PUT',
      headers: { ...authHeaders },
      body: form,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.error || `Update failed (${res.status})`);
    }
    showSuccess('Post updated', 'Changes saved successfully.');
    await fetchPosts();
  };

  const deletePost = async (id: string | number) => {
    setError(null);
    const res = await fetch(`${API_BASE}/api/posts/${id}`, {
      method: 'DELETE',
      headers: { ...authHeaders },
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.error || `Delete failed (${res.status})`);
    }
    showSuccess('Post deleted', 'The post has been removed.');
    await fetchPosts();
  };

  const createUser = async () => {
    setNewUserLoading(true);
    setNewUserMessage(null);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ email: newUserEmail, password: newUserPassword, role: newUserRole }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(body?.error || `Failed to create user (${res.status})`);
      }
      showSuccess('User created', `${newUserEmail} added with ${newUserRole} access.`);
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserRole('admin');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setNewUserLoading(false);
    }
  };

  const handleUpdateUser = async (id: number, payload: { role: 'admin' | 'superadmin'; password?: string }) => {
    setError(null);
    setEditingUserLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(body?.error || `Failed to update user (${res.status})`);
      }
      showSuccess(
        'User updated',
        payload.password ? 'Role and password saved.' : 'Role saved.'
      );
      setIsUserModalOpen(false);
      setEditingUserId(null);
      setEditingUserPassword('');
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setEditingUserLoading(false);
    }
  };

  const openUserModal = (user: UserRow) => {
    if ((user.role || '').toLowerCase() === 'superadmin') {
      return;
    }
    const currentRole = (user.role === 'superadmin' ? 'superadmin' : 'admin') as 'admin' | 'superadmin';
    setEditingUserId(user.id);
    setEditingUserRole(currentRole);
    setEditingUserPassword('');
    setEditingUserEmail(user.email);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setEditingUserId(null);
    setEditingUserPassword('');
    setEditingUserEmail('');
  };

  const closeDeleteModal = () => {
    setDeleteUserId(null);
    setDeleteUserEmail(null);
  };

  const openDeleteModal = (user: UserRow) => {
    if ((user.role || '').toLowerCase() === 'superadmin') {
      return;
    }
    setDeleteUserId(user.id);
    setDeleteUserEmail(user.email);
  };

  const handleChangePassword = async () => {
    setError(null);
    setPasswordMessage(null);
    if (!currentPassword || !newPassword) {
      const msg = 'Please enter your current password and a new password.';
      setError(msg);
      showError('Missing fields', msg);
      return;
    }
    if (newPassword !== confirmPassword) {
      const msg = 'New password and confirmation do not match.';
      setError(msg);
      showError('Passwords do not match', 'The new passwords must be the same.');
      return;
    }
    setChangingPassword(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(body?.error || `Password update failed (${res.status})`);
      }
      showSuccess('Password updated', 'Your password has been changed.');
      setPasswordMessage('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Failed to update password';
      setError(message);
      if (message.toLowerCase().includes('current password')) {
        showError('Incorrect current password', 'Please verify your current password.');
      } else {
        showError('Password update failed', message);
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    setError(null);
    try {
      setDeletingUser(true);
      const res = await fetch(`${API_BASE}/api/auth/users/${id}`, {
        method: 'DELETE',
        headers: { ...authHeaders },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Delete failed (${res.status})`);
      }
      showSuccess('User deleted');
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setDeletingUser(false);
      setDeleteUserId(null);
      setDeleteUserEmail(null);
    }
  };

  const showDashboard = currentPanel === 'dashboard';
  const showCreatePost = currentPanel === 'create-post';
  const showContactRequests = currentPanel === 'contact-requests';
  const showAddUser = currentPanel === 'add-user';
  const showAllUsers = currentPanel === 'all-users';
  const showChangePassword = currentPanel === 'change-password';

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background flex items-center">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/pave_logo.jpg" alt="PavePath logo" className="h-12 w-auto rounded-lg shadow-sm border border-border/50 bg-background" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Admin Console</p>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">PavePath Content Hub</h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl">
              Manage blog posts and announcements. Keep your team and clients updated with fresh content.
            </p>
            <div className="hidden lg:block rounded-2xl border border-border/50 bg-card/60 shadow-glow p-6 backdrop-blur">
              <h3 className="text-xl font-semibold text-foreground mb-3">What you can do</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Publish, edit, and archive posts</li>
                <li>• Upload feature images from your library</li>
                <li>• Preview updates instantly</li>
              </ul>
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur rounded-2xl border border-border shadow-hover p-8 w-full max-w-lg mx-auto">
            <div className="mb-6">
              <p className="text-sm font-medium text-primary uppercase tracking-wide">Secure Access</p>
              <h2 className="text-2xl font-bold text-foreground mt-2">
                {authMode === 'login' ? 'Sign in to your workspace' : 'Create an admin account'}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Use your admin credentials to manage content.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm text-foreground/90">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm text-foreground/90">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleAuth}
                  disabled={authLoading}
                  className="inline-flex justify-center items-center px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold shadow-glow hover:bg-primary/90 transition disabled:opacity-60 w-full"
                >
                  {authLoading
                    ? authMode === 'login'
                      ? 'Signing in...'
                      : 'Creating account...'
                    : authMode === 'login'
                    ? 'Sign in'
                    : 'Create account'}
                </button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNav onLogout={handleLogout} />
      <main className="flex-1 p-8 overflow-auto">
        <div className="section-container py-10 space-y-10">
        <header className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-center">
          <div className="rounded-2xl border border-border/60 bg-card/70 shadow-glow p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img src="/pave_logo.jpg" alt="PavePath logo" className="h-12 w-auto rounded-lg border border-border/50 bg-background" />
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Admin Workspace</p>
                <h1 className="text-3xl font-display font-bold text-foreground">Content Operations</h1>
                <p className="text-sm text-muted-foreground">
                  Create, edit, and publish updates with image support.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">Live</span>
              <span>Signed in as <span className="text-foreground font-semibold">{userEmail || 'Admin'}</span></span>
            </div>
          </div>
          {showDashboard && (
          <div className="rounded-2xl border border-border/60 bg-card/70 shadow-hover p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Stats</p>
                <h3 className="text-xl font-semibold text-foreground">Content Summary</h3>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md border border-border text-foreground hover:bg-muted/40 transition"
              >
                Log out
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border/70 bg-background/80 p-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Published</p>
                <p className="text-2xl font-bold text-foreground">{posts.length}</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-background/80 p-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
                <p className="text-lg font-semibold text-primary">Online</p>
              </div>
              {isSuperadmin && (
                <div className="rounded-lg border border-border/70 bg-background/80 p-3 col-span-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Users</p>
                  <p className="text-2xl font-bold text-foreground">
                    {loadingUsers ? '…' : users.length}
                  </p>
                </div>
              )}
            </div>
          </div>
          )}
        </header>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {showCreatePost && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Create new post</h2>
              {loadingPosts && <span className="text-sm text-muted-foreground">Syncing...</span>}
            </div>
            <div className="rounded-2xl border border-border/70 p-5 bg-card shadow-hover">
              <AdminEditor key={createEditorKey} onSave={createPost} />
            </div>
          </section>
        )}

        {showDashboard && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Recent posts</h2>
              {loadingPosts && <span className="text-sm text-muted-foreground">Loading...</span>}
            </div>
            <div className="rounded-2xl border border-border/70 p-4 bg-card shadow-hover">
              <AdminPostList posts={posts} onUpdate={updatePost} onDelete={deletePost} />
            </div>
          </section>
        )}

        {showChangePassword && (
          <section className="space-y-3" id="change-password">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Change your password</h2>
              {passwordMessage && <span className="text-sm text-primary">{passwordMessage}</span>}
            </div>
            <div className="rounded-2xl border border-border/70 p-5 bg-card shadow-hover grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm text-foreground/90">Current password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  placeholder="Current password"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm text-foreground/90">New password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  placeholder="New password"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm text-foreground/90">Confirm new password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="md:col-span-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleChangePassword}
                  disabled={changingPassword}
                  className="px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold shadow-glow hover:bg-primary/90 transition disabled:opacity-60"
                >
                  {changingPassword ? 'Updating...' : 'Update password'}
                </button>
                <p className="text-xs text-muted-foreground">
                  Works for both admins and superadmins. Current password is required.
                </p>
              </div>
            </div>
          </section>
        )}

        {showContactRequests && (
          isSuperadmin ? (
            <section className="space-y-3" id="contact-requests">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Contact requests</h2>
                  <p className="text-sm text-muted-foreground">
                    Combined view of Book-a-Call and Redline submissions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchContacts}
                    disabled={contactLoading}
                    className="px-3 py-1.5 rounded-md border border-border text-sm hover:bg-muted/40 transition disabled:opacity-60"
                  >
                    {contactLoading ? 'Refreshing...' : 'Refresh'}
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {contactLoading
                      ? 'Syncing'
                      : `${callRequests.length} calls • ${redlineRequests.length} redlines`}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/70 p-4 bg-card shadow-hover">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">Book a call</h3>
                    <span className="text-sm text-muted-foreground">{callRequests.length} total</span>
                  </div>
                  <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
                    {callRequests.length === 0 && !contactLoading && (
                      <p className="text-sm text-muted-foreground">No call requests yet.</p>
                    )}
                    {callRequests.map((c) => (
                      <div key={c.id} className="rounded-xl border border-border/60 bg-background/70 p-3 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-semibold text-foreground">{c.name}</div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(c.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">
                          Name: {c.name} | Firm: {c.firm} | Role: {c.role} | Email: {c.email}
                          {c.phone ? ` | Phone: ${c.phone}` : ''}
                        </p>
                        {c.draftingSupport?.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Support need: {c.draftingSupport.join(', ')}
                          </p>
                        )}
                        {c.otherService && (
                          <p className="text-xs text-muted-foreground">Other: {c.otherService}</p>
                        )}
                        {c.message && <p className="text-sm text-foreground">Message: {c.message}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 p-4 bg-card shadow-hover">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">Redline tasks</h3>
                    <span className="text-sm text-muted-foreground">{redlineRequests.length} total</span>
                  </div>
                  <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
                    {redlineRequests.length === 0 && !contactLoading && (
                      <p className="text-sm text-muted-foreground">No redline requests yet.</p>
                    )}
                    {redlineRequests.map((r) => (
                      <div key={r.id} className="rounded-xl border border-border/60 bg-background/70 p-3 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-semibold text-foreground">{r.name}</div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(r.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">Name: {r.name} | Email: {r.email}</p>
                        <p className="text-sm text-foreground">Deadline: {r.deadline}</p>
                        <p className="text-sm text-foreground">Message: {r.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="rounded-2xl border border-border/70 p-5 bg-card shadow-hover">
              <h2 className="text-xl font-semibold text-foreground">Contact requests</h2>
              <p className="text-sm text-muted-foreground mt-2">Superadmin access is required for this section.</p>
            </div>
          )
        )}

        {showAddUser && (
          isSuperadmin ? (
            <section className="space-y-3" id="add-user">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Add a user</h2>
                {newUserMessage && <span className="text-sm text-primary">{newUserMessage}</span>}
              </div>
              <div className="rounded-2xl border border-border/70 p-5 bg-card shadow-hover grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm text-foreground/90">User email</label>
                  <input
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                    placeholder="user@domain.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm text-foreground/90">Password</label>
                  <input
                    type="password"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                    placeholder="Set a password"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm text-foreground/90">Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as 'admin' | 'superadmin')}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                  >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={createUser}
                    disabled={newUserLoading || !newUserEmail || !newUserPassword}
                    className="inline-flex justify-center items-center px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold shadow-glow hover:bg-primary/90 transition disabled:opacity-60"
                  >
                    {newUserLoading ? 'Creating user...' : 'Add user'}
                  </button>
                  <p className="text-xs text-muted-foreground">
                    This creates a login for the provided email and password.
                  </p>
                </div>
              </div>
            </section>
          ) : (
            <div className="rounded-2xl border border-border/70 p-5 bg-card shadow-hover">
              <h2 className="text-xl font-semibold text-foreground">Add a user</h2>
              <p className="text-sm text-muted-foreground mt-2">Superadmin access is required for this section.</p>
            </div>
          )
        )}

        {showAllUsers && (
          isSuperadmin ? (
            <>
              <section className="space-y-3" id="all-users">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">All users</h2>
                {loadingUsers && <span className="text-sm text-muted-foreground">Loading...</span>}
              </div>
              <div className="rounded-2xl border border-border/70 p-4 bg-card shadow-hover overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-muted-foreground">
                    <tr>
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2 pr-4">Role</th>
                      <th className="py-2 pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {users.map((u) => {
                      const currentRole = (u.role === 'superadmin' ? 'superadmin' : 'admin') as
                        | 'admin'
                        | 'superadmin';
                      const isSuperadmin = currentRole === 'superadmin';
                      return (
                        <tr key={u.id}>
                          <td className="py-3 pr-4 text-foreground">{u.email}</td>
                          <td className="py-3 pr-4">
                            <span className="text-foreground capitalize">{currentRole}</span>
                          </td>
                          <td className="py-3 pr-4">
                            {isSuperadmin ? (
                              <span className="text-sm text-muted-foreground">Protected</span>
                            ) : (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => openUserModal(u)}
                                  className="px-3 py-1.5 rounded-md border border-border text-foreground"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => openDeleteModal(u)}
                                  className="px-3 py-1.5 rounded-md border border-border text-destructive hover:bg-destructive/10 transition"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {!users.length && !loadingUsers && (
                  <p className="text-sm text-muted-foreground py-3">No users found.</p>
                )}
              </div>
            </section>

            {deleteUserId !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-glow p-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Delete user</p>
                    <h3 className="text-xl font-semibold text-foreground">
                      {deleteUserEmail || 'Selected user'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This will permanently remove the user account. Posts remain untouched.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => deleteUserId !== null && handleDeleteUser(deleteUserId)}
                      disabled={deletingUser}
                      className="px-4 py-2.5 rounded-md bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90 transition disabled:opacity-60"
                    >
                      {deletingUser ? 'Deleting...' : 'Delete user'}
                    </button>
                    <button
                      onClick={closeDeleteModal}
                      className="px-4 py-2.5 rounded-md border border-border text-foreground hover:bg-muted/40 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isUserModalOpen && editingUserId !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-glow p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Edit user</p>
                      <h3 className="text-xl font-semibold text-foreground">{editingUserEmail}</h3>
                    </div>
                    <button
                      onClick={closeUserModal}
                      className="px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-muted/40 transition"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-foreground/90">Role</label>
                    <select
                      value={editingUserRole}
                      onChange={(e) => setEditingUserRole(e.target.value as 'admin' | 'superadmin')}
                      className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                    >
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-foreground/90">New password (optional)</label>
                    <input
                      type="password"
                      value={editingUserPassword}
                      onChange={(e) => setEditingUserPassword(e.target.value)}
                      placeholder="Leave blank to keep current password"
                      className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() =>
                        handleUpdateUser(editingUserId, {
                          role: editingUserRole,
                          ...(editingUserPassword.trim() ? { password: editingUserPassword.trim() } : {}),
                        })
                      }
                      disabled={editingUserLoading}
                      className="px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold shadow-glow hover:bg-primary/90 transition disabled:opacity-60"
                    >
                      {editingUserLoading ? 'Saving...' : 'Save changes'}
                    </button>
                    <button
                      onClick={closeUserModal}
                      className="px-4 py-2.5 rounded-md border border-border text-foreground hover:bg-muted/40 transition"
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Role updates work now. Password changes will apply once the backend supports password updates on this endpoint.
                  </p>
                </div>
              </div>
            )}
            </>
          ) : (
            <div className="rounded-2xl border border-border/70 p-5 bg-card shadow-hover">
              <h2 className="text-xl font-semibold text-foreground">All users</h2>
              <p className="text-sm text-muted-foreground mt-2">Superadmin access is required for this section.</p>
            </div>
          )
        )}
      </div>
      </main>
    </div>
  );
};

export default Admin;
