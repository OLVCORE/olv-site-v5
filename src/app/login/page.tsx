"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SocialButton from '@/components/auth/SocialButton';

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
          redirectTo: typeof window !== 'undefined' ? window.location.origin + returnTo : undefined 
        } 
      });
      
      if (error) {
        setError('Erro no login social: ' + error.message);
      }
    } catch (err) {
      setError('Erro inesperado no login social.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <Image src="/images/olv-logo.jpeg" alt="OLV Internacional" width={80} height={80} className="mx-auto rounded-full mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              {mode === 'login' ? 'Entrar' : 'Criar Conta'}
            </h1>
            <p className="text-white/70">
              {mode === 'login' ? 'Acesse sua conta OLV' : 'Crie sua conta gratuita'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm" data-testid="error-message">
              {error}
            </div>
          )}

          {info && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm" data-testid="info-message">
              {info}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold uppercase opacity-70" htmlFor="name">Nome Completo</label>
                <input 
                  id="name" 
                  type="text" 
                  placeholder="Seu nome completo" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="w-full p-2 rounded border bg-transparent text-white placeholder:text-white/50 border-white/20 focus:border-blue-400 outline-none"
                  data-testid="name-input"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold uppercase opacity-70 text-white" htmlFor="email">Email</label>
              <input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full p-2 rounded border bg-transparent text-white placeholder:text-white/50 border-white/20 focus:border-blue-400 outline-none"
                data-testid="email-input"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase opacity-70 text-white" htmlFor="pass">Password</label>
              <input 
                id="pass" 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full p-2 rounded border bg-transparent text-white placeholder:text-white/50 border-white/20 focus:border-blue-400 outline-none"
                data-testid="password-input"
                required
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold uppercase opacity-70 text-white" htmlFor="cpass">Confirm Password</label>
                <input 
                  id="cpass" 
                  type="password" 
                  placeholder="••••••••" 
                  value={info ?? ''} 
                  onChange={e => setInfo(e.target.value)} 
                  className="w-full p-2 rounded border bg-transparent text-white placeholder:text-white/50 border-white/20 focus:border-blue-400 outline-none"
                  data-testid="confirm-password-input"
                />
              </div>
            )}

            {mode === 'login' && (
              <div className="text-right text-xs">
                <button 
                  type="button"
                  className="hover:underline text-white/70 hover:text-white"
                  onClick={() => {
                    if (email) {
                      supabase.auth.resetPasswordForEmail(email);
                      setInfo('Email de recuperação enviado!');
                    } else {
                      setError('Informe seu email para recuperar a senha.');
                    }
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              data-testid="submit-button"
            >
              {loading ? 'Carregando...' : (mode === 'login' ? 'Entrar' : 'Criar Conta')}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/70">Ou continue com</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <SocialButton provider="google" onClick={() => signInWithProvider('google')} />
              <SocialButton provider="facebook" onClick={() => signInWithProvider('facebook')} />
              <SocialButton provider="linkedin" onClick={() => signInWithProvider('linkedin' as 'google')} />
            </div>
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-white/70 hover:text-white text-sm"
              data-testid="mode-toggle"
            >
              {mode === 'login' ? 'Não tem uma conta? Criar conta' : 'Já tem uma conta? Entrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 