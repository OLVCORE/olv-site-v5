"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function resumirNoticia(title: string, excerpt: string): string {
  // Remove prefixos duplicados e corta em 60 caracteres
  const cleanTitle = title.replace(/^#+\s*/, '').replace(/^[\-–—\s]+/, '').trim();
  let cleanExcerpt = excerpt.replace(/^#+\s*/, '').replace(/^[\-–—\s]+/, '').trim();
  // Se o excerpt começa igual ao título, remove
  if (cleanExcerpt.startsWith(cleanTitle)) {
    cleanExcerpt = cleanExcerpt.slice(cleanTitle.length).trim();
  }
  // Pega só o primeiro trecho/frase curta
  const snippet = cleanExcerpt.split(/[.!?\n]/)[0].trim();
  let base = cleanTitle;
  if (snippet && snippet.length > 10 && !cleanTitle.includes(snippet)) {
    base += ': ' + snippet;
  }
  return base.length > 60 ? base.slice(0, 57) + '...' : base;
}

const Ticker: React.FC = () => {
  const [headlines, setHeadlines] = useState<{ title: string; excerpt: string; slug: string }[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    // Detectar se é mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Detectar tema
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains('dark') || document.body.classList.contains('theme-dark');
      setIsDark(dark);
    };
    checkTheme();
    window.addEventListener('themechange', checkTheme);
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Buscar notícias: primeiro tenta posts de hoje, se não houver, busca os mais recentes
    const fetchHeadlines = async () => {
      try {
        console.log('Ticker: Iniciando busca de manchetes...');
        
        // 1. Tentar posts de hoje
        let res = await fetch('/api/posts?today=1&limit=10');
        console.log('Ticker: Resposta hoje - status:', res.status, 'ok:', res.ok);
        
        if (!res.ok) {
          console.error('Ticker: Erro na API (hoje):', res.status, res.statusText);
          throw new Error(`API error: ${res.status}`);
        }
        
        let data = await res.json();
        console.log('Ticker: Dados recebidos (hoje):', data);
        let posts = Array.isArray(data) ? data : (data?.posts || []);
        console.log('Ticker: Posts extraídos (hoje):', posts.length, posts);
        
        // 2. Se não houver posts de hoje, buscar os mais recentes
        if (posts.length === 0) {
          console.log('Ticker: nenhum post de hoje, buscando posts recentes...');
          res = await fetch('/api/posts?limit=5');
          console.log('Ticker: Resposta recentes - status:', res.status, 'ok:', res.ok);
          
          if (res.ok) {
            data = await res.json();
            console.log('Ticker: Dados recebidos (recentes):', data);
            posts = Array.isArray(data) ? data : (data?.posts || []);
            console.log('Ticker: Posts extraídos (recentes):', posts.length, posts);
          } else {
            console.error('Ticker: Erro na API (recentes):', res.status, res.statusText);
          }
        }
        
        if (posts.length > 0) {
          console.log('Ticker: ✅ mensagens recebidas:', posts.length);
          const headlinesData = posts.map((post: any) => ({
            title: post.title || 'Sem título',
            excerpt: post.excerpt || '',
            slug: post.slug || '',
          }));
          console.log('Ticker: Headlines processadas:', headlinesData);
          setHeadlines(headlinesData);
        } else {
          console.warn('Ticker: ⚠️ nenhuma manchete encontrada após todas as tentativas');
        }
      } catch (error: any) {
        console.error('Ticker: ❌ Erro ao buscar notícias:', error);
        console.error('Ticker: Stack:', error.stack);
      }
    };
    
    fetchHeadlines();

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('themechange', checkTheme);
      observer.disconnect();
    };
  }, []);

  if (headlines.length === 0) return (
    <div className="ticker">
      <div className="ticker-inner">
        <p>
          <span>Últimas do Blog OLV Internacional – </span>
        </p>
      </div>
    </div>
  );

  // Cores do ticker
  const tickerColor = isDark ? '#FFD700' : '#0a58ca';
  const tickerHoverColor = isDark ? '#fffbe6' : '#003366';
  const tickerFont = "'Inter', 'Segoe UI', Arial, sans-serif";

  // Calcular duração da animação: velocidade reduzida para melhor leitura
  const baseDuration = isMobile ? 120 : 60; // Aumentado significativamente
  const animationDuration = Math.max(baseDuration, headlines.length * (isMobile ? 12 : 6)); // Mais tempo por mensagem

  return (
    <div className="ticker" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div 
        className="ticker-inner" 
        style={{ 
          animation: hoveredIdx === null ? `ticker-scroll ${animationDuration}s linear infinite` : 'none',
          whiteSpace: 'nowrap',
          color: tickerColor,
          fontFamily: tickerFont,
          fontWeight: 400,
          fontSize: isMobile ? 15 : 17,
          letterSpacing: 0.1,
          lineHeight: 1.3
        }}
      >
        {headlines.map((news, idx) => (
          <span key={idx} style={{ marginRight: isMobile ? 48 : 32, display: 'inline-block' }}>
            <Link 
              href={`/blog/${news.slug}`}
              style={{ 
                textDecoration: hoveredIdx === idx ? 'underline' : 'none',
                color: tickerColor,
                cursor: 'pointer',
                display: 'inline-block',
                fontWeight: 400,
                fontFamily: tickerFont,
                transition: 'color 0.2s, text-decoration 0.2s'
              }}
              className="ticker-link"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {resumirNoticia(news.title, news.excerpt)}
            </Link>
            {idx < headlines.length - 1 && " – "}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .ticker-link:hover {
          color: ${tickerHoverColor} !important;
          text-decoration: underline !important;
        }
      `}</style>
    </div>
  );
};

export default Ticker; 