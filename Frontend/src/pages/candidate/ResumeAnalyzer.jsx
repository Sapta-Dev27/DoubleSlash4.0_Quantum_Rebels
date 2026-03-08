import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Target,
  Trash2,
  Eye,
  X
} from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { FileUpload } from "../../components/FileUpload";
import { analysisService } from "../../services/analysisService";

export const ResumeAnalyzer = () => {

  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyses, setAnalyses] = useState([]);

  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchAllAnalysis();
  }, []);

  const fetchAllAnalysis = async () => {

    try {

      const res = await analysisService.fetchAllAnalysis();

      if (res.success) {
        setAnalyses(res.data);
      }

    } catch (error) {
      console.log("Failed to fetch analysis");
    }

  };

  const handleAnalyze = async () => {

    if (!file) return;

    setIsLoading(true);

    try {

      const response = await analysisService.analyzeResume(file);

      if (!response.success) {
        throw new Error(response.message);
      }

      setAnalysis(response.data);
      setIsAnalyzed(true);

      fetchAllAnalysis();

    } catch (error) {
      console.log("Analysis failed", error);
    } finally {
      setIsLoading(false);
    }

  };

  const handleViewAnalysis = async (id) => {

    try {

      const res = await analysisService.fetchAnalysisById(id);

      if (res.success) {
        setSelectedAnalysis(res.data);
      }

    } catch (error) {
      console.log("Fetch analysis failed");
    }

  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {

    try {

      const res = await analysisService.deleteAnalysis(deleteId);

      if (res.success) {

        setNotification("Analysis deleted successfully");

        fetchAllAnalysis();

        setTimeout(() => {
          setNotification("");
        }, 3000);

      }

    } catch (error) {
      console.log("Delete failed");
    }

    setShowDeleteModal(false);

  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <DashboardLayout role="candidate">

      <div className="max-w-4xl mx-auto space-y-6">

        {notification && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg">
            {notification}
          </div>
        )}

        {/* Upload Resume */}

        <Card>

          <h2 className="text-xl font-bold mb-4">
            Upload Resume
          </h2>

          <FileUpload
            onFileSelect={setFile}
            accept=".pdf,.doc,.docx"
            maxSize={5}
          />

          {file && !isAnalyzed && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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

        {/* Current Analysis */}

        {isAnalyzed && analysis && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >

            {/* ATS Score */}

            <Card className="text-center">

              <p className={`text-5xl font-bold ${getScoreColor(analysis.atsScore)}`}>
                {analysis.atsScore}
              </p>

              <p className="text-xl font-bold">
                {getScoreLabel(analysis.atsScore)}
              </p>

            </Card>

            {/* Strengths */}

            <Card>

              <div className="flex items-center gap-3 mb-4">

                <Target className="text-green-600" />

                <h3 className="text-xl font-bold">
                  Strengths
                </h3>

              </div>

              {analysis.strength.map((item, i) => (
                <p key={i}>• {item}</p>
              ))}

            </Card>

            {/* Weakness */}

            <Card>

              <div className="flex items-center gap-3 mb-4">

                <AlertCircle className="text-orange-600" />

                <h3 className="text-xl font-bold">
                  Areas for Improvement
                </h3>

              </div>

              {analysis.weakness.map((item, i) => (
                <p key={i}>• {item}</p>
              ))}

            </Card>

            {/* Suggestions */}

            <Card>

              <div className="flex items-center gap-3 mb-4">

                <Lightbulb className="text-blue-600" />

                <h3 className="text-xl font-bold">
                  Suggestions
                </h3>

              </div>

              {analysis.suggestions.map((item, i) => (
                <p key={i}>{i + 1}. {item}</p>
              ))}

            </Card>

            {/* Learning Resources */}

            {analysis.learningResources && (

              <Card>

                <div className="flex items-center gap-3 mb-4">

                  <TrendingUp className="text-purple-600" />

                  <h3 className="text-xl font-bold">
                    Learning Resources
                  </h3>

                </div>

                <div className="space-y-6">

                  {analysis.learningResources.map((resource, i) => (

                    <div key={i} className="border rounded-lg p-4">

                      <h4 className="font-semibold text-lg mb-1">
                        {resource.topic}
                      </h4>

                      <p className="text-sm text-gray-500 mb-3">
                        {resource.reason}
                      </p>

                      <div className="space-y-2">

                        {resource.resources.map((link, j) => (

                          <a
                            key={j}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 rounded-md border hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                          >

                            <p className="font-medium">
                              {link.title}
                            </p>

                            <p className="text-xs text-gray-500">
                              {link.platform}
                            </p>

                          </a>

                        ))}

                      </div>

                    </div>

                  ))}

                </div>

              </Card>

            )}

          </motion.div>

        )}

        {/* Past Analyses */}

        <div>

          <h2 className="text-xl font-bold mb-4">
            Past Resume Analysis
          </h2>

          <div className="space-y-3">

            {analyses.map((item) => (

              <Card key={item._id}>

                <div className="flex justify-between items-center">

                  <p className="font-semibold">
                    ATS Score: {item.atsScore}
                  </p>

                  <div className="flex gap-3">

                    <Button onClick={() => handleViewAnalysis(item._id)}>
                      <Eye size={16} />
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => confirmDelete(item._id)}
                    >
                      <Trash2 size={16} />
                    </Button>

                  </div>

                </div>

              </Card>

            ))}

          </div>

        </div>

      </div>

      {/* View Analysis Popup */}

      {selectedAnalysis && (

        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setSelectedAnalysis(null)}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="relative w-[90%] max-w-3xl max-h-[85vh] overflow-y-auto 
    rounded-2xl border border-white/20 
    bg-white/10 backdrop-blur-xl 
    shadow-2xl p-8 text-white"
          >

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold tracking-tight">
                Resume Analysis
              </h2>

              <button
                onClick={() => setSelectedAnalysis(null)}
                className="p-2 rounded-lg hover:bg-white/20 transition"
              >
                <X size={20} />
              </button>

            </div>

            <div className="mb-6 text-center">

              <p className="text-sm text-gray-300 mb-1">
                ATS Score
              </p>

              <p className="text-5xl font-bold text-green-400">
                {selectedAnalysis.atsScore}
              </p>

            </div>

            {/* Strengths */}

            <div className="mb-6">

              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Target size={18} />
                Strengths
              </h3>

              <div className="space-y-2">

                {selectedAnalysis.strength.map((s, i) => (
                  <p key={i} className="text-gray-200">
                    • {s}
                  </p>
                ))}

              </div>

            </div>

            {/* Weakness */}

            <div className="mb-6">

              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertCircle size={18} />
                Weaknesses
              </h3>

              {selectedAnalysis.weakness.map((w, i) => (
                <p key={i} className="text-gray-200">
                  • {w}
                </p>
              ))}

            </div>

            {/* Missing Keywords */}

            <div className="mb-6">

              <h3 className="text-lg font-semibold mb-3">
                Missing Keywords
              </h3>

              <div className="flex flex-wrap gap-2">

                {selectedAnalysis.missingKeywords.map((k, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-red-500/20 text-red-300 border border-red-400/20"
                  >
                    {k}
                  </span>
                ))}

              </div>

            </div>

            {/* Suggestions */}

            <div>

              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Lightbulb size={18} />
                Suggestions
              </h3>

              {selectedAnalysis.suggestions.map((s, i) => (
                <p key={i} className="text-gray-200">
                  {i + 1}. {s}
                </p>
              ))}

            </div>

            {/* Learning Resources */}

            {selectedAnalysis.learningResources && (

              <div className="mt-6">

                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp size={18} />
                  Learning Resources
                </h3>

                <div className="space-y-6">

                  {selectedAnalysis.learningResources.map((resource, i) => (

                    <div
                      key={i}
                      className="p-4 rounded-xl border border-white/10 bg-white/5"
                    >

                      <h4 className="font-semibold text-lg mb-1">
                        {resource.topic}
                      </h4>

                      <p className="text-sm text-gray-300 mb-3">
                        {resource.reason}
                      </p>

                      <div className="space-y-2">

                        {resource.resources.map((link, j) => (

                          <a
                            key={j}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
                          >

                            <p className="font-medium">
                              {link.title}
                            </p>

                            <p className="text-xs text-gray-300">
                              {link.platform}
                            </p>

                          </a>

                        ))}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </motion.div>

        </div>

      )}

      {/* Delete Modal */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl">

            <p className="mb-4">
              Are you sure you want to delete this analysis?
            </p>

            <div className="flex gap-4">

              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>

              <Button onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
};