import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Linkedin, Mail, Building2, Search } from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const ReferralAgent = () => {

  const [linkedinUrl,setLinkedinUrl] = useState("");
  const [jobTitle,setJobTitle] = useState("");
  const [location,setLocation] = useState("");
  const [referrals,setReferrals] = useState([]);
  const [loading,setLoading] = useState(false);

  const handleSearch = async ()=>{

    try{

      setLoading(true);

      await axios.post("http://localhost:8000/api/ai/referral-agent",{
        linkedinUrl,
        jobTitle,
        location
      });

      setTimeout(fetchReferrals,3000);

    }catch(err){
      console.log(err);
      setLoading(false);
    }

  };

  const fetchReferrals = async ()=>{

    try{

      const res = await axios.get("http://localhost:8000/api/ai/referrals");

      if(res.data.success){
        setReferrals(res.data.data);
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

        {/* HEADER */}

        <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Referral Finder
          </h1>

          <p className="text-slate-400">
            Discover employees who can refer you for the job
          </p>
        </motion.div>


        {/* SEARCH CARD */}

        <Card className="mb-8 backdrop-blur-xl bg-white/5 border border-white/10">

          <div className="grid md:grid-cols-3 gap-4">

            <Input
              placeholder="LinkedIn Company URL"
              value={linkedinUrl}
              onChange={(e)=>setLinkedinUrl(e.target.value)}
            />

            <Input
              placeholder="Job Title (AI Engineer)"
              value={jobTitle}
              onChange={(e)=>setJobTitle(e.target.value)}
            />

            <Input
              placeholder="Location (Kolkata)"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
            />

          </div>

          <Button
            className="mt-5 w-full flex items-center justify-center gap-2"
            onClick={handleSearch}
          >
            <Search size={18}/>
            {loading ? "Searching..." : "Find Referrals"}
          </Button>

        </Card>


        {/* RESULTS GRID */}

        <div className="grid md:grid-cols-2 gap-6">

          {referrals
            .filter((ref)=>ref["Full Name"] && ref.Headline)
            .map((ref,index)=>(

            <motion.div
              key={ref._id}
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:index*0.05}}
            >

              <Card className="backdrop-blur-xl bg-white/5 border border-white/10 hover:border-blue-500 transition">

                <div className="flex items-start gap-4">

                  {/* Avatar */}

                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {ref["Full Name"]?.charAt(0)}
                  </div>


                  {/* Content */}

                  <div className="flex-1">

                    <h3 className="text-lg font-semibold text-white">
                      {ref["Full Name"]}
                    </h3>

                    <p className="text-blue-400 text-sm mb-2">
                      {ref.Headline}
                    </p>

                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                      <Building2 size={14}/>
                      {ref["Current Company"]}
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                      <Mail size={14}/>
                      {ref.Email}
                    </div>


                    {/* LinkedIn */}

                    <a
                      href={ref["LinkedIn URL"]}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      <Linkedin size={16}/>
                      View LinkedIn Profile
                    </a>

                  </div>

                </div>

              </Card>

            </motion.div>

          ))}

        </div>


        {/* EMPTY STATE */}

        {!loading && referrals.length === 0 && (

          <Card className="text-center mt-10">

            <p className="text-slate-400">
              No referrals found yet. Try searching above.
            </p>

          </Card>

        )}

      </div>

    </DashboardLayout>

  );

};