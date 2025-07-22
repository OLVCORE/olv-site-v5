"use client";

import React from 'react';

interface IconComponentProps {
  iconPath: string;
  altText: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({
  iconPath,
  altText,
  size = 'md',
  className = '',
}) => {
  // Size mapping in pixels
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <img
      src={iconPath}
      alt={altText}
      className={`${sizeMap[size]} ${className}`}
    />
  );
};

export default IconComponent; 