import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Upload,
  X
} from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

import { jobService } from "../../services/jobService";
import { applicationService } from "../../services/applicationService";

export const Jobs = () => {

  const [jobs,setJobs] = useState([]);
  const [selectedJob,setSelectedJob] = useState(null);
  const [resume,setResume] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    loadJobs();
  },[]);

  const loadJobs = async () => {

    try{

      const res = await jobService.fetchJobs();

      if(res.success){
        setJobs(res.data);
      }

    }catch(err){
      console.log(err);
    }

  };

  const handleViewJob = async (id) => {

    try{

      const res = await jobService.fetchJobById(id);

      if(res.success){
        setSelectedJob(res.data);
      }

    }catch(err){
      console.log(err);
    }

  };

  const handleApply = async () => {

    if(!resume){
      alert("Please upload your resume first");
      return;
    }

    try{

      setLoading(true);

      const res = await applicationService.applyJob(
        selectedJob._id,
        resume
      );

      if(res.success){

        alert(res.message);

        setSelectedJob(null);
        setResume(null);

      }

    }
    catch(err){

      const message =
        err?.response?.data?.message ||
        "Something went wrong";

      alert(message);

    }

    setLoading(false);

  };

  return(

    <DashboardLayout role="candidate">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-6">
          Job Recommendations
        </h1>

        {/* JOB LIST */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {jobs.map(job => (

            <Card
              key={job._id}
              hover
              className="cursor-pointer"
            >

              {/* JOB CARD CLICK AREA */}

              <div
                onClick={()=>handleViewJob(job._id)}
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-xl font-bold text-white">
                      {job.title}
                    </h3>

                    <p className="text-blue-400">
                      {job.company}
                    </p>

                  </div>

                  <Briefcase className="text-blue-500"/>

                </div>

                <div className="mt-4 space-y-2 text-slate-400 text-sm">

                  <div className="flex gap-2">
                    <MapPin size={16}/>
                    {job.location}
                  </div>

                  <div className="flex gap-2">
                    <DollarSign size={16}/>
                    {job.salary}
                  </div>

                </div>

              </div>

              {/* APPLY BUTTON ON CARD */}

              <Button
                className="w-full mt-4"
                size="sm"
                onClick={(e)=>{
                  e.stopPropagation();
                  handleViewJob(job._id);
                }}
              >
                Apply Now
              </Button>

            </Card>

          ))}

        </div>

      </div>


      {/* JOB DETAILS MODAL */}

      {selectedJob && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">

          <motion.div
            initial={{scale:0.9,opacity:0}}
            animate={{scale:1,opacity:1}}
            className="bg-slate-900 p-8 rounded-xl w-[600px] border border-slate-700"
          >

            {/* HEADER */}

            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  {selectedJob.title}
                </h2>

                <p className="text-blue-400">
                  {selectedJob.company}
                </p>

              </div>

              <button
                onClick={()=>setSelectedJob(null)}
                className="text-slate-400 hover:text-white"
              >
                <X/>
              </button>

            </div>


            {/* JOB DETAILS */}

            <div className="space-y-3 mb-6 text-slate-300">

              <div className="flex gap-2">
                <MapPin size={16}/>
                {selectedJob.location}
              </div>

              <div className="flex gap-2">
                <DollarSign size={16}/>
                {selectedJob.salary}
              </div>

            </div>

            <p className="text-slate-300 mb-8">
              {selectedJob.description}
            </p>


            {/* APPLY SECTION */}

            <div className="border-t border-slate-700 pt-6">

              <h3 className="text-white font-semibold mb-4">
                Apply for this job
              </h3>

              {/* RESUME UPLOAD */}

              <label className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 cursor-pointer hover:bg-slate-700 transition">

                <Upload size={18}/>

                <span className="text-sm text-slate-300">
                  {resume ? resume.name : "Upload Resume"}
                </span>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e)=>setResume(e.target.files[0])}
                  className="hidden"
                />

              </label>

              {/* APPLY BUTTON */}

              <Button
                className="w-full mt-4"
                onClick={handleApply}
                disabled={loading}
              >
                {loading ? "Applying..." : "Apply Job"}
              </Button>

            </div>

          </motion.div>

        </div>

      )}

    </DashboardLayout>

  );

};