export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  tags: string[];
  category: "commercial" | "youtube" | "vlog" | "podcast" | "documentary";
  featured: boolean;
  videoUrl?: string;
  youtubeId?: string;
  client?: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Documentry Edit",
    description:
      "High-impact cinematic video with stunning visuals and dynamic transitions.",
    longDescription:
      "Created a compelling cinematic piece that showcases advanced editing techniques, color grading, and visual storytelling.",
    thumbnail: "/projects/project1.jpg",
    tags: ["Motion Graphics", "storytelling"],
    category: "documentary",
    featured: true,
    youtubeId: "wLpLqsPxye4",
    year: "2024",
  },
  {
    id: "project-2",
    title: "Vlog edit",
    description:
      "Engaging video content optimized for YouTube audience retention.",
    longDescription:
      "Produced and edited engaging YouTube content focusing on pacing, visual storytelling, and audience retention strategies.",
    thumbnail: "/projects/project2.jpg",
    tags: ["YouTube", "Content", "vlog"],
    category: "vlog",
    featured: true,
    youtubeId: "t8JJQthss-Y",
    year: "2024",
  },
  {
    id: "project-3",
    title: "Podcast Edit",
    description:
      "Dynamic montage with creative transitions and visual effects.",
    longDescription:
      "Created a visually stunning montage with perfectly synced transitions and engaging visual effects.",
    thumbnail: "/projects/project3.jpg",
    tags: ["podcast", "Transitions"],
    category: "podcast",
    featured: true,
    youtubeId: "Rxw-zkhT6ro",
    year: "2024",
  },
  {
    id: "project-4",
    title: "Commercial and Advertisement",
    description:
      "Creative music video editing with dynamic transitions and effects.",
    longDescription:
      "Edited music videos with perfect beat synchronization, creative transitions, and visual storytelling.",
    thumbnail: "/projects/project4.jpg",
    tags: ["Commercial", "Advertisement", "Creative"],
    category: "commercial",
    featured: true,
    youtubeId: "K3BtY2aKVrc",
    year: "2024",
  },
  {
    id: "project-5",
    title: "Talking head",
    description:
      "Professional promotional content for brands and businesses.",
    longDescription:
      "Created professional promotional videos that elevate brand presence and drive engagement.",
    thumbnail: "/projects/project5.jpg",
    tags: ["Promotional", "Branding", "Commercial"],
    category: "youtube",
    featured: true,
    youtubeId: "IURtLzBfp4s",
    year: "2024",
  },
  {
    id: "project-6",
    title: "AI Animation",
    description:
      "Story-driven documentary content with emotional narrative flow.",
    longDescription:
      "Crafted documentary-style videos focusing on narrative structure and emotional storytelling.",
    thumbnail: "/projects/project6.jpg",
    tags: ["AI", "Animation", "Narrative"],
    category: "youtube",
    featured: true,
    youtubeId: "3FmmbM2xpEQ",
    year: "2024",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
