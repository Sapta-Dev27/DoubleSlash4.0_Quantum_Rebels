import { motion } from 'framer-motion';
import { Briefcase, Calendar, FileText } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';

export const AppliedJobs = () => {
  const applications = [
    {
      id: '1',
      company: 'TechCorp',
      role: 'Senior Frontend Developer',
      appliedDate: '2024-01-16',
      status: 'shortlisted' as const
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full Stack Engineer',
      appliedDate: '2024-01-15',
      status: 'pending' as const
    },
    {
      id: '3',
      company: 'InnovateLabs',
      role: 'React Developer',
      appliedDate: '2024-01-14',
      status: 'rejected' as const
    },
    {
      id: '4',
      company: 'DataSystems',
      role: 'Frontend Engineer',
      appliedDate: '2024-01-13',
      status: 'pending' as const
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
      shortlisted: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      rejected: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Applied Jobs
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your job applications and their status
          </p>
        </motion.div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Company
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Role
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Applied Date
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {app.company}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {app.role}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="py-4 px-4">
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                        <FileText className="w-4 h-4" />
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {applications.length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Applications</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 mb-2">
                {applications.filter(a => a.status === 'shortlisted').length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Shortlisted</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600 mb-2">
                {applications.filter(a => a.status === 'pending').length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
