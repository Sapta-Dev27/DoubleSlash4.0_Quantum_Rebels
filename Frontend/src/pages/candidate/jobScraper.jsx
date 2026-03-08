import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const JobScraper = () => {

  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

    if (!role || !location) return;

    try {

      setLoading(true);

      const res = await axios.post(
        "https://quantam123456789.app.n8n.cloud/webhook/4ce871a5-ea72-48ea-b539-0c2bb96c0478",
        {
          role,
          location
        }
      );

      setJobs(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout role="candidate">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-6">
          AI Job Scraper
        </h1>

        <Card className="mb-6">

          <div className="grid md:grid-cols-2 gap-4">

            <Input
              placeholder="Role (AI Engineer)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <Input
              placeholder="Location (Kolkata)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

          </div>

          <Button
            className="mt-4 w-full"
            onClick={handleSearch}
            isLoading={loading}
          >
            Search Jobs
          </Button>

        </Card>

        <div className="grid md:grid-cols-2 gap-6">

          {jobs.map((job, index) => (

            <motion.div
              key={job.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >

              <Card>

                <h3 className="text-xl font-bold text-white mb-2">
                  {job.title}
                </h3>

                <p className="text-slate-400 text-sm mb-1">
                  📅 Posted: {new Date(job.postedDate).toLocaleDateString()}
                </p>

                <p className="text-slate-400 text-sm mb-3">
                  💼 Employment: {job.employmentType || "Not specified"}
                </p>

                <p className="text-slate-300 text-sm mb-4 line-clamp-4">
                  {job.descriptionText}
                </p>

                <a
                  href={job.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 font-medium hover:underline"
                >
                  View on LinkedIn →
                </a>

              </Card>

            </motion.div>

          ))}

        </div>

      </div>

    </DashboardLayout>

  );

};