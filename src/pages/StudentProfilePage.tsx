import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Briefcase,
  Code,
  FolderGit2,
  Award,
  Link as LinkIcon,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Check,
  Edit3,
  Code2,
  ShieldCheck,
  BarChart3,
  Cpu,
  Cloud,
  Globe,
  Terminal,
  RotateCcw
} from 'lucide-react';
import { ALL_SKILLS, CAREER_ROLES, SAMPLE_STUDENTS } from '../data/rolesData';
import { ProficiencyLevel, Project, StudentProfile, StudentSkill } from '../types';

interface StudentProfilePageProps {
  profile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
  onAnalyze: () => void;
  onLoadSample: (sampleId: string) => void;
  onResetBlank?: () => void;
  isOnboarding?: boolean;
}

export const StudentProfilePage: React.FC<StudentProfilePageProps> = ({
  profile,
  onSaveProfile,
  onAnalyze,
  onLoadSample,
  onResetBlank
}) => {
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // New Skill input state
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');
  const [customSkillName, setCustomSkillName] = useState<string>('');
  const [newSkillLevel, setNewSkillLevel] = useState<ProficiencyLevel>('Intermediate');

  // New Project input state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjDiff, setNewProjDiff] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  // New Certification input state
  const [showAddCert, setShowAddCert] = useState(false);
  const [newCertName, setNewCertName] = useState('');
  const [newCertOrg, setNewCertOrg] = useState('');
  const [newCertYear, setNewCertYear] = useState<number>(new Date().getFullYear());

  // New Internship input state
  const [showAddIntern, setShowAddIntern] = useState(false);
  const [newInternRole, setNewInternRole] = useState('');
  const [newInternCompany, setNewInternCompany] = useState('');
  const [newInternDur, setNewInternDur] = useState('');
  const [newInternDesc, setNewInternDesc] = useState('');

  // Sync formData whenever external profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleFieldChange = (field: keyof StudentProfile, val: any) => {
    const updated = { ...formData, [field]: val };
    setFormData(updated);
    onSaveProfile(updated);
  };

  const goToStep = (step: 1 | 2 | 3) => {
    setDirection(step > activeStep ? 'forward' : 'backward');
    setActiveStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skill Handlers
  const handleAddSkill = (skillIdToAdd?: string) => {
    const targetId = skillIdToAdd || selectedSkillId;
    let skillId = targetId;
    let skillName = '';
    let category = 'Programming';

    if (targetId && targetId !== 'custom') {
      const meta = ALL_SKILLS.find((s) => s.id === targetId);
      if (meta) {
        skillName = meta.name;
        category = meta.category;
      }
    } else if (customSkillName.trim()) {
      skillName = customSkillName.trim();
      skillId = skillName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    if (!skillName) return;
    if (formData.skills.some((s) => s.skillId === skillId)) return;

    const scoreMap: Record<ProficiencyLevel, number> = {
      Beginner: 40,
      Intermediate: 65,
      Advanced: 90
    };

    const newSkill: StudentSkill = {
      id: `skill-${Date.now()}-${Math.random()}`,
      skillId,
      skillName,
      category,
      selfProficiencyLevel: newSkillLevel,
      proficiencyScore: scoreMap[newSkillLevel]
    };

    const updated = {
      ...formData,
      skills: [...formData.skills, newSkill]
    };
    setFormData(updated);
    onSaveProfile(updated);

    setSelectedSkillId('');
    setCustomSkillName('');
  };

  const handleRemoveSkill = (skillId: string) => {
    const updated = {
      ...formData,
      skills: formData.skills.filter((s) => s.skillId !== skillId)
    };
    setFormData(updated);
    onSaveProfile(updated);
  };

  const handleToggleProficiency = (skillId: string, level: ProficiencyLevel) => {
    const scoreMap: Record<ProficiencyLevel, number> = {
      Beginner: 40,
      Intermediate: 65,
      Advanced: 90
    };

    const updated = {
      ...formData,
      skills: formData.skills.map((s) =>
        s.skillId === skillId
          ? { ...s, selfProficiencyLevel: level, proficiencyScore: scoreMap[level] }
          : s
      )
    };
    setFormData(updated);
    onSaveProfile(updated);
  };

  // Project Handlers
  const handleAddProject = () => {
    if (!newProjTitle.trim()) return;

    const proj: Project = {
      id: `proj-${Date.now()}`,
      title: newProjTitle.trim(),
      description: newProjDesc.trim() || 'Software application engineering and problem solving.',
      techStack: newProjTech
        ? newProjTech.split(',').map((t) => t.trim()).filter(Boolean)
        : ['React', 'TypeScript'],
      difficulty: newProjDiff
    };

    const updated = {
      ...formData,
      projects: [...formData.projects, proj]
    };
    setFormData(updated);
    onSaveProfile(updated);

    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjTech('');
    setShowAddProject(false);
  };

  const handleRemoveProject = (id: string) => {
    const updated = {
      ...formData,
      projects: formData.projects.filter((p) => p.id !== id)
    };
    setFormData(updated);
    onSaveProfile(updated);
  };

  // Certification Handlers
  const handleAddCert = () => {
    if (!newCertName.trim()) return;

    const cert = {
      id: `cert-${Date.now()}`,
      name: newCertName.trim(),
      issuingOrganization: newCertOrg.trim() || 'Coursera / Industry Certificate',
      issueYear: Number(newCertYear) || 2025
    };

    const updated = {
      ...formData,
      certifications: [...formData.certifications, cert]
    };
    setFormData(updated);
    onSaveProfile(updated);

    setNewCertName('');
    setNewCertOrg('');
    setShowAddCert(false);
  };

  const handleRemoveCert = (id: string) => {
    const updated = {
      ...formData,
      certifications: formData.certifications.filter((c) => c.id !== id)
    };
    setFormData(updated);
    onSaveProfile(updated);
  };

  // Internship Handlers
  const handleAddInternship = () => {
    if (!newInternRole.trim()) return;

    const intern = {
      id: `intern-${Date.now()}`,
      role: newInternRole.trim(),
      company: newInternCompany.trim() || 'Tech Labs',
      duration: newInternDur.trim() || 'Summer 2025',
      description: newInternDesc.trim() || 'Full-stack software engineering and team collaboration.'
    };

    const updated = {
      ...formData,
      internships: [...formData.internships, intern]
    };
    setFormData(updated);
    onSaveProfile(updated);

    setNewInternRole('');
    setNewInternCompany('');
    setNewInternDur('');
    setNewInternDesc('');
    setShowAddIntern(false);
  };

  const handleRemoveInternship = (id: string) => {
    const updated = {
      ...formData,
      internships: formData.internships.filter((i) => i.id !== id)
    };
    setFormData(updated);
    onSaveProfile(updated);
  };

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
        return <Code2 className="w-5 h-5 text-blue-500" />;
    }
  };

  const activeRole =
    CAREER_ROLES.find((r) => r.id === formData.targetRoleId) || CAREER_ROLES[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Quick Preset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="font-semibold">Quick Demo Presets:</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Load instant student data to preview
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {SAMPLE_STUDENTS.map((s) => (
            <button
              key={s.id}
              onClick={() => onLoadSample(s.id)}
              className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
            >
              {s.name.split(' ')[0]} (
              {s.roleId === 'software-developer'
                ? 'Software'
                : s.roleId === 'data-analyst'
                ? 'Data'
                : 'Cyber'}
              )
            </button>
          ))}

          {onResetBlank && (
            <button
              onClick={onResetBlank}
              className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition-all cursor-pointer"
              title="Reset form to blank student profile"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Blank</span>
            </button>
          )}
        </div>
      </div>

      {/* Modern 3-Step Progress Indicator */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          {[
            { step: 1, title: 'Student Profile', desc: 'Academics & Target Role' },
            { step: 2, title: 'Skills & Experience', desc: 'Tech Stack & Projects' },
            { step: 3, title: 'Review & Analyze', desc: 'Summary & Readiness' }
          ].map((item) => {
            const isActive = activeStep === item.step;
            const isCompleted = activeStep > item.step;

            return (
              <button
                key={item.step}
                onClick={() => goToStep(item.step as 1 | 2 | 3)}
                className="flex-1 text-left group px-2 sm:px-3 py-2 rounded-2xl transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 mb-1">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 shadow-md'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : item.step}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : isCompleted
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 hidden sm:block pl-9 sm:pl-10 truncate">
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Animated Bar Indicator */}
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-400 ease-out"
            style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ================= STEP 1: STUDENT PROFILE ================= */}
        {activeStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: direction === 'forward' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'forward' ? -20 : 20 }}
            transition={{ duration: 0.25 }}
            className="space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-500" />
                <span>Step 1: Student Profile & Academics</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Tell us about your educational background and the career role you want to prepare for.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name <span className="text-blue-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 focus:border-blue-500 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  placeholder="e.g. alex.rivera@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 focus:border-blue-500 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Degree */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Degree Program <span className="text-blue-500">*</span>
                </label>
                <select
                  value={formData.degree}
                  onChange={(e) => handleFieldChange('degree', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 focus:border-blue-500 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                >
                  <option value="B.Tech in Computer Science">B.Tech / B.E. in Computer Science</option>
                  <option value="B.S. in Information Technology">B.S. / B.Tech in IT</option>
                  <option value="B.S. in Artificial Intelligence">B.S. in AI & Data Science</option>
                  <option value="B.S. in Cybersecurity">B.S. in Cybersecurity</option>
                  <option value="BCA / MCA">BCA / MCA</option>
                  <option value="M.S. in Computer Science">M.S. / M.Tech in CS</option>
                  <option value="Bootcamp / Self-Taught">Bootcamp / Self-Taught Engineering</option>
                </select>
              </div>

              {/* Major / Specialization */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Major / Department Specialization
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => handleFieldChange('branch', e.target.value)}
                  placeholder="e.g. Computer Science & Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 focus:border-blue-500 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Current Year / Semester */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Current Academic Year / Semester
                </label>
                <select
                  value={formData.currentYear}
                  onChange={(e) => handleFieldChange('currentYear', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 focus:border-blue-500 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                >
                  <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                  <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                  <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                  <option value="4th Year (Senior / Final Year)">4th Year (Senior / Final Year)</option>
                  <option value="Recent Graduate (Fresher)">Recent Graduate (Fresher)</option>
                </select>
              </div>
            </div>

            {/* Target Career Role Selection */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Select Your Target Career Role <span className="text-blue-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CAREER_ROLES.map((role) => {
                  const isSelected = formData.targetRoleId === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => handleFieldChange('targetRoleId', role.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-2xs">
                          {getRoleIcon(role.icon)}
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white flex items-center gap-1">
                            <Check className="w-3 h-3" /> Selected
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {role.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {role.category}
                      </div>
                      <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-2">
                        {role.averageSalary}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => goToStep(2)}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Continue to Skills & Experience</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= STEP 2: SKILLS & EXPERIENCE ================= */}
        {activeStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: direction === 'forward' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'forward' ? -20 : 20 }}
            transition={{ duration: 0.25 }}
            className="space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Code className="w-6 h-6 text-emerald-500" />
                <span>Step 2: Technical Skills, Projects & Experience</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Add your technical skills with self-rated proficiency, plus coursework projects, certifications and internships.
              </p>
            </div>

            {/* Add Skill Quick Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Add Skills to Your Assessment:
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Current assessed: <strong className="text-emerald-600 dark:text-emerald-400">{formData.skills.length} skills</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Pick from skill catalog
                  </label>
                  <select
                    value={selectedSkillId}
                    onChange={(e) => setSelectedSkillId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="">-- Choose Skill --</option>
                    {ALL_SKILLS.map((sk) => (
                      <option key={sk.id} value={sk.id}>
                        {sk.name} ({sk.category})
                      </option>
                    ))}
                    <option value="custom">+ Add Custom Skill...</option>
                  </select>
                </div>

                {selectedSkillId === 'custom' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Custom Skill Name
                    </label>
                    <input
                      type="text"
                      value={customSkillName}
                      onChange={(e) => setCustomSkillName(e.target.value)}
                      placeholder="e.g. Next.js, FastAPI"
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Proficiency Level
                  </label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as ProficiencyLevel)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Beginner">Beginner (Basic Concept ~40%)</option>
                    <option value="Intermediate">Intermediate (Hands-on ~65%)</option>
                    <option value="Advanced">Advanced (Production Fluent ~90%)</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => handleAddSkill()}
                    className="w-full py-2 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Skill</span>
                  </button>
                </div>
              </div>

              {/* Quick Catalog Suggestions */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mr-2">
                  Key Skills for {activeRole.title}:
                </span>
                <div className="inline-flex flex-wrap gap-1.5 mt-1 sm:mt-0">
                  {activeRole.topSkills.map((skName) => {
                    const meta = ALL_SKILLS.find(
                      (s) =>
                        s.name.toLowerCase() === skName.toLowerCase() ||
                        skName.toLowerCase().includes(s.name.toLowerCase())
                    );
                    const alreadyAdded =
                      meta && formData.skills.some((s) => s.skillId === meta.id);
                    if (alreadyAdded || !meta) return null;

                    return (
                      <button
                        key={skName}
                        type="button"
                        onClick={() => handleAddSkill(meta.id)}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Plus className="w-2.5 h-2.5" />
                        <span>{skName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Current Skills Grid */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Assessed Skills ({formData.skills.length}) — Click any badge to adjust proficiency:
              </div>

              {formData.skills.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  No skills added yet. Select from the catalog above or pick a demo preset!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {formData.skills.map((skill) => (
                    <div
                      key={skill.skillId}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 group hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {skill.skillName}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {skill.category}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {(['Beginner', 'Intermediate', 'Advanced'] as ProficiencyLevel[]).map(
                          (lvl) => {
                            const isCurrent = skill.selfProficiencyLevel === lvl;
                            return (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => handleToggleProficiency(skill.skillId, lvl)}
                                className={`text-[10px] px-2 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                                  isCurrent
                                    ? lvl === 'Advanced'
                                      ? 'bg-purple-600 text-white font-bold shadow-xs'
                                      : lvl === 'Intermediate'
                                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                                      : 'bg-emerald-600 text-white font-bold shadow-xs'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                              >
                                {lvl === 'Beginner' ? 'Beg' : lvl === 'Intermediate' ? 'Mid' : 'Adv'}
                              </button>
                            );
                          }
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill.skillId)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors ml-1 cursor-pointer"
                          title="Remove skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Projects Section */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-blue-500" />
                    <span>Projects ({formData.projects.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showcase your projects to earn up to +15 bonus points in career readiness.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddProject ? 'Cancel' : 'Add Project'}</span>
                </button>
              </div>

              {showAddProject && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3 animate-fade-slide">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={newProjTitle}
                        onChange={(e) => setNewProjTitle(e.target.value)}
                        placeholder="e.g. Distributed Telemetry Microservice"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Tech Stack (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={newProjTech}
                        onChange={(e) => setNewProjTech(e.target.value)}
                        placeholder="e.g. React, Node.js, PostgreSQL, Docker"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Brief Description
                    </label>
                    <textarea
                      rows={2}
                      value={newProjDesc}
                      onChange={(e) => setNewProjDesc(e.target.value)}
                      placeholder="Short architectural description, problem solved, and outcome..."
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-xs"
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {formData.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {proj.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {proj.techStack.join(', ')}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(proj.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Internships Combined Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              {/* Certifications */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Certifications ({formData.certifications.length})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddCert(!showAddCert)}
                    className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                  >
                    {showAddCert ? 'Close' : '+ Add'}
                  </button>
                </div>

                {showAddCert && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                    <input
                      type="text"
                      value={newCertName}
                      onChange={(e) => setNewCertName(e.target.value)}
                      placeholder="Certificate Title"
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={newCertOrg}
                      onChange={(e) => setNewCertOrg(e.target.value)}
                      placeholder="Issuing Org (e.g. AWS, Coursera, Meta)"
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddCert}
                      className="w-full py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white cursor-pointer shadow-xs"
                    >
                      Add Cert
                    </button>
                  </div>
                )}

                <div className="space-y-1.5">
                  {formData.certifications.map((c) => (
                    <div
                      key={c.id}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {c.name}
                      </span>
                      <button
                        onClick={() => handleRemoveCert(c.id)}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience / Internships */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-purple-500" />
                    <span>Internships ({formData.internships.length})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddIntern(!showAddIntern)}
                    className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                  >
                    {showAddIntern ? 'Close' : '+ Add'}
                  </button>
                </div>

                {showAddIntern && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                    <input
                      type="text"
                      value={newInternRole}
                      onChange={(e) => setNewInternRole(e.target.value)}
                      placeholder="Role (e.g. Software Engineering Intern)"
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={newInternCompany}
                      onChange={(e) => setNewInternCompany(e.target.value)}
                      placeholder="Company (e.g. TechCorp)"
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddInternship}
                      className="w-full py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white cursor-pointer shadow-xs"
                    >
                      Add Internship
                    </button>
                  </div>
                )}

                <div className="space-y-1.5">
                  {formData.internships.map((i) => (
                    <div
                      key={i.id}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {i.role} at {i.company}
                      </span>
                      <button
                        onClick={() => handleRemoveInternship(i.id)}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Links (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  GitHub Profile URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.githubUrl || ''}
                  onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Portfolio / LinkedIn URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl || ''}
                  onChange={(e) => handleFieldChange('portfolioUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => goToStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Step 1</span>
              </button>

              <button
                onClick={() => goToStep(3)}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Review Summary & Analyze</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= STEP 3: REVIEW & ANALYZE ================= */}
        {activeStep === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: direction === 'forward' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'forward' ? -20 : 20 }}
            transition={{ duration: 0.25 }}
            className="space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <span>Step 3: Review Profile & Run AI Skill-Gap Analysis</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Verify your profile summary before computing your readiness score, gap radar, and 4-phase learning roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Student & Academic Summary Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    1. Student Info
                  </span>
                  <button
                    onClick={() => goToStep(1)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">
                    {formData.fullName || 'Student'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {formData.email || 'No email provided'}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-1 text-xs">
                  <div className="text-slate-800 dark:text-slate-300 font-medium">{formData.degree}</div>
                  <div className="text-slate-500 dark:text-slate-400">{formData.branch}</div>
                  <div className="text-slate-400 text-[11px]">{formData.currentYear}</div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    Target Career
                  </div>
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                    {activeRole.title}
                  </div>
                </div>
              </div>

              {/* Skills Assessed Summary Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    2. Assessed Skills ({formData.skills.length})
                  </span>
                  <button
                    onClick={() => goToStep(2)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {formData.skills.map((s) => (
                    <span
                      key={s.skillId}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>{s.skillName}</span>
                      <span
                        className={`text-[9px] font-bold px-1 rounded ${
                          s.selfProficiencyLevel === 'Advanced'
                            ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400'
                            : s.selfProficiencyLevel === 'Intermediate'
                            ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                            : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {s.selfProficiencyLevel.slice(0, 3)}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio & Experience Summary Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    3. Experience
                  </span>
                  <button
                    onClick={() => goToStep(2)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500">Projects:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">
                      {formData.projects.length} added
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Certifications:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">
                      {formData.certifications.length} added
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Internships:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">
                      {formData.internships.length} added
                    </strong>
                  </div>
                  {formData.githubUrl && (
                    <div className="text-[11px] text-blue-600 dark:text-blue-400 truncate flex items-center gap-1 pt-1">
                      <LinkIcon className="w-3 h-3" />
                      <span>{formData.githubUrl}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Prominent High-Impact Analyze Button */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-emerald-900/30 border border-blue-500/30 text-center space-y-4 shadow-xl">
              <div className="max-w-xl mx-auto space-y-1.5">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  Ready to Analyze Your Readiness for {activeRole.title}?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Our engine will calculate your 100-point career readiness score, identify critical gap blockers, and construct your personalized 4-phase learning roadmap.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onAnalyze}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-1 cursor-pointer animate-pulse-glow"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Analyze My Skills & Open Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => goToStep(2)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Modify Skills First
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
