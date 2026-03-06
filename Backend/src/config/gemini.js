import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// MOCK INTERVIEW GENERATION WITH AI //

const generateMockInterview = async (resumeText) => {


  const trimmedResume = resumeText.slice(0, 6000);

  const prompt = `
You are a senior software engineer conducting a realistic technical interview.

Analyze the following candidate resume and generate a mock interview.

RESUME:
${resumeText}

Create 4 interview rounds:

1. Technical Round
2. Project Round
3. Experience Round
4. HR Round

Requirements:

- Each round MUST contain exactly 5 questions
- Questions must be tailored to the candidate's skills, projects, and experience
- Avoid generic questions
- Questions should resemble real software engineering interviews
- Mix conceptual, practical, and scenario-based questions

Each question should include:

- question
- difficulty (easy | medium | hard)
- focus area (e.g., authentication, database design, system design, teamwork)

Return ONLY valid JSON in this format:

{
  "rounds": {
    "technical": [
      {
        "question": "",
        "difficulty": "",
        "focus": ""
      }
    ],
    "project": [],
    "experience": [],
    "hr": []
  }
}

Do not include explanations or markdown.
Return JSON only.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You generate structured JSON responses only."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.4
  });

  const rawOutput = response.choices[0].message.content;

  // Extract JSON safely
  const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid AI response format");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return parsed;
};


// RESUME PARSING WITH AI //


const parseResumeWithAI = async (resumeText) => {

  const trimmedResume = resumeText.slice(0, 6000);

  const prompt = `
You are an AI Resume Parser.

Analyze the following resume and extract structured information.

RESUME:
${trimmedResume}

Return ONLY valid JSON in this format:

{
"name":"",
"email":"",
"phone":"",
"address":"",
"bio":"",
"linkedin":"",
"github":"",
"portfolio":"",
"skills":[],
"projects":[
  {
    "title":"",
    "description":"",
    "technologies":[]
  }
],
"experience":[
  {
    "company":"",
    "role":"",
    "duration":"",
    "description":""
  }
],
"education":[
  {
    "institution":"",
    "degree":"",
    "year":""
  }
],
"achievements":[]
}

Rules:
- Skills must be an array
- Projects must contain title, description and technologies
- If information is missing return null
- Do not include explanation
- Return JSON only
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You extract structured resume data in JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.2
  });

  const rawOutput = response.choices[0].message.content;

  const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid AI response format");
  }

  const parsedData = JSON.parse(jsonMatch[0]);

  return parsedData;
};


// RESUME ANALYZER WITH AI //

// RESUME ANALYZER WITH AI //

const analyzeResumeWithAI = async (resumeText) => {

  const trimmedResume = resumeText.slice(0, 6000);

  const prompt = `
You are an expert ATS Resume Analyzer used by top tech companies.

Analyze the following resume and provide a professional resume evaluation.

RESUME:
${trimmedResume}

Return ONLY valid JSON in the following format:

{
  "ats_score": 0,
  "strengths": [],
  "weaknesses": [],
  "missing_keywords": [],
  "suggestions": []
}

Rules:
- ATS score must be between 0 and 100
- Strengths must highlight what the candidate did well
- Weaknesses must highlight what is missing or poorly written
- Missing keywords should be important industry keywords not present in the resume
- Skill analysis should categorize candidate skills
- Suggestions should provide actionable improvements
- Return JSON only
- Do NOT include explanations
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You analyze resumes and return structured JSON only."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3
  });

  const rawOutput = response.choices[0].message.content;

  const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid AI response format");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return parsed;
};

// INTERVIEW PREPARATION QUESTION GENERATION WITH AI //

const generateInterviewPrep = async (role, experience, seniority) => {

  const prompt = `
You are a senior technical interviewer.

Generate interview preparation questions for the following candidate profile:

Role: ${role}
Experience Level: ${experience}
Seniority: ${seniority}

Requirements:

- Generate EXACTLY 20 questions
- Each question must include a detailed answer
- Questions should simulate real technical interviews
- Mix conceptual, practical, and scenario-based questions
- Difficulty should vary (easy, medium, hard)

Return ONLY valid JSON in this format:

{
  "role": "",
  "experience_level": "",
  "seniority": "",
  "questions": [
    {
      "question": "",
      "answer": "",
      "difficulty": "",
      "topic": ""
    }
  ]
}

Rules:
- No markdown
- No explanation
- Return JSON only
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You generate structured JSON interview preparation content."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.5
  });

  const rawOutput = response.choices[0].message.content;

  const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid AI response format");
  }

  return JSON.parse(jsonMatch[0]);
};

// MOCK COVER LETTER  GENERATION WITH AI //


const generateCoverLetter = async (role, company, description) => {

  const prompt = `
You are a professional career assistant.

Generate a strong, professional cover letter for the following job.

Job Role: ${role}
Company: ${company}

Job Description:
${description}

Requirements:

- Write a professional cover letter
- Tailor it to the job description
- Highlight relevant technical skills
- Keep it concise (150–250 words)
- Sound confident and professional

Return ONLY the cover letter text.
Do not return JSON.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You generate professional cover letters."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.6
  });

  return response.choices[0].message.content;
};


// JOB MATCHING ANALYSIS WITH AI //

const analyzeJobMatch = async (resumeText, jobDescription) => {

  const trimmedResume = resumeText.slice(0, 5000);
  const trimmedJD = jobDescription.slice(0, 3000);

  const prompt = `
You are an ATS Resume Matching System used by recruiters.

Your job is to STRICTLY evaluate how well the resume matches the job description.

RESUME:
${trimmedResume}

JOB DESCRIPTION:
${trimmedJD}

First analyze the job description and identify the **key required skills and requirements**.

Then compare them with the resume and calculate a match score using this rule:

SCORING METHOD:
- Identify important skills in the job description
- Count how many of those appear in the resume

Score calculation guideline:

90–100 → Almost perfect match (most required skills present)
75–89 → Strong match (many skills present, minor gaps)
60–74 → Moderate match (some skills present)
40–59 → Weak match (few relevant skills)
0–39 → Poor match (very little alignment)

Important:
- Do NOT give high scores if important skills are missing
- Do NOT give low scores if most requirements are satisfied
- The score must realistically reflect the match

Return ONLY valid JSON in this format:

{
 "match_score": 0,
 "matching_skills": [],
 "missing_skills": [],
 "strengths": [],
 "improvements": [],
 "summary": ""
}

Rules:
- match_score must be between 0 and 100
- matching_skills → skills present in both resume and job description
- missing_skills → skills required but missing in resume
- strengths → strong alignment points
- improvements → ways the resume could better match the job
- summary → short explanation of the score
- Return JSON only
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You analyze resume-job matches and return JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3
  });

  const rawOutput = response.choices[0].message.content;

  const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Invalid AI response format");
  }

  return JSON.parse(jsonMatch[0]);
};




export { parseResumeWithAI, generateMockInterview, analyzeResumeWithAI, generateInterviewPrep, generateCoverLetter, analyzeJobMatch };
