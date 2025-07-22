import React from 'react';
import Link from 'next/link';

interface ContactCardProps {
  position?: 'bottom-left' | 'bottom-right';
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  position = 'bottom-left' 
}) => {
  const positionClasses = {
    'bottom-left': 'bottom-24 left-24',
    'bottom-right': 'bottom-24 right-24',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40 max-w-xs bg-[#0e1425] text-white p-5 rounded-lg shadow-xl border border-[#1e293b] animate-fadeIn`}>
      <h3 className="text-lg font-semibold text-[#d4af37] mb-2">Entre em contato agora</h3>
      <p className="text-sm mb-4">
        Nossa equipe está pronta para transformar sua operação.
      </p>
      <Link 
        href="/contato" 
        className="block w-full py-2 px-4 bg-[#d4af37] text-[#0a0f1d] font-medium rounded-md hover:bg-[#b9952e] transition-colors duration-300 text-center"
      >
        Fale com um Especialista
      </Link>
    </div>
  );
};

export default ContactCard; 