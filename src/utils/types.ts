export interface ProfileData {
  linkedin_url: string;
  github_url: string;
  address_city: string;
  address_state: string;
  address_country: string;
  current_role: string;
  profile_summary: string;
}

export interface EducationData {
  id: string;
  institution_name: string;
  degree: string;
  field_of_study: string;
  cgpa: string | null;
  start_year: number;
  end_year: number;
  is_current: boolean;
}

export interface ExperienceData {
  id: string;
  company_name: string;
  role_title: string;
  employment_type: string;
  location: string;
  start_date: string | null;
  end_date: string | null;
  description: string;
  skills_used: string[];
}

export interface ProjectData {
  id: string;
  project_name: string;
  description: string;
  tech_stack: string[];
  project_url: string | null;
  github_url: string | null;
  start_date: string | null;
  end_date: string | null;
}

export interface SkillData {
  id: string;
  skill_name: string;
  category: string;
  proficiency_level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  is_primary: boolean;
}

export interface AchievementData {
  id: string;
  achievement_type: string;
  title: string;
  description: string;
  date_achieved: string | null;
}

export interface ResumeData {
  id: string;
  resume_name: string;
  resume_type: string;
  parsed_text: string;
  parsed_json: Record<string, unknown>;
}

export interface FullProfile {
  profile: ProfileData;
  preferences: {
    required_skills: string[];
    preferred_roles: string[];
  };
  education: EducationData[];
  experience: ExperienceData[];
  projects: ProjectData[];
  skills: SkillData[];
  achievements: AchievementData[];
  resumes: ResumeData[];
}
