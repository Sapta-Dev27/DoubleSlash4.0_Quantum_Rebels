import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Sparkles,
  Eye,
  Trash2,
  X,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Textarea } from "../../components/Textarea";
import { FileUpload } from "../../components/FileUpload";

import { jobMatchService } from "../../services/jobMatchService";

export const JobMatch = () => {

  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const [analysis, setAnalysis] = useState(null);
  const [matches, setMatches] = useState([]);

  const [selectedMatch, setSelectedMatch] = useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {

    try {

      const res = await jobMatchService.fetchAllMatches(token);

      if (res.success) {
        setMatches(res.data);
      }

    } catch (error) {

      console.log("Fetch matches failed", error);

    }

  };

  const handleAnalyze = async () => {

    if (!file || !description) return;

    setIsLoading(true);

    try {

      const res = await jobMatchService.analyzeMatch(
        file,
        description,
        token
      );

      if (res.success) {

        setAnalysis(res.data);

        fetchMatches();

      }

    } catch (error) {

      console.log("Job match failed", error);

    }

    setIsLoading(false);

  };

  const handleViewMatch = async (id) => {

    try {

      const res = await jobMatchService.fetchMatchById(id, token);

      if (res.success) {
        setSelectedMatch(res.data);
      }

    } catch (error) {

      console.log("Fetch by id failed", error);

    }

  };

  const confirmDelete = (id) => {

    setDeleteId(id);
    setShowDeleteModal(true);

  };

  const handleDelete = async () => {

    try {

      const res = await jobMatchService.deleteMatch(deleteId, token);

      if (res.success) {

        setMatches(matches.filter((m) => m._id !== deleteId));

      }

    } catch (error) {

      console.log("Delete failed", error);

    }

    setShowDeleteModal(false);

  };

  return (

    <DashboardLayout role="candidate">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >

          <h1 className="text-3xl font-bold text-white mb-2">
            Job Match Analyzer
          </h1>

          <p className="text-slate-400">
            Check how well your resume matches a job description
          </p>

        </motion.div>


        {/* INPUT CARD */}

        <Card>

          <h2 className="text-xl font-bold text-white mb-4">
            Upload Resume + Job Description
          </h2>

          <FileUpload
            onFileSelect={setFile}
            accept=".pdf,.doc,.docx"
            maxSize={5}
          />

          <div className="mt-4">

            <Textarea
              label="Job Description"
              rows={8}
              placeholder="Paste the job description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>

          <Button
            onClick={handleAnalyze}
            isLoading={isLoading}
            disabled={!file || !description}
            className="w-full mt-4"
          >
            <Sparkles size={18} />
            Analyze Job Match
          </Button>

        </Card>


        {/* RESULT CARD */}

        {analysis && (

          <Card className="mt-6">

            <h2 className="text-xl font-bold text-white mb-4">
              Match Score
            </h2>

            <p className="text-5xl font-bold text-green-400 mb-6">
              {analysis.matchScore}%
            </p>


            {/* MATCHING SKILLS */}

            <div className="mb-4">

              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <CheckCircle size={18} />
                Matching Skills
              </h3>

              <div className="flex flex-wrap gap-2">

                {analysis.matchingSkills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>


            {/* MISSING SKILLS */}

            <div className="mb-4">

              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle size={18} />
                Missing Skills
              </h3>

              <div className="flex flex-wrap gap-2">

                {analysis.missingSkills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-400"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>


            {/* SUMMARY */}

            <div>

              <h3 className="text-white font-semibold mb-2">
                Summary
              </h3>

              <p className="text-slate-300 text-sm">
                {analysis.summary}
              </p>

            </div>

          </Card>

        )}


        {/* HISTORY */}

        <div className="mt-8">

          <h2 className="text-xl font-bold text-white mb-4">
            Previous Analyses
          </h2>

          <div className="space-y-3">

            {matches.map((m) => (

              <Card key={m._id}>

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-white font-semibold">
                      Match Score: {m.matchScore}%
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <Button onClick={() => handleViewMatch(m._id)}>
                      <Eye size={16} />
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => confirmDelete(m._id)}
                    >
                      <Trash2 size={16} />
                    </Button>

                  </div>

                </div>

              </Card>

            ))}

          </div>

        </div>


        {/* VIEW MODAL */}

        {selectedMatch && (

          <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              onClick={() => setSelectedMatch(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto
              bg-slate-900 border border-slate-700 rounded-2xl p-8"
            >

              <div className="flex justify-between mb-6">

                <h2 className="text-xl font-bold text-white">
                  Job Match Analysis
                </h2>

                <button
                  onClick={() => setSelectedMatch(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X />
                </button>

              </div>

              <p className="text-green-400 text-4xl font-bold mb-4">
                {selectedMatch.matchScore}%
              </p>

              <p className="text-slate-300 text-sm">
                {selectedMatch.summary}
              </p>

            </motion.div>

          </div>

        )}


        {/* DELETE MODAL */}

        {showDeleteModal && (

          <div className="fixed inset-0 flex items-center justify-center z-50">

            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl">

              <p className="text-white mb-4">
                Delete this job match analysis?
              </p>

              <div className="flex gap-3">

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

      </div>

    </DashboardLayout>

  );

};