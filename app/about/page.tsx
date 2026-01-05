export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">About Helios Blogs</h1>
      
      <div className="prose dark:prose-invert max-w-none prose-lg">
        <p className="text-xl mb-6">
          Helios Blogs is a minimalist blog platform designed for writers who want to focus on their content rather than tooling.
        </p>
        
        <h2 className="text-3xl font-bold mb-4 mt-8">Our Mission</h2>
        <p>
          We believe that great writing comes from clarity and focus. That's why we've built Helios Blogs to be simple, clean, and distraction-free.
        </p>
        
        <h2 className="text-3xl font-bold mb-4 mt-8">Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Write in Markdown or MDX for flexibility and simplicity</li>
          <li>Automatic reading time estimation for every post</li>
          <li>Support for featured images, tags, and categories</li>
          <li>Clean, responsive design that works on all devices</li>
          <li>Fast performance with static site generation</li>
        </ul>
        
        <h2 className="text-3xl font-bold mb-4 mt-8">Getting Started</h2>
        <p>
          Creating a post is easy. Simply navigate to the Create Post page, write your content in Markdown, add metadata, and you're done. Focus on what matters most: your words.
        </p>
      </div>
    </div>
  );
}
