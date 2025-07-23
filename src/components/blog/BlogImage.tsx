'use client';

import { useState } from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function BlogImage({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/images/blog/default-news.svg' 
}: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  );
} 