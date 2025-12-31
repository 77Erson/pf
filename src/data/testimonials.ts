export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Eva Wei",
    role: "Media Executive",
    company: "Compass Wealth Management",
    content:
      "Erson was fantastic to work with. Extremely communicative, quality work. We look forward to working on future projects together!",
  },
  {
    id: "2",
    name: "Anusha Kharel",
    role: "Marketing Executive",
    company: "CG Communication",
    content:
      "Working with Erson was a game-changer for our Branding. His storytelling instincts and technical skills are truly remarkable.",
  },
  {
    id: "3",
    name: "Shriyanshu Dhakal",
    role: "Member",
    company: "AWS Cloud Club",
    content:
      "Erson took our commercial concept and elevated it beyond our expectations. The attention to pacing and visual flow was exceptional.",
  },
  {
    id: "4",
    name: "Clark Huskey",
    role: "Owner",
    company: "Monaco Pool",
    content:
      "Great video he edited our reaction video for us so we can post it on our YouTube channel. He has made multiple videos for us, and they were all great. I'll definitely keep using him as my editor.",
  },
  {
    id: "5",
    name: "Rakesh Mathuria",
    role: "Content Creator",
    company: "YouTube Channel - Rakesh Mathuria",
    content:
      "Great working with Diwash, delivered the job as I wanted and did the improvements with ease. Recommended for video editing works. Would like to work in future also. Thank you for your creative work and attention to detail.",
  },
  {
    id: "6",
    name: "Janak Pokharel",
    role: "Founder",
    company: "Moontide Marketing",
    content:
      "He's been our editor for a while now and he always delivers great quality work. He is very responsive and always open to work. Very hardworking and dedicated to his craft. I highly recommend him.",
  },
];
