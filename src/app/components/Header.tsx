import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-primary hover:text-accent transition-colors">
            My Blog
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              to="/blog"
              className="text-foreground hover:text-accent transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-accent transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-accent transition-colors"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
