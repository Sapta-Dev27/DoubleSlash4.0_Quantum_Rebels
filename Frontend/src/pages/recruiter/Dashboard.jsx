import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { Briefcase, Users, CheckCircle, Clock } from "lucide-react";

import { Card } from "../../components/Card";
import { DashboardLayout } from "../../layouts/DashboardLayout";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const RecruiterDashboard = () => {

  const [stats,setStats] = useState({
    totalJobs:0,
    totalApplications:0,
    openJobs:0,
    closedJobs:0
  });

  const [loading,setLoading] = useState(true);

  const fetchStats = async () => {

    try{

      const res = await axios.get(
        `${API_URL}/api/recruiterDashboard/stats`,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if(res.data.success){
        setStats(res.data.data.stats);
      }

    }
    catch(error){
      console.log("Dashboard fetch error",error);
    }
    finally{
      setLoading(false);
    }

  };

  useEffect(()=>{
    fetchStats();
  },[]);

  const statCards = [

    {
      label:"Total Jobs",
      value:stats.totalJobs,
      icon:<Briefcase className="w-6 h-6"/>,
      color:"blue"
    },

    {
      label:"Total Applications",
      value:stats.totalApplications,
      icon:<Users className="w-6 h-6"/>,
      color:"green"
    },

    {
      label:"Open Jobs",
      value:stats.openJobs,
      icon:<CheckCircle className="w-6 h-6"/>,
      color:"teal"
    },

    {
      label:"Closed Jobs",
      value:stats.closedJobs,
      icon:<Clock className="w-6 h-6"/>,
      color:"orange"
    }

  ];

  return (

    <DashboardLayout role="recruiter">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="mb-8"
        >

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Recruiter Dashboard
          </h1>

          <p className="text-slate-600 dark:text-slate-400">
            Overview of your hiring activity
          </p>

        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {statCards.map((stat,index)=>(

            <motion.div
              key={stat.label}
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:index*0.1}}
            >

              <Card hover>

                <div
                  className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-xl flex items-center justify-center mb-4`}
                >

                  <div className={`text-${stat.color}-600`}>
                    {stat.icon}
                  </div>

                </div>

                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {loading ? "..." : stat.value}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>

              </Card>

            </motion.div>

          ))}

        </div>

      </div>

    </DashboardLayout>

  );

};