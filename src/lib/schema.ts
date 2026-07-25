export interface SocialProfile {
  "@type": "Person";
  name: string;
  alternateName: string;
  url: string;
  image: string;
  description: string;
  jobTitle: string;
  email: string;
  telephone: string;
  sameAs: string[];
  knowsAbout: string[];
  worksFor: {
    "@type": "Organization";
    name: string;
  };
}

export interface WebsiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  alternateName: string;
  url: string;
  description: string;
  author: SocialProfile;
  publisher: {
    "@type": "Person";
    name: string;
  };
  potentialAction: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

export interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  alternateName: string;
  url: string;
  image: string;
  description: string;
  jobTitle: string;
  email: string;
  telephone: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
  };
  sameAs: string[];
  knowsAbout: string[];
}

export interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  serviceType: string;
  provider: {
    "@type": "Person";
    name: string;
    url: string;
  };
  areaServed: string;
  description: string;
}

// Generate Person/Professional Schema
export function generatePersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Diwash Ghimire",
    alternateName: "Erson",
    url: "https://erson.studio",
    image: "https://erson.studio/images/Resolve.jpg",
    description:
      "I help businesses turn raw footage into content that drives watch time, conversions, and brand recall. 3+ years of professional video editing with a mainstream media background.",
    jobTitle: "Professional Video Editor",
    email: "erson.editz@gmail.com",
    telephone: "+977-9825968458",
    address: {
      "@type": "PostalAddress",
      addressLocality: "All Over The World",
    },
    sameAs: [
      "https://www.instagram.com/erson.editz/",
      "https://www.youtube.com/@ersoneditz",
      "https://www.linkedin.com/in/ersoneditz/",
      "https://www.fiverr.com/s/BRk6mpW",
    ],
    knowsAbout: [
      "Video Editing",
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "Motion Graphics",
      "Color Grading",
      "After Effects",
      "Content Creation",
      "Storytelling",
    ],
  };
}

// Generate Website Schema
export function generateWebsiteSchema(): WebsiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Erson Studio",
    alternateName: "Erson",
    url: "https://erson.studio",
    description:
      "I help businesses turn raw footage into content that drives watch time, conversions, and brand recall. 3+ years of professional video editing with a mainstream media background.",
    author: {
      "@type": "Person",
      name: "Diwash Ghimire",
      alternateName: "Erson",
      url: "https://erson.studio",
      image: "https://erson.studio/og-image.jpg",
      description: "Professional Video Editor & Content Strategist",
      jobTitle: "Video Editor",
      email: "erson.editz@gmail.com",
      telephone: "+977-9825968458",
      sameAs: [
        "https://www.instagram.com/erson.editz/",
        "https://www.youtube.com/@ersoneditz",
        "https://www.linkedin.com/in/ersoneditz/",
      ],
      knowsAbout: ["Video Editing", "Motion Graphics", "Content Creation"],
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
    },
    publisher: {
      "@type": "Person",
      name: "Diwash Ghimire",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://erson.studio/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

// Generate Service Schema for Video Editing Services
export function generateServiceSchema(): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Video Editing Services",
    provider: {
      "@type": "Person",
      name: "Diwash Ghimire",
      url: "https://erson.studio",
    },
    areaServed: "Worldwide",
    description:
      "Professional video editing services including color grading, motion graphics, audio synchronization, and storytelling for YouTube, commercials, and social media content.",
  };
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

// Generate FAQ Schema for Services and GEO Search Optimization
export function generateFAQSchema(): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is included in a Content Partnership retainer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Content Partnership retainers provide ongoing monthly post-production services including video editing, motion graphics, custom color grading (DaVinci Resolve), sound design, script polishing, and direct brand strategy support.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a retention video edit take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Short-form video edits (Reels/Shorts) typically take 24–48 hours, while long-form YouTube or commercial edits take 3–5 business days. Retainer client projects receive priority delivery timelines.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between a project rate and a monthly retainer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A project rate covers a single video edit with fixed revision rounds. A monthly retainer reserves guaranteed editing capacity, lowers cost-per-video, accelerates turnaround, and establishes consistent brand identity.",
        },
      },
      {
        "@type": "Question",
        name: "How does Erson Studio scale YouTube channels from 8K to 10M+ views?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We utilize a 3-second kinetic hook formula combined with visual pattern interrupts every 3 to 5 seconds and color-graded visual consistency, increasing viewer watch time by over 400%.",
        },
      },
    ],
  };
}

// Generate BlogPosting Schema for Article Pages
export function generateBlogPostingSchema(blog: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  date: string;
  author: { name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    url: `https://erson.studio/blogs/${blog.slug}`,
    image: blog.coverImage.startsWith("http")
      ? blog.coverImage
      : `https://erson.studio${blog.coverImage}`,
    datePublished: blog.date,
    author: {
      "@type": "Person",
      name: blog.author.name || "Erson",
      url: "https://erson.studio",
    },
    publisher: {
      "@type": "Person",
      name: "Diwash Ghimire",
      url: "https://erson.studio",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://erson.studio/blogs/${blog.slug}`,
    },
  };
}

