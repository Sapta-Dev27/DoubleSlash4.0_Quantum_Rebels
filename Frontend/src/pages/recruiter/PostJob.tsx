import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Briefcase } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';

export const PostJob = () => {
  const [formData, setFormData] = useState({
    role: '',
    description: '',
    location: '',
    experience: '',
    salary: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Job posted successfully!');
    setFormData({
      role: '',
      description: '',
      location: '',
      experience: '',
      salary: ''
    });
    setIsLoading(false);
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Post New Job
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create a new job posting to attract top talent
          </p>
        </motion.div>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Job Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Job Role"
              placeholder="e.g., Senior Frontend Developer"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />

            <Textarea
              label="Job Description"
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Location"
                placeholder="e.g., Remote, New York, NY"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />

              <Input
                label="Experience Required"
                placeholder="e.g., 3-5 years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
              />
            </div>

            <Input
              label="Salary Range"
              placeholder="e.g., $100k - $130k"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              required
            />

            <div className="pt-4">
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full"
              >
                <PlusCircle className="w-5 h-5" />
                Post Job
              </Button>
            </div>
          </form>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Card className="bg-blue-50 dark:bg-blue-950">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">
              Tips for a Great Job Posting
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Be specific about the role and responsibilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>List required skills and qualifications clearly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Include information about your company culture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Be transparent about salary and benefits</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};
