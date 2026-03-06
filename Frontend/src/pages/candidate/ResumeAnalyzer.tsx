import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, TrendingUp, AlertCircle, Lightbulb, Target } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { FileUpload } from '../../components/FileUpload';
import { mockResumeAnalysis } from '../../services/mockData';

export const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzed(true);
    setIsLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
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
            Resume Analyzer
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Get your ATS score and actionable insights to improve your resume
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
            {file && !isAnalyzed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Button
                  onClick={handleAnalyze}
                  isLoading={isLoading}
                  className="w-full"
                >
                  <TrendingUp className="w-5 h-5" />
                  Analyze Resume
                </Button>
              </motion.div>
            )}
          </Card>

          {isAnalyzed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <svg className="transform -rotate-90 w-40 h-40">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-slate-200 dark:text-slate-700"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - mockResumeAnalysis.atsScore / 100)}`}
                        className="text-green-600 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <p className={`text-5xl font-bold ${getScoreColor(mockResumeAnalysis.atsScore)}`}>
                          {mockResumeAnalysis.atsScore}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          ATS Score
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {getScoreLabel(mockResumeAnalysis.atsScore)}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Your resume is well-optimized for ATS systems
                  </p>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Strengths
                  </h3>
                </div>
                <div className="space-y-3">
                  {mockResumeAnalysis.strengths.map((strength, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                      <p className="text-slate-900 dark:text-white">{strength}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Areas for Improvement
                  </h3>
                </div>
                <div className="space-y-3">
                  {mockResumeAnalysis.weaknesses.map((weakness, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2" />
                      <p className="text-slate-900 dark:text-white">{weakness}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Suggestions
                  </h3>
                </div>
                <div className="space-y-3">
                  {mockResumeAnalysis.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <p className="text-slate-900 dark:text-white">{suggestion}</p>
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
