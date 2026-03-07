import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  FileText,
  BookOpen,
  Briefcase,
  Mail,
  CheckCircle
} from "lucide-react";

import { Card } from "../../components/Card";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { dashboardService } from "../../services/dashboardService";

export const CandidateDashboard = () => {

  const [stats, setStats] = useState({
    mockInterviews: 0,
    resumeAnalysis: 0,
    interviewPrep: 0,
    coverLetters: 0,
    jobsApplied: 0,
    jobsShortlisted: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await dashboardService.fetchStats();

        if (res.success) {
          setStats(res.data);
        }

      } catch (error) {
        console.log("Failed to fetch dashboard stats", error);
      }

      setLoading(false);

    };

    fetchStats();

  }, []);

  const statCards = [
    {
      label: "Mock Interviews",
      value: stats.mockInterviews,
      icon: <MessageSquare className="w-6 h-6" />,
      color: "blue"
    },
    {
      label: "Resumes Analyzed",
      value: stats.resumeAnalysis,
      icon: <FileText className="w-6 h-6" />,
      color: "green"
    },
    {
      label: "Interview Prep",
      value: stats.interviewPrep,
      icon: <BookOpen className="w-6 h-6" />,
      color: "purple"
    },
    {
      label: "Cover Letters",
      value: stats.coverLetters,
      icon: <Mail className="w-6 h-6" />,
      color: "pink"
    },
    {
      label: "Jobs Applied",
      value: stats.jobsApplied,
      icon: <Briefcase className="w-6 h-6" />,
      color: "orange"
    },
    {
      label: "Shortlisted",
      value: stats.jobsShortlisted,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "teal"
    }
  ];

  return (

    <DashboardLayout role="candidate">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome Back!
          </h1>

          <p className="text-slate-600 dark:text-slate-400">
            Here's your career development overview
          </p>

        </motion.div>


        {/* Stats Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {statCards.map((stat, index) => (

            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >

              <Card hover>

                <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-xl flex items-center justify-center mb-4`}>
                  <div className={`text-${stat.color}-600`}>
                    {stat.icon}
                  </div>
                </div>

                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {loading ? "..." : stat.value}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>

              </Card>

            </motion.div>

          ))}

        </div>

      </div>

    </DashboardLayout>

  );

};