import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

 const ProjectAnalyzer = () => {

  const [url,setUrl] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState(null);

  const analyzeProject = async () => {

    if(!url) return;

    try{

      setLoading(true);

      const res = await axios.post(
        "https://quantam123456789.app.n8n.cloud/webhook/project-rating",
        {
          url:url
        }
      );

      setResult(res.data[0]);

    }
    catch(error){

      console.log("Project analysis error",error);

    }
    finally{

      setLoading(false);

    }

  };

  return(

    <DashboardLayout role="candidate">

      <div className="max-w-5xl mx-auto">

        {/* Title */}

        <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="mb-8 text-center"
        >

          <h1 className="text-3xl font-bold text-white mb-2">
            AI Project Analyzer
          </h1>

          <p className="text-slate-400">
            Analyze your GitHub project and get AI feedback
          </p>

        </motion.div>


        {/* Input Card */}

        <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
        >

          <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">

            <div className="flex gap-4">

              <Input
                placeholder="Paste GitHub Repository URL"
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
                className="flex-1"
              />

              <Button
                onClick={analyzeProject}
                isLoading={loading}
              >
                Analyze
              </Button>

            </div>

          </Card>

        </motion.div>


        {/* Results */}

        {result && (

          <motion.div
            initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
            className="grid md:grid-cols-3 gap-6 mt-10"
          >

            {/* Project Quality */}

            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl text-center">

              <p className="text-slate-400 mb-2">
                Project Quality
              </p>

              <p className="text-4xl font-bold text-blue-400">
                {result["Project Quality"]}/10
              </p>

            </Card>


            {/* Technical Skills */}

            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl text-center">

              <p className="text-slate-400 mb-2">
                Technical Skills
              </p>

              <p className="text-4xl font-bold text-green-400">
                {result["Technical Skills"]}/10
              </p>

            </Card>


            {/* Achievements */}

            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl text-center">

              <p className="text-slate-400 mb-2">
                Achievements
              </p>

              <p className="text-4xl font-bold text-purple-400">
                {result["Achievements"]}/10
              </p>

            </Card>

          </motion.div>

        )}

      </div>

    </DashboardLayout>

  );

};

export default ProjectAnalyzer