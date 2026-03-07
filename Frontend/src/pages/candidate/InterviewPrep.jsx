import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Eye, Trash2, X } from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";

import { JOB_ROLES, EXPERIENCE_LEVELS, SENIORITY_LEVELS } from "../../utils/constants";
import { interviewPrepService } from "../../services/interviewPrepService";

export const InterviewPrep = () => {

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [seniority, setSeniority] = useState("");

  const [questions, setQuestions] = useState([]);
  const [interviews, setInterviews] = useState([]);

  const [selectedInterview, setSelectedInterview] = useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllInterviews();
  }, []);

  const fetchAllInterviews = async () => {

    try {
      const res = await interviewPrepService.fetchAllPrep();

      if (res.success) {
        setInterviews(res.data);
      }

    } catch (error) {
      console.log("Fetch interviews failed");
    }

  };

  const handleGenerate = async () => {

    setIsLoading(true);

    try {

      const res = await interviewPrepService.generatePrep(
        role,
        experience,
        seniority
      );

      if (!res.success) throw new Error();

      setQuestions(res.data.questions);

      fetchAllInterviews();

    } catch (error) {

      console.log("Generation failed", error);

    }

    setIsLoading(false);

  };

  const handleViewInterview = (interview) => {
    setSelectedInterview(interview);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {

    try {

      const res = await interviewPrepService.deletePrep(deleteId);

      if (res.success) {
        fetchAllInterviews();
      }

    } catch (error) {

      console.log("Delete failed");

    }

    setShowDeleteModal(false);

  };

  return (

    <DashboardLayout role="candidate">

      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity:0,y:20 }}
          animate={{ opacity:1,y:0 }}
          className="mb-8"
        >

          <h1 className="text-3xl font-bold text-white mb-2">
            Interview Preparation
          </h1>

          <p className="text-slate-400">
            AI generated interview questions based on your profile
          </p>

        </motion.div>


        {/* PROFILE CARD */}

        <Card>

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <BookOpen className="text-blue-400" size={20}/>
            </div>

            <h2 className="text-xl font-bold text-white">
              Your Profile
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">

            <Select
              label="Job Role"
              options={[
                { value:"",label:"Select Role"},
                ...JOB_ROLES.map(r=>({value:r,label:r}))
              ]}
              value={role}
              onChange={(e)=>setRole(e.target.value)}
            />

            <Select
              label="Experience"
              options={[
                { value:"",label:"Select Experience"},
                ...EXPERIENCE_LEVELS.map(e=>({value:e,label:e}))
              ]}
              value={experience}
              onChange={(e)=>setExperience(e.target.value)}
            />

            <Select
              label="Seniority"
              options={[
                { value:"",label:"Select Seniority"},
                ...SENIORITY_LEVELS.map(s=>({value:s,label:s}))
              ]}
              value={seniority}
              onChange={(e)=>setSeniority(e.target.value)}
            />

          </div>

          <Button
            onClick={handleGenerate}
            isLoading={isLoading}
            disabled={!role || !experience || !seniority}
            className="w-full"
          >

            <Sparkles size={18}/>
            Generate Interview Questions

          </Button>

        </Card>


        {/* GENERATED QUESTIONS */}

        {questions.length > 0 && (

          <motion.div
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            className="mt-6"
          >

            <Card>

              <h2 className="text-xl font-bold text-white mb-6">
                Interview Questions
              </h2>

              <div className="space-y-4">

                {questions.map((q,index)=>(
                  <motion.div
                    key={index}
                    initial={{opacity:0,x:-20}}
                    animate={{opacity:1,x:0}}
                    transition={{delay:index*0.05}}
                    className="p-5 rounded-xl border border-slate-700 bg-slate-800/60 backdrop-blur-md"
                  >

                    <div className="flex justify-between mb-2">

                      <p className="font-semibold text-white">
                        {index+1}. {q.question}
                      </p>

                      <div className="flex gap-2">

                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium
                          ${
                            q.difficulty==="Easy"
                            ?"bg-green-500/20 text-green-400"
                            :q.difficulty==="Medium"
                            ?"bg-yellow-500/20 text-yellow-400"
                            :"bg-red-500/20 text-red-400"
                          }`}
                        >
                          {q.difficulty}
                        </span>

                        <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                          {q.topic}
                        </span>

                      </div>

                    </div>

                    <p className="text-slate-300 text-sm">
                      {q.answer}
                    </p>

                  </motion.div>
                ))}

              </div>

            </Card>

          </motion.div>

        )}


        {/* HISTORY */}

        <div className="mt-8">

          <h2 className="text-xl font-bold text-white mb-4">
            Past Interview Preps
          </h2>

          <div className="space-y-3">

            {interviews.map((interview)=>(
              <Card key={interview._id}>

                <div className="flex justify-between items-center">

                  <div>

                    <p className="font-semibold text-white">
                      {interview.role}
                    </p>

                    <p className="text-sm text-slate-400">
                      {interview.experience_level} • {interview.seniority}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <Button onClick={()=>handleViewInterview(interview)}>
                      <Eye size={16}/>
                    </Button>

                    <Button
                      variant="danger"
                      onClick={()=>confirmDelete(interview._id)}
                    >
                      <Trash2 size={16}/>
                    </Button>

                  </div>

                </div>

              </Card>
            ))}

          </div>

        </div>


        {/* VIEW MODAL */}

        {selectedInterview && (

          <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              onClick={()=>setSelectedInterview(null)}
            />

            <motion.div
              initial={{scale:0.9,opacity:0}}
              animate={{scale:1,opacity:1}}
              transition={{duration:0.25}}
              className="relative w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto
              rounded-2xl border border-slate-700
              bg-slate-900/90 backdrop-blur-xl shadow-2xl p-8"
            >

              <div className="flex justify-between mb-6">

                <h2 className="text-xl font-bold text-white">
                  Interview Questions
                </h2>

                <button
                  onClick={()=>setSelectedInterview(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={20}/>
                </button>

              </div>

              <div className="space-y-4">

                {selectedInterview.questions.map((q,i)=>(

                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-700 bg-slate-800"
                  >

                    <div className="flex justify-between mb-2">

                      <p className="font-semibold text-white">
                        {i+1}. {q.question}
                      </p>

                      <div className="flex gap-2">

                        <span className="px-2 py-1 text-xs rounded bg-purple-500/20 text-purple-300">
                          {q.topic}
                        </span>

                        <span className="px-2 py-1 text-xs rounded bg-green-500/20 text-green-300">
                          {q.difficulty}
                        </span>

                      </div>

                    </div>

                    <p className="text-slate-300 text-sm">
                      {q.answer}
                    </p>

                  </div>

                ))}

              </div>

            </motion.div>

          </div>

        )}


        {/* DELETE MODAL */}

        {showDeleteModal && (

          <div className="fixed inset-0 flex items-center justify-center z-50">

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">

              <p className="mb-4 text-white">
                Delete this interview prep?
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

      </div>

    </DashboardLayout>

  );

};