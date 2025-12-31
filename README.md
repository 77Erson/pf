# Diwash Ghimire Portfolio

A modern, premium portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Modern Design** - Minimalist, cinematic, and premium aesthetic
- 🌓 **Dark/Light Mode** - Smooth theme transitions with system preference support
- ✨ **Animations** - Subtle, professional Framer Motion animations
- 📱 **Fully Responsive** - Mobile-first design approach
- ⚡ **Performance Optimized** - Next.js 14 with App Router
- ♿ **Accessible** - Semantic HTML and ARIA attributes
- 🔍 **SEO Ready** - Optimized metadata and OpenGraph tags

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & CSS variables
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Main page component
├── components/
│   ├── layout/
│   │   ├── navbar.tsx   # Navigation bar
│   │   └── footer.tsx   # Footer component
│   ├── sections/
│   │   ├── hero.tsx     # Hero section
│   │   ├── about.tsx    # About section
│   │   ├── skills.tsx   # Skills section
│   │   ├── work.tsx     # Portfolio/Work section
│   │   ├── testimonials.tsx  # Testimonials section
│   │   └── contact.tsx  # Contact section
│   └── providers/
│       └── theme-provider.tsx  # Theme context provider
├── data/
│   ├── site-config.ts   # Site configuration & social links
│   ├── about.ts         # About section content
│   ├── skills.ts        # Skills & categories data
│   ├── projects.ts      # Portfolio projects data
│   └── testimonials.ts  # Client testimonials
└── lib/
    └── utils.ts         # Utility functions
```

## Customization

### Content

All content is stored in the `/src/data/` directory:

- `site-config.ts` - Name, title, contact info, social links
- `about.ts` - Bio, highlights, and stats
- `skills.ts` - Skill categories and proficiency levels
- `projects.ts` - Portfolio projects with details
- `testimonials.ts` - Client testimonials

### Styling

- Colors and theme variables are in `/src/app/globals.css`
- Tailwind configuration in `tailwind.config.ts`

### Adding Images

1. Place images in `/public/` directory
2. Update image paths in data files
3. For project thumbnails, use `/public/projects/` directory

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
npx vercel
```

### Other Platforms

Build the project and deploy the `.next` output:

```bash
npm run build
```

## License

MIT License - Feel free to use this template for your own portfolio!

---

By Diwash Ghimire
