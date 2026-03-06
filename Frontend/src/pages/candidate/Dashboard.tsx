import { motion } from 'framer-motion';
import { MessageSquare, FileText, BookOpen, Briefcase, TrendingUp, CheckCircle } from 'lucide-react';
import { Card } from '../../components/Card';
import { DashboardLayout } from '../../layouts/DashboardLayout';

export const CandidateDashboard = () => {
  const stats = [
    { label: 'Mock Interviews', value: '12', icon: <MessageSquare className="w-6 h-6" />, color: 'blue' },
    { label: 'Resumes Analyzed', value: '8', icon: <FileText className="w-6 h-6" />, color: 'green' },
    { label: 'Jobs Applied', value: '24', icon: <Briefcase className="w-6 h-6" />, color: 'orange' },
    { label: 'Shortlisted', value: '5', icon: <CheckCircle className="w-6 h-6" />, color: 'teal' }
  ];

  const recentActivity = [
    { action: 'Completed mock interview for Frontend Developer', time: '2 hours ago' },
    { action: 'Analyzed resume - ATS Score: 85%', time: '1 day ago' },
    { action: 'Applied to Senior React Developer at TechCorp', time: '2 days ago' },
    { action: 'Generated cover letter for StartupXYZ', time: '3 days ago' }
  ];

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome Back!
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Here's your career development overview
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-xl flex items-center justify-center mb-4`}>
                  <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 dark:text-white mb-1">
                      {activity.action}
                    </p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Quick Actions
              </h2>
            </div>
            <div className="space-y-3">
              <button className="w-full p-4 text-left rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all">
                <p className="font-medium text-slate-900 dark:text-white mb-1">
                  Start Mock Interview
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Practice with AI-powered interviews
                </p>
              </button>
              <button className="w-full p-4 text-left rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all">
                <p className="font-medium text-slate-900 dark:text-white mb-1">
                  Analyze Resume
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Get ATS score and suggestions
                </p>
              </button>
              <button className="w-full p-4 text-left rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all">
                <p className="font-medium text-slate-900 dark:text-white mb-1">
                  Browse Jobs
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Find your next opportunity
                </p>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
