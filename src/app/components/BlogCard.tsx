import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '../data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border">
      <Link to={`/blog/${post.slug}`}>
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <span
              key={category}
              className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {category}
            </span>
          ))}
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-2xl mb-3 text-foreground hover:text-accent transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-accent hover:text-accent/80 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
