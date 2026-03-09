import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Building2 } from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card.jsx";

import { applicationService } from "../../services/applicationService.js";

export const AppliedJobs = () => {

  const [applications,setApplications] = useState([]);

  useEffect(()=>{
    loadApplications();
  },[]);

  const loadApplications = async () => {

    try{

      const res = await applicationService.fetchApplications();

      if(res.success){
        setApplications(res.data);
      }

    }catch(err){
      console.log(err);
    }

  };

  const getStatusStyle = (status) => {

    const styles = {

      pending:
        "bg-orange-500/10 text-orange-400 border border-orange-500/30 backdrop-blur-md",

      shortlisted:
        "bg-green-500/10 text-green-400 border border-green-500/30 backdrop-blur-md",

      rejected:
        "bg-red-500/10 text-red-400 border border-red-500/30 backdrop-blur-md"

    };

    return styles[status] || "bg-slate-500/10 text-slate-300 border border-slate-600";
  };

  return(

    <DashboardLayout role="candidate">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-6">
          Applied Jobs
        </h1>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-700 text-slate-400 text-sm">

                  <th className="py-4 text-left">Job</th>
                  <th className="py-4 text-left">Company</th>
                  <th className="py-4 text-left">Location</th>
                  <th className="py-4 text-left">Status</th>

                </tr>

              </thead>

              <tbody>

                {applications.map((app,index)=>(

                  <motion.tr
                    key={app._id}
                    initial={{opacity:0,y:20}}
                    animate={{opacity:1,y:0}}
                    transition={{delay:index*0.1}}
                    className="border-b border-slate-800 hover:bg-white/5 transition"
                  >

                    {/* Job Title */}

                    <td className="py-5 font-semibold text-white">

                      {app.job?.title}

                    </td>

                    {/* Company */}

                    <td className="text-slate-300">

                      <div className="flex items-center gap-2">

                        <Building2 size={16}/>

                        {app.job?.company}

                      </div>

                    </td>

                    {/* Location */}

                    <td className="text-slate-300">

                      <div className="flex items-center gap-2">

                        <MapPin size={16}/>

                        {app.job?.location}

                      </div>

                    </td>

                    {/* Status */}

                    <td>

                      <span
                        className={`px-4 py-1 rounded-full text-xs font-medium ${getStatusStyle(app.status)}`}
                      >

                        {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}

                      </span>

                    </td>

                  </motion.tr>

                ))}

              </tbody>

            </table>

          </div>

        </Card>

        {/* Empty State */}

        {applications.length === 0 && (

          <div className="text-center mt-10 text-slate-400">

            <p>No applications yet.</p>

          </div>

        )}

      </div>

    </DashboardLayout>

  );

};