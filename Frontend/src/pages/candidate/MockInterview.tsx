import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { FileUpload } from '../../components/FileUpload';
import { mockInterviewQuestions } from '../../services/mockData';

export const MockInterview = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerated(true);
    setIsLoading(false);
  };

  const sections = [
    { id: 'technical', title: 'Technical Round', color: 'blue' },
    { id: 'experience', title: 'Experience Round', color: 'green' },
    { id: 'hr', title: 'HR Round', color: 'orange' }
  ];

  const getQuestionsByCategory = (category: string) => {
    return mockInterviewQuestions.filter(q => q.category === category);
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
            AI Mock Interview
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Upload your resume and get personalized interview questions
          </p>
        </motion.div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Upload Resume
            </h2>
            <FileUpload
              onFileSelect={setFile}
              accept=".pdf,.doc,.docx"
              maxSize={5}
            />
            {file && !isGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Button
                  onClick={handleGenerate}
                  isLoading={isLoading}
                  className="w-full"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Interview Questions
                </Button>
              </motion.div>
            )}
          </Card>

          {isGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      Resume Summary
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <span className="font-medium">Name:</span> John Doe
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <span className="font-medium">Experience:</span> 5 years in Frontend Development
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-medium">Skills:</span> React, TypeScript, Node.js, AWS
                    </p>
                  </div>
                </div>
              </Card>

              {sections.map((section, index) => {
                const questions = getQuestionsByCategory(section.id);
                const isExpanded = expandedSection === section.id;

                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <button
                        onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                        className="w-full flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-${section.color}-100 dark:bg-${section.color}-900/20 rounded-lg flex items-center justify-center`}>
                            <span className={`text-${section.color}-600 font-bold`}>
                              {index + 1}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {section.title}
                          </h3>
                          <span className="text-sm text-slate-500">
                            ({questions.length} questions)
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 space-y-3 overflow-hidden"
                          >
                            {questions.map((question, qIndex) => (
                              <div
                                key={question.id}
                                className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg"
                              >
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                  Q{qIndex + 1}: {question.question}
                                </p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
