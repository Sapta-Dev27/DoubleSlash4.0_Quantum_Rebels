import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const JobScraper = () => {

  const [role,setRole] = useState("");
  const [location,setLocation] = useState("");
  const [jobs,setJobs] = useState([]);
  const [loading,setLoading] = useState(false);

  const handleSearch = async () => {

    try{

      setLoading(true);

      await axios.post("http://localhost:8000/api/ai/job-scraper",{
        role,
        location
      });

      setTimeout(fetchJobs,3000);

    }catch(err){
      console.log(err);
    }

  };

  const fetchJobs = async () => {

    try{

      const res = await axios.get("http://localhost:8000/api/ai/jobs");

      if(res.data.success){
        setJobs(res.data.data);
      }

      setLoading(false);

    }catch(err){
      console.log(err);
      setLoading(false);
    }

  };

  return(

    <DashboardLayout role="candidate">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-6">
          AI Job Scraper
        </h1>

        <Card className="mb-6">

          <div className="grid grid-cols-2 gap-4">

            <Input
              placeholder="Role (AI Engineer)"
              value={role}
              onChange={(e)=>setRole(e.target.value)}
            />

            <Input
              placeholder="Location (Kolkata)"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
            />

          </div>

          <Button
            className="mt-4 w-full"
            onClick={handleSearch}
          >
            Search Jobs
          </Button>

        </Card>


        <div className="grid md:grid-cols-2 gap-6">

          {jobs.map((job,index)=>(

            <motion.div
              key={job._id}
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:index*0.1}}
            >

              <Card>

                <h3 className="text-xl font-bold text-white">
                  {job.TITLE}
                </h3>

                <p className="text-slate-400 text-sm mb-3">
                  {job.LOCATION}
                </p>

                <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                  {job.DESCRIPTION}
                </p>

                <a
                  href={job.URL}
                  target="_blank"
                  className="text-blue-400"
                >
                  View Job
                </a>

              </Card>

            </motion.div>

          ))}

        </div>

      </div>

    </DashboardLayout>

  );

};