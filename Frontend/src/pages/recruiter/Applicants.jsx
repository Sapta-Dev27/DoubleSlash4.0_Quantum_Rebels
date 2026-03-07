import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, FileText, X } from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

import { jobService } from "../../services/jobService";
import { recruiterService } from "../../services/recruiterService";

export const Applicants = () => {

  const [jobs,setJobs] = useState([]);
  const [applicants,setApplicants] = useState([]);
  const [selectedJob,setSelectedJob] = useState(null);

  useEffect(()=>{
    loadJobs();
  },[]);

  const loadJobs = async () => {

    try{

      const res = await jobService.fetchJobsofRecruiter();

      if(res.success){
        setJobs(res.data);
      }

    }catch(err){
      console.log(err);
    }

  };

  const handleViewApplicants = async (job) => {

    try{

      const res = await recruiterService.getApplicants(job._id);

      if(res.success){

        setApplicants(res.data);
        setSelectedJob(job);

      }

    }catch(err){
      console.log(err);
    }

  };

  return(

    <DashboardLayout role="recruiter">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-6">
          Applicants
        </h1>

        {/* JOB LIST */}

        <div className="space-y-4">

          {jobs.map((job,index)=>(

            <motion.div
              key={job._id}
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:index*0.1}}
            >

              <Card className="flex justify-between items-center">

                <div>

                  <p className="text-lg font-semibold text-white">
                    {job.title}
                  </p>

                  <p className="text-sm text-slate-400">
                    {job.company}
                  </p>

                </div>

                <Button
                  onClick={()=>handleViewApplicants(job)}
                >
                  <Users size={16}/>
                  View Applicants
                </Button>

              </Card>

            </motion.div>

          ))}

        </div>

      </div>


      {/* APPLICANTS MODAL */}

      {selectedJob && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md">

          <div className="bg-slate-900 p-8 rounded-xl w-[650px] max-h-[80vh] overflow-y-auto border border-slate-700">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-bold text-white">
                Applicants for {selectedJob.title}
              </h2>

              <button
                onClick={()=>setSelectedJob(null)}
                className="text-slate-400 hover:text-white"
              >
                <X/>
              </button>

            </div>


            <div className="space-y-4">

              {applicants.map((app,index)=>(

                <motion.div
                  key={app._id}
                  initial={{opacity:0,y:10}}
                  animate={{opacity:1,y:0}}
                  transition={{delay:index*0.05}}
                >

                  <Card className="flex justify-between items-center">

                    <div>

                      <p className="text-white font-semibold">
                        {app.candidate?.userName}
                      </p>

                      <p className="text-sm text-slate-400">
                        {app.candidate?.userEmail}
                      </p>

                      <button
                        onClick={()=>window.open(app.resumeURL,"_blank")}
                        className="text-blue-400 flex items-center gap-2 text-sm mt-2"
                      >
                        <FileText size={14}/>
                        View Resume
                      </button>

                    </div>

                    <span className="text-sm text-slate-300 capitalize">
                      {app.status}
                    </span>

                  </Card>

                </motion.div>

              ))}

              {applicants.length === 0 && (

                <p className="text-center text-slate-400">
                  No applicants yet
                </p>

              )}

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>

  );

};