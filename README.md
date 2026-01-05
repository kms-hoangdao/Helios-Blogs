# Technical Knowledge Base - Personal Blog Color Update

> **Generated**: January 5, 2026  
> **Purpose**: Technical onboarding guide for developers and architects

---

## Technical Stack

### Frontend

- **Framework:** React 18.3.1
- **Build Tool:** Vite 6.3.5 with React plugin
- **Language:** TypeScript
- **Routing:** React Router DOM v7.11.0
- **Styling:**
  - Tailwind CSS v4.1.12
  - CSS Custom Properties (theme.css)
  - Class Variance Authority for component variants
- **UI Components:**
  - Radix UI (40+ primitive components)
  - Material-UI (MUI) v7.3.5
  - Lucide React (icons)
- **Content Rendering:**
  - react-markdown v10.1.0
  - remark-gfm (GitHub Flavored Markdown)
  - react-syntax-highlighter v16.1.0
- **Animations:** Motion v12.23.24
- **Forms:** React Hook Form v7.55.0
- **Additional Libraries:**
  - date-fns v3.6.0
  - recharts v2.15.2 (charts)
  - sonner v2.0.3 (toast notifications)

### Backend & Database

- **Backend-as-a-Service:** Supabase
  - Authentication
  - PostgreSQL Database
  - Real-time subscriptions
  - Storage for images/media
  - Row Level Security (RLS)

### Development Tools

- **Package Manager:** pnpm
- **Code Quality:** TypeScript with strict mode
- **Path Aliases:** `@/` → `./src/`

---

## 1. ARCHITECTURAL ASSESSMENT

### 1.1 Overall Architecture

**Architecture Pattern:** Single-Page Application (SPA) with Backend-as-a-Service

The project follows a modern React SPA architecture built with Vite and integrated with Supabase for backend services. Key characteristics:

- **Type:** Full-stack web application
- **Pattern:** SPA with client-side routing and Supabase backend
- **Build Tool:** Vite (v6.3.5) with React plugin
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Real-time)
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
     - `/` - Home page
     - `/blog` - Blog listing page
     - `/blog/:slug` - Individual blog post detail
     - `/blog/create` - Create new blog post (admin)
     - `/about` - About page
     - `/contact` - Contact page
     - `/404` and `*` - Not found handling

3. **Backend Integration (Supabase)**

   - **Database:** PostgreSQL via Supabase
     - Tables: posts, users, categories, tags
     - Row Level Security (RLS) for access control
   - **Authentication:** Supabase Auth
     - JWT-based authentication
     - Email/password and OAuth providers
     - Protected routes for admin functions
   - **Storage:** Supabase Storage
     - Blog post images and media files
     - Public and private buckets
   - **Real-time:** Supabase Real-time subscriptions
     - Live updates for blog posts
     - Comment notifications
   - **API Client:** Supabase JS SDK
     - Location: Initialized in service layer
     - Pattern: Singleton client instance

4. **SEO Management**

   - Component: `src/app/components/SEO.tsx`
   - Approach: Dynamic meta tag injection via useEffect
   - Features:
     - Document title updates
     - Meta descriptions
     - Open Graph tags (og:title, og:description, og:image, og:url)
     - Twitter Card tags
   - Pattern: Component-based, used per-page for custom SEO

5. **Content Rendering**

   - Component: `src/app/components/MarkdownRenderer.tsx`
   - Library: react-markdown with remark-gfm plugin
   - Features:
     - GitHub Flavored Markdown support
     - Syntax highlighting (react-syntax-highlighter with Prism)
     - Custom prose styling via Tailwind typography
   - Use Case: Blog post content rendering

6. **Styling Architecture**

   - Primary: Tailwind CSS v4.1.12 (via @tailwindcss/vite)
   - Secondary: CSS Custom Properties for theming
   - Component Styling: Class Variance Authority (CVA) for variant-based components
   - Utility: `cn()` function for conditional className merging
   - Path Alias: `@/` mapped to `./src/` directory

7. **Static Assets & SEO**

   - Location: `public/` directory
   - Files:
     - `robots.txt` - Search engine crawling rules
     - `sitemap.xml` - Site structure for search engines
   - Deployment: Static files served at root level

8. **Authentication & Authorization**

   - Provider: Supabase Auth
   - Pattern: JWT Bearer tokens stored in localStorage
   - Protected Routes: Admin routes require authentication
   - User Roles: admin, author, viewer
   - Session Management: Automatic token refresh

9. **Type Safety**

   - Language: TypeScript throughout entire codebase
   - Pattern: Interface-driven development
   - Example: BlogPost interface defines content structure

10. **Build & Development**
    - Build Tool: Vite with React and Tailwind plugins
    - Path Resolution: Absolute imports via `@/` alias
    - Hot Module Replacement: Native Vite HMR for development

**Notable Patterns:**

- **Authentication:** Supabase Auth with JWT tokens for admin access
- **Data Persistence:** Supabase PostgreSQL with Row Level Security
- **Content Management:** Create/Edit blog posts via `/blog/create` page
- **Real-time Updates:** Supabase subscriptions for live content updates
- **Image Storage:** Supabase Storage for blog post media
- **Type Safety:** TypeScript interfaces for all data models
- **Error Handling:** Try-catch blocks with user-friendly error messages

---

## 2. KEY FEATURES

### 2.1 Blog Post Creation (Admin Feature)

**Page:** `/blog/create`  
**Component:** `src/app/pages/CreatePost.tsx` (to be implemented)

**Functionality:**

- **Authentication Required:** Only authenticated admin users can access
- **Rich Text Editor:** Markdown editor with live preview
- **Form Fields:**
  - Title (required)
  - Slug (auto-generated from title, editable)
  - Content (Markdown format)
  - Excerpt/Description
  - Featured Image (upload to Supabase Storage)
  - Tags/Categories (multi-select)
  - Publish Status (draft/published)
  - Publication Date
- **Image Upload:** Direct upload to Supabase Storage bucket
- **Auto-save:** Draft saved automatically to prevent data loss
- **Preview Mode:** Live preview of formatted blog post
- **Validation:** Client-side and server-side validation
- **SEO Fields:** Meta description, OG image, keywords

**Technical Implementation:**

```typescript
// Supabase Schema (posts table)
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // Markdown
  excerpt: string;
  featured_image: string; // Supabase Storage URL
  tags: string[];
  status: "draft" | "published";
  published_at: Date;
  author_id: string;
  created_at: Date;
  updated_at: Date;
}
```

**User Flow:**

1. Admin logs in via Supabase Auth
2. Navigate to `/blog/create`
3. Fill in blog post details
4. Upload featured image (stored in Supabase Storage)
5. Write content in Markdown with live preview
6. Save as draft or publish immediately
7. Post saved to Supabase PostgreSQL database
8. Redirect to blog post detail page

### 2.2 Database Schema (Supabase)

**Tables:**

- `posts` - Blog post content and metadata
- `users` - User accounts (managed by Supabase Auth)
- `categories` - Blog post categories
- `tags` - Blog post tags
- `post_tags` - Many-to-many relationship table

**Storage Buckets:**

- `blog-images` - Featured images and post media (public)
- `user-avatars` - User profile pictures (public)

**Row Level Security (RLS) Policies:**

- Public read access to published posts
- Admin-only write access to posts
- User can only edit their own posts

---

## 3. ENVIRONMENT CONFIGURATION

**Required Environment Variables:**

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Setup Instructions:**

1. Create a Supabase project at https://supabase.com
2. Copy project URL and anon key from Supabase dashboard
3. Create `.env` file in project root
4. Add environment variables
5. Run database migrations (if applicable)

---
