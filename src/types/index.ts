export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type ProgressStatus = 'Not Started' | 'Learning' | 'Completed';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Programming' | 'Core CS' | 'Database' | 'Tools & Cloud' | 'Security' | 'Data & AI' | 'Web & APIs';
  description: string;
}

export interface RoleSkill {
  id: string;
  roleId: string;
  skillId: string;
  requiredProficiency: number; // 0-100
  importanceWeight: number; // 1.0 to 1.5
  priority: PriorityLevel;
  learningGuidance: string;
}

export interface CareerRole {
  id: string;
  title: string;
  category: string;
  description: string;
  averageSalary: string;
  demandLevel: 'Very High' | 'High' | 'Growing';
  icon: string;
  topSkills: string[];
}

export interface Project {
  id: string;
  profileId?: string;
  title: string;
  description: string;
  techStack: string[];
  githubRepoUrl?: string;
  liveDemoUrl?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Certification {
  id: string;
  profileId?: string;
  name: string;
  issuingOrganization: string;
  issueYear: number;
  credentialUrl?: string;
}

export interface Internship {
  id: string;
  profileId?: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface StudentSkill {
  id: string;
  profileId?: string;
  skillId: string;
  skillName: string;
  category: string;
  selfProficiencyLevel: ProficiencyLevel;
  proficiencyScore: number; // 0-100
  yearsExperience?: number;
}

export interface StudentProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  degree: string;
  branch: string;
  currentYear: string;
  targetRoleId: string;
  githubUrl?: string;
  portfolioUrl?: string;
  skills: StudentSkill[];
  projects: Project[];
  certifications: Certification[];
  internships: Internship[];
  bio?: string;
  updatedAt: string;
}

export interface SkillGapItem {
  skillId: string;
  skillName: string;
  category: string;
  currentProficiency: number;
  requiredProficiency: number;
  gap: number; // max(0, required - current)
  priority: PriorityLevel;
  status: ProgressStatus;
  notes?: string;
  learningGuidance: string;
}

export interface RecommendedProject {
  id: string;
  title: string;
  description: string;
  skillsDeveloped: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  expectedOutcome: string;
  milestones: string[];
}

export interface LearningRoadmapItem {
  id: string;
  skillId: string;
  skillName: string;
  category: string;
  timeframe: 'Week 1–2' | 'Week 3–4' | 'Month 2' | 'Month 3';
  whatToLearn: string;
  whyItMatters: string;
  suggestedTask: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  status: ProgressStatus;
  completedAt?: string;
}

export interface AnalysisReport {
  id: string;
  profileId: string;
  roleId: string;
  roleTitle: string;
  readinessScore: number; // 0-100
  breakdown: {
    skillsScore: number;
    projectBonus: number;
    certBonus: number;
    internshipBonus: number;
  };
  strengths: SkillGapItem[];
  criticalGaps: SkillGapItem[];
  moderateGaps: SkillGapItem[];
  recommendedSkills: {
    name: string;
    category: string;
    benefit: string;
  }[];
  skillGaps: SkillGapItem[];
  roadmap: LearningRoadmapItem[];
  recommendedProjects: RecommendedProject[];
  createdAt: string;
}

export interface ResumeAnalysisResult {
  atsMatchScore: number;
  extractedSkills: string[];
  extractedProjects: string[];
  extractedCertifications: string[];
  extractedExperience: string[];
  missingCriticalSkills: string[];
  missingBonusSkills: string[];
  strengthsFound: string[];
  actionableRecommendations: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  aiPowered?: boolean;
}
