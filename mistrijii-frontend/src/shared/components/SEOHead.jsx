import { useEffect } from 'react';

const SEOHead = ({ title = "MistriJii", description = "Your trusted home service booking platform" }) => {
  useEffect(() => {
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }, [title, description]);

  return null;
};

export default SEOHead;
