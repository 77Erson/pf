import {
  Video,
  Palette,
  Music,
  Layers,
  Camera,
  Film,
  Code,
  Globe,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface Skill {
  name: string;
  icon: LucideIcon;
  level: number; // 0-100
  category: "video" | "motion" | "tech";
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Video Editing",
    description: "Professional post-production and storytelling",
    icon: Film,
    skills: [
      { name: "DaVinci Resolve", icon: Video, level: 95, category: "video" },
      { name: "Adobe Premiere Pro", icon: Video, level: 90, category: "video" },
      { name: "Color Grading", icon: Palette, level: 88, category: "video" },
      { name: "Audio Sync & Mixing", icon: Music, level: 85, category: "video" },
      { name: "Storytelling", icon: Film, level: 92, category: "video" },
    ],
  },
  {
    title: "Motion Graphics",
    description: "Dynamic visuals and animated content",
    icon: Sparkles,
    skills: [
      { name: "After Effects", icon: Layers, level: 85, category: "motion" },
      { name: "3D Compositing", icon: Camera, level: 78, category: "motion" },
      { name: "Visual Effects", icon: Sparkles, level: 82, category: "motion" },
      { name: "Title Design", icon: Palette, level: 88, category: "motion" },
    ],
  },
  {
    title: "Web & Tech",
    description: "Technical skills and digital tools",
    icon: Code,
    skills: [
      { name: "Content Strategy", icon: Globe, level: 85, category: "tech" },
      { name: "Social Media", icon: Globe, level: 95, category: "tech" },
      { name: "SEO for Video", icon: Code, level: 90, category: "tech" },
    ],
  },
];

export const allSkills: Skill[] = skillCategories.flatMap((cat) => cat.skills);
