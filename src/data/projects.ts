export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  tags: string[];
  category: "commercial" | "youtube" | "social" | "music" | "documentary";
  featured: boolean;
  videoUrl?: string;
  youtubeId?: string;
  client?: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Cinematic Edit",
    description:
      "High-impact cinematic video with stunning visuals and dynamic transitions.",
    longDescription:
      "Created a compelling cinematic piece that showcases advanced editing techniques, color grading, and visual storytelling.",
    thumbnail: "/projects/project1.jpg",
    tags: ["Cinematic", "Color Grading", "Motion Graphics"],
    category: "commercial",
    featured: true,
    youtubeId: "wLpLqsPxye4",
    year: "2024",
  },
  {
    id: "project-2",
    title: "YouTube Content",
    description:
      "Engaging video content optimized for YouTube audience retention.",
    longDescription:
      "Produced and edited engaging YouTube content focusing on pacing, visual storytelling, and audience retention strategies.",
    thumbnail: "/projects/project2.jpg",
    tags: ["YouTube", "Content", "Editing"],
    category: "youtube",
    featured: true,
    youtubeId: "t8JJQthss-Y",
    year: "2024",
  },
  {
    id: "project-3",
    title: "Creative Montage",
    description:
      "Dynamic montage with creative transitions and visual effects.",
    longDescription:
      "Created a visually stunning montage with perfectly synced transitions and engaging visual effects.",
    thumbnail: "/projects/project3.jpg",
    tags: ["Montage", "VFX", "Transitions"],
    category: "social",
    featured: true,
    youtubeId: "Rxw-zkhT6ro",
    year: "2024",
  },
  {
    id: "project-4",
    title: "Music Video Edit",
    description:
      "Creative music video editing with dynamic transitions and effects.",
    longDescription:
      "Edited music videos with perfect beat synchronization, creative transitions, and visual storytelling.",
    thumbnail: "/projects/project4.jpg",
    tags: ["Music Video", "Sync", "Creative"],
    category: "music",
    featured: true,
    youtubeId: "K3BtY2aKVrc",
    year: "2024",
  },
  {
    id: "project-5",
    title: "Promotional Video",
    description:
      "Professional promotional content for brands and businesses.",
    longDescription:
      "Created professional promotional videos that elevate brand presence and drive engagement.",
    thumbnail: "/projects/project5.jpg",
    tags: ["Promotional", "Branding", "Commercial"],
    category: "commercial",
    featured: true,
    youtubeId: "IURtLzBfp4s",
    year: "2024",
  },
  {
    id: "project-6",
    title: "Documentary Style",
    description:
      "Story-driven documentary content with emotional narrative flow.",
    longDescription:
      "Crafted documentary-style videos focusing on narrative structure and emotional storytelling.",
    thumbnail: "/projects/project6.jpg",
    tags: ["Documentary", "Storytelling", "Narrative"],
    category: "documentary",
    featured: true,
    youtubeId: "3FmmbM2xpEQ",
    year: "2024",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
