"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';


function FeedbackForm() {
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'Plataforma';

  const [formData, setFormData] = useState({
    desafio: '',
    funcionalidade: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/beta-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, platform }),
      });
      setSubmitted(true);
      setFormData({ desafio: '', funcionalidade: '', email: '' });
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e1425] text-[#e6f2ff] p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#d4af37] mb-4">Obrigado pelo feedback!</h1>
          <p className="text-lg">Sua contribuição é muito importante para que possamos aprimorar a {platform}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1425] text-[#e6f2ff] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0a0f1d] border border-[#1e293b] rounded-lg p-8 w-full max-w-lg shadow-2xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-[#d4af37] mb-2">{platform} em BETA</h1>
        <p className="text-sm text-[#e6f2ff]/70 mb-4">Conte o que facilitaria sua gestão de processos. Leva menos de 1 minuto! 🙌</p>

        <div>
          <label htmlFor="desafio" className="block text-sm font-medium mb-1">Maior desafio hoje</label>
          <select
            id="desafio"
            name="desafio"
            required
            value={formData.desafio}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#0e1425] border border-[#1e293b] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
          >
            <option value="">Selecione...</option>
            <option value="Visibilidade dos processos">Visibilidade dos processos</option>
            <option value="Redução de custos">Redução de custos</option>
            <option value="Automatização">Automatização</option>
            <option value="Integração de dados">Integração de dados</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div>
          <label htmlFor="funcionalidade" className="block text-sm font-medium mb-1">Funcionalidade nº 1 que gostaria de ver</label>
          <input
            type="text"
            id="funcionalidade"
            name="funcionalidade"
            required
            value={formData.funcionalidade}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#0e1425] border border-[#1e293b] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail para ser avisado no lançamento</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-[#0e1425] border border-[#1e293b] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#d4af37] text-[#0a0f1d] font-semibold py-3 px-4 rounded-md hover:bg-[#b8941f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enviando...' : 'Enviar Feedback'}
        </button>
      </form>
    </div>
  );
}

export default function BetaFeedbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0e1425] text-[#e6f2ff]">Carregando...</div>}>
      <FeedbackForm />
    </Suspense>
  );
} 