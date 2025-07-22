"use client";

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  position = 'bottom-right',
  phoneNumber = '551126751446',
  message = 'Olá! Vim do site da OLV Internacional e gostaria de saber mais sobre os serviços.',
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-24 right-6',
    'top-left': 'top-24 left-6',
  };

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed ${positionClasses[position]} z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none group overflow-visible`}
      aria-label="Contato via WhatsApp"
    >
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse rounded-full"></span>
      
      <FaWhatsapp className="text-2xl" />
      
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-[#0a0f1d] text-sm py-2 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md border border-green-600 w-auto min-w-[180px] max-w-[240px] whitespace-normal">
        <span className="text-white text-xs font-semibold leading-tight">Atendimento imediato via WhatsApp</span>
        
        <span className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-[#0a0f1d] border-r border-t border-green-600"></span>
      </div>
    </button>
  );
};

export default WhatsAppButton; 