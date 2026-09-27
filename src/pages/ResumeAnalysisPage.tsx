import React, { useState } from 'react';
import {
  FileSearch,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  FileText
} from 'lucide-react';
import { AnalysisReport, ResumeAnalysisResult, StudentProfile } from '../types';
import { analyzeResumeText } from '../utils/analyzer';

interface ResumeAnalysisPageProps {
  report: AnalysisReport;
  profile: StudentProfile;
}

export const ResumeAnalysisPage: React.FC<ResumeAnalysisPageProps> = ({
  report,
  profile
}) => {
  const sampleResumeText = `ALEX RIVERA
Email: alex.rivera@university.edu | GitHub: github.com/alexrivera-dev | Portfolio: alexrivera.me
B.Tech in Computer Science and Engineering, 3rd Year (GPA: 3.8/4.0)

TECHNICAL SKILLS:
- Languages: Python, Java, JavaScript, C++, SQL, HTML5, CSS3
- Frameworks & Libraries: React, Node.js, Express, MongoDB, Tailwind CSS
- Developer Tools: Git, GitHub, VS Code, Postman, Linux basics

PROJECTS:
1. Campus Event Booking Portal (React, Node.js, Express, MongoDB)
- Developed a full-stack platform serving 1,200 active student users for booking auditorium seats.
- Designed RESTful API endpoints and integrated MongoDB Atlas database queries.
- Implemented JWT authentication and responsive mobile layout.

2. Pathfinding Visualizer (JavaScript, HTML5 Canvas)
- Built interactive browser visualizer for Dijkstra and A* shortest path algorithms.
- Handled dynamic grid obstacles and animated traversal states.

EXPERIENCE:
- Web Development Intern at InnovateX Labs (June 2025 - August 2025)
- Built reusable UI components in React and optimized REST data fetching.

CERTIFICATIONS:
- Meta Front-End Developer Specialization (Coursera, 2025)
`;

  const [resumeText, setResumeText] = useState<string>(sampleResumeText);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<ResumeAnalysisResult | null>(() =>
    analyzeResumeText(sampleResumeText, profile.targetRoleId)
  );
  const [aiEnhanced, setAiEnhanced] = useState<boolean>(false);

  const handleRunAnalysis = async () => {
    if (!resumeText.trim()) return;
    setAnalyzing(true);

    try {
      // First try backend API
      const res = await fetch('/api/resume-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRoleId: profile.targetRoleId
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.result && !data.fallback) {
          setResult(data.result);
          setAiEnhanced(true);
          setAnalyzing(false);
          return;
        }
      }
    } catch (e) {
      console.warn('API call failed, running deterministic local engine');
    }

    // Local deterministic analyzer fallback
    const localResult = analyzeResumeText(resumeText, profile.targetRoleId);
    setResult(localResult);
    setAiEnhanced(false);
    setAnalyzing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setResumeText(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-2">
            <FileSearch className="w-3.5 h-3.5" />
            <span>Target Role: {report.roleTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Resume Skill & ATS Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Paste or upload your current resume text to extract skills, calculate ATS keyword match, and detect missing competencies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Upload File (.txt/.md)</span>
            <input
              type="file"
              accept=".txt,.md,.text"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Input Text Box Area */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Resume Raw Text</span>
          </label>
          <button
            onClick={() => setResumeText(sampleResumeText)}
            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Reset to Sample Resume
          </button>
        </div>

        <textarea
          rows={8}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste plain text of your resume here..."
          className="w-full p-4 rounded-2xl text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
        />

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            {resumeText.split(/\s+/).filter(Boolean).length} words detected
          </span>
          <button
            onClick={handleRunAnalysis}
            disabled={analyzing}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            {analyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Extracting Skills & Gaps...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Resume vs {report.roleTitle}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Dashboard */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* ATS Score Meter Banner */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs uppercase font-bold text-slate-400">
                Applicant Tracking System (ATS) Keyword Alignment
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {result.atsMatchScore}% Match Score
              </div>
              <p className="text-xs text-slate-500 max-w-lg">
                Estimated probability of passing initial automated resume screening filters for{' '}
                <strong>{report.roleTitle}</strong> based on required hard skill keywords.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  {aiEnhanced ? 'AI Deep Analysis' : 'Deterministic Analyzer'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {result.strengthsFound.length} required skills matched
                </span>
              </div>
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold ${
                  result.atsMatchScore >= 75
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    : result.atsMatchScore >= 55
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                }`}
              >
                {result.atsMatchScore}%
              </div>
            </div>
          </div>

          {/* Extracted Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Extracted Technical Skills */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>Extracted Technical Skills ({result.extractedSkills.length})</span>
                <span className="text-emerald-500 text-[11px]">Detected in text</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.extractedSkills.map((sk) => (
                  <span
                    key={sk}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium"
                  >
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Critical Skills */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>Missing Role Keywords ({result.missingCriticalSkills.length})</span>
                <span className="text-rose-500 text-[11px]">Critical for ATS</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.missingCriticalSkills.length === 0 ? (
                  <span className="text-xs text-slate-400">All primary keywords detected!</span>
                ) : (
                  result.missingCriticalSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-300 font-semibold"
                    >
                      ⚠ {sk}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Actionable Resume Enhancement Recommendations</span>
            </h3>
            <div className="space-y-2 pt-1">
              {result.actionableRecommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="font-bold text-blue-600 dark:text-blue-400">{idx + 1}.</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
