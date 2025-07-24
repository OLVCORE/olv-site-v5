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
    if (!email) { setError('Informe seu e-mail'); setLoading(false); return; }

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push(returnTo);
    } else {
      const redirectTo = (typeof window !== 'undefined' && !window.location.origin.includes('localhost'))
        ? window.location.origin + '/login'
        : (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://api.olvinternacional.com.br') + '/login';

      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } });
      if (error) setError(error.message);
      else setInfo('Enviamos um e-mail para confirmar sua conta.');
    }
    setLoading(false);
  }

  async function signInWithProvider(provider: 'google' | 'facebook' | 'apple') {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined } });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] text-[var(--color-on-surface)] p-4">
      <div className="bg-[var(--color-surface)]/80 backdrop-blur border border-[var(--color-gold)] shadow-lg rounded-lg md:rounded-l-lg overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
        {/* Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center space-y-6 text-[var(--color-on-surface)]">
          <div>
            <h1 className="text-2xl font-semibold mb-1">{mode === 'login' ? 'Welcome!' : 'Create your account'}</h1>
            <p className="text-sm opacity-80">We are glad to see you</p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {info && <p className="text-sm text-green-500">{info}</p>}

          <div className="space-y-4">
            {mode === 'signup' && (
              <>
                <label className="text-xs font-semibold uppercase opacity-70" htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 rounded border bg-transparent" />
              </>
            )}
            <label className="text-xs font-semibold uppercase opacity-70" htmlFor="email">Login or Email</label>
            <input id="email" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 rounded border bg-transparent" />
            <label className="text-xs font-semibold uppercase opacity-70" htmlFor="pass">Password</label>
            <input id="pass" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 rounded border bg-transparent" />
            {mode === 'signup' && (
              <>
                <label className="text-xs font-semibold uppercase opacity-70" htmlFor="cpass">Confirm Password</label>
                <input id="cpass" type="password" placeholder="••••••••" value={info ?? ''} onChange={e=>setInfo(e.target.value)} className="w-full p-2 rounded border bg-transparent" />
              </>
            )}
            {mode === 'login' && <div className="text-right text-xs"><a href="#" className="hover:underline">Forgot password?</a></div>}
            <button onClick={handleSubmit} disabled={loading} className="w-full py-2 rounded bg-[var(--color-primary)] text-white hover:opacity-90 disabled:opacity-60">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Sign up'}
            </button>
          </div>

          <div className="text-center text-sm opacity-70">Or continue with</div>
          <div className="flex gap-3 justify-center">
            <SocialButton provider="google" onClick={() => signInWithProvider('google')} />
            <SocialButton provider="facebook" onClick={() => signInWithProvider('facebook')} />
            <SocialButton provider="linkedin" onClick={() => signInWithProvider('linkedin' as any)} />
          </div>

          <div className="text-center text-sm">
            {mode === 'login' ? (
              <>Don't have an account? <button onClick={()=>setMode('signup')} className="text-[var(--color-accent)] hover:underline">Sign up</button></>
            ) : (
              <>Already have an account? <button onClick={()=>setMode('login')} className="text-[var(--color-accent)] hover:underline">Sign in</button></>
            )}
          </div>
        </div>

        {/* Banner */}
        <div className="hidden md:block relative rounded-r-lg overflow-hidden h-full w-full">
          <Image 
            src="/images/BANNER-HOME.jpeg" 
            alt="OLV banner" 
            fill 
            className="object-cover object-left" 
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={true}
            style={{ objectPosition: 'left center' }}
          />
        </div>
      </div>
    </div>
  );
} 