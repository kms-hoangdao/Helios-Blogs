'use client';

import { useState } from 'react';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    featuredImage: '',
    tags: '',
    category: '',
    content: '',
  });

  const [preview, setPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateMarkdown = () => {
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const frontmatter = `---
title: "${formData.title}"
description: "${formData.description}"
date: "${formData.date}"${formData.featuredImage ? `\nfeaturedImage: "${formData.featuredImage}"` : ''}${tags.length > 0 ? `\ntags: [${tags.map(tag => `"${tag}"`).join(', ')}]` : ''}${formData.category ? `\ncategory: "${formData.category}"` : ''}
---

${formData.content}`;
    return frontmatter;
  };

  const handleDownload = () => {
    const markdown = generateMarkdown();
    const filename = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'untitled';
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Create a New Post</h1>
      
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Fill out the form below to create your blog post. Once you're done, download the markdown file and save it to the <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">content/posts</code> directory.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your post"
              />
            </div>

            <div>
              <label htmlFor="date" className="block font-medium mb-2">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="featuredImage" className="block font-medium mb-2">
                Featured Image URL
              </label>
              <input
                type="text"
                id="featuredImage"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label htmlFor="category" className="block font-medium mb-2">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Technology, Lifestyle, etc."
              />
            </div>

            <div>
              <label htmlFor="tags" className="block font-medium mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="react, nextjs, typescript"
              />
            </div>

            <div>
              <label htmlFor="content" className="block font-medium mb-2">
                Content (Markdown) *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Write your content in Markdown..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Download Markdown File
              </button>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
              >
                {preview ? 'Hide' : 'Show'} Preview
              </button>
            </div>
          </form>
        </div>

        {preview && (
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <div className="prose dark:prose-invert max-w-none">
              <h1>{formData.title || 'Untitled Post'}</h1>
              <p className="text-gray-600 dark:text-gray-400">{formData.description}</p>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                {formData.date && new Date(formData.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {formData.category && ` • ${formData.category}`}
              </div>
              {formData.tags && (
                <div className="flex flex-wrap gap-2 my-4">
                  {formData.tags.split(',').map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              <div className="whitespace-pre-wrap">{formData.content}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
