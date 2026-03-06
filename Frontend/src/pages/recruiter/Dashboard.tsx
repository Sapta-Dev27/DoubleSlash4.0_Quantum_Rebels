import { motion } from 'framer-motion';
import { Briefcase, Users, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../../components/Card';
import { DashboardLayout } from '../../layouts/DashboardLayout';

export const RecruiterDashboard = () => {
  const stats = [
    { label: 'Active Jobs', value: '8', icon: <Briefcase className="w-6 h-6" />, color: 'blue' },
    { label: 'Total Applicants', value: '156', icon: <Users className="w-6 h-6" />, color: 'green' },
    { label: 'Shortlisted', value: '24', icon: <CheckCircle className="w-6 h-6" />, color: 'teal' },
    { label: 'Pending Review', value: '48', icon: <Clock className="w-6 h-6" />, color: 'orange' }
  ];

  const recentApplications = [
    { name: 'John Doe', role: 'Senior Frontend Developer', time: '2 hours ago', status: 'pending' },
    { name: 'Jane Smith', role: 'Full Stack Engineer', time: '5 hours ago', status: 'shortlisted' },
    { name: 'Mike Johnson', role: 'Backend Developer', time: '1 day ago', status: 'pending' },
    { name: 'Sarah Williams', role: 'UI/UX Designer', time: '2 days ago', status: 'shortlisted' }
  ];

  const activeJobs = [
    { role: 'Senior Frontend Developer', applicants: 45, posted: '5 days ago' },
    { role: 'Full Stack Engineer', applicants: 38, posted: '1 week ago' },
    { role: 'Backend Developer', applicants: 32, posted: '2 weeks ago' }
  ];

  return (
    <DashboardLayout role="recruiter">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Recruiter Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your job postings and applicants
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
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Recent Applications
            </h2>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {app.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {app.name}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {app.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'shortlisted'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                    }`}>
                      {app.status}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{app.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Active Job Postings
            </h2>
            <div className="space-y-4">
              {activeJobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {job.role}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                      {job.applicants} applicants
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Posted {job.posted}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
