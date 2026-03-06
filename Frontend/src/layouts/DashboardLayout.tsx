import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  BookOpen,
  Briefcase,
  CheckSquare,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  PlusCircle,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'candidate' | 'recruiter';
}

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const candidateNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/candidate/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Mock Interview', path: '/candidate/mock-interview', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Resume Analyzer', path: '/candidate/resume-analyzer', icon: <FileText className="w-5 h-5" /> },
    { label: 'Cover Letter', path: '/candidate/cover-letter', icon: <FileText className="w-5 h-5" /> },
    { label: 'Interview Prep', path: '/candidate/interview-prep', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Job Recommendations', path: '/candidate/jobs', icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Applied Jobs', path: '/candidate/applied-jobs', icon: <CheckSquare className="w-5 h-5" /> }
  ];

  const recruiterNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/recruiter/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Post Job', path: '/recruiter/post-job', icon: <PlusCircle className="w-5 h-5" /> },
    { label: 'Manage Jobs', path: '/recruiter/manage-jobs', icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Applicants', path: '/recruiter/applicants', icon: <Users className="w-5 h-5" /> }
  ];

  const navItems = role === 'candidate' ? candidateNavItems : recruiterNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed lg:sticky top-0 h-screen w-70 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-50"
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        CareerAI
                      </h2>
                      <p className="text-xs text-slate-500 capitalize">{role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Logged in as</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Menu className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-500 capitalize">{role}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
