"use client";

import Image from 'next/image';
import React from 'react';

interface IllustrationBannerProps {
  src?: string;
  alt?: string;
  caption?: string;
  matchRefSelector?: string;
}

/**
 * Simple full-width illustration banner used to soften empty areas across pages.
 * Uses a royalty-free remote illustration by default and lazy-loads the asset
 * for performance. Wrap in a responsive container to fit available width.
 */
export default function IllustrationBanner({
  src = 'https://images.unsplash.com/photo-1581091870627-3b27ecf851d1?auto=format&fit=crop&w=1200&q=80',
  alt = 'Ilustração Comércio Internacional',
  caption,
  matchRefSelector,
}: IllustrationBannerProps) {
  const [height, setHeight] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (!matchRefSelector) return;
    const refEl = document.querySelector<HTMLElement>(matchRefSelector);
    if (!refEl) return;
    const update = () => setHeight(refEl.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(refEl);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [matchRefSelector]);

  return (
    <figure
      className="w-full rounded-2xl overflow-hidden shadow-gold card-hover flex flex-col"
      style={height ? { height: Math.min(height, 600) } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={400}
        className="w-full h-full object-cover flex-1"
        priority={false}
      />
      {caption && (
        <figcaption className="text-center text-sm mt-2 text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
} 