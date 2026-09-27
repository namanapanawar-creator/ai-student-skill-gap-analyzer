import {
  ALL_SKILLS,
  CAREER_ROLES,
  PROJECT_CATALOG,
  ROLE_SKILL_FRAMEWORK
} from '../data/rolesData';
import {
  AnalysisReport,
  CareerRole,
  LearningRoadmapItem,
  PriorityLevel,
  ProgressStatus,
  Project,
  RecommendedProject,
  ResumeAnalysisResult,
  SkillGapItem,
  StudentProfile,
  StudentSkill
} from '../types';

/**
 * Calculates deterministic skill-gap metrics and comprehensive career report.
 */
export function generateSkillAnalysis(
  profile: StudentProfile,
  customProgressState: Record<string, ProgressStatus> = {}
): AnalysisReport {
  const role = CAREER_ROLES.find((r) => r.id === profile.targetRoleId) || CAREER_ROLES[0];
  const framework = ROLE_SKILL_FRAMEWORK[role.id] || ROLE_SKILL_FRAMEWORK['software-developer'];

  // Map student's current skills
  const studentSkillMap = new Map<string, number>();
  profile.skills.forEach((s) => {
    studentSkillMap.set(s.skillId, s.proficiencyScore);
  });

  let totalWeight = 0;
  let weightedSkillScore = 0;

  const skillGaps: SkillGapItem[] = framework.map((req) => {
    const skillMeta = ALL_SKILLS.find((s) => s.id === req.skillId);
    const skillName = skillMeta ? skillMeta.name : req.skillId;
    const category = skillMeta ? skillMeta.category : 'Core CS';

    // Current score
    const current = studentSkillMap.get(req.skillId) || 0;
    const required = req.requiredProficiency;
    const gap = Math.max(0, required - current);

    // Calculate priority
    let priority: PriorityLevel = req.priority;
    if (gap >= 35) priority = 'Critical';
    else if (gap >= 20) priority = 'High';
    else if (gap >= 10) priority = 'Medium';
    else priority = 'Low';

    // Calculate weighted skill match
    const skillMatchRatio = Math.min(1, current / required);
    const weight = req.priority === 'Critical' ? 1.4 : req.priority === 'High' ? 1.2 : 1.0;
    totalWeight += weight;
    weightedSkillScore += skillMatchRatio * 100 * weight;

    // Check custom progress status if user marked it in tracker
    const status: ProgressStatus = customProgressState[req.skillId] || (
      current >= required ? 'Completed' : current > 0 ? 'Learning' : 'Not Started'
    );

    return {
      skillId: req.skillId,
      skillName,
      category,
      currentProficiency: current,
      requiredProficiency: required,
      gap,
      priority,
      status,
      learningGuidance: req.guidance
    };
  });

  // Base score
  const baseSkillScore = Math.round(totalWeight > 0 ? weightedSkillScore / totalWeight : 0);

  // Bonus for relevant projects (up to 8 points)
  let projectBonus = 0;
  if (profile.projects && profile.projects.length > 0) {
    projectBonus = Math.min(8, profile.projects.length * 3 + (profile.projects.some(p => p.difficulty === 'Advanced') ? 2 : 0));
  }

  // Bonus for certifications (up to 6 points)
  let certBonus = 0;
  if (profile.certifications && profile.certifications.length > 0) {
    certBonus = Math.min(6, profile.certifications.length * 3);
  }

  // Bonus for internship experience (up to 8 points)
  let internshipBonus = 0;
  if (profile.internships && profile.internships.length > 0) {
    internshipBonus = Math.min(8, profile.internships.length * 4);
  }

  // Overall career readiness score
  const readinessScore = Math.min(100, Math.round(baseSkillScore * 0.78 + projectBonus + certBonus + internshipBonus));

  // Partition strengths and gaps
  const strengths = skillGaps.filter((s) => s.gap <= 5 || s.currentProficiency >= s.requiredProficiency);
  const criticalGaps = skillGaps.filter((s) => s.gap >= 25 && s.currentProficiency < s.requiredProficiency);
  const moderateGaps = skillGaps.filter((s) => s.gap >= 10 && s.gap < 25 && s.currentProficiency < s.requiredProficiency);

  // Recommended complementary skills
  const existingSkillIds = new Set(profile.skills.map((s) => s.skillId));
  const candidateRecommendations = ALL_SKILLS.filter(
    (s) => !existingSkillIds.has(s.id) && !framework.some((f) => f.skillId === s.id)
  );

  const recommendedSkills = candidateRecommendations.slice(0, 4).map((s) => ({
    name: s.name,
    category: s.category,
    benefit: `Boosts your versatility in ${role.title} interviews by demonstrating modern production tooling.`
  }));

  // Build 4-phase structured roadmap
  const sortedGaps = [...skillGaps].sort((a, b) => b.gap - a.gap);
  const roadmap: LearningRoadmapItem[] = [];

  const timeframes: ('Week 1–2' | 'Week 3–4' | 'Month 2' | 'Month 3')[] = [
    'Week 1–2',
    'Week 3–4',
    'Month 2',
    'Month 3'
  ];

  sortedGaps.forEach((gapItem, index) => {
    const timeframeIndex = Math.min(timeframes.length - 1, Math.floor((index / sortedGaps.length) * timeframes.length));
    const timeframe = timeframes[timeframeIndex];
    
    let difficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate';
    if (gapItem.currentProficiency < 40) difficulty = 'Beginner';
    else if (gapItem.requiredProficiency >= 85) difficulty = 'Advanced';

    const estimatedHours = Math.max(8, Math.round(gapItem.gap * 0.5) + 6);

    roadmap.push({
      id: `roadmap-${gapItem.skillId}`,
      skillId: gapItem.skillId,
      skillName: gapItem.skillName,
      category: gapItem.category,
      timeframe,
      whatToLearn: gapItem.learningGuidance,
      whyItMatters: `Required for ${role.title}: closes a ${gapItem.gap}% competency gap to reach target proficiency (${gapItem.requiredProficiency}%).`,
      suggestedTask: `Build a focused mini-exercise or practice project module explicitly testing ${gapItem.skillName}.`,
      difficulty,
      estimatedHours,
      status: gapItem.status
    });
  });

  // Recommended Projects
  const catalog = PROJECT_CATALOG[role.id] || PROJECT_CATALOG['software-developer'] || [];
  const recommendedProjects: RecommendedProject[] = catalog.map((proj, idx) => ({
    id: `rec-proj-${idx}`,
    title: proj.title,
    description: proj.description,
    skillsDeveloped: proj.skillsDeveloped,
    difficulty: proj.difficulty,
    expectedOutcome: proj.expectedOutcome,
    milestones: proj.milestones
  }));

  return {
    id: `report-${Date.now()}`,
    profileId: profile.id,
    roleId: role.id,
    roleTitle: role.title,
    readinessScore,
    breakdown: {
      skillsScore: baseSkillScore,
      projectBonus,
      certBonus,
      internshipBonus
    },
    strengths,
    criticalGaps,
    moderateGaps,
    recommendedSkills,
    skillGaps,
    roadmap,
    recommendedProjects,
    createdAt: new Date().toISOString()
  };
}

/**
 * Analyzes resume text against target role requirements.
 */
export function analyzeResumeText(resumeText: string, targetRoleId: string): ResumeAnalysisResult {
  const normalized = resumeText.toLowerCase();
  const role = CAREER_ROLES.find((r) => r.id === targetRoleId) || CAREER_ROLES[0];
  const framework = ROLE_SKILL_FRAMEWORK[role.id] || ROLE_SKILL_FRAMEWORK['software-developer'];

  const extractedSkills: string[] = [];
  const strengthsFound: string[] = [];
  const missingCritical: string[] = [];
  const missingBonus: string[] = [];

  // Match against all catalog skills
  ALL_SKILLS.forEach((skill) => {
    const key = skill.name.toLowerCase();
    const idKey = skill.id.replace('-', ' ');
    if (normalized.includes(key) || normalized.includes(idKey) || (skill.id === 'dsa' && normalized.includes('data structures'))) {
      extractedSkills.push(skill.name);
    }
  });

  // Check role specific requirements
  framework.forEach((req) => {
    const skillMeta = ALL_SKILLS.find((s) => s.id === req.skillId);
    const skillName = skillMeta ? skillMeta.name : req.skillId;
    const isFound = extractedSkills.includes(skillName);

    if (isFound) {
      strengthsFound.push(skillName);
    } else {
      if (req.priority === 'Critical' || req.priority === 'High') {
        missingCritical.push(skillName);
      } else {
        missingBonus.push(skillName);
      }
    }
  });

  // Extract projects heuristics
  const extractedProjects: string[] = [];
  const projectKeywords = ['project', 'built', 'developed', 'created', 'designed', 'implemented'];
  const lines = resumeText.split('\n');
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.length > 20 && projectKeywords.some((k) => trimmed.toLowerCase().includes(k)) && !trimmed.toLowerCase().startsWith('skills')) {
      if (extractedProjects.length < 4) {
        extractedProjects.push(trimmed.replace(/^[-*•]\s*/, ''));
      }
    }
  });

  // Extract certifications heuristics
  const extractedCertifications: string[] = [];
  const certKeywords = ['certified', 'certification', 'coursera', 'aws', 'comptia', 'specialization', 'meta', 'google'];
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.length > 15 && certKeywords.some((k) => trimmed.toLowerCase().includes(k))) {
      if (extractedCertifications.length < 3) {
        extractedCertifications.push(trimmed.replace(/^[-*•]\s*/, ''));
      }
    }
  });

  // Extract experience heuristics
  const extractedExperience: string[] = [];
  const expKeywords = ['intern', 'internship', 'developer at', 'engineer at', 'worked at', 'freelance'];
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.length > 15 && expKeywords.some((k) => trimmed.toLowerCase().includes(k))) {
      if (extractedExperience.length < 3) {
        extractedExperience.push(trimmed.replace(/^[-*•]\s*/, ''));
      }
    }
  });

  // Calculate ATS match score
  const totalFrameworkSkills = framework.length;
  const matchRatio = totalFrameworkSkills > 0 ? strengthsFound.length / totalFrameworkSkills : 0.5;
  const baseAts = Math.round(matchRatio * 75);
  const projectPoints = extractedProjects.length > 0 ? 10 : 0;
  const certPoints = extractedCertifications.length > 0 ? 8 : 0;
  const expPoints = extractedExperience.length > 0 ? 7 : 0;
  const atsMatchScore = Math.min(98, Math.max(20, baseAts + projectPoints + certPoints + expPoints));

  // Actionable recommendations
  const actionableRecommendations: string[] = [];
  if (missingCritical.length > 0) {
    actionableRecommendations.push(
      `Add explicit resume keywords for critical missing skills: ${missingCritical.slice(0, 3).join(', ')}.`
    );
  }
  if (extractedProjects.length === 0) {
    actionableRecommendations.push(
      'Format projects clearly with impact verbs and tech stack bullet points (e.g. "Built [App] using [Tech Stack] resulting in [Outcome]").'
    );
  } else {
    actionableRecommendations.push(
      'Ensure project bullet points quantify outcomes with metrics (e.g., "reduced latency by 30%", "handled 5,000 requests/sec").'
    );
  }
  if (extractedCertifications.length === 0) {
    actionableRecommendations.push(
      `Consider completing an industry-standard credential for ${role.title} to strengthen keyword matching.`
    );
  }
  actionableRecommendations.push(
    `Align your summary/headline specifically towards "${role.title}" instead of general "Student".`
  );

  return {
    atsMatchScore,
    extractedSkills,
    extractedProjects: extractedProjects.length > 0 ? extractedProjects : ['No clearly formatted project sections detected'],
    extractedCertifications: extractedCertifications.length > 0 ? extractedCertifications : ['No certifications found'],
    extractedExperience: extractedExperience.length > 0 ? extractedExperience : ['No formal internship/experience lines identified'],
    missingCriticalSkills: missingCritical,
    missingBonusSkills: missingBonus,
    strengthsFound,
    actionableRecommendations
  };
}
