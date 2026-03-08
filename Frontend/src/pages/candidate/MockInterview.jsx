import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Trash2,
  Eye,
  X
} from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { FileUpload } from "../../components/FileUpload";
import { interviewService } from "../../services/interviewService";

export const MockInterview = () => {

  const [file, setFile] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const [rounds, setRounds] = useState({});
  const [interviews, setInterviews] = useState([]);

  const [selectedInterview, setSelectedInterview] = useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [notification, setNotification] = useState("");

  const sections = [
    { id: "technical", title: "Technical Round" },
    { id: "project", title: "Project Round" },
    { id: "experience", title: "Experience Round" },
    { id: "hr", title: "HR Round" }
  ];

  useEffect(() => {
    fetchAllInterviews();
  }, []);

  const fetchAllInterviews = async () => {
    try {

      const res = await interviewService.fetchInterviews();

      if (res.success) {
        setInterviews(res.data);
      }

    } catch (error) {
      console.log("Failed to fetch interviews");
    }
  };

  const handleGenerate = async () => {

    if (!file) return;

    setIsLoading(true);

    try {

      const response = await interviewService.generateInterview(file);

      if (!response.success) {
        throw new Error(response.message);
      }

      const generatedRounds = response.data.rounds || {};

      // Keep only questions for newly generated interview
      const questionOnlyRounds = Object.keys(generatedRounds).reduce((acc, key) => {
        acc[key] = generatedRounds[key].map(q => ({
          question: q.question
        }));
        return acc;
      }, {});

      setRounds(questionOnlyRounds);
      setIsGenerated(true);

      fetchAllInterviews();

    } catch (error) {
      console.error("Interview generation failed:", error);
    } finally {
      setIsLoading(false);
    }

  };

  const handleReviseInterview = async (id) => {

    try {

      const response = await interviewService.fetchInterviewById(id);

      if (response.success) {
        setSelectedInterview(response.data);
      }

    } catch (error) {
      console.log("Fetch interview failed");
    }

  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {

    try {

      const res = await interviewService.deleteInterview(deleteId);

      if (res.success) {

        setNotification("Interview deleted successfully");

        fetchAllInterviews();

        setTimeout(() => {
          setNotification("");
        }, 3000);

      }

    } catch (error) {
      console.log("Delete failed");
    }

    setShowDeleteModal(false);

  };

  const getQuestionsByCategory = (category, data) => {
    return data?.[category] || [];
  };

  return (

    <DashboardLayout role="candidate">

      <div className="max-w-4xl mx-auto space-y-6">

        {/* Notification */}

        {notification && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg">
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

          {file && !isGenerated && (

            <div className="mt-6">

              <Button
                onClick={handleGenerate}
                isLoading={isLoading}
                className="w-full"
              >
                <Sparkles className="w-5 h-5" />
                Generate Interview Questions
              </Button>

            </div>

          )}

        </Card>

        {/* Generated Interview */}

        {isGenerated && (

          <div className="space-y-4">

            {sections.map((section) => {

              const questions = getQuestionsByCategory(section.id, rounds);
              const isExpanded = expandedSection === section.id;

              return (

                <Card key={section.id}>

                  <button
                    onClick={() =>
                      setExpandedSection(isExpanded ? null : section.id)
                    }
                    className="w-full flex justify-between items-center"
                  >

                    <h3 className="font-bold">
                      {section.title}
                    </h3>

                    {isExpanded ? <ChevronUp /> : <ChevronDown />}

                  </button>

                  <AnimatePresence>

                    {isExpanded && (

                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="mt-4 space-y-3 overflow-hidden"
                      >

                        {questions.map((q, i) => (

                          <div
                            key={q._id || i}
                            className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800"
                          >

                            <p>
                              Q{i + 1}: {q.question}
                            </p>

                          </div>

                        ))}

                      </motion.div>

                    )}

                  </AnimatePresence>

                </Card>

              );

            })}

          </div>

        )}

        {/* Past Interviews */}

        <div>

          <h2 className="text-xl font-bold mb-4">
            Revise Past Interviews
          </h2>

          <div className="space-y-3">

            {interviews.map((interview) => (

              <Card key={interview._id}>

                <div className="flex justify-between items-center">

                  <div>

                    <p className="font-semibold">
                      Interview ID: {interview._id}
                    </p>

                    <p className="text-sm text-gray-500">
                      Status: {interview.status}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <Button
                      onClick={() => handleReviseInterview(interview._id)}
                    >
                      <Eye size={16} />
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => confirmDelete(interview._id)}
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


      {/* Revise Interview Popup */}

      {selectedInterview && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-[90%] max-w-3xl max-h-[80vh] overflow-hidden"
          >

            <div className="flex justify-between items-center px-6 py-4 border-b">

              <h2 className="text-xl font-bold">
                Revise Interview
              </h2>

              <button
                onClick={() => setSelectedInterview(null)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6 overflow-y-auto max-h-[65vh] space-y-6">

              {sections.map((section) => {

                const questions =
                  selectedInterview.rounds?.[section.id] || [];

                return (

                  <div key={section.id}>

                    <h3 className="font-semibold text-lg mb-3 text-blue-600">
                      {section.title}
                    </h3>

                    <div className="space-y-3">

                      {questions.map((q, i) => (

                        <div
                          key={i}
                          className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-800"
                        >

                          <p className="font-medium">
                            Q{i + 1}: {q.question}
                          </p>

                          {/* Tags */}

                          <div className="flex gap-2 mt-2 flex-wrap">

                            {q.difficulty && (
                              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
                                {q.difficulty}
                              </span>
                            )}

                            {q.focus && (
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                                {q.focus}
                              </span>
                            )}

                          </div>

                          {q.answer && (

                            <p className="text-sm text-slate-600 mt-3">
                              <span className="font-semibold">
                                Answer:
                              </span>{" "}
                              {q.answer}
                            </p>

                          )}

                        </div>

                      ))}

                    </div>

                  </div>

                );

              })}

            </div>

          </motion.div>

        </div>

      )}

      {/* Delete Confirmation */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg">

            <h3 className="font-semibold mb-4">
              Are you sure you want to delete this interview?
            </h3>

            <div className="flex gap-4">

              <Button
                variant="danger"
                onClick={handleDelete}
              >
                Yes Delete
              </Button>

              <Button
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>

  );

};