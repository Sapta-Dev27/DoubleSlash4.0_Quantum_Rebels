import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, Download, Sparkles } from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';

export const CoverLetter = () => {
  const [jobRole, setJobRole] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCoverLetter(`Dear Hiring Manager,

I am writing to express my strong interest in the ${jobRole} position at ${company}. With my extensive experience and passion for technology, I believe I would be an excellent fit for your team.

Throughout my career, I have consistently demonstrated my ability to deliver high-quality results and contribute to team success. My technical skills, combined with my problem-solving abilities and dedication to continuous learning, make me well-suited for this role.

I am particularly drawn to ${company} because of your innovative approach and commitment to excellence. I am excited about the opportunity to contribute to your mission and grow alongside your talented team.

The job description mentions several key requirements that align perfectly with my experience. I have successfully worked on similar projects and am confident in my ability to meet and exceed your expectations.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can contribute to ${company}'s continued success.

Best regards,
John Doe`);
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    alert('Cover letter copied to clipboard!');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${company}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
            Cover Letter Generator
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create personalized cover letters powered by AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Job Details
              </h2>
            </div>

            <div className="space-y-4">
              <Input
                label="Job Role"
                placeholder="e.g., Senior Frontend Developer"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
              />

              <Input
                label="Company Name"
                placeholder="e.g., TechCorp Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <Textarea
                label="Job Description"
                placeholder="Paste the job description here..."
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />

              <Button
                onClick={handleGenerate}
                isLoading={isLoading}
                disabled={!jobRole || !company || !jobDescription}
                className="w-full"
              >
                <Sparkles className="w-5 h-5" />
                Generate Cover Letter
              </Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Generated Letter
                </h2>
              </div>
              {coverLetter && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="w-9 h-9 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-lg flex items-center justify-center transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="w-9 h-9 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded-lg flex items-center justify-center transition-colors"
                    title="Download as PDF"
                  >
                    <Download className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              )}
            </div>

            {coverLetter ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 min-h-[500px]"
              >
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-900 dark:text-white leading-relaxed">
                  {coverLetter}
                </pre>
              </motion.div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-12 min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">
                    Your cover letter will appear here
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
