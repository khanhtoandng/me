# Baraa Alshaer - Portfolio

A modern, responsive portfolio website showcasing my work as a Full-Stack Developer. Built with Next.js and optimized for static hosting with no backend dependencies.

## Features

- **Static Export** - Deployable to any static hosting service
- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark/Light Theme** - Smooth theme switching with system preference detection
- **Contact Form** - Integrated with EmailJS for direct messaging
- **Performance Optimized** - Fast loading with optimized assets
- **SEO Ready** - Meta tags and structured data for search engines

## Tech Stack

- **Framework**: Next.js 15 (Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Email**: EmailJS
- **Icons**: Lucide React

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/balshaer/alshaer.git
   cd alshaer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional for contact form)
   ```bash
   cp .env.example .env.local
   ```
   Add your EmailJS credentials:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Build & Deployment

### Build for Production
```bash
npm run build
```
This generates a static build in the `out/` directory.

### Deploy to Static Hosting

**Netlify**
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out`

**Vercel**
1. Import your GitHub repository
2. Vercel automatically detects Next.js configuration

**GitHub Pages**
1. Build the project: `npm run build`
2. Deploy the `out/` directory to your `gh-pages` branch

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── data/               # Static data files
│   ├── Profile.ts      # Personal information
│   ├── Experiences.ts  # Work experience
│   ├── Education.ts    # Educational background
│   ├── Projects.ts     # Portfolio projects
│   └── ...
├── hooks/              # Custom React hooks
└── styles/             # Global styles
```

## Customization

Update your portfolio by editing the data files in `src/data/`:

- **Profile.ts** - Personal info, bio, skills
- **Experiences.ts** - Work experience and achievements
- **Education.ts** - Educational background
- **Projects.ts** - Portfolio projects with links and descriptions

## Contact

- **Email**: alshaer.contact@gmail.com
- **LinkedIn**: [linkedin.com/in/balshaer](https://linkedin.com/in/balshaer)
- **GitHub**: [github.com/balshaer](https://github.com/balshaer)
- **Portfolio**: [alshaer.vercel.app](https://alshaer.vercel.app)

---

Built with ❤️ by Baraa Alshaer
