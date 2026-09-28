import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '5mb' }));

// Initialize Gemini Client if API key is present
let aiClient: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
    console.log('Gemini AI client initialized successfully.');
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.log('No GEMINI_API_KEY detected. Fallback deterministic AI engine will be active.');
}

// 1. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    aiAvailable: !!aiClient,
    timestamp: new Date().toISOString()
  });
});

// 2. AI Career Assistant Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, profile, roleTitle, readinessScore, topGaps } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const currentRole = roleTitle || profile?.targetRoleId || 'Software Developer';
    const score = readinessScore ?? 65;
    const gapsList = Array.isArray(topGaps) && topGaps.length > 0 ? topGaps.join(', ') : 'core technical proficiencies';

    // Build context prompt
    const studentContext = profile
      ? `Student Profile Context:
- Full Name: ${profile.fullName || 'Student'}
- Academic Background: ${profile.degree || 'B.Tech/B.S.'} in ${profile.branch || 'Computer Science'} (${profile.currentYear || '3rd Year'})
- Target Role: ${currentRole}
- Overall Career Readiness Score: ${score}/100
- Critical Skill Gaps to Close: ${gapsList}
- Completed Projects: ${profile.projects ? profile.projects.map((p: any) => p.title).join(', ') : 'None listed'}
- Certifications: ${profile.certifications ? profile.certifications.map((c: any) => c.name).join(', ') : 'None yet'}
- Experience: ${profile.internships && profile.internships.length > 0 ? profile.internships.map((i: any) => `${i.role} at ${i.company}`).join(', ') : 'Fresher / Seeking first internship'}`
      : `Target Role: ${currentRole}`;

    const systemInstruction = `You are the expert AI Career Mentor for the "AI Student Skill-Gap Analyzer" platform.
Your purpose is to provide clear, actionable, structured, and realistic career guidance for college students and freshers.

STUDENT SITUATION:
${studentContext}

RESPONSE FORMATTING RULES (STRICT):
1. **Be exceptionally clear, structured, and direct**:
   - Begin with a direct 1-2 sentence answer/verdict.
   - Use bold markdown headings (###) for distinct sections (e.g. ### Action Plan, ### Key Concepts, ### Code / Architecture Example, ### Interview Tips).
   - Use concise bullet points with bold lead-ins for readability.
   - Include realistic, brief code examples or terminal commands in fenced code blocks (\`\`\`language ... \`\`\`) where applicable.
2. **Actionable & Realistic**:
   - Don't give vague advice like "practice coding". Give exact problem archetypes, tools, and 30-minute tasks.
   - Frame advice around how recruiters and engineering hiring managers evaluate candidates.
3. **End with a definitive "🎯 Next Immediate Action"**:
   - Give 1 single task the student can accomplish in the next 60 minutes.`;

    if (aiClient) {
      try {
        // Construct multi-turn contents
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        // Add previous conversation turns if provided (up to last 6 turns)
        if (Array.isArray(history) && history.length > 0) {
          const recentHistory = history.slice(-6);
          recentHistory.forEach((h: any) => {
            if (h.text && (h.sender === 'user' || h.sender === 'assistant')) {
              contents.push({
                role: h.sender === 'user' ? 'user' : 'model',
                parts: [{ text: h.text }]
              });
            }
          });
        }

        // Add current user prompt with system context
        contents.push({
          role: 'user',
          parts: [
            {
              text: `${systemInstruction}\n\nUser Question: ${message}`
            }
          ]
        });

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents
        });

        const replyText = response.text || 'I analyzed your profile and recommend prioritizing your critical skill gaps first.';

        // Generate contextual follow-up suggestions
        let followUps = [
          'What are common interview questions for this?',
          'Suggest a 7-day study breakdown',
          'Show a practical code example'
        ];

        const lowerMsg = message.toLowerCase();
        if (lowerMsg.includes('project')) {
          followUps = [
            'How should I describe this on my resume?',
            'What database schema should I use?',
            'How do I deploy this with Docker?'
          ];
        } else if (lowerMsg.includes('python') || lowerMsg.includes('code') || lowerMsg.includes('dsa')) {
          followUps = [
            'Give me 3 practice problems to solve',
            'How is this tested in technical interviews?',
            'What is the optimal time & space complexity?'
          ];
        } else if (lowerMsg.includes('ready') || lowerMsg.includes('internship')) {
          followUps = [
            'What portfolio projects impress hiring managers?',
            'How can I optimize my LinkedIn & GitHub?',
            'Create a 14-day sprint to become interview ready'
          ];
        }

        return res.json({
          reply: replyText,
          suggestedFollowUps: followUps,
          aiPowered: true
        });
      } catch (geminiError) {
        console.error('Gemini API call failed, falling back to local engine:', geminiError);
        // Fall through to deterministic fallback
      }
    }

    // Deterministic High-Quality Fallback Engine
    const lower = message.toLowerCase();
    let reply = '';
    let followUps = [
      'What should I learn next?',
      'Suggest a portfolio project',
      'Am I ready for an internship?'
    ];

    const firstGap = Array.isArray(topGaps) && topGaps.length > 0 ? topGaps[0] : 'Data Structures & Algorithms';

    if (lower.includes('next') || lower.includes('what should i learn') || lower.includes('start')) {
      reply = `### 🎯 Primary Recommendation: Prioritize **${firstGap}**

Based on your target role of **${currentRole}** and your current readiness score of **${score}%**, your highest-ROI investment is closing the gap in **${firstGap}**.

### 1. Week 1 Learning Focus
- **Core Mental Model**: Spend 45 minutes daily breaking down fundamental concepts before writing code.
- **Hands-on Verification**: Implement 2 isolated mini-exercises per day from scratch.
- **Documentation**: Write a markdown note explaining each concept in plain English as if explaining to a peer.

### 2. Industry Expectation for ${currentRole}
Hiring managers expect candidates to not only know syntax, but also understand trade-offs, edge conditions, and memory efficiency.

### 🎯 Next Immediate Action
Open your code editor today and implement a standalone script testing **${firstGap}**, then commit it with a clear commit message to your GitHub.`;

      followUps = [
        `How can I test my proficiency in ${firstGap}?`,
        'Create a 30-day study plan',
        'Suggest a project using this skill'
      ];
    } else if (lower.includes('python') || lower.includes('improve python')) {
      reply = `### 🐍 Mastering Production-Grade Python for ${currentRole}

To transition your Python skills from academic scripts to industry-grade engineering:

### 1. Master Modern Idioms & Typing
- **Type Annotations**: Always annotate functions with \`typing\` (\`list[str]\`, \`Optional[dict]\`, \`Callable\`).
- **Generators & Iterators**: Understand memory-saving lazy evaluation with \`yield\` for large datasets.
- **Context Managers**: Write custom \`__enter__\` and \`__exit__\` classes for managing resources and network connections.

### 2. Recommended Code Pattern
\`\`\`python
from typing import AsyncGenerator
import httpx

async def fetch_metrics(endpoints: list[str]) -> AsyncGenerator[dict, None]:
    """Asynchronously streams telemetry payloads with connection pooling."""
    async with httpx.AsyncClient(timeout=5.0) as client:
        for url in endpoints:
            response = await client.get(url)
            if response.status_code == 200:
                yield response.json()
\`\`\`

### 3. Key Libraries for ${currentRole}
- **Web & APIs**: FastAPI, Pydantic v2, Uvicorn
- **Data & Automation**: Pandas, NumPy, httpx, pytest

### 🎯 Next Immediate Action
Refactor one of your previous Python scripts to include strict type hints and unit tests using \`pytest\`.`;

      followUps = [
        'How is Python tested in technical interviews?',
        'Show a FastAPI starter architecture',
        'Suggest a Python portfolio project'
      ];
    } else if (lower.includes('project') || lower.includes('suggest')) {
      reply = `### 🚀 Recommended Capstone Project: **"Production Microservice & Telemetry Hub"**

A high-impact project tailored specifically to bridge your gaps in **${gapsList}**:

### 1. Project Architecture
- **API Ingestion**: A REST/FastAPI service receiving simulated user activity events.
- **Cache & Rate Limiting**: In-memory Redis queue preventing spam and ensuring sub-20ms latency.
- **Persistent Storage**: Normalized PostgreSQL database storing historical records with indexing.
- **Containerization**: Multi-stage Dockerfile deployed on a cloud provider with GitHub Actions CI/CD.

### 2. Resume Bullet Points to Feature
- *"Architected an event ingestion microservice handling 2,500+ requests/minute with 99.9% uptime."*
- *"Implemented Redis caching and connection pooling, reducing database read latency by 45%."*
- *"Built automated CI/CD pipeline executing unit tests on every pull request."*

### 🎯 Next Immediate Action
Create a new GitHub repository, initialize a README with an architecture diagram, and write the initial database schema.`;

      followUps = [
        'How do I write unit tests for this project?',
        'What database schema should I use?',
        'How should I explain this in an interview?'
      ];
    } else if (lower.includes('ready') || lower.includes('internship') || lower.includes('job')) {
      const isReady = score >= 70;
      reply = `### 📊 Internship Readiness Assessment: **${score}/100**

${isReady
  ? `✅ **You have reached candidate readiness for ${currentRole} internship applications!**

### What You Should Do Now:
1. **Targeted Applications**: Apply to 10–15 quality openings per week where your tech stack directly matches requirements.
2. **GitHub Polish**: Ensure your top 2 pinned repositories have clear READMEs, architecture diagrams, and a 1-minute live demo link.
3. **Timed Coding Practice**: Practice 1 LeetCode / HackerRank medium problem every morning under a 30-minute timer.
4. **Behavioral STAR Stories**: Prepare 3 stories detailing challenges faced during team projects.`
  : `⏳ **You are building good momentum, but need 3–4 weeks of focused skill bridge.**

Recruiters for **${currentRole}** consistently filter for strength in: **${gapsList}**.

### 3-Step Strategy to Reach 80%+ Readiness:
1. **Tackle Critical Gaps First**: Follow your **Week 1–2 Roadmap** to eliminate foundational blockers.
2. **Build 1 Anchor Project**: Complete a full-stack project demonstrating your target competencies.
3. **Keyword Optimization**: Run your resume through our **Resume Analysis** tool to align with applicant tracking systems.`}

### 🎯 Next Immediate Action
Check your **Resume Analysis** tab to see which exact technical keywords are missing from your resume right now.`;

      followUps = [
        'Create a 30-day study plan',
        'What interview questions will recruiters ask?',
        'How can I improve my GitHub profile?'
      ];
    } else if (lower.includes('plan') || lower.includes('30-day') || lower.includes('study')) {
      reply = `### 📅 30-Day Intensive Skill-Bridge Plan for **${currentRole}**

A structured 4-week roadmap designed for 2 hours of daily focused work:

### Week 1: Foundational Core (${firstGap})
- **Mon–Wed**: Core theoretical models and syntax fluency. Implement 5 core algorithms/tasks.
- **Thu–Fri**: Debugging edge cases and complexity analysis ($O(n)$ time/space).
- **Weekend**: Build a standalone CLI or verification utility.

### Week 2: Systems, Databases & APIs
- **Mon–Wed**: Database schema design, indexing, and complex queries.
- **Thu–Fri**: RESTful endpoint design, error middleware, and token authentication.
- **Weekend**: Connect your Week 1 logic to a persistent backend.

### Week 3: Portfolio Capstone Project
- **Mon–Wed**: Implement core business logic, validation, and Docker containerization.
- **Thu–Fri**: Automated test suites and continuous integration pipeline.
- **Weekend**: Deploy live to Cloud Run, Vercel, or AWS with a public URL.

### Week 4: Interview & Resume Sprint
- **Mon–Wed**: Timed technical interview mock questions.
- **Thu–Fri**: Resume ATS keyword alignment and GitHub README polish.
- **Weekend**: Begin sending tailored applications.

### 🎯 Next Immediate Action
Block out a recurring 90-minute study window on your calendar for tomorrow morning.`;

      followUps = [
        'What free resources do you recommend for Week 1?',
        'How should I structure my GitHub repository?',
        'What coding problems should I practice?'
      ];
    } else if (lower.includes('readiness score') || lower.includes('improve my readiness') || lower.includes('boost score')) {
      reply = `### 📈 How to Increase Your Career Readiness Score from **${score}% to 85%+**

Your overall readiness score is computed using a multi-factor formula that mirrors technical recruitment rubrics:

### 1. Close Top Critical Gaps (+15 to +25 pts)
- Critical skills like **${firstGap}** carry high weight in ${currentRole} benchmarking.
- Raising a skill from Beginner (40) to Intermediate (65) or Advanced (90) directly lifts your core skill baseline.
- **Action**: Check your **Progress Tracker** and mark milestones as you practice.

### 2. Add Practical Portfolio Projects (+5 pts each, up to +15 pts)
- You currently have **${profile?.projects?.length || 0} project(s)** logged.
- Projects with a clear architecture, live deployment URL, and automated tests give immediate credibility.
- **Action**: Navigate to **Recommended Projects** and choose a project that utilizes **${firstGap}**.

### 3. Industry Certifications (+3 pts each, up to +10 pts)
- Certifications validate standardized competence (e.g. AWS Cloud Practitioner, CompTIA Security+, Google Data Analytics).
- You currently have **${profile?.certifications?.length || 0} certification(s)**.

### 4. Internship / Practical Experience (+5 pts)
- Even open-source contributions or campus tech team roles boost your profile score.

### 🎯 Next Immediate Action
Pick 1 critical skill in your **Learning Roadmap** (Phase 1) and complete its practical verification task today to raise your score!`;

      followUps = [
        'Analyze my biggest skill gaps',
        'Suggest projects for my career',
        'Create a 30-day learning plan'
      ];
    } else if (lower.includes('biggest') || lower.includes('skill gaps') || lower.includes('analyze my biggest')) {
      reply = `### 🔍 In-Depth Breakdown of Your Skill Gaps for **${currentRole}**

Here is your prioritized gap matrix comparing your self-assessment against industry hiring benchmarks:

### 🚨 Critical Gaps (Immediate Hiring Blockers)
- **Top Priority**: **${firstGap}**
- **Impact**: Recruiters screen for this in initial technical evaluations.
- **Recommendation**: Dedicate 60% of your current study hours directly to this competency.

### ⚠️ Moderate Gaps (Secondary Polish)
- Areas where you have foundational familiarity but need deeper hands-on project exposure.
- **Focus**: Integrating these skills into a unified capstone project rather than studying them in isolation.

### ✅ Your Core Strengths
- Build confidence around the skills where you scored 70%+.
- In interview screens, lead with projects that leverage these strengths while demonstrating your active learning roadmap.

### 🎯 Next Immediate Action
Navigate to the **Skill Gap Report** tab to review the exact required vs current proficiency breakdown across all categories.`;

      followUps = [
        'What skills should I learn next?',
        'How can I improve my readiness score?',
        'Create a 30-day learning plan'
      ];
    } else if (lower.includes('resume') || lower.includes('improve my resume') || lower.includes('ats')) {
      reply = `### 📄 Resume Optimization Playbook for **${currentRole}**

Hiring managers spend an average of 6–10 seconds reviewing college student resumes. Here is how to make yours stand out:

### 1. The High-Impact Bullet Point Formula
Convert task descriptions into achievement statements:
- ❌ *Weak*: "Worked on a web project using Python and SQL."
- ✅ *Strong*: *"Architected a RESTful API in Python (FastAPI) and PostgreSQL, handling 1,500+ daily requests with automated unit tests and CI/CD."*

### 2. ATS Technical Keywords to Ensure Are Present
For **${currentRole}**, your resume must explicitly contain:
- Core Languages & Tools: **${gapsList}**
- Concepts: Testing, Git/GitHub, CI/CD, Containerization, Systems Design

### 3. Structural Essentials
- Keep to **1 clean page**.
- Put **Technical Skills** near the top (Languages, Frameworks, Developer Tools, Databases).
- Include clickable hyperlinks to your **GitHub** and **Live Demo** deployments.

### 🎯 Next Immediate Action
Open the **Resume Analysis** tab in the sidebar, paste your current resume text, and run the automated ATS keyword matcher!`;

      followUps = [
        'How can I improve my readiness score?',
        'Suggest projects for my career',
        'Create a 30-day learning plan'
      ];
    } else {
      reply = `### 👋 Welcome to your Career Coaching Session!

I'm your AI mentor for **${currentRole}**. Your current readiness score is **${score}%**, and we've identified key opportunities to advance your profile in **${gapsList}**.

### How I Can Help You Right Now:
- **Technical Deep Dives**: Break down complex concepts (DSA, system design, databases, security).
- **Project Blueprints**: Design standout resume projects with architecture guidance and tech stacks.
- **Interview Readiness**: Run mock interview questions and provide hiring manager insights.
- **Study Schedules**: Customize study routines around your college exam schedules.

What specific area would you like to focus on today?`;

      followUps = [
        'What should I learn next?',
        'How can I improve my Python?',
        'Suggest a portfolio project',
        'Am I ready for an internship?'
      ];
    }

    res.json({
      reply,
      suggestedFollowUps: followUps,
      aiPowered: false
    });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// 3. AI Resume Deep Analysis Endpoint
app.post('/api/resume-extract', async (req: Request, res: Response) => {
  try {
    const { resumeText, targetRoleId } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    if (aiClient) {
      try {
        const prompt = `Analyze this student resume against the target role "${targetRoleId}".
Extract structured data in valid JSON matching this schema:
{
  "atsMatchScore": number (0 to 100),
  "extractedSkills": string[],
  "extractedProjects": string[],
  "extractedCertifications": string[],
  "extractedExperience": string[],
  "missingCriticalSkills": string[],
  "missingBonusSkills": string[],
  "strengthsFound": string[],
  "actionableRecommendations": string[]
}

Resume Text:
"""
${resumeText.slice(0, 4000)}
"""`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ result: parsed, aiPowered: true });
        }
      } catch (geminiErr) {
        console.warn('Gemini resume analysis failed, falling back:', geminiErr);
      }
    }

    // Client fallback will process with local analyzer if API is not available
    res.json({ fallback: true });
  } catch (error) {
    console.error('Error in /api/resume-extract:', error);
    res.status(500).json({ error: 'Resume analysis failed' });
  }
});

// Setup Vite middleware in dev or static server in prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
