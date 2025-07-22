'use client';
import React, { useState } from 'react';
import Icon from '../icons/Icon';

interface Item {
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: Item[];
}

/**
 * Simple controlled accordion ("gaveta") used for FAQs.
 * Only one item open at a time to keep UX clean.
 */
const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className="platform-card">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="w-full p-4 flex justify-between items-center font-semibold focus:outline-none"
            >
              <span className="flex items-center text-left">
                <Icon src="/icons/faq.svg" alt="FAQ Icon" size="md" className="mr-2 w-6 h-6 text-accent" />
                {item.question}
              </span>
              <span className="ml-4 text-xl select-none text-accent">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && <div className="p-4 border-t border-gray-700 dark:border-gray-200 text-sm md:text-base">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion; 