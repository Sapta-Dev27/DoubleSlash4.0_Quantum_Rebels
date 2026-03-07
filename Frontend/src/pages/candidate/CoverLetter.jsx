import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Copy, Download, Sparkles, Trash2, Eye, X } from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";

import { coverLetterService } from "../../services/coverLetterService";

export const CoverLetter = () => {

  const [jobRole, setJobRole] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [coverLetter, setCoverLetter] = useState("");
  const [letters, setLetters] = useState([]);

  const [selectedLetter, setSelectedLetter] = useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {

    try {

      const res = await coverLetterService.fetchAllLetters();

      if (res.success) {
        setLetters(res.data);
      }

    } catch (error) {
      console.log("Fetch letters failed");
    }

  };

  const handleGenerate = async () => {

    setIsLoading(true);

    try {

      const res = await coverLetterService.generateCoverLetter(
        jobRole,
        company,
        jobDescription
      );

      if (!res.success) throw new Error("Generation failed");

      setCoverLetter(res.data.coverLetter);

      fetchLetters();

    } catch (error) {
      console.log("Generation error", error);
    }

    setIsLoading(false);

  };

  const handleViewLetter = async (id) => {

    try {

      const res = await coverLetterService.fetchLetterById(id);

      if (res.data) {
        setSelectedLetter(res.data);
      }

    } catch (error) {
      console.log("Fetch letter failed");
    }

  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {

    try {

      const res = await coverLetterService.deleteLetter(deleteId);

      if (res.success) {
        fetchLetters();
      }

    } catch (error) {
      console.log("Delete failed");
    }

    setShowDeleteModal(false);

  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
  };

  const handleDownload = () => {

    const element = document.createElement("a");

    const file = new Blob([coverLetter], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${company}.txt`;

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

  };

  return (
    <DashboardLayout role="candidate">

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >

          <h1 className="text-3xl font-bold mb-2">
            Cover Letter Generator
          </h1>

          <p className="text-slate-500">
            Create personalized AI cover letters
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* LEFT FORM */}

          <Card>

            <h2 className="text-xl font-bold mb-6">
              Job Details
            </h2>

            <div className="space-y-4">

              <Input
                label="Job Role"
                value={jobRole}
                onChange={(e)=>setJobRole(e.target.value)}
              />

              <Input
                label="Company"
                value={company}
                onChange={(e)=>setCompany(e.target.value)}
              />

              <Textarea
                label="Job Description"
                rows={8}
                value={jobDescription}
                onChange={(e)=>setJobDescription(e.target.value)}
              />

              <Button
                onClick={handleGenerate}
                isLoading={isLoading}
                disabled={!jobRole || !company || !jobDescription}
                className="w-full"
              >
                <Sparkles size={18}/>
                Generate Cover Letter
              </Button>

            </div>

          </Card>

          {/* GENERATED LETTER */}

          <Card>

            <div className="flex justify-between mb-6">

              <h2 className="text-xl font-bold">
                Generated Letter
              </h2>

              {coverLetter && (

                <div className="flex gap-2">

                  <button
                    onClick={handleCopy}
                    className="p-2 bg-blue-100 rounded-lg"
                  >
                    <Copy size={16}/>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="p-2 bg-green-100 rounded-lg"
                  >
                    <Download size={16}/>
                  </button>

                </div>

              )}

            </div>

            {coverLetter ? (

              <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                {coverLetter}
              </pre>

            ) : (

              <div className="h-[400px] flex items-center justify-center text-gray-400">
                Generated letter appears here
              </div>

            )}

          </Card>

        </div>

        {/* PAST LETTERS */}

        <div className="mt-10">

          <h2 className="text-xl font-bold mb-4">
            Past Cover Letters
          </h2>

          <div className="space-y-3">

            {letters.map((letter)=>(
              <Card key={letter._id}>

                <div className="flex justify-between items-center">

                  <div>

                    <p className="font-semibold">
                      {letter.jobRole}
                    </p>

                    <p className="text-sm text-gray-500">
                      {letter.companyName}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <Button onClick={()=>handleViewLetter(letter._id)}>
                      <Eye size={16}/>
                    </Button>

                    <Button
                      variant="danger"
                      onClick={()=>confirmDelete(letter._id)}
                    >
                      <Trash2 size={16}/>
                    </Button>

                  </div>

                </div>

              </Card>
            ))}

          </div>

        </div>

      </div>

      {/* VIEW MODAL */}

      {selectedLetter && (

        <div className="fixed inset-0 flex items-center justify-center z-50">

          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={()=>setSelectedLetter(null)}
          />

          <motion.div
            initial={{scale:0.9,opacity:0}}
            animate={{scale:1,opacity:1}}
            className="relative w-[90%] max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-white"
          >

            <div className="flex justify-between mb-6">

              <h2 className="text-xl font-bold">
                Cover Letter
              </h2>

              <button onClick={()=>setSelectedLetter(null)}>
                <X/>
              </button>

            </div>

            <pre className="whitespace-pre-wrap text-sm">
              {selectedLetter.coverLetter}
            </pre>

          </motion.div>

        </div>

      )}

      {/* DELETE MODAL */}

      {showDeleteModal && (

        <div className="fixed inset-0 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl">

            <p className="mb-4">
              Delete this cover letter?
            </p>

            <div className="flex gap-3">

              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>

              <Button onClick={()=>setShowDeleteModal(false)}>
                Cancel
              </Button>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );

};