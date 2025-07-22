'use client';

import Image from 'next/image';

interface HomeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export default function HomeImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
}: HomeImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
    />
  );
} 