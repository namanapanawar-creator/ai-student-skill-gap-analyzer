import React, { useState } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Lightbulb,
  Printer,
  Download,
  Copy,
  Check,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AnalysisReport, StudentProfile } from '../types';

interface SkillGapReportPageProps {
  report: AnalysisReport;
  profile: StudentProfile;
  onNavigate: (page: string) => void;
}

export const SkillGapReportPage: React.FC<SkillGapReportPageProps> = ({
  report,
  profile,
  onNavigate
}) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `skill_gap_report_${profile.targetRoleId}.json`);
    dlAnchorElem.click();
  };

  const handleCopySummary = () => {
    const text = `AI Student Skill-Gap Report
Student: ${profile.fullName} (${profile.degree}, ${profile.branch})
Target Role: ${report.roleTitle}
Career Readiness Score: ${report.readinessScore}%

STRENGTHS (${report.strengths.length}):
${report.strengths.map((s) => `- ${s.skillName} (Current: ${s.currentProficiency}%, Required: ${s.requiredProficiency}%)`).join('\n')}

CRITICAL SKILL GAPS (${report.criticalGaps.length}):
${report.criticalGaps.map((s) => `- ${s.skillName} (Gap: -${s.gap}%, Current: ${s.currentProficiency}%, Required: ${s.requiredProficiency}%)`).join('\n')}

MODERATE GAPS (${report.moderateGaps.length}):
${report.moderateGaps.map((s) => `- ${s.skillName} (Gap: -${s.gap}%)`).join('\n')}

RECOMMENDED COMPLEMENTARY SKILLS:
${report.recommendedSkills.map((r) => `- ${r.name}: ${r.benefit}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 print:p-0">
      {/* Header and Print Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 print:border-none">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Personalized Skill-Gap Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generated analysis for {profile.fullName} · Target Role: <strong>{report.roleTitle}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handleCopySummary}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Summary Score Callout */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Readiness Evaluation Summary
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {report.readinessScore}% Career Readiness
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-lg leading-relaxed">
            {report.readinessScore >= 75
              ? 'Your profile demonstrates strong alignment with target industry standards. Focus on refining your portfolio projects and mock interviews.'
              : report.readinessScore >= 50
              ? 'You have established good fundamentals. Closing the critical gaps below over the next 4–6 weeks will make you competitive for internship and junior candidate pipelines.'
              : 'You are in early preparation. Prioritize foundational concepts in your Week 1–2 roadmap before advancing to production architectures.'}
          </p>
        </div>

        <div className="flex items-center gap-6 sm:border-l sm:border-slate-200 dark:sm:border-slate-800 sm:pl-8">
          <div>
            <div className="text-xs text-slate-400">Strengths</div>
            <div className="text-2xl font-bold text-emerald-500">{report.strengths.length}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Critical Gaps</div>
            <div className="text-2xl font-bold text-rose-500">{report.criticalGaps.length}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Moderate</div>
            <div className="text-2xl font-bold text-amber-500">{report.moderateGaps.length}</div>
          </div>
        </div>
      </div>

      {/* 1. Strengths */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Strengths (Skills Meeting or Exceeding Targets)
          </h2>
        </div>

        {report.strengths.length === 0 ? (
          <div className="p-4 rounded-xl text-xs text-slate-400 bg-slate-50 dark:bg-slate-900/40">
            No assessed skills currently meet the full benchmark requirement. Follow the roadmap to develop strengths.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.strengths.map((s) => (
              <div
                key={s.skillId}
                className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{s.skillName}</span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {s.currentProficiency}% / {s.requiredProficiency}%
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.learningGuidance}
                </p>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                  ✓ Industry standard verified
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Critical Gaps */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Critical Skill Gaps (High Priority Blockers)
          </h2>
        </div>

        {report.criticalGaps.length === 0 ? (
          <div className="p-4 rounded-xl text-xs text-slate-400 bg-slate-50 dark:bg-slate-900/40">
            No critical blockers detected! You are well-positioned for junior openings in this track.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.criticalGaps.map((s) => (
              <div
                key={s.skillId}
                className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/20 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{s.skillName}</span>
                  <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                    -{s.gap}% Gap (Current: {s.currentProficiency}%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.learningGuidance}
                </p>
                <div className="text-[10px] text-rose-500 font-semibold pt-1">
                  ⚠ Recruiter filter criterion
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Moderate Gaps */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Moderate Gaps (Requires Secondary Improvement)
          </h2>
        </div>

        {report.moderateGaps.length === 0 ? (
          <div className="p-4 rounded-xl text-xs text-slate-400 bg-slate-50 dark:bg-slate-900/40">
            No moderate gaps found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.moderateGaps.map((s) => (
              <div
                key={s.skillId}
                className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/20 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{s.skillName}</span>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    -{s.gap}% Gap (Current: {s.currentProficiency}%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.learningGuidance}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Recommended Supplemental Skills */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Recommended Supplemental Skills for Higher Employability
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {report.recommendedSkills.map((r) => (
            <div
              key={r.name}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{r.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {r.category}
                </span>
              </div>
              <p className="text-xs text-slate-500">{r.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Action Footer */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between print:hidden">
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          ← Return to Dashboard
        </button>
        <button
          onClick={() => onNavigate('roadmap')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5"
        >
          <span>Proceed to Personalized Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
