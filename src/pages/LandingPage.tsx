import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Target,
  FileSpreadsheet,
  Milestone,
  ShieldCheck,
  Code2,
  BarChart3,
  Cpu,
  Cloud,
  Globe,
  Terminal,
  Zap,
  Check,
  Award,
  Layers,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';
import { CAREER_ROLES, SAMPLE_STUDENTS } from '../data/rolesData';

interface LandingPageProps {
  onStart: () => void;
  onSelectRole: (roleId: string) => void;
  onLoadSample: (sampleId: string) => void;
  onNavigateToProfile: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onSelectRole,
  onLoadSample,
  onNavigateToProfile
}) => {
  // Live interactive preview widget state
  const [demoRole, setDemoRole] = useState<'software-developer' | 'data-analyst' | 'cybersecurity-analyst'>('software-developer');
  const [demoSkills, setDemoSkills] = useState<{ name: string; current: number; required: number }[]>([
    { name: 'Python / Programming', current: 75, required: 85 },
    { name: 'Data Structures & Algorithms', current: 50, required: 85 },
    { name: 'Database & SQL', current: 65, required: 80 },
    { name: 'Git & Collaboration', current: 85, required: 75 }
  ]);

  const toggleSkillBump = (idx: number) => {
    setDemoSkills((prev) =>
      prev.map((s, i) =>
        i === idx
          ? { ...s, current: s.current >= 85 ? 50 : s.current + 15 }
          : s
      )
    );
  };

  const computedReadiness = Math.round(
    demoSkills.reduce((acc, curr) => acc + Math.min(100, (curr.current / curr.required) * 100), 0) /
      demoSkills.length
  );

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-amber-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-cyan-500" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-indigo-500" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-rose-500" />;
      default:
        return <Target className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-20 pb-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Driven Career Readiness for College Students & Freshers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Discover your skill gaps.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">
                Build your roadmap.
              </span>{' '}
              Become career ready.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Stop guessing what tech hiring managers expect. Measure your coursework, technical proficiencies, and projects against real industry benchmarks, and unlock a personalized 4-phase learning blueprint.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStart}
                className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Start Skill Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToProfile}
                className="px-5 py-3.5 rounded-2xl text-sm font-semibold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 transition-all shadow-2xs hover:shadow-sm cursor-pointer"
              >
                Customize Profile
              </button>

              <button
                onClick={() => onLoadSample('sample-alex')}
                className="px-4 py-3.5 rounded-2xl text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Load Sample Student</span>
              </button>
            </div>

            {/* Quantitative Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>7+ Predefined Tech Role Frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100-Point Transparent Scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero Account Barrier</span>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Teaser Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Live Readiness Simulation
                    </div>
                    <div className="text-[10px] text-slate-400">Software Developer Benchmark</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score</div>
                  <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
                    {computedReadiness}%
                  </div>
                </div>
              </div>

              {/* Interactive Skills in Mini Card */}
              <div className="space-y-3">
                <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-between">
                  <span>Interactive Skill Proficiency</span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400">Click to bump score</span>
                </div>

                {demoSkills.map((sk, idx) => {
                  const gap = Math.max(0, sk.required - sk.current);
                  return (
                    <button
                      key={sk.name}
                      onClick={() => toggleSkillBump(idx)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {sk.name}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] tabular-nums">
                          <span className="text-slate-500">Curr: {sk.current}%</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            Req: {sk.required}%
                          </span>
                          {gap > 0 ? (
                            <span className="font-bold text-rose-500">-{gap}%</span>
                          ) : (
                            <span className="font-bold text-emerald-500">Met</span>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar with Requirement Indicator */}
                      <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out"
                          style={{ width: `${sk.current}%` }}
                        />
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-amber-400"
                          style={{ left: `${sk.required}%` }}
                          title={`Required: ${sk.required}%`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Callout */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">
                  Simulates multi-factor weighted algorithm.
                </span>
                <button
                  onClick={onStart}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Run Full Analyzer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Proven 3-Step Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How The Platform Works
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            A transparent, data-driven framework designed specifically for college engineering and computing students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-extrabold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Enter your profile
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Add your degree, branch, current semester, technical languages, projects, certifications, and self-rated proficiencies (Beginner, Intermediate, Advanced).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>Quick 3-step form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-extrabold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Analyze your skill gaps
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Our engine compares your assessment against industry skill standards for your target role, calculating exact gaps, critical blockers, and overall career readiness.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Transparent 0–100 score</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-extrabold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Follow your roadmap
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Receive a week-by-week actionable study plan, recommended hands-on portfolio projects, milestone trackers, and real-time AI career guidance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Track progress to 100%</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Target Roles Explorer */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Career Frameworks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Target Career Role Frameworks
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select any career path to explore core required competencies, industry expectations, and starting packages.
            </p>
          </div>
          <button
            onClick={onStart}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Run Complete Profile Analyzer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAREER_ROLES.map((role) => (
            <div
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getRoleIcon(role.icon)}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {role.demandLevel} Demand
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {role.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Core Benchmark Competencies
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {role.topSkills.slice(0, 4).map((sk) => (
                      <span
                        key={sk}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
                      >
                        {sk}
                      </span>
                    ))}
                    {role.topSkills.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
                        +{role.topSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-400">
                  {role.averageSalary}
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Analyze Role <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preloaded Sample Profiles Banner */}
      <section className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 dark:from-blue-950/40 dark:via-slate-900/60 dark:to-emerald-950/40 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
            <Zap className="w-4 h-4" />
            <span>INSTANT DEMO PROFILES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Test real student workflows with one click
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Switch between pre-configured college student records to see how skill gaps, radar charts, and personalized roadmaps recalculate dynamically:
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {SAMPLE_STUDENTS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onLoadSample(sample.id)}
                className="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:border-blue-500 shadow-2xs hover:shadow-sm transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{sample.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
