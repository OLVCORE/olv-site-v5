"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface FormData {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  departamento: string;
  assunto: string;
  mensagem: string;
  termos: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    departamento: '',
    assunto: '',
    mensagem: '',
    termos: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Acabei de enviar uma mensagem pelo site da OLV Internacional e gostaria de falar com um consultor sobre um assunto urgente. Podemos agendar uma reunião?'
    );
    window.open(`https://wa.me/5511999244444?text=${message}`, '_blank');
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validação client-side
    if (!formData.termos) {
      setSubmitStatus({
        type: 'error',
        message: 'Você precisa concordar com os termos de privacidade para continuar.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          empresa: formData.empresa,
          email: formData.email,
          telefone: formData.telefone,
          departamento: formData.departamento,
          assunto: formData.assunto,
          mensagem: formData.mensagem,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Mostrar modal de sucesso ao invés do banner
        setShowSuccessModal(true);
        
        // Limpar formulário
        setFormData({
          nome: '',
          empresa: '',
          email: '',
          telefone: '',
          departamento: '',
          assunto: '',
          mensagem: '',
          termos: false,
        });

        // Auto-fechar modal após 10 segundos
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 10000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Erro ao enviar mensagem. Por favor, tente novamente.',
        });
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Erro de conexão. Por favor, verifique sua internet e tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="contact-form-container rounded-lg shadow-lg p-6 mb-8"
      style={{
        backgroundColor: '#0e1425',
        border: '1px solid rgba(212, 175, 55, 0.3)',
      }}
    >
      <h3 
        className="title-cyan text-xl font-bold mb-6"
        style={{
          color: '#22d3ee',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        Envie-nos uma mensagem
      </h3>

      {/* Mensagem de Erro */}
      {submitStatus.type === 'error' && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-red-800 dark:text-red-200">{submitStatus.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium mb-1" style={{ color: '#ffffff' }}>
              Nome completo *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Digite seu nome completo"
              className="w-full px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                color: '#ffffff',
                backgroundColor: '#1a2332',
                borderColor: 'rgba(212, 175, 55, 0.5)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                width: '100%',
              }}
            />
          </div>
          <div>
            <label htmlFor="empresa" className="block text-sm font-medium mb-1" style={{ color: '#ffffff' }}>
              Empresa *
            </label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Nome da sua empresa"
              className="w-full px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                color: '#ffffff',
                backgroundColor: '#1a2332',
                borderColor: 'rgba(212, 175, 55, 0.5)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                width: '100%',
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#ffffff' }}>
              E-mail corporativo *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="seu.email@empresa.com.br"
              className="w-full px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                color: '#ffffff',
                backgroundColor: '#1a2332',
                borderColor: 'rgba(212, 175, 55, 0.5)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                width: '100%',
              }}
            />
          </div>
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium mb-1" style={{ color: '#ffffff' }}>
              Telefone com DDD *
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                color: '#ffffff',
                backgroundColor: '#1a2332',
                borderColor: 'rgba(212, 175, 55, 0.5)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                width: '100%',
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="departamento" className="block text-sm font-medium mb-1" style={{ color: '#ffffff' }}>
            Departamento *
          </label>
          <select
            id="departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              color: '#ffffff',
              backgroundColor: '#1a2332',
              borderColor: 'rgba(212, 175, 55, 0.5)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              width: '100%',
            }}
          >
            <option value="" className="dark:text-white dark:bg-[#1a2332]">Selecione o departamento</option>
            <option value="projetos" className="dark:text-white dark:bg-[#1a2332]">Projetos</option>
            <option value="atendimento" className="dark:text-white dark:bg-[#1a2332]">Atendimento</option>
          </select>
        </div>

        <div>
          <label htmlFor="assunto" className="block text-sm font-medium mb-1" style={{ color: '#ffffff' }}>
            Assunto *
          </label>
          <select
            id="assunto"
            name="assunto"
            value={formData.assunto}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              color: '#ffffff',
              backgroundColor: '#1a2332',
              borderColor: 'rgba(212, 175, 55, 0.5)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              width: '100%',
            }}
          >
            <option value="" className="dark:text-white dark:bg-[#1a2332]">Selecione uma opção</option>
            <option value="comercial" className="dark:text-white dark:bg-[#1a2332]">Contato Comercial</option>
            <option value="suporte" className="dark:text-white dark:bg-[#1a2332]">Suporte Técnico</option>
            <option value="consultoria" className="dark:text-white dark:bg-[#1a2332]">Consultoria Estratégica</option>
            <option value="parceria" className="dark:text-white dark:bg-[#1a2332]">Proposta de Parceria</option>
            <option value="imprensa" className="dark:text-white dark:bg-[#1a2332]">Assessoria de Imprensa</option>
            <option value="totvs" className="dark:text-white dark:bg-[#1a2332]">Tecnologia TOTVS</option>
            <option value="outro" className="dark:text-white dark:bg-[#1a2332]">Outro</option>
          </select>
        </div>

        <div>
          <label htmlFor="mensagem" className="block text-sm font-medium mb-1" style={{ color: '#ffffff' }}>
            Mensagem *
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={5}
            value={formData.mensagem}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Descreva sua necessidade, dúvida ou como podemos ajudar sua empresa..."
            style={{
              color: '#ffffff',
              backgroundColor: '#1a2332',
              borderColor: 'rgba(212, 175, 55, 0.5)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              width: '100%',
              minHeight: '120px',
            }}
          ></textarea>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="termos"
              name="termos"
              type="checkbox"
              checked={formData.termos}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-4 h-4 border border-gray-300 dark:border-[#d4af37] rounded focus:ring-blue-500 dark:focus:ring-[#d4af37] bg-white dark:bg-[#1a2332] text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <label htmlFor="termos" className="ml-2 text-sm text-gray-700 dark:text-white">
            Concordo com os <Link href="/politica" className="text-accent hover:underline dark:text-[#d4af37] dark:hover:text-[#e6cc7a]">termos de privacidade</Link> e com o recebimento de comunicações.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-[#d4af37] dark:hover:bg-[#e6cc7a] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </>
          ) : (
            'Enviar Mensagem'
          )}
        </button>
      </form>

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="bg-white dark:bg-[#0e1425] rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-slideIn border border-gray-200 dark:border-[#d4af37]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-[#d4af37] transition-colors"
              aria-label="Fechar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Ícone de Sucesso */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500 dark:border-green-400">
                <svg className="w-10 h-10 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Mensagem de Sucesso */}
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-3">
              Mensagem Enviada com Sucesso!
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-200 mb-8">
              Agradecemos seu contato. Nossa equipe retornará em breve.
            </p>

            {/* Seção de Contato Urgente */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-[#1a2332] dark:to-[#1a2f32] rounded-xl p-6 border border-green-200 dark:border-green-500/30">
              <div className="flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <p className="text-sm font-semibold text-gray-700 dark:text-white">
                  Precisa de atendimento urgente?
                </p>
              </div>
              
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Falar com Consultor Agora
              </button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-300 mt-3">
                Clique para abrir o WhatsApp e agendar uma reunião
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

