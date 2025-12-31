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
    alternateName: "Erson Editz",
    url: "https://diwash-ghimire.com.np",
    image: "https://diwash-ghimire.com.np/images/Resolve.jpg",
    description:
      "Get high-quality video edits for YouTube, social media, and businesses. Professional editing with a creative touch to grow your audience and enhance visual storytelling.",
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
    name: "Erson Editz Portfolio",
    alternateName: "Diwash Ghimire - Video Editor",
    url: "https://diwash-ghimire.com.np",
    description:
      "Get high-quality video edits for YouTube, social media, and businesses. Professional editing with a creative touch to grow your audience and enhance visual storytelling.",
    author: {
      "@type": "Person",
      name: "Diwash Ghimire",
      alternateName: "Erson",
      url: "https://diwash-ghimire.com.np",
      image: "https://diwash-ghimire.com.np/og-image.jpg",
      description: "Professional Video Editor & Creative Professional",
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
      target: "https://diwash-ghimire.com.np/?s={search_term_string}",
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
      url: "https://diwash-ghimire.com.np",
    },
    areaServed: "Worldwide",
    description:
      "Professional video editing services including color grading, motion graphics, audio synchronization, and storytelling for YouTube, commercials, and social media content.",
  };
}
