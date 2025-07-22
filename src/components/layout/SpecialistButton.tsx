"use client";

import React, { useState } from 'react';
import { FaHeadset } from 'react-icons/fa';

interface SpecialistButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const SpecialistButton: React.FC<SpecialistButtonProps> = ({ 
  position = 'bottom-right' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const positionClasses = {
    'bottom-right': 'bottom-24 right-6',
    'bottom-left': 'bottom-24 left-6',
    'top-right': 'top-24 right-6',
    'top-left': 'top-24 left-6',
  };
  
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar o formulário
    setIsOpen(false);
    alert('Sua solicitação foi enviada! Em breve um especialista entrará em contato.');
  };
  
  return (
    <>
      {/* Botão flutuante com animação de pulso e brilho */}
      <button
        onClick={toggleForm}
        className={`fixed ${positionClasses[position]} z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#d4af37] text-[#0a0f1d] shadow-lg hover:bg-[#b9952e] hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none group overflow-visible`}
        aria-label="Fale com um Especialista"
      >
        {/* Efeito de brilho em hover */}
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse rounded-full"></span>
        
        <FaHeadset className="text-xl" />
        
        {/* Tooltip mais elegante e direto */}
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-[#0a0f1d] text-sm py-2 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md border border-[#d4af37] w-auto min-w-[180px] max-w-[240px] whitespace-normal">
          <span className="text-[#d4af37] text-xs font-semibold leading-tight">Consultoria especializada para sua empresa</span>
          
          {/* Seta apontando para o botão */}
          <span className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-[#0a0f1d] border-r border-t border-[#d4af37]"></span>
        </div>
      </button>
      
      {/* Formulário de contato com animação */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0a0f1d]/80 flex items-center justify-center z-50 p-4 animate-fadeIn backdrop-blur-sm">
          <div className="bg-[#0e1425] text-[#e6f2ff] rounded-lg p-6 max-w-md w-full shadow-2xl border border-[#1e293b] animate-slideIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#d4af37]">Fale com um Especialista</h3>
              <button 
                onClick={toggleForm}
                className="text-[#e6f2ff]/70 hover:text-[#e6f2ff] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1e293b]/50 transition-colors"
              >
                &times;
              </button>
            </div>
            
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30 my-2"></div>
            
            <p className="text-[#e6f2ff]/70 mb-4">
              Preencha o formulário abaixo para que um de nossos especialistas entre em contato.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#e6f2ff]/70 mb-1">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-md bg-[#0a0f1d] border border-[#1e293b] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] text-[#e6f2ff]"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#e6f2ff]/70 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-md bg-[#0a0f1d] border border-[#1e293b] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] text-[#e6f2ff]"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#e6f2ff]/70 mb-1">Telefone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  className="w-full px-4 py-2 rounded-md bg-[#0a0f1d] border border-[#1e293b] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] text-[#e6f2ff]"
                  placeholder="(00) 00000-0000"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#e6f2ff]/70 mb-1">Assunto</label>
                <select 
                  id="subject" 
                  name="subject"
                  required
                  className="w-full px-4 py-2 rounded-md bg-[#0a0f1d] border border-[#1e293b] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] text-[#e6f2ff]"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="exportacao">Consultoria em Exportação</option>
                  <option value="importacao">Consultoria em Importação</option>
                  <option value="logistica">Logística Internacional</option>
                  <option value="compliance">Compliance</option>
                  <option value="treinamento">Treinamento</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#e6f2ff]/70 mb-1">Mensagem</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={3}
                  className="w-full px-4 py-2 rounded-md bg-[#0a0f1d] border border-[#1e293b] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] text-[#e6f2ff] resize-none"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3 px-4 bg-[#d4af37] text-[#0a0f1d] font-medium rounded-md hover:bg-[#b9952e] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37]"
                >
                  Solicitar contato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecialistButton; 