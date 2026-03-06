import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { ROLES } from '../utils/constants';
import { UserRole } from '../types';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('candidate');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, role);
      navigate(role === 'candidate' ? '/candidate/dashboard' : '/recruiter/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Briefcase className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Join our AI-powered career platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Select
              label="I am a"
              options={ROLES.map(r => ({ value: r.value, label: r.label }))}
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            />

            <div className="relative">
              <User className="absolute left-4 top-[46px] w-5 h-5 text-slate-400" />
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-[46px] w-5 h-5 text-slate-400" />
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-[46px] w-5 h-5 text-slate-400" />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-[46px] w-5 h-5 text-slate-400" />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <Button type="submit" className="w-full" isLoading={isLoading}>
              <UserPlus className="w-5 h-5" />
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
