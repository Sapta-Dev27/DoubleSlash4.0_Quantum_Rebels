import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  FileText,
  Briefcase,
  Bot,
  Sparkles,
  CheckCircle
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen relative overflow-hidden">

      {/* background grid */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:30px_30px]" />

      {/* navbar */}

      <nav className="relative z-10 border-b border-slate-800 backdrop-blur">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-xl font-semibold tracking-tight">
            AI Career Copilot
          </h1>

          <div className="flex items-center gap-4">

            <Link
              to="/login"
              className="text-slate-300 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-sm font-medium transition"
            >
              Get Started
            </Link>

          </div>

        </div>

      </nav>

      {/* hero */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-28 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl font-semibold leading-tight tracking-tight"
        >
          Your AI Powered
          <br />
          <span className="text-indigo-400">Career Copilot</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-slate-400 text-lg max-w-xl mx-auto"
        >
          Analyze resumes, generate interviews, create cover letters,
          and discover job opportunities using intelligent AI tools
          built for modern developers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4 mt-10"
        >

          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-500 px-7 py-3 rounded-lg font-medium transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-slate-700 px-7 py-3 rounded-lg hover:bg-slate-900 transition"
          >
            Login
          </Link>

        </motion.div>

      </section>

      {/* features */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-3xl font-semibold text-center mb-16">
          Powerful AI Career Tools
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <FeatureCard
            icon={<Bot />}
            title="AI Mock Interviews"
            description="Generate realistic technical, HR, and project interviews tailored to your tech stack."
          />

          <FeatureCard
            icon={<FileText />}
            title="Resume Analyzer"
            description="Improve your resume with ATS scoring, insights, and AI recommendations."
          />

          <FeatureCard
            icon={<Sparkles />}
            title="Cover Letter Generator"
            description="Create compelling personalized cover letters instantly."
          />

          <FeatureCard
            icon={<Brain />}
            title="Interview Preparation"
            description="Practice curated interview questions for your role and experience."
          />

          <FeatureCard
            icon={<Briefcase />}
            title="Smart Job Matching"
            description="AI matches your resume with relevant job opportunities."
          />

          <FeatureCard
            icon={<CheckCircle />}
            title="Resume vs Job Match"
            description="Analyze compatibility between resume and job description."
          />

        </div>

      </section>

      {/* how it works */}

      <section className="border-t border-slate-800 py-24">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12 text-center">

            <Step
              number="01"
              title="Upload Resume"
              description="Upload your resume and extract key insights instantly."
            />

            <Step
              number="02"
              title="Generate Insights"
              description="Receive AI-powered resume analysis and interview questions."
            />

            <Step
              number="03"
              title="Get Hired"
              description="Apply confidently with optimized resumes and cover letters."
            />

          </div>

        </div>

      </section>

      {/* testimonials */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-3xl font-semibold text-center mb-16">
          Loved by Developers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <Testimonial
            name="Rahul Sharma"
            role="Software Engineer"
            text="Mock interview generator helped me crack my backend interview."
          />

          <Testimonial
            name="Ananya Das"
            role="Frontend Developer"
            text="The resume analyzer improved my ATS score massively."
          />

          <Testimonial
            name="Arjun Mehta"
            role="Backend Developer"
            text="Job matching feature saved hours of job searching."
          />

        </div>

      </section>

      {/* CTA */}

      <section className="border-t border-slate-800 py-24">

        <div className="max-w-4xl mx-auto text-center px-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12">

            <h2 className="text-3xl font-semibold mb-4">
              Start Accelerating Your Career
            </h2>

            <p className="text-slate-400 mb-8">
              Join thousands of developers preparing smarter with AI.
            </p>

            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-lg font-medium"
            >
              Create Free Account
            </Link>

          </div>

        </div>

      </section>

      {/* footer */}

      <footer className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between text-sm text-slate-400">

          <p>© 2026 AI Career Copilot</p>

          <div className="flex gap-6">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>

        </div>

      </footer>

    </div>
  );
}
function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500 transition"
    >
      <div className="text-indigo-400 mb-4">{icon}</div>

      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      <p className="text-slate-400 text-sm">{description}</p>
    </motion.div>
  );
}

function Step({ number, title, description }) {
  return (
    <div>
      <div className="text-indigo-400 font-semibold mb-3">{number}</div>

      <h3 className="text-xl font-medium mb-2">{title}</h3>

      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}

function Testimonial({ name, role, text }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <p className="text-slate-300 text-sm mb-4">{text}</p>

      <div className="text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-slate-400">{role}</p>
      </div>
    </div>
  );
}
