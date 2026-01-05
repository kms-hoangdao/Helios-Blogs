import { Link } from 'react-router-dom';
import { BlogCard } from '../components/BlogCard';
import { getPublishedPosts } from '../data/blogPosts';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const latestPosts = getPublishedPosts().slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl mb-6">
              Welcome to My Blog
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Sharing thoughts on web development, travel, photography, and life.
              Join me on this journey of learning and exploration.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg transition-colors"
            >
              Explore All Posts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl text-foreground">
            Latest Posts
          </h2>
          <Link
            to="/blog"
            className="text-accent hover:text-accent/80 transition-colors flex items-center gap-2"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl mb-6 text-foreground">
              About This Blog
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              This is a space where I document my journey as a web developer, share travel experiences,
              and explore the art of photography. Each post is written with care and intention,
              hoping to provide value and inspiration to readers.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-border hover:border-accent text-foreground hover:text-accent px-6 py-3 rounded-lg transition-colors"
            >
              Learn More About Me
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
