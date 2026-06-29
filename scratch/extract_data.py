import json
import os

def main():
    json_path = 'd:/Predictions/Portfolio/autoapply_profile_backup_2026_06_18.json'
    out_path = 'd:/Predictions/Portfolio/src/data/portfolioData.ts'
    
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    profile = data.get('profile', {})
    projects = data.get('projects', [])
    experience = data.get('experience', [])
    education = data.get('education', [])
    skills = data.get('skills', [])
    achievements = data.get('achievements', [])
    preferences = data.get('preferences', {})
    
    # Let's build the TypeScript file structure
    content = []
    content.append("/* eslint-disable @typescript-eslint/no-explicit-any */")
    content.append("import { ProjectData, SkillData, ExperienceData, EducationData, AchievementData } from '../utils/types';")
    content.append("")
    
    # Render projects
    content.append("const cleanProjects: ProjectData[] = [")
    for p in projects:
        content.append("  {")
        content.append(f"    id: {json.dumps(p.get('id', ''))},")
        content.append(f"    project_name: {json.dumps(p.get('project_name', 'Unnamed Project'))},")
        content.append(f"    description: {json.dumps(p.get('description', ''))},")
        content.append(f"    tech_stack: {json.dumps(p.get('tech_stack', []))},")
        
        project_url = p.get('project_url')
        project_url_str = json.dumps(project_url) if (project_url and project_url != 'N/A') else 'null'
        content.append(f"    project_url: {project_url_str},")
        
        github_url = p.get('github_url')
        github_url_str = json.dumps(github_url) if (github_url and github_url != 'N/A') else 'null'
        content.append(f"    github_url: {github_url_str},")
        
        content.append(f"    start_date: {json.dumps(p.get('start_date', None))},")
        content.append(f"    end_date: {json.dumps(p.get('end_date', None))},")
        content.append("  },")
    content.append("];")
    content.append("")
    
    # Render experience
    content.append("const cleanExperience: ExperienceData[] = [")
    for exp in experience:
        company_name = exp.get('company_name', '')
        if company_name == 'Unknown Company' and 'TechnoHacks' in exp.get('role_title', ''):
            company_name = 'TechnoHacks EduTech'
        content.append("  {")
        content.append(f"    id: {json.dumps(exp.get('id', ''))},")
        content.append(f"    company_name: {json.dumps(company_name)},")
        content.append(f"    role_title: {json.dumps(exp.get('role_title', ''))},")
        content.append(f"    employment_type: {json.dumps(exp.get('employment_type', ''))},")
        content.append(f"    location: {json.dumps(exp.get('location', ''))},")
        content.append(f"    start_date: {json.dumps(exp.get('start_date', None))},")
        content.append(f"    end_date: {json.dumps(exp.get('end_date', None))},")
        content.append(f"    description: {json.dumps(exp.get('description', 'Gained hands-on experience in software development and technical solutions.'))},")
        content.append(f"    skills_used: {json.dumps(exp.get('skills_used', []))},")
        content.append("  },")
    content.append("];")
    content.append("")
    
    # Render education
    content.append("const cleanEducation: EducationData[] = [")
    for edu in education:
        content.append("  {")
        content.append(f"    id: {json.dumps(edu.get('id', ''))},")
        content.append(f"    institution_name: {json.dumps(edu.get('institution_name', ''))},")
        content.append(f"    degree: {json.dumps(edu.get('degree', ''))},")
        content.append(f"    field_of_study: {json.dumps(edu.get('field_of_study', ''))},")
        content.append(f"    cgpa: {json.dumps(edu.get('cgpa', None))},")
        content.append(f"    start_year: {edu.get('start_year', 0)},")
        content.append(f"    end_year: {edu.get('end_year', 0)},")
        content.append(f"    is_current: {'true' if edu.get('is_current') else 'false'},")
        content.append("  },")
    content.append("];")
    content.append("")
    
    # Render skills
    content.append("const cleanSkills: SkillData[] = [")
    for s in skills:
        content.append("  {")
        content.append(f"    id: {json.dumps(s.get('id', ''))},")
        content.append(f"    skill_name: {json.dumps(s.get('skill_name', ''))},")
        content.append(f"    category: {json.dumps(s.get('category', 'Other'))},")
        content.append(f"    proficiency_level: {json.dumps(s.get('proficiency_level', 'INTERMEDIATE'))},")
        content.append(f"    is_primary: {'true' if s.get('is_primary') else 'false'},")
        content.append("  },")
    content.append("];")
    content.append("")
    
    # Render achievements
    content.append("const cleanAchievements: AchievementData[] = [")
    for a in achievements:
        if not a.get('title') or a.get('title') == 'CERTIFICATES':
            continue
        content.append("  {")
        content.append(f"    id: {json.dumps(a.get('id', ''))},")
        content.append(f"    achievement_type: {json.dumps(a.get('achievement_type', 'AWARD'))},")
        content.append(f"    title: {json.dumps(a.get('title', ''))},")
        content.append(f"    description: {json.dumps(a.get('description', ''))},")
        content.append(f"    date_achieved: {json.dumps(a.get('date_achieved', None))},")
        content.append("  },")
    content.append("];")
    content.append("")
    
    # Render exported portfolioData object
    city = profile.get('address_city', 'Kakinada')
    state = profile.get('address_state', 'Andhra Pradesh')
    country = profile.get('address_country', 'India')
    location = f"{city}, {state}, {country}"
    
    content.append("export const portfolioData = {")
    content.append("  personal: {")
    content.append("    name: 'Nagalla Satish',")
    content.append("    email: 'satishnagalla0@gmail.com',")
    content.append("    phone: '+91-6302394400',")
    content.append(f"    location: {json.dumps(location)},")
    content.append(f"    github: {json.dumps(profile.get('github_url', 'https://github.com/satish05112003'))},")
    content.append(f"    linkedin: {json.dumps(profile.get('linkedin_url', 'https://www.linkedin.com/in/nagallasatish/'))},")
    content.append("    role: 'Embedded Systems & AI Engineer',")
    content.append(f"    summary: {json.dumps(profile.get('profile_summary', ''))},")
    content.append("  },")
    
    pref_roles = preferences.get('preferred_roles', [])
    pref_locs = preferences.get('preferred_locations', [])
    content.append("  preferences: {")
    content.append(f"    preferredRoles: {json.dumps(pref_roles)},")
    content.append(f"    preferredLocations: {json.dumps(pref_locs)},")
    content.append("  },")
    
    content.append("  skills: cleanSkills,")
    
    # Render skillsByCategory reducer equivalent
    content.append("  skillsByCategory: cleanSkills.reduce((acc: { [key: string]: SkillData[] }, skill: SkillData) => {")
    content.append("    const cat = skill.category;")
    content.append("    if (!acc[cat]) {")
    content.append("      acc[cat] = [];")
    content.append("    }")
    content.append("    if (!acc[cat].some(s => s.skill_name.toLowerCase() === skill.skill_name.toLowerCase())) {")
    content.append("      acc[cat].push(skill);")
    content.append("    }")
    content.append("    return acc;")
    content.append("  }, {}),")
    
    content.append("  education: cleanEducation,")
    content.append("  experience: cleanExperience,")
    content.append("  projects: cleanProjects,")
    content.append("  achievements: cleanAchievements,")
    content.append("};")
    
    # Make directory if not exists
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(content) + '\n')
        
    print(f"Generated {out_path} successfully!")

if __name__ == '__main__':
    main()
