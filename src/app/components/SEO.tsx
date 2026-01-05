import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export function SEO({ title, description, image, url }: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta description
    updateMetaTag('name', 'description', description);

    // Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    if (image) {
      updateMetaTag('property', 'og:image', image);
    }
    if (url) {
      updateMetaTag('property', 'og:url', url);
    }
    updateMetaTag('property', 'og:type', 'website');

    // Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    if (image) {
      updateMetaTag('name', 'twitter:image', image);
    }
  }, [title, description, image, url]);

  return null;
}

function updateMetaTag(attr: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}
