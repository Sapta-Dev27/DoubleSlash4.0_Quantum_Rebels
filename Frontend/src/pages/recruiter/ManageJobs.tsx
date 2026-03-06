import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Edit, Trash2, Users, Calendar } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { mockJobs } from '../../services/mockData';

export const ManageJobs = () => {
  const [jobs] = useState(mockJobs);

  const handleEdit = (jobId: string) => {
    alert(`Edit job ${jobId}`);
  };

  const handleDelete = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      alert(`Job ${jobId} deleted`);
    }
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Manage Jobs
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            View and manage your job postings
          </p>
        </motion.div>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {job.role}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {job.company}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(job.id)}
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(job.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Users className="w-4 h-4" />
                        <span>45 applicants</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                        {job.location}
                      </div>
                      <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                        {job.experience}
                      </div>
                      <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium">
                        {job.salary}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {jobs.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                No job postings yet
              </p>
              <Button>
                <Briefcase className="w-5 h-5" />
                Post Your First Job
              </Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
