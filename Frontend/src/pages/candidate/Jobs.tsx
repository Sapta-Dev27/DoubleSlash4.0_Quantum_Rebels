import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, DollarSign, ExternalLink } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { mockJobs } from '../../services/mockData';

export const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs] = useState(mockJobs);

  const filteredJobs = jobs.filter(job =>
    job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Job Recommendations
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Discover opportunities tailored to your profile
          </p>
        </motion.div>

        <Card className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search by role or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            <Button>
              <Search className="w-5 h-5" />
              Search
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {job.role}
                    </h3>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Briefcase className="w-4 h-4" />
                    {job.experience}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" size="sm">
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Save
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No jobs found matching your search
              </p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
