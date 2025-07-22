"use client";

import Image from 'next/image';
import clsx from 'clsx';
import React from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<IconSize, number> = {
  xs: 12, // w-3
  sm: 24, // w-6 (default visual size)
  md: 32, // w-8
  lg: 48, // w-12
  xl: 64, // w-16
};

interface IconProps {
  /** Local path inside /public or remote URL */
  src: string;
  /** Accessible alternative text */
  alt: string;
  /** Tailwind size token (defaults to md) */
  size?: IconSize;
  /** Additional Tailwind classes (margins, colors, etc.) */
  className?: string;
  /** If the image is animated or large, disable Next.js optimization */
  unoptimized?: boolean;
}

const Icon: React.FC<IconProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
  unoptimized = true,
}) => {
  const dimension = sizeMap[size] ?? 24;

  return (
    <Image
      src={src}
      alt={alt}
      width={dimension}
      height={dimension}
      className={clsx('inline-block', className)}
      unoptimized={unoptimized}
      priority={false}
    />
  );
};

export default Icon; 