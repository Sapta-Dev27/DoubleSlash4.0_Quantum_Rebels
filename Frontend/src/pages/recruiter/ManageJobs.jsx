import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Trash2, Edit, Eye, X } from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";

import { recruiterService } from "../../services/recruiterService";

export const ManageJobs = () => {

  const [jobs,setJobs] = useState([]);
  const [selectedJob,setSelectedJob] = useState(null);
  const [editJob,setEditJob] = useState(null);

  useEffect(()=>{
    loadJobs();
  },[]);

  const loadJobs = async () => {

    try {

      const res = await recruiterService.fetchJobs();

      if(res.success){
        setJobs(res.data);
      }

    } catch(err){
      console.log(err);
    }

  };

  const handleDelete = async (id) => {

    if(!confirm("Are you sure you want to delete this job?")) return;

    try{

      const res = await recruiterService.deleteJob(id);

      if(res.success){
        setJobs(prev => prev.filter(j => j._id !== id));
      }

    }catch(err){
      console.log(err);
    }

  };

  const handleView = async (id) => {

    try{

      const res = await recruiterService.fetchJobById(id);

      if(res.success){
        setSelectedJob(res.data);
      }

    }catch(err){
      console.log(err);
    }

  };

  const handleUpdate = async () => {

    try{

      const res = await recruiterService.updateJob(editJob._id,editJob);

      if(res.success){

        setJobs(prev =>
          prev.map(j =>
            j._id === editJob._id ? res.data : j
          )
        );

        setEditJob(null);

      }

    }catch(err){
      console.log(err);
    }

  };

  return(

    <DashboardLayout role="recruiter">

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="mb-8"
        >

          <h1 className="text-3xl font-bold text-white mb-2">
            Manage Jobs
          </h1>

        </motion.div>

        <div className="space-y-4">

          {jobs.map(job => (

            <Card key={job._id}>

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-lg font-bold text-white">
                    {job.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {job.company} • {job.location}
                  </p>

                </div>

                <div className="flex gap-2">

                  <Button
                    size="sm"
                    onClick={()=>handleView(job._id)}
                  >
                    <Eye size={16}/>
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={()=>setEditJob(job)}
                  >
                    <Edit size={16}/>
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={()=>handleDelete(job._id)}
                  >
                    <Trash2 size={16}/>
                    Delete
                  </Button>

                </div>

              </div>

            </Card>

          ))}

        </div>

      </div>

      {/* VIEW DETAILS MODAL */}

      {selectedJob && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">

          <div className="bg-slate-900 p-8 rounded-xl w-[600px] relative">

            <button
              onClick={()=>setSelectedJob(null)}
              className="absolute top-4 right-4 text-white"
            >
              <X/>
            </button>

            <h2 className="text-xl font-bold text-white mb-4">
              {selectedJob.title}
            </h2>

            <p className="text-slate-300 mb-2">
              {selectedJob.company}
            </p>

            <p className="text-slate-400 mb-4">
              {selectedJob.location}
            </p>

            <p className="text-slate-300">
              {selectedJob.description}
            </p>

          </div>

        </div>

      )}

      {/* EDIT MODAL */}

      {editJob && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">

          <div className="bg-slate-900 p-8 rounded-xl w-[600px]">

            <h2 className="text-xl font-bold text-white mb-6">
              Edit Job
            </h2>

            <div className="space-y-4">

              <Input
                label="Title"
                value={editJob.title}
                onChange={(e)=>setEditJob({...editJob,title:e.target.value})}
              />

              <Input
                label="Company"
                value={editJob.company}
                onChange={(e)=>setEditJob({...editJob,company:e.target.value})}
              />

              <Input
                label="Location"
                value={editJob.location}
                onChange={(e)=>setEditJob({...editJob,location:e.target.value})}
              />

              <Textarea
                label="Description"
                rows={4}
                value={editJob.description}
                onChange={(e)=>setEditJob({...editJob,description:e.target.value})}
              />

            </div>

            <div className="flex gap-3 mt-6">

              <Button onClick={handleUpdate}>
                Update
              </Button>

              <Button
                variant="outline"
                onClick={()=>setEditJob(null)}
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