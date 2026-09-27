-- ==============================================================================
-- AI Student Skill-Gap Analyzer - Relational Database Schema (PostgreSQL)
-- ==============================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Career Roles Table
CREATE TABLE IF NOT EXISTS career_roles (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'software-developer', 'cybersecurity-analyst'
    title VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    average_salary VARCHAR(50),
    demand_level VARCHAR(30) DEFAULT 'High',
    icon_name VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Skills Master Table
CREATE TABLE IF NOT EXISTS skills (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'python', 'dsa', 'sql'
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Language', 'Core CS', 'Database', 'Tools', 'Security', 'Cloud', 'Data'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Role Skills Association (Requirements per Role)
CREATE TABLE IF NOT EXISTS role_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id VARCHAR(50) REFERENCES career_roles(id) ON DELETE CASCADE,
    skill_id VARCHAR(50) REFERENCES skills(id) ON DELETE CASCADE,
    required_proficiency INT NOT NULL CHECK (required_proficiency BETWEEN 0 AND 100),
    importance_weight DECIMAL(3, 2) DEFAULT 1.00, -- 1.00 = standard, 1.25 = critical
    priority VARCHAR(20) DEFAULT 'High', -- 'Critical', 'High', 'Medium', 'Low'
    learning_guidance TEXT,
    UNIQUE(role_id, skill_id)
);

-- 5. Student Profiles Table
CREATE TABLE IF NOT EXISTS student_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    degree VARCHAR(100) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    current_year VARCHAR(50) NOT NULL,
    target_role_id VARCHAR(50) REFERENCES career_roles(id),
    github_url TEXT,
    portfolio_url TEXT,
    linkedin_url TEXT,
    bio TEXT,
    readiness_score INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Student Skills Table (Current Proficiency Assessment)
CREATE TABLE IF NOT EXISTS student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    skill_id VARCHAR(50) REFERENCES skills(id) ON DELETE CASCADE,
    self_proficiency_level VARCHAR(20) NOT NULL, -- 'Beginner', 'Intermediate', 'Advanced'
    proficiency_score INT NOT NULL CHECK (proficiency_score BETWEEN 0 AND 100),
    years_experience DECIMAL(3, 1) DEFAULT 0.5,
    verified BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(profile_id, skill_id)
);

-- 7. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[] NOT NULL,
    github_repo_url TEXT,
    live_demo_url TEXT,
    difficulty VARCHAR(30) DEFAULT 'Intermediate',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    issuing_organization VARCHAR(150) NOT NULL,
    issue_year INT,
    credential_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Learning Roadmaps Table
CREATE TABLE IF NOT EXISTS learning_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    role_id VARCHAR(50) REFERENCES career_roles(id),
    title VARCHAR(150) NOT NULL,
    timeframe_phase VARCHAR(50) NOT NULL, -- 'Week 1-2', 'Week 3-4', 'Month 2', 'Month 3'
    skill_id VARCHAR(50) REFERENCES skills(id),
    what_to_learn TEXT NOT NULL,
    why_it_matters TEXT NOT NULL,
    suggested_task TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    estimated_hours INT DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Progress Tracking Table
CREATE TABLE IF NOT EXISTS progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    skill_id VARCHAR(50) REFERENCES skills(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'Not Started', -- 'Not Started', 'Learning', 'Completed'
    completion_percentage INT DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
    notes TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(profile_id, skill_id)
);

-- 11. Analysis Reports Table
CREATE TABLE IF NOT EXISTS analysis_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    role_id VARCHAR(50) REFERENCES career_roles(id),
    readiness_score INT NOT NULL,
    matched_skills_count INT DEFAULT 0,
    critical_gaps_count INT DEFAULT 0,
    moderate_gaps_count INT DEFAULT 0,
    report_data JSONB NOT NULL,
    ai_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_role_skills_role ON role_skills(role_id);
CREATE INDEX IF NOT EXISTS idx_student_skills_profile ON student_skills(profile_id);
CREATE INDEX IF NOT EXISTS idx_progress_profile ON progress(profile_id);
CREATE INDEX IF NOT EXISTS idx_analysis_reports_profile ON analysis_reports(profile_id);
