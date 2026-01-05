import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.metadata.title}</h1>
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 mb-4">
          <time dateTime={post.metadata.date}>
            {new Date(post.metadata.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
          {post.metadata.category && (
            <>
              <span>•</span>
              <span className="capitalize">{post.metadata.category}</span>
            </>
          )}
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {post.metadata.description}
        </p>
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {post.metadata.featuredImage && (
          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={post.metadata.featuredImage}
              alt={post.metadata.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </header>

      <div
        className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
