import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Mail, Calendar } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';
import { mockApplications } from '../../services/mockData';

export const Applicants = () => {
  const [applications] = useState(mockApplications);
  const [selectedJob, setSelectedJob] = useState('all');

  const handleStatusChange = (appId: string, newStatus: string) => {
    alert(`Application ${appId} status updated to: ${newStatus}`);
  };

  const handleViewResume = (resumeUrl: string) => {
    alert(`Opening resume: ${resumeUrl}`);
  };

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
    <DashboardLayout role="recruiter">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Applicants
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Review and manage job applications
          </p>
        </motion.div>

        <Card className="mb-6">
          <div className="flex items-center gap-4">
            <Users className="w-6 h-6 text-blue-600" />
            <Select
              label="Filter by Job"
              options={[
                { value: 'all', label: 'All Jobs' },
                { value: '1', label: 'Senior Frontend Developer' },
                { value: '2', label: 'Full Stack Engineer' }
              ]}
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            />
          </div>
        </Card>

        <div className="space-y-4">
          {applications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-white">
                      {app.candidateName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                          {app.candidateName}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Applied for: Senior Frontend Developer
                        </p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Mail className="w-4 h-4" />
                        <span>candidate@example.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span>Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewResume(app.resumeUrl)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-400 rounded-lg transition-colors text-sm font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        View Resume
                      </button>

                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="px-4 py-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm font-medium text-slate-900 dark:text-white hover:border-blue-500 transition-colors"
                      >
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {applications.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No applications yet
              </p>
            </div>
          </Card>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {applications.length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Applicants</p>
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
              <p className="text-sm text-slate-600 dark:text-slate-400">Pending Review</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
