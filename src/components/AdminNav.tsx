import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Mail, UserPlus, Users, KeyRound, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

type AdminNavItem = {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  superadminOnly?: boolean;
};

const navItems: AdminNavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Create new post', href: '/admin/create-post', icon: FileText },
  { name: 'Contact requests', href: '/admin/contact-requests', icon: Mail, superadminOnly: true },
  { name: 'Add a user', href: '/admin/add-user', icon: UserPlus, superadminOnly: true },
  { name: 'All users', href: '/admin/all-users', icon: Users, superadminOnly: true },
  { name: 'Change your password', href: '/admin/change-password', icon: KeyRound }
];

type AdminNavProps = {
  onLogout?: () => void;
};

const AdminNav = ({ onLogout }: AdminNavProps) => {
  const location = useLocation();

  return (
    <nav className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="p-4 mb-8">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <div className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center px-4 py-3 rounded-lg transition-colors',
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
