import React from 'react';
import clsx from 'clsx';

interface OlvCardProps {
  children: React.ReactNode;
  className?: string;
}

/*
 * Reusable card with Tailwind classes only; no existing code touched.
 * Usage: <OlvCard> ... </OlvCard>
 */
const OlvCard: React.FC<OlvCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={clsx(
        'olv-card bg-surface-light dark:bg-surface rounded-2xl border border-card-border shadow-card p-6',
        'transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

export default OlvCard; 