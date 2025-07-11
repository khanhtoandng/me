# Baraa Alshaer Portfolio - Static Version

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This is a **static frontend-only version** that can be deployed to any static hosting service without requiring a backend server or database.

## ✨ Features

- 🎨 Modern and responsive design
- 🌙 Dark/Light theme support
- 🌍 Internationalization (English/Arabic)
- 📱 Mobile-first approach
- ⚡ Optimized performance with static export
- 🔍 SEO optimized
- 📊 Analytics integration (optional)
- 🎯 Contact form with EmailJS (no backend required)
- 📄 Static data management through JSON/TypeScript files

## 🚀 Tech Stack

- **Framework**: Next.js 15 (Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion + GSAP
- **Email**: EmailJS (for contact form)
- **Deployment**: Static hosting (Netlify, Vercel, GitHub Pages, etc.)
- **Analytics**: Vercel Analytics (optional)

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory (static pages)
├── components/          # Reusable components
│   ├── ui/             # Base UI components
│   └── website/        # Website-specific components
├── hooks/              # Custom React hooks (now use static data)
├── lib/                # Utility functions and configurations
├── data/               # Static data files (replaces database)
│   ├── Education.ts    # Education data
│   ├── Experiences.ts  # Work experience data
│   ├── Projects.ts     # Project portfolio data
│   ├── Recommendations.ts # Client recommendations
│   ├── Profile.ts      # Personal profile information
│   ├── Content.ts      # Website content (hero, about, etc.)
│   └── SocialLinks.ts  # Social media links
└── styles/             # Global styles
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/balshaer/alshaer.git
cd alshaer
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables for EmailJS (optional):

```bash
cp .env.example .env.local
```

Fill in the EmailJS configuration if you want the contact form to work:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:4000](http://localhost:4000) in your browser.

## 📝 Customizing Your Portfolio

### 1. Update Personal Information

Edit the files in `src/data/` to customize your portfolio:

- **Profile.ts**: Your basic information, bio, skills
- **Experiences.ts**: Work experience and job history
- **Education.ts**: Educational background
- **Projects.ts**: Your project portfolio
- **Recommendations.ts**: Client testimonials
- **SocialLinks.ts**: Social media profiles
- **Content.ts**: Website content (hero section, about, etc.)

### 2. Add Your Projects

Update `src/data/Projects.ts` with your own projects:

```typescript
{
  _id: "proj_new",
  title: "Your Project Name",
  description: "Project description...",
  projectType: "Web Application",
  images: [],
  websiteUrl: "https://your-project.com",
  githubUrl: "https://github.com/you/project",
  technologies: ["React", "Node.js", "MongoDB"],
  featured: true,
  status: "Published",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

### 3. Configure Contact Form

To enable the contact form:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Add your credentials to `.env.local`
4. The form will automatically send emails to your configured address

## 🚀 Building and Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized static build in the `out/` directory.

### Deploy to Static Hosting

#### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Deploy

#### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel automatically detects Next.js and configures static export
3. Deploy

#### GitHub Pages

1. Build the project: `npm run build`
2. Push the `out/` directory to your `gh-pages` branch
3. Enable GitHub Pages in repository settings

#### Other Static Hosts

Upload the contents of the `out/` directory to any static hosting service.

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server (for testing)
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run serve` - Serve the built static files locally

## 🔧 Configuration

### Next.js Configuration

The project is configured for static export in `next.config.ts`:

```typescript
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // ... other configurations
};
```

### Environment Variables

Only client-side environment variables are supported in static export:

```env
# EmailJS (optional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_USER_ID=

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

## 🎨 Customization

### Themes and Styling

- Colors and themes are configured in `tailwind.config.js`
- Global styles are in `src/styles/globals.css`
- Component styles use Tailwind CSS classes

### Adding New Sections

1. Create new data files in `src/data/`
2. Create corresponding hooks in `src/hooks/`
3. Add components in `src/components/website/`
4. Update the main page in `src/app/page.tsx`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: alshaer.contact@gmail.com
- **LinkedIn**: [linkedin.com/in/balshaer](https://linkedin.com/in/balshaer)
- **GitHub**: [github.com/balshaer](https://github.com/balshaer)

---

**Note**: This is a static version of the portfolio that doesn't require a backend server or database. All data is stored in TypeScript/JSON files within the project, making it perfect for static hosting services.
