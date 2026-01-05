import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Image from "next/image";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to Helios Blogs</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          A minimalist blog platform for focused writing
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No posts yet. Create your first post!
            </p>
            <Link
              href="/create"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Create Post
            </Link>
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.metadata.featuredImage && (
                <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                  <Image
                    src={post.metadata.featuredImage}
                    alt={post.metadata.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime={post.metadata.date}>
                    {new Date(post.metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {post.metadata.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.metadata.description}
                </p>
                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
