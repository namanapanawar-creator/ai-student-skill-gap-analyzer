import { SAMPLE_STUDENTS, ALL_SKILLS, CAREER_ROLES } from '../data/rolesData';
import {
  AnalysisReport,
  ProgressStatus,
  StudentProfile,
  StudentSkill,
  User
} from '../types';

const STORAGE_KEY_PROFILE = 'aiskill_student_profile';
const STORAGE_KEY_PROGRESS = 'aiskill_progress_state';
const STORAGE_KEY_THEME = 'aiskill_theme';

export function isProfileComplete(profile: StudentProfile | null | undefined): boolean {
  if (!profile) return false;
  return (
    Boolean(profile.fullName && profile.fullName.trim().length > 0) &&
    Boolean(profile.degree && profile.degree.trim().length > 0) &&
    Boolean(profile.branch && profile.branch.trim().length > 0) &&
    Boolean(profile.currentYear && profile.currentYear.trim().length > 0) &&
    Boolean(profile.targetRoleId && profile.targetRoleId.trim().length > 0) &&
    Array.isArray(profile.skills) &&
    profile.skills.length >= 1
  );
}

export function getBlankProfile(): StudentProfile {
  return {
    id: `profile-${Date.now()}`,
    userId: 'student-local',
    fullName: '',
    email: '',
    degree: 'B.Tech in Computer Science',
    branch: '',
    currentYear: '3rd Year / 5th-6th Semester',
    targetRoleId: 'software-developer',
    githubUrl: '',
    portfolioUrl: '',
    skills: [],
    projects: [],
    certifications: [],
    internships: [],
    bio: '',
    updatedAt: new Date().toISOString()
  };
}

export function getDefaultProfile(): StudentProfile {
  const sample = SAMPLE_STUDENTS[0]; // Alex Rivera by default
  return {
    id: 'profile-alex-001',
    userId: 'student-local',
    fullName: sample.name,
    email: 'alex.rivera@university.edu',
    degree: sample.degree,
    branch: sample.branch,
    currentYear: sample.year,
    targetRoleId: sample.roleId,
    githubUrl: 'https://github.com/alexrivera-dev',
    portfolioUrl: 'https://alexrivera.me',
    skills: sample.skills.map((s, idx) => {
      const meta = ALL_SKILLS.find((sk) => sk.id === s.skillId);
      return {
        id: `skill-${idx}`,
        skillId: s.skillId,
        skillName: meta ? meta.name : s.skillId,
        category: meta ? meta.category : 'Core CS',
        selfProficiencyLevel: s.level,
        proficiencyScore: s.score
      };
    }),
    projects: sample.projects.map((p, idx) => ({
      id: `proj-${idx}`,
      title: p.title,
      description: p.desc,
      techStack: p.tech,
      difficulty: p.diff
    })),
    certifications: sample.certs.map((c, idx) => ({
      id: `cert-${idx}`,
      name: c.name,
      issuingOrganization: c.org,
      issueYear: c.year
    })),
    internships: sample.internships.map((i, idx) => ({
      id: `intern-${idx}`,
      role: i.role,
      company: i.comp,
      duration: i.dur,
      description: i.desc
    })),
    bio: 'Passionate computer science junior focused on scalable distributed systems, algorithms, and cloud services.',
    updatedAt: new Date().toISOString()
  };
}

export function loadStoredProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Could not read stored profile:', err);
  }
  return getDefaultProfile();
}

export function saveStoredProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.warn('Could not save profile to local storage:', err);
  }
}

export function loadStoredProgress(): Record<string, ProgressStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Could not load progress:', err);
  }
  return {};
}

export function saveStoredProgress(progress: Record<string, ProgressStatus>): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (err) {
    console.warn('Could not save progress:', err);
  }
}

export function loadStoredTheme(): 'light' | 'dark' {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_THEME);
    if (raw === 'dark' || raw === 'light') return raw;
  } catch (e) {}
  return 'dark'; // modern dark default
}

export function saveStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  } catch (e) {}
}

export function exportSqlDump(profile: StudentProfile, report: AnalysisReport): string {
  const sanitize = (str: string) => (str ? str.replace(/'/g, "''") : '');
  
  const sql = `-- AI Student Skill-Gap Analyzer: Exported Relational Dump
-- Target Role: ${profile.targetRoleId}
-- Date: ${new Date().toISOString()}

BEGIN;

-- Insert Student Profile
INSERT INTO student_profiles (id, user_id, degree, branch, current_year, target_role_id, readiness_score)
VALUES (
  '${profile.id}',
  '${profile.userId}',
  '${sanitize(profile.degree)}',
  '${sanitize(profile.branch)}',
  '${sanitize(profile.currentYear)}',
  '${sanitize(profile.targetRoleId)}',
  ${report.readinessScore}
)
ON CONFLICT (id) DO UPDATE SET readiness_score = EXCLUDED.readiness_score;

-- Insert Student Skills
${profile.skills
  .map(
    (s) =>
      `INSERT INTO student_skills (profile_id, skill_id, self_proficiency_level, proficiency_score) VALUES ('${profile.id}', '${sanitize(s.skillId)}', '${s.selfProficiencyLevel}', ${s.proficiencyScore}) ON CONFLICT (profile_id, skill_id) DO UPDATE SET proficiency_score = EXCLUDED.proficiency_score;`
  )
  .join('\n')}

-- Insert Projects
${profile.projects
  .map(
    (p) =>
      `INSERT INTO projects (profile_id, title, description, tech_stack, difficulty) VALUES ('${profile.id}', '${sanitize(p.title)}', '${sanitize(p.description)}', ARRAY[${p.techStack.map((t) => `'${sanitize(t)}'`).join(',')}], '${p.difficulty}');`
  )
  .join('\n')}

-- Insert Certifications
${profile.certifications
  .map(
    (c) =>
      `INSERT INTO certifications (profile_id, name, issuing_organization, issue_year) VALUES ('${profile.id}', '${sanitize(c.name)}', '${sanitize(c.issuingOrganization)}', ${c.issueYear});`
  )
  .join('\n')}

-- Insert Analysis Report
INSERT INTO analysis_reports (profile_id, role_id, readiness_score, matched_skills_count, critical_gaps_count, moderate_gaps_count, report_data)
VALUES (
  '${profile.id}',
  '${profile.targetRoleId}',
  ${report.readinessScore},
  ${report.strengths.length},
  ${report.criticalGaps.length},
  ${report.moderateGaps.length},
  '${sanitize(JSON.stringify(report))}'
);

COMMIT;
`;

  return sql;
}
