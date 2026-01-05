import { Code2, Camera, Plane, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl mb-6">About Me</h1>
            <p className="text-xl text-primary-foreground/90">
              Developer. Photographer. Traveler. Lifelong Learner.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-foreground mb-6">
              Hello! I'm John Doe, a web developer with a passion for creating beautiful,
              functional digital experiences. When I'm not coding, you'll find me exploring
              new places with my camera or planning my next adventure.
            </p>
            <p className="text-foreground mb-6">
              This blog is my digital home, where I share my journey in web development,
              document my travels, and explore the art of photography. I believe in learning
              in public and sharing knowledge with the community.
            </p>
          </div>

          {/* What I Do */}
          <div className="mb-16">
            <h2 className="text-3xl mb-8 text-foreground">What I Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-card border border-border">
                <Code2 className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl mb-3 text-foreground">Web Development</h3>
                <p className="text-muted-foreground">
                  Building modern web applications with React, TypeScript, and other cutting-edge technologies.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-card border border-border">
                <Camera className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl mb-3 text-foreground">Photography</h3>
                <p className="text-muted-foreground">
                  Capturing moments and telling stories through the lens, with a focus on landscape and travel photography.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-card border border-border">
                <Plane className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl mb-3 text-foreground">Travel</h3>
                <p className="text-muted-foreground">
                  Exploring new cultures, cuisines, and perspectives around the world.
                </p>
              </div>
              
              <div className="p-6 rounded-lg bg-card border border-border">
                <Heart className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl mb-3 text-foreground">Writing</h3>
                <p className="text-muted-foreground">
                  Sharing knowledge, experiences, and insights through thoughtful, well-crafted content.
                </p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h2 className="text-3xl mb-8 text-foreground">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {[
                'JavaScript',
                'TypeScript',
                'React',
                'Node.js',
                'HTML/CSS',
                'Tailwind CSS',
                'Git',
                'Photography',
                'Lightroom',
                'Adobe Photoshop',
                'Travel Planning',
                'Content Writing',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-lg bg-muted text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="bg-gradient-to-br from-accent/10 to-muted/30 rounded-lg p-8 text-center">
            <h2 className="text-3xl mb-4 text-foreground">Let's Connect</h2>
            <p className="text-muted-foreground mb-6">
              I'm always happy to chat about web development, photography, travel, or anything else!
              Feel free to reach out.
            </p>
            <a
              href="/contact"
              className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
