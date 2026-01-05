# Helios-Blogs

A minimalist blog platform built with Next.js and TypeScript, designed for focused writing with Markdown/MDX support.

## Features

- **Essential Pages**: Home, Post Detail, Create Post, About, Contact, and 404 pages
- **Markdown/MDX Support**: Write content in Markdown or MDX format
- **Post Metadata**: Support for title, description, featured images, tags, categories, and reading time
- **Automatic Reading Time**: Estimates reading time for each post
- **Clean Navigation**: Simple and intuitive navigation for readers
- **Responsive Design**: Works seamlessly on all devices
- **Dark Mode**: Automatic dark mode support based on system preferences

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kms-hoangdao/Helios-Blogs.git
cd Helios-Blogs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Creating a Blog Post

### Method 1: Using the Create Post Page

1. Navigate to `/create` in your browser
2. Fill in the post details (title, description, date, etc.)
3. Write your content in Markdown
4. Click "Download Markdown File"
5. Save the file to the `content/posts` directory

### Method 2: Manual Creation

Create a new `.md` or `.mdx` file in the `content/posts` directory with the following structure:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2024-01-15"
featuredImage: "https://example.com/image.jpg"
tags: ["tag1", "tag2", "tag3"]
category: "Category Name"
---

# Your Post Content

Write your content here in Markdown...
```

## Project Structure

```
Helios-Blogs/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── create/            # Create post page
│   ├── posts/[slug]/      # Dynamic post pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
├── components/            # React components
│   └── Navigation.tsx     # Navigation component
├── content/               # Blog content
│   └── posts/            # Blog posts (Markdown/MDX)
├── lib/                   # Utility functions
│   ├── markdown.ts       # Markdown processing
│   └── posts.ts          # Post management utilities
└── public/               # Static assets

```

## Post Metadata

Each post supports the following metadata:

- `title` (required): The post title
- `description` (required): A brief description
- `date` (required): Publication date (YYYY-MM-DD)
- `featuredImage` (optional): URL to a featured image
- `tags` (optional): Array of tags
- `category` (optional): Post category

## Technologies Used

- **Next.js 15**: React framework for production
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **MDX**: Markdown with JSX support
- **Gray Matter**: Front matter parsing
- **Reading Time**: Automatic reading time calculation

## License

ISC
