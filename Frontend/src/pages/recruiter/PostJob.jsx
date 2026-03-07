import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Briefcase } from "lucide-react";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";

import { recruiterService } from "../../services/recruiterService";

export const PostJob = () => {

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    experienceLevel: "",
    salary: "",
    description: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);

    try {

      const res = await recruiterService.createJob(formData);

      if (res.success) {

        alert("Job created successfully");

        setFormData({
          title: "",
          company: "",
          location: "",
          experienceLevel: "",
          salary: "",
          description: ""
        });

      }

    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  return (
    <DashboardLayout role="recruiter">

      <div className="max-w-4xl mx-auto">

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Post New Job
          </h1>

        </motion.div>

        <Card>

          <form onSubmit={handleSubmit} className="space-y-6">

            <Input
              label="Job Title"
              value={formData.title}
              onChange={(e)=>setFormData({...formData,title:e.target.value})}
              required
            />

            <Input
              label="Company"
              value={formData.company}
              onChange={(e)=>setFormData({...formData,company:e.target.value})}
              required
            />

            <Input
              label="Location"
              value={formData.location}
              onChange={(e)=>setFormData({...formData,location:e.target.value})}
              required
            />

            <Input
              label="Experience Level"
              value={formData.experienceLevel}
              onChange={(e)=>setFormData({...formData,experienceLevel:e.target.value})}
            />

            <Input
              label="Salary"
              value={formData.salary}
              onChange={(e)=>setFormData({...formData,salary:e.target.value})}
            />

            <Textarea
              label="Description"
              rows={6}
              value={formData.description}
              onChange={(e)=>setFormData({...formData,description:e.target.value})}
              required
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              <PlusCircle className="w-5 h-5"/>
              Create Job
            </Button>

          </form>

        </Card>

      </div>

    </DashboardLayout>
  );

};