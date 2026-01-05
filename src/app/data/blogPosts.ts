export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishedDate: string;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published';
  readingTime?: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage?: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'My Journey into Web Development',
    slug: 'journey-into-web-development',
    excerpt: 'Discover how I transitioned from a complete beginner to building complex web applications, and the lessons I learned along the way.',
    content: `# My Journey into Web Development

It all started with a simple curiosity about how websites work. I never imagined that this curiosity would lead me down such an exciting path.

## The Beginning

When I first started learning web development, I was overwhelmed by the sheer amount of technologies and frameworks available. Should I learn React or Vue? What about backend development? The questions seemed endless.

### Taking the First Step

I decided to start with the basics: **HTML**, **CSS**, and **JavaScript**. This foundation proved invaluable as I progressed.

\`\`\`javascript
// My first JavaScript function
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

## Key Lessons Learned

1. **Consistency is key** - Coding every day, even for 30 minutes, beats occasional marathon sessions
2. **Build projects** - Theory is important, but building real projects is where you truly learn
3. **Embrace the community** - Don't be afraid to ask questions and help others

> "The journey of a thousand miles begins with a single step" - Lao Tzu

This quote perfectly captures my web development journey. Every expert was once a beginner.

## Where I Am Now

Today, I'm comfortable building full-stack applications with modern frameworks. But the learning never stops, and that's what makes this field so exciting!`,
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    author: 'John Doe',
    publishedDate: '2025-01-02',
    categories: ['Web Development', 'Personal'],
    tags: ['JavaScript', 'Learning', 'Career'],
    status: 'published',
    seo: {
      metaTitle: 'My Journey into Web Development | Personal Blog',
      metaDescription: 'Discover how I transitioned from a complete beginner to building complex web applications.',
    },
  },
  {
    id: '2',
    title: 'Exploring the Beauty of Iceland',
    slug: 'exploring-beauty-of-iceland',
    excerpt: 'A photo journal of my incredible adventure through Iceland\'s stunning landscapes, from glaciers to geysers.',
    content: `# Exploring the Beauty of Iceland

Iceland has been on my bucket list for years, and finally getting to experience it was nothing short of magical.

## Day 1: Arrival in Reykjavik

The capital city welcomed us with its colorful buildings and crisp Arctic air. We spent the first day acclimating and exploring the vibrant street art scene.

![Reykjavik Harbor](https://images.unsplash.com/photo-1504893524553-b855bce32c67)

## The Golden Circle

No trip to Iceland is complete without the Golden Circle tour:

- **Þingvellir National Park** - Where tectonic plates meet
- **Geysir** - Witnessing Strokkur erupt every few minutes
- **Gullfoss** - The golden waterfall in all its glory

### The Black Sand Beach

Reynisfjara beach with its basalt columns and dramatic waves was absolutely breathtaking. The contrast of black sand against the white foam of the Atlantic waves created a scene straight out of a dream.

## Northern Lights

On our third night, we were blessed with a spectacular display of Aurora Borealis. No photo can truly capture the dancing green lights across the sky.

**Pro tip:** Check the aurora forecast and drive away from light pollution for the best viewing experience.

## Practical Tips

\`\`\`markdown
- **Best time to visit**: September-October or March-April
- **Car rental**: Essential for exploring beyond Reykjavik
- **Budget**: Iceland is expensive, plan accordingly
- **Weather**: Layer up! Weather changes quickly
\`\`\`

Iceland left an indelible mark on my heart. It's a place where nature's raw power is on full display, reminding us of our place in this vast, beautiful world.`,
    featuredImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    author: 'John Doe',
    publishedDate: '2024-12-28',
    categories: ['Travel', 'Photography'],
    tags: ['Iceland', 'Adventure', 'Nature'],
    status: 'published',
    seo: {
      metaTitle: 'Exploring the Beauty of Iceland | Travel Blog',
      metaDescription: 'A photo journal of my incredible adventure through Iceland\'s stunning landscapes.',
    },
  },
  {
    id: '3',
    title: 'The Art of Mindful Photography',
    slug: 'art-of-mindful-photography',
    excerpt: 'How slowing down and being present transformed my photography and helped me capture more meaningful moments.',
    content: `# The Art of Mindful Photography

In our fast-paced digital world, we often take hundreds of photos without truly seeing what's in front of us. Here's how I learned to slow down.

## What is Mindful Photography?

Mindful photography is about being fully present in the moment, aware of your surroundings, and intentional with each shot you take.

### The Problem with "Spray and Pray"

Modern cameras and smartphones make it easy to take countless photos. But quantity doesn't equal quality:

1. **Overwhelming editing process** - Too many similar shots to sort through
2. **Lack of intention** - Photos without purpose or meaning
3. **Missing the moment** - Being behind the camera instead of experiencing life

## My 5 Principles

### 1. Observe Before You Shoot

Take time to really see your subject. Notice the light, shadows, and emotions.

### 2. Limit Your Shots

Challenge yourself to take only 10 photos of a scene. This forces you to be more thoughtful.

### 3. One Lens, One Day

Instead of carrying multiple lenses, stick with one. This creative constraint enhances your vision.

### 4. Tell a Story

Ask yourself: "What story am I trying to tell?" before clicking the shutter.

### 5. Embrace Imperfection

Not every photo needs to be perfect. Sometimes the "mistakes" tell the best stories.

\`\`\`javascript
// A metaphor in code
function takePhoto(subject, intention, presence) {
  if (!presence) {
    return "Just another photo";
  }
  
  return {
    subject,
    intention,
    meaning: presence * intention,
    memorability: "High"
  };
}
\`\`\`

## The Results

Since adopting mindful photography:
- My editing time has decreased by 70%
- I have a stronger emotional connection to my images
- I'm more present during experiences
- My technical skills have improved through intentional practice

> "The camera is an instrument that teaches people how to see without a camera." - Dorothea Lange

Photography is my meditation, my way of connecting with the world. When you slow down and truly see, magic happens.`,
    featuredImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
    author: 'John Doe',
    publishedDate: '2024-12-15',
    categories: ['Photography', 'Mindfulness'],
    tags: ['Photography', 'Mindfulness', 'Art', 'Tips'],
    status: 'published',
    seo: {
      metaTitle: 'The Art of Mindful Photography | Personal Blog',
      metaDescription: 'How slowing down and being present transformed my photography.',
    },
  },
  {
    id: '4',
    title: 'Building a Morning Routine That Actually Works',
    slug: 'building-morning-routine',
    excerpt: 'After years of failed attempts, I finally cracked the code to a sustainable and energizing morning routine.',
    content: `# Building a Morning Routine That Actually Works

I've tried countless morning routines over the years. Most lasted a few days before fizzling out. Here's what finally worked.

## The Problem with Most Routines

- **Too ambitious** - Trying to wake up at 5 AM when you're used to 8 AM
- **Too many habits** - Adding 10 new habits at once
- **Lack of flexibility** - No room for life's unpredictability
- **Missing the "why"** - No clear purpose behind the routine

## My Approach

### Start Small

Instead of overhauling everything, I started with just **one** habit: drinking a glass of water upon waking.

\`\`\`markdown
Week 1: Water + existing routine
Week 2: Water + 5-minute stretch
Week 3: Water + 5-minute stretch + gratitude journal
\`\`\`

### The Core Four

After months of experimentation, these four elements became non-negotiable:

1. **Hydration** (1 minute)
2. **Movement** (10 minutes) 
3. **Mindfulness** (5 minutes)
4. **Planning** (5 minutes)

Total time: ~20 minutes

## Real-World Example

**6:30 AM** - Wake up, drink water  
**6:35 AM** - Light stretching or yoga  
**6:45 AM** - Meditation or journaling  
**6:50 AM** - Review day's priorities  
**6:55 AM** - Make coffee and breakfast  

### Flexibility is Key

Some days I have more time, some days less. The routine adapts:

- **Full routine** (45 min): All elements expanded
- **Core routine** (20 min): The essentials
- **Minimal routine** (5 min): Water + quick planning

## The Results

After 90 days:
- **Energy levels** increased significantly
- **Productivity** improved by starting with intention  
- **Stress** decreased through morning mindfulness
- **Consistency** achieved through flexibility

> "You don't have to be great to start, but you have to start to be great." - Zig Ziglar

## Tips for Success

1. **Start ridiculously small** - Success breeds motivation
2. **Track without judgment** - Note what you did, not what you missed
3. **Prepare the night before** - Lay out workout clothes, pre-fill water bottle
4. **Find your why** - Connect habits to meaningful goals
5. **Be patient** - It takes time to build lasting change

The perfect morning routine is the one you'll actually do. Start small, be consistent, and adjust as needed.`,
    featuredImage: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02',
    author: 'John Doe',
    publishedDate: '2024-12-01',
    categories: ['Personal', 'Productivity'],
    tags: ['Morning Routine', 'Habits', 'Productivity', 'Self-Improvement'],
    status: 'published',
    seo: {
      metaTitle: 'Building a Morning Routine That Actually Works',
      metaDescription: 'After years of failed attempts, I finally cracked the code to a sustainable morning routine.',
    },
  },
  {
    id: '5',
    title: 'Understanding React Hooks: A Deep Dive',
    slug: 'understanding-react-hooks',
    excerpt: 'A comprehensive guide to React Hooks with practical examples and common pitfalls to avoid.',
    content: `# Understanding React Hooks: A Deep Dive

React Hooks revolutionized how we write React components. Let's explore them in depth.

## What Are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components.

### The Motivation

Before Hooks:
- Hard to reuse stateful logic
- Complex components hard to understand
- Confusing classes

\`\`\`javascript
// Old class component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}
\`\`\`

With Hooks:

\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## Essential Hooks

### useState

Manages component state:

\`\`\`javascript
const [state, setState] = useState(initialValue);

// Functional update for complex state
setState(prev => prev + 1);
\`\`\`

### useEffect

Handles side effects:

\`\`\`javascript
useEffect(() => {
  // Effect code
  document.title = \`Count: \${count}\`;
  
  // Cleanup function
  return () => {
    document.title = 'React App';
  };
}, [count]); // Dependencies
\`\`\`

### useContext

Consumes context:

\`\`\`javascript
const theme = useContext(ThemeContext);
\`\`\`

## Custom Hooks

Creating reusable logic:

\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'Guest');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
\`\`\`

## Common Pitfalls

### 1. Forgetting Dependencies

\`\`\`javascript
// ❌ Missing dependency
useEffect(() => {
  console.log(count);
}, []); // count not in dependencies!

// ✅ Correct
useEffect(() => {
  console.log(count);
}, [count]);
\`\`\`

### 2. Stale Closures

\`\`\`javascript
// ❌ Stale closure
const handleClick = () => {
  setTimeout(() => {
    console.log(count); // Might be stale
  }, 3000);
};

// ✅ Use ref for latest value
const countRef = useRef(count);
useEffect(() => { countRef.current = count; }, [count]);
\`\`\`

## Best Practices

1. **Name custom hooks with "use"** - useCustomHook
2. **Keep effects focused** - One effect per concern
3. **Extract complex logic** - Into custom hooks
4. **Use ESLint plugin** - Catches common mistakes

Hooks make React more powerful and enjoyable. Master them, and you'll write cleaner, more maintainable code.`,
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    author: 'John Doe',
    publishedDate: '2024-11-20',
    categories: ['Web Development', 'Tutorial'],
    tags: ['React', 'JavaScript', 'Hooks', 'Tutorial'],
    status: 'published',
    seo: {
      metaTitle: 'Understanding React Hooks: A Deep Dive | Dev Blog',
      metaDescription: 'A comprehensive guide to React Hooks with practical examples.',
    },
  },
  {
    id: '6',
    title: 'Draft: Upcoming Travel Plans',
    slug: 'upcoming-travel-plans',
    excerpt: 'Planning my next adventure to Southeast Asia - still working on the itinerary!',
    content: `# Upcoming Travel Plans

(This is a draft post - still planning!)

I'm excited to share my upcoming trip to Southeast Asia. Stay tuned for the full itinerary and travel tips!`,
    featuredImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
    author: 'John Doe',
    publishedDate: '2025-02-01',
    categories: ['Travel'],
    tags: ['Travel', 'Planning', 'Southeast Asia'],
    status: 'draft',
    seo: {
      metaTitle: 'Upcoming Travel Plans',
      metaDescription: 'Planning my next adventure',
    },
  },
];

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

// Add reading time to all posts
blogPosts.forEach(post => {
  post.readingTime = calculateReadingTime(post.content);
});

// Get all unique categories
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  blogPosts
    .filter(post => post.status === 'published')
    .forEach(post => {
      post.categories.forEach(cat => categories.add(cat));
    });
  return Array.from(categories).sort();
}

// Get all unique tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts
    .filter(post => post.status === 'published')
    .forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
  return Array.from(tags).sort();
}

// Get published posts
export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

// Get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Filter posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return getPublishedPosts().filter(post => 
    post.categories.includes(category)
  );
}

// Filter posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  return getPublishedPosts().filter(post => 
    post.tags.includes(tag)
  );
}