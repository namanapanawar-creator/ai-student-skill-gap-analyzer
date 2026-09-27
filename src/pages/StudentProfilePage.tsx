import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Code,
  FolderGit2,
  Award,
  Link,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { ALL_SKILLS, CAREER_ROLES, SAMPLE_STUDENTS } from '../data/rolesData';
import { ProficiencyLevel, Project, StudentProfile, StudentSkill } from '../types';
import { isProfileComplete } from '../db/store';

interface StudentProfilePageProps {
  profile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
  onAnalyze: () => void;
  onLoadSample: (sampleId: string) => void;
  isOnboarding?: boolean;
}

export const StudentProfilePage: React.FC<StudentProfilePageProps> = ({
  profile,
  onSaveProfile,
  onAnalyze,
  onLoadSample,
  isOnboarding
}) => {
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Sync formData whenever profile prop changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // New Skill input state
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');
  const [customSkillName, setCustomSkillName] = useState<string>('');
  const [newSkillLevel, setNewSkillLevel] = useState<ProficiencyLevel>('Intermediate');

  // New Project input state
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjDiff, setNewProjDiff] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  // New Certification input state
  const [newCertName, setNewCertName] = useState('');
  const [newCertOrg, setNewCertOrg] = useState('');
  const [newCertYear, setNewCertYear] = useState<number>(new Date().getFullYear());

  // New Internship input state
  const [newInternRole, setNewInternRole] = useState('');
  const [newInternCompany, setNewInternCompany] = useState('');
  const [newInternDur, setNewInternDur] = useState('');
  const [newInternDesc, setNewInternDesc] = useState('');

  const handleTextChange = (field: keyof StudentProfile, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleAddSkill = () => {
    let skillId = selectedSkillId;
    let skillName = '';
    let category = 'Programming';

    if (skillId && skillId !== 'custom') {
      const meta = ALL_SKILLS.find((s) => s.id === skillId);
      if (meta) {
        skillName = meta.name;
        category = meta.category;
      }
    } else if (customSkillName.trim()) {
      skillName = customSkillName.trim();
      skillId = skillName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    if (!skillName) return;

    // Check duplicate
    if (formData.skills.some((s) => s.skillId === skillId)) {
      return;
    }

    const scoreMap: Record<ProficiencyLevel, number> = {
      Beginner: 40,
      Intermediate: 65,
      Advanced: 90
    };

    const newSkill: StudentSkill = {
      id: `skill-${Date.now()}`,
      skillId,
      skillName,
      category,
      selfProficiencyLevel: newSkillLevel,
      proficiencyScore: scoreMap[newSkillLevel]
    };

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));

    setSelectedSkillId('');
    setCustomSkillName('');
  };

  const handleRemoveSkill = (skillId: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.skillId !== skillId)
    }));
  };

  const handleUpdateSkillLevel = (skillId: string, level: ProficiencyLevel) => {
    const scoreMap: Record<ProficiencyLevel, number> = {
      Beginner: 40,
      Intermediate: 65,
      Advanced: 90
    };

    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) =>
        s.skillId === skillId
          ? { ...s, selfProficiencyLevel: level, proficiencyScore: scoreMap[level] }
          : s
      )
    }));
  };

  const handleAddProject = () => {
    if (!newProjTitle.trim() || !newProjDesc.trim()) return;

    const proj: Project = {
      id: `proj-${Date.now()}`,
      title: newProjTitle.trim(),
      description: newProjDesc.trim(),
      techStack: newProjTech
        ? newProjTech.split(',').map((t) => t.trim()).filter(Boolean)
        : ['React', 'TypeScript'],
      difficulty: newProjDiff
    };

    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, proj]
    }));

    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjTech('');
  };

  const handleRemoveProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  const handleAddCert = () => {
    if (!newCertName.trim() || !newCertOrg.trim()) return;

    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: `cert-${Date.now()}`,
          name: newCertName.trim(),
          issuingOrganization: newCertOrg.trim(),
          issueYear: Number(newCertYear) || 2025
        }
      ]
    }));

    setNewCertName('');
    setNewCertOrg('');
  };

  const handleRemoveCert = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id)
    }));
  };

  const handleAddInternship = () => {
    if (!newInternRole.trim() || !newInternCompany.trim()) return;

    setFormData((prev) => ({
      ...prev,
      internships: [
        ...prev.internships,
        {
          id: `intern-${Date.now()}`,
          role: newInternRole.trim(),
          company: newInternCompany.trim(),
          duration: newInternDur.trim() || '3 Months',
          description: newInternDesc.trim() || 'Hands-on practical development experience.'
        }
      ]
    }));

    setNewInternRole('');
    setNewInternCompany('');
    setNewInternDur('');
    setNewInternDesc('');
  };

  const handleRemoveInternship = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      internships: prev.internships.filter((i) => i.id !== id)
    }));
  };

  const handleSave = () => {
    onSaveProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveAndAnalyze = () => {
    onSaveProfile(formData);
    onAnalyze();
  };

  const steps = [
    { num: 1, label: 'Education & Target Role' },
    { num: 2, label: 'Technical Skills' },
    { num: 3, label: 'Projects & Certifications' },
    { num: 4, label: 'Experience & Links' }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Student Profile Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Provide your academic background, current technical skills, and projects to compute your skill gap.
          </p>
        </div>

        {/* Quick Sample prefill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Fill:</span>
          {SAMPLE_STUDENTS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                onLoadSample(s.id);
                // Also update local form state
                const chosen = SAMPLE_STUDENTS.find((st) => st.id === s.id);
                if (chosen) {
                  setFormData((prev) => ({
                    ...prev,
                    fullName: chosen.name,
                    degree: chosen.degree,
                    branch: chosen.branch,
                    currentYear: chosen.year,
                    targetRoleId: chosen.roleId,
                    skills: chosen.skills.map((sk, idx) => {
                      const meta = ALL_SKILLS.find((m) => m.id === sk.skillId);
                      return {
                        id: `skill-${idx}`,
                        skillId: sk.skillId,
                        skillName: meta ? meta.name : sk.skillId,
                        category: meta ? meta.category : 'Core CS',
                        selfProficiencyLevel: sk.level,
                        proficiencyScore: sk.score
                      };
                    }),
                    projects: chosen.projects.map((p, idx) => ({
                      id: `proj-${idx}`,
                      title: p.title,
                      description: p.desc,
                      techStack: p.tech,
                      difficulty: p.diff
                    })),
                    certifications: chosen.certs.map((c, idx) => ({
                      id: `cert-${idx}`,
                      name: c.name,
                      issuingOrganization: c.org,
                      issueYear: c.year
                    })),
                    internships: chosen.internships.map((i, idx) => ({
                      id: `intern-${idx}`,
                      role: i.role,
                      company: i.comp,
                      duration: i.dur,
                      description: i.desc
                    }))
                  }));
                }
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
            >
              {s.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Onboarding Welcome Alert if Profile is Incomplete */}
      {(isOnboarding || !isProfileComplete(formData)) && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 border border-blue-500/20 text-slate-800 dark:text-slate-200 text-xs sm:text-sm space-y-2">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to Student Onboarding!</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Complete your academic information and self-rate at least <strong>3 technical skills</strong> to compute your skill gap against industry roles and unlock your personalized roadmap.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
            <span className={formData.degree && formData.branch ? 'text-emerald-500 font-semibold' : ''}>
              {formData.degree && formData.branch ? '✓ Degree Specified' : '○ 1. Degree & Branch'}
            </span>
            <span className={formData.targetRoleId ? 'text-emerald-500 font-semibold' : ''}>
              {formData.targetRoleId ? '✓ Target Role Picked' : '○ 2. Target Role'}
            </span>
            <span className={formData.skills.length >= 3 ? 'text-emerald-500 font-semibold' : ''}>
              {formData.skills.length >= 3 ? `✓ ${formData.skills.length} Skills Added` : `○ 3. Skills (${formData.skills.length}/3)`}
            </span>
          </div>
        </div>
      )}

      {/* Stepper Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {steps.map((st) => (
          <button
            key={st.num}
            onClick={() => setActiveStep(st.num)}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeStep === st.num
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-medium hover:border-slate-300'
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider opacity-70">Step 0{st.num}</div>
            <div className="text-xs truncate mt-0.5">{st.label}</div>
          </button>
        ))}
      </div>

      {/* STEP 1: Education & Target Role */}
      {activeStep === 1 && (
        <div className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <span>Personal Details & Academic Background</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Your college degree level, discipline, and the career role you want to analyze.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleTextChange('fullName', e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Student Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleTextChange('email', e.target.value)}
                placeholder="e.g. alex@university.edu"
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Degree / Education
              </label>
              <select
                value={formData.degree}
                onChange={(e) => handleTextChange('degree', e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              >
                <option value="B.Tech in Computer Science">B.Tech / B.E. in Computer Science</option>
                <option value="B.S. in Information Technology">B.S. / B.Tech in IT</option>
                <option value="B.S. in Artificial Intelligence">B.S. in AI & Data Science</option>
                <option value="B.S. in Cybersecurity">B.S. in Cybersecurity / InfoSec</option>
                <option value="BCA / MCA">BCA / MCA</option>
                <option value="M.S. in Computer Science">M.S. / M.Tech in CS</option>
                <option value="Self-Taught / Bootcamp">Bootcamp Graduate / Self-Taught</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Major Branch / Specialization
              </label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => handleTextChange('branch', e.target.value)}
                placeholder="e.g. Computer Science and Engineering"
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Year / Semester
              </label>
              <select
                value={formData.currentYear}
                onChange={(e) => handleTextChange('currentYear', e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              >
                <option value="1st Year / 1st-2nd Semester">1st Year (Freshman)</option>
                <option value="2nd Year / 3rd-4th Semester">2nd Year (Sophomore)</option>
                <option value="3rd Year / 5th-6th Semester">3rd Year (Junior)</option>
                <option value="4th Year / 7th-8th Semester">4th Year (Senior / Final Year)</option>
                <option value="Recent Graduate (Fresher)">Recent Graduate (Fresher)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                Target Career Role (Primary Goal)
              </label>
              <select
                value={formData.targetRoleId}
                onChange={(e) => handleTextChange('targetRoleId', e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-blue-50/50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              >
                {CAREER_ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setActiveStep(2)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5"
            >
              <span>Next: Technical Skills</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Technical Skills */}
      {activeStep === 2 && (
        <div className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-500" />
              <span>Technical Skills & Self-Rated Proficiency</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add your current programming languages, tools, and libraries with your self-rated level (Beginner, Intermediate, Advanced).
            </p>
          </div>

          {/* Quick Skill Adder */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Add a Technical Skill:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Choose from catalog
                </label>
                <select
                  value={selectedSkillId}
                  onChange={(e) => setSelectedSkillId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">-- Select Skill --</option>
                  {ALL_SKILLS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                  <option value="custom">+ Custom Skill...</option>
                </select>
              </div>

              {selectedSkillId === 'custom' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Custom Skill Name
                  </label>
                  <input
                    type="text"
                    value={customSkillName}
                    onChange={(e) => setCustomSkillName(e.target.value)}
                    placeholder="e.g. GraphQL, Flutter"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Self-Rated Proficiency
                </label>
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value as ProficiencyLevel)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Beginner">Beginner (Basic Syntax & Concepts ~40%)</option>
                  <option value="Intermediate">Intermediate (Used in Projects ~65%)</option>
                  <option value="Advanced">Advanced (Production Fluent ~90%)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="w-full py-2 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>
            </div>
          </div>

          {/* Current Skills List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Your Assessed Skills ({formData.skills.length})
              </span>
              <span>Click level to adjust proficiency</span>
            </div>

            {formData.skills.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
                No skills added yet. Use the selector above or pick a sample student to begin.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {formData.skills.map((skill) => (
                  <div
                    key={skill.skillId}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {skill.skillName}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {skill.category} · Score: {skill.proficiencyScore}%
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        aria-label={`Proficiency level for ${skill.skillName}`}
                        value={skill.selfProficiencyLevel}
                        onChange={(e) =>
                          handleUpdateSkillLevel(skill.skillId, e.target.value as ProficiencyLevel)
                        }
                        className="text-[11px] px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                      >
                        <option value="Beginner">Beginner (40%)</option>
                        <option value="Intermediate">Intermediate (65%)</option>
                        <option value="Advanced">Advanced (90%)</option>
                      </select>

                      <button
                        onClick={() => handleRemoveSkill(skill.skillId)}
                        className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors"
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

          <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveStep(1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5"
            >
              <span>Next: Projects & Certs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Projects & Certifications */}
      {activeStep === 3 && (
        <div className="space-y-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {/* Projects Section */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-emerald-500" />
                <span>Academic & Personal Projects</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Real projects give weight to your readiness score and validate your practical hands-on ability.
              </p>
            </div>

            {/* Add Project Form */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    placeholder="e.g. Distributed Cache & Rate Limiter"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newProjTech}
                    onChange={(e) => setNewProjTech(e.target.value)}
                    placeholder="e.g. Redis, Go, Docker, PostgreSQL"
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Short Description & Problem Solved
                </label>
                <textarea
                  rows={2}
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  placeholder="Describe the application architecture, user problem, and performance outcome..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">Difficulty:</span>
                  <select
                    aria-label="Project Difficulty"
                    value={newProjDiff}
                    onChange={(e) => setNewProjDiff(e.target.value as any)}
                    className="text-[11px] px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* Existing Projects */}
            <div className="space-y-2">
              {formData.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{proj.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold">
                        {proj.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveProject(proj.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Certifications & Specialized Credentials</span>
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Certificate Name</label>
                <input
                  type="text"
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Issuing Body</label>
                <input
                  type="text"
                  value={newCertOrg}
                  onChange={(e) => setNewCertOrg(e.target.value)}
                  placeholder="e.g. Amazon Web Services / Coursera"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Year</label>
                  <input
                    type="number"
                    value={newCertYear}
                    onChange={(e) => setNewCertYear(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddCert}
                  className="py-2 px-3.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {formData.certifications.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{c.name}</span>
                    <span className="text-xs text-slate-400 block">{c.issuingOrganization} · {c.issueYear}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveCert(c.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveStep(2)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5"
            >
              <span>Next: Experience & Links</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Experience & External Links */}
      {activeStep === 4 && (
        <div className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-500" />
              <span>Internship Experience & Portfolio URLs</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add any internships, freelance engagements, or campus club tech lead roles.
            </p>
          </div>

          {/* Internships Form */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Role Title</label>
                <input
                  type="text"
                  value={newInternRole}
                  onChange={(e) => setNewInternRole(e.target.value)}
                  placeholder="e.g. Backend Intern"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={newInternCompany}
                  onChange={(e) => setNewInternCompany(e.target.value)}
                  placeholder="e.g. Acme Tech"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Duration</label>
                <input
                  type="text"
                  value={newInternDur}
                  onChange={(e) => setNewInternDur(e.target.value)}
                  placeholder="e.g. 3 Months (Summer 2025)"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Key Responsibilities / Impact</label>
              <textarea
                rows={2}
                value={newInternDesc}
                onChange={(e) => setNewInternDesc(e.target.value)}
                placeholder="Built API endpoints, improved query performance by 25%..."
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddInternship}
                className="py-1.5 px-4 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Internship</span>
              </button>
            </div>
          </div>

          {/* Internships List */}
          <div className="space-y-2">
            {formData.internships.map((intern) => (
              <div
                key={intern.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 flex items-start justify-between"
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {intern.role} at {intern.company} ({intern.duration})
                  </div>
                  <p className="text-xs text-slate-500">{intern.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveInternship(intern.id)}
                  className="p-1 rounded text-slate-400 hover:text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Portfolio & GitHub URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GitHub Profile URL (optional)
              </label>
              <input
                type="url"
                value={formData.githubUrl || ''}
                onChange={(e) => handleTextChange('githubUrl', e.target.value)}
                placeholder="https://github.com/yourhandle"
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Personal Portfolio / Website URL (optional)
              </label>
              <input
                type="url"
                value={formData.portfolioUrl || ''}
                onChange={(e) => handleTextChange('portfolioUrl', e.target.value)}
                placeholder="https://yourname.dev"
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveStep(3)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {saveSuccess ? 'Saved ✓' : 'Save Changes'}
              </button>
              <button
                onClick={handleSaveAndAnalyze}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate Skill Gaps & Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
