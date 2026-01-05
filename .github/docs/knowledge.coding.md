# Technical Knowledge Base - Personal Blog Color Update

> **Generated**: January 5, 2026  
> **Purpose**: Technical onboarding guide for developers and architects

---

## 1. ARCHITECTURAL ASSESSMENT

### 1.1 Overall Architecture

**Architecture Pattern:** Single-Page Application (SPA) Monolith

The project follows a standard React SPA architecture built with Vite as the build tool. Key characteristics:

- **Type:** Frontend-only web application
- **Pattern:** Monolithic SPA with client-side routing
- **Build Tool:** Vite (v6.3.5) with React plugin
- **Entry Point:** `index.html` → `src/main.tsx` → `src/app/App.tsx`

**Top-Level Directory Structure:**

```
/                           # Root directory
├── .github/                # GitHub-specific files (instructions, prompts, docs, plans)
├── public/                 # Static assets (robots.txt, sitemap.xml)
├── src/                    # Application source code
│   ├── app/                # Core application logic
│   └── styles/             # Global styles and theme definitions
├── guidelines/             # Project guidelines documentation
├── index.html              # HTML entry point
├── vite.config.ts          # Vite build configuration
├── postcss.config.mjs      # PostCSS configuration (minimal, Tailwind v4 handles most)
└── package.json            # Project dependencies and scripts
```

### 1.2 Shared Code Conventions

**Common Code Organization Patterns:**

1. **UI Components Library** (`src/app/components/ui/`)
   - Location: Radix UI-based primitive components
   - Pattern: Headless UI components with customizable styling
   - Includes: 40+ reusable components (buttons, dialogs, forms, etc.)
   - Utility: `utils.ts` - Contains `cn()` helper for className merging (clsx + tailwind-merge)

2. **Application Components** (`src/app/components/`)
   - Feature-specific reusable components
   - Layout components (Header, Footer)
   - Content components (BlogCard, MarkdownRenderer, SEO)
   - Figma integration components (`components/figma/`)

3. **Data Layer** (`src/app/data/`)
   - Static data definitions
   - TypeScript interfaces for data models
   - Example: `blogPosts.ts` with BlogPost interface and data array

4. **Styling System** (`src/styles/`)
   - `index.css` - Central import file
   - `theme.css` - CSS custom properties for design tokens (colors, spacing)
   - `fonts.css` - Font declarations
   - `tailwind.css` - Tailwind base imports

5. **Pages** (`src/app/pages/`)
   - Route-level components
   - Each page corresponds to a route in the application

### 1.3 Cross-Cutting Concerns

**System-Wide Functionalities:**

1. **Theming & Design System**
   - Location: `src/styles/theme.css`
   - Approach: CSS custom properties with light/dark mode support
   - Color Scheme: Warm Brown theme with semantic color tokens
   - Variables: `--background`, `--foreground`, `--primary`, `--accent`, etc.
   - Dark Mode: `.dark` class variant with automatic switching

2. **Routing**
   - Library: React Router DOM (v7.11.0)
   - Configuration: Defined in `src/app/App.tsx`
   - Pattern: Declarative routing with `<BrowserRouter>` and `<Routes>`
   - Routes:
     - `/` - Home
     - `/blog` - Blog listing
     - `/blog/:slug` - Individual post
     - `/about` - About page
     - `/contact` - Contact page
     - `/404` and `*` - Not found handling

3. **SEO Management**
   - Component: `src/app/components/SEO.tsx`
   - Approach: Dynamic meta tag injection via useEffect
   - Features:
     - Document title updates
     - Meta descriptions
     - Open Graph tags (og:title, og:description, og:image, og:url)
     - Twitter Card tags
   - Pattern: Component-based, used per-page for custom SEO

4. **Content Rendering**
   - Component: `src/app/components/MarkdownRenderer.tsx`
   - Library: react-markdown with remark-gfm plugin
   - Features:
     - GitHub Flavored Markdown support
     - Syntax highlighting (react-syntax-highlighter with Prism)
     - Custom prose styling via Tailwind typography
   - Use Case: Blog post content rendering

5. **Styling Architecture**
   - Primary: Tailwind CSS v4.1.12 (via @tailwindcss/vite)
   - Secondary: CSS Custom Properties for theming
   - Component Styling: Class Variance Authority (CVA) for variant-based components
   - Utility: `cn()` function for conditional className merging
   - Path Alias: `@/` mapped to `./src/` directory

6. **Static Assets & SEO**
   - Location: `public/` directory
   - Files:
     - `robots.txt` - Search engine crawling rules
     - `sitemap.xml` - Site structure for search engines
   - Deployment: Static files served at root level

7. **Type Safety**
   - Language: TypeScript throughout entire codebase
   - Pattern: Interface-driven development
   - Example: BlogPost interface defines content structure

8. **Build & Development**
   - Build Tool: Vite with React and Tailwind plugins
   - Path Resolution: Absolute imports via `@/` alias
   - Hot Module Replacement: Native Vite HMR for development

**Notable Patterns:**

- No authentication/authorization (public blog)
- No API integration (static data from `blogPosts.ts`)
- No state management library (local component state sufficient)
- No logging framework (browser console for development)
- No error boundary implementation detected
- No configuration management beyond environment variables

