"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SocialButton from '@/components/auth/SocialButton';
import Footer from '@/components/layout/Footer';

declare const process: { env: Record<string,string|undefined> };

export default function LoginPage() {
  const router = useRouter();
  const returnTo = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('returnTo') || '/') : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [name, setName] = useState('');

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setInfo(null);
    
    if (!email) { 
      setError('Informe seu e-mail'); 
      setLoading(false); 
      return; 
    }

    if (mode === 'login') {
      if (!password) {
        setError('Informe sua senha');
        setLoading(false);
        return;
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // Improved error handling for incorrect credentials
        if (error.message.includes('Invalid login credentials') || error.message.includes('Email not confirmed')) {
          setError('Email ou senha incorretos. Verifique suas credenciais e tente novamente.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Email não confirmado. Verifique sua caixa de entrada.');
        } else if (error.message.includes('Too many requests')) {
          setError('Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.');
        } else {
          setError('Erro ao fazer login: ' + error.message);
        }
      } else {
        router.push(returnTo);
      }
    } else {
      if (!password) {
        setError('Informe uma senha');
        setLoading(false);
        return;
      }
      
      const redirectTo = (typeof window !== 'undefined' && !window.location.origin.includes('localhost'))
        ? window.location.origin + '/login'
        : (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://api.olvinternacional.com.br') + '/login';

      const { error } = await supabase.auth.signUp({ 
        email, 
        password, 
        options: { 
          emailRedirectTo: redirectTo,
          data: {
            full_name: name
          }
        } 
      });
      
      if (error) {
        if (error.message.includes('User already registered')) {
          setError('Este email já está cadastrado. Tente fazer login.');
        } else if (error.message.includes('Password should be at least')) {
          setError('A senha deve ter pelo menos 6 caracteres.');
        } else {
          setError('Erro ao criar conta: ' + error.message);
        }
      } else {
        setInfo('Enviamos um e-mail para confirmar sua conta.');
      }
    }
    setLoading(false);
  }

  async function signInWithProvider(provider: 'google' | 'facebook' | 'apple') {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider, 
        options: { 
          redirectTo: returnTo
        }
      });
      
      if (error) {
        setError('Erro ao fazer login com ' + provider + ': ' + error.message);
      }
    } catch (err) {
      setError('Erro inesperado ao fazer login com ' + provider);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/images/olv-logo.jpeg"
            alt="OLV Internacional"
            width={120}
            height={60}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">
            {mode === 'login' ? 'Entrar' : 'Criar Conta'}
          </h1>
          <p className="text-gray-300">
            {mode === 'login' 
              ? 'Acesse sua conta OLV Internacional' 
              : 'Junte-se à OLV Internacional'
            }
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          {/* Mode Toggle */}
          <div className="flex mb-6 bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'signup'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Criar Conta
            </button>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {mode === 'signup' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {/* Error/Info Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-300 text-sm">
                {error}
              </div>
            )}

            {info && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-md text-green-300 text-sm">
                {info}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors mb-4"
            >
              {loading ? 'Carregando...' : (mode === 'login' ? 'Entrar' : 'Criar Conta')}
            </button>
          </form>

          {/* Social Login */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-300">ou continue com</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <SocialButton
                provider="google"
                onClick={() => signInWithProvider('google')}
                disabled={loading}
              />
              <SocialButton
                provider="facebook"
                onClick={() => signInWithProvider('facebook')}
                disabled={loading}
              />
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              ← Voltar ao site
            </a>
          </div>
        </div>
      </div>
      
      {/* Footer Universal */}
      <Footer />
    </div>
  );
} 