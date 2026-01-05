import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center text-xl font-bold">
              Helios Blogs
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">
              Home
            </Link>
            <Link href="/create" className="hover:text-gray-600 dark:hover:text-gray-300">
              Create Post
            </Link>
            <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-600 dark:hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
