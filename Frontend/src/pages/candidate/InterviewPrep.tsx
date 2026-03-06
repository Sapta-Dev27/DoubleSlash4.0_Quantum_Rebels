import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { JOB_ROLES, EXPERIENCE_LEVELS, SENIORITY_LEVELS } from '../../utils/constants';

export const InterviewPrep = () => {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [seniority, setSeniority] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockQuestions = [
      'What are your main responsibilities in your current role?',
      'Describe a challenging technical problem you solved recently',
      'How do you stay updated with the latest technologies?',
      'Explain the difference between var, let, and const in JavaScript',
      'What is your experience with responsive design?',
      'How do you handle tight deadlines and pressure?',
      'Describe your experience with version control systems',
      'What testing methodologies are you familiar with?',
      'How do you approach debugging complex issues?',
      'Tell me about a time you disagreed with a team member',
      'What are your salary expectations?',
      'Where do you see yourself in 5 years?',
      'Why should we hire you?',
      'What is your greatest weakness?',
      'Describe a project you are most proud of',
      'How do you prioritize your work?',
      'What motivates you as a developer?',
      'How do you handle code reviews?',
      'What is your experience with CI/CD pipelines?',
      'Why are you looking for a new opportunity?'
    ];

    setQuestions(mockQuestions);
    setIsLoading(false);
  };

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Interview Preparation
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Get curated interview questions based on your profile
          </p>
        </motion.div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Your Profile
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Select
                label="Job Role"
                options={[
                  { value: '', label: 'Select Role' },
                  ...JOB_ROLES.map(r => ({ value: r, label: r }))
                ]}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />

              <Select
                label="Experience Level"
                options={[
                  { value: '', label: 'Select Experience' },
                  ...EXPERIENCE_LEVELS.map(e => ({ value: e, label: e }))
                ]}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />

              <Select
                label="Seniority"
                options={[
                  { value: '', label: 'Select Seniority' },
                  ...SENIORITY_LEVELS.map(s => ({ value: s, label: s }))
                ]}
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
              />
            </div>

            <Button
              onClick={handleGenerate}
              isLoading={isLoading}
              disabled={!role || !experience || !seniority}
              className="w-full"
            >
              <Sparkles className="w-5 h-5" />
              Generate 20 Interview Questions
            </Button>
          </Card>

          {questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Interview Questions ({questions.length})
                </h2>
                <div className="space-y-3">
                  {questions.map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-slate-900 dark:text-white pt-1">
                        {question}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
