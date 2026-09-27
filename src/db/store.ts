import { SAMPLE_STUDENTS, ALL_SKILLS, CAREER_ROLES } from '../data/rolesData';
import {
  AnalysisReport,
  ProgressStatus,
  StudentProfile,
  StudentSkill,
  User
} from '../types';
import { generateSkillAnalysis } from '../utils/analyzer';

const STORAGE_KEY_PROFILE = 'aiskill_student_profile';
const STORAGE_KEY_PROGRESS = 'aiskill_progress_state';
const STORAGE_KEY_REPORTS = 'aiskill_saved_reports';
const STORAGE_KEY_THEME = 'aiskill_theme';
const STORAGE_KEY_ACTIVE_USER = 'aiskill_active_user';
const STORAGE_KEY_USERS_DB = 'aiskill_registered_users_db';

export interface StoredAccount {
  user: User;
  passwordHash: string; // Plain/demo hash
  profile: StudentProfile;
}

export function isProfileComplete(profile: StudentProfile | null | undefined): boolean {
  if (!profile) return false;
  return (
    Boolean(profile.fullName && profile.fullName.trim().length > 0) &&
    Boolean(profile.degree && profile.degree.trim().length > 0) &&
    Boolean(profile.branch && profile.branch.trim().length > 0) &&
    Boolean(profile.currentYear && profile.currentYear.trim().length > 0) &&
    Boolean(profile.targetRoleId && profile.targetRoleId.trim().length > 0) &&
    Array.isArray(profile.skills) &&
    profile.skills.length >= 3
  );
}

export function createBlankProfile(user: User): StudentProfile {
  return {
    id: `profile-${user.id}`,
    userId: user.id,
    fullName: user.fullName,
    email: user.email,
    degree: '',
    branch: '',
    currentYear: '',
    targetRoleId: '',
    skills: [],
    projects: [],
    certifications: [],
    internships: [],
    bio: '',
    updatedAt: new Date().toISOString()
  };
}

export function getInitialAccounts(): StoredAccount[] {
  const alexProfile = getDefaultProfile();
  const alexUser: User = {
    id: 'user-alex',
    email: 'alex.rivera@university.edu',
    fullName: 'Alex Rivera',
    createdAt: '2025-01-15T08:00:00.000Z'
  };

  const priyaSample = SAMPLE_STUDENTS[1];
  const priyaUser: User = {
    id: 'user-priya',
    email: 'priya.sharma@university.edu',
    fullName: priyaSample.name,
    createdAt: '2025-02-10T08:00:00.000Z'
  };
  const priyaProfile: StudentProfile = {
    id: 'profile-priya',
    userId: 'user-priya',
    fullName: priyaSample.name,
    email: 'priya.sharma@university.edu',
    degree: priyaSample.degree,
    branch: priyaSample.branch,
    currentYear: priyaSample.year,
    targetRoleId: priyaSample.roleId,
    skills: priyaSample.skills.map((s, idx) => {
      const meta = ALL_SKILLS.find((sk) => sk.id === s.skillId);
      return {
        id: `priya-sk-${idx}`,
        skillId: s.skillId,
        skillName: meta ? meta.name : s.skillId,
        category: meta ? meta.category : 'Data & AI',
        selfProficiencyLevel: s.level,
        proficiencyScore: s.score
      };
    }),
    projects: priyaSample.projects.map((p, idx) => ({
      id: `priya-p-${idx}`,
      title: p.title,
      description: p.desc,
      techStack: p.tech,
      difficulty: p.diff
    })),
    certifications: priyaSample.certs.map((c, idx) => ({
      id: `priya-c-${idx}`,
      name: c.name,
      issuingOrganization: c.org,
      issueYear: c.year
    })),
    internships: [],
    updatedAt: new Date().toISOString()
  };

  const newStudentUser: User = {
    id: 'user-newbie',
    email: 'newstudent@university.edu',
    fullName: 'Jordan Taylor',
    createdAt: new Date().toISOString()
  };
  const newStudentProfile = createBlankProfile(newStudentUser);

  return [
    { user: alexUser, passwordHash: 'password123', profile: alexProfile },
    { user: priyaUser, passwordHash: 'password123', profile: priyaProfile },
    { user: newStudentUser, passwordHash: 'password123', profile: newStudentProfile }
  ];
}

export function loadStoredAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS_DB);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {}
  const initial = getInitialAccounts();
  saveStoredAccounts(initial);
  return initial;
}

export function saveStoredAccounts(accounts: StoredAccount[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(accounts));
  } catch (e) {}
}

export function loadActiveUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACTIVE_USER);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {}
  // Default to logged-in Alex Rivera for instant seamless demo, but user can log out
  const accounts = loadStoredAccounts();
  return accounts[0].user;
}

export function saveActiveUser(user: User | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_ACTIVE_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_ACTIVE_USER);
    }
  } catch (e) {}
}

export function getDefaultProfile(): StudentProfile {
  const sample = SAMPLE_STUDENTS[0]; // Alex Rivera by default
  return {
    id: 'profile-alex-001',
    userId: 'user-001',
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
  const sanitize = (str: string) => str.replace(/'/g, "''");
  
  const sql = `-- AI Student Skill-Gap Analyzer: Exported Relational Dump
-- Target Role: ${profile.targetRoleId}
-- Date: ${new Date().toISOString()}

BEGIN;

-- Insert User
INSERT INTO users (id, email, full_name)
VALUES ('${profile.userId}', '${sanitize(profile.email)}', '${sanitize(profile.fullName)}')
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;

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
