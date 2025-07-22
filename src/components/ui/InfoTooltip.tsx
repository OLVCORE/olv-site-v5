import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface InfoTooltipProps {
  content: string;
  className?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, className = '' }) => {
  return (
    <Tippy content={<span className="max-w-xs text-sm leading-tight">{content}</span>} trigger="mouseenter focus click" interactive>
      <span className={`inline-flex items-center justify-center w-4 h-4 text-accent-light cursor-pointer ${className}`}>
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-9-4a1 1 0 112 0 1 1 0 01-2 0zm1 3a1 1 0 00-1 1v4a1 1 0 002 0v-4a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </span>
    </Tippy>
  );
};

export default InfoTooltip; 