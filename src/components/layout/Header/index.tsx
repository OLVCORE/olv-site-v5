"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import UserMenu from '../UserMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import OptimizedImage from '../../OptimizedImage';
import DropdownMenu from './DropdownMenu';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const GlobalSearch = dynamic(() => import('../../GlobalSearch'), { ssr: false });

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    const current = (pathname ?? '') as string;
    return current === path || ((current as string)?.startsWith(path) && path !== '/');
  };

  // Lock scroll when menu aberto mobile
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('nav-open');
      document.body.classList.remove('sidebar-open');
      document.body.classList.remove('search-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('nav-open');
    }
  }, [navOpen]);

  // Lock scroll when search overlay aberto
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('search-open');
      // Fecha nav se estava aberto
      setNavOpen(false);
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('search-open');
    }
  }, [searchOpen]);

  return (
    <>
      {/* Header */}
      <header className="header-wrapper">
        <div className="header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Logo + Slogan */}
          <div className="header-brand" style={{ display: 'flex', alignItems: 'center', minWidth: 0, flexShrink: 0, flexBasis: 'auto', gap: '1.5rem' }}>
            <Link href="/" className="header-logo-link" title="OLV Internacional" style={{ display: 'block', minWidth: 0 }}>
              <div className="logo-olv-padrao" style={{ aspectRatio: '1/1', minWidth: 50, minHeight: 50, maxWidth: 88, maxHeight: 88, width: '84px', height: '84px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <OptimizedImage 
                  src="/images/olv-logo.jpeg" 
                  alt="OLV Internacional" 
                  width={84} 
                  height={84} 
                  className="header-logo-img"
                  priority={true}
                  quality={90}
                  style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}
                />
              </div>
            </Link>
            <div className="header-slogan" style={{ marginLeft: '0.5rem', whiteSpace: 'normal', wordBreak: 'break-word', fontSize: '1rem', minWidth: 0, flexShrink: 1, lineHeight: 1.3 }}>
              Integramos Estratégia,<br />
              Operação e Resultado
            </div>
          </div>

          {/* Menu Principal - Visible only on desktop */}
          <div className="flex items-center gap-6" style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}>
            {/* Buscar (desktop only) */}
            <div className="desktop-only">
              <GlobalSearch />
            </div>

            <nav className="nav-menu desktop-only">
              <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`} data-page="home">Home</Link>
              <Link href="/sobre" className={`nav-item ${isActive('/sobre') ? 'active' : ''}`} data-page="sobre">Sobre</Link>
              
              <DropdownMenu 
                label="Soluções" 
                mainHref="/solucoes"
                items={[
                  {
                    label: "Consultoria Importação",
                    href: "/solucoes/importacao-exclusiva",
                    description: "Consultoria especializada em importação para PMEs",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  },
                  {
                    label: "Consultoria Exportação",
                    href: "/solucoes/exportacao",
                    description: "Estratégias para expandir mercados internacionais",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  },
                  {
                    label: "Logística Internacional",
                    href: "/solucoes/logistica",
                    description: "Otimização de supply chain e operações globais",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                  },
                  {
                    label: "Simuladores",
                    href: "/simuladores",
                    description: "Ferramentas para cálculo de custos e frete",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  }
                ]}
              />
              
              <DropdownMenu 
                label="Ecossistema" 
                mainHref="/ecossistema"
                items={[
                  {
                    label: "STRATEVO",
                    href: "/stratevo",
                    description: "Plataforma de estratégia e planejamento",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  },
                  {
                    label: "CORE",
                    href: "/core",
                    description: "Gestão centralizada de operações",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" /></svg>
                  },
                  {
                    label: "CONNECTA",
                    href: "/connecta",
                    description: "Conectividade e integração de sistemas",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
                  },
                  {
                    label: "ENGAGE",
                    href: "/engage",
                    description: "Gestão de relacionamento com clientes",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  },
                  {
                    label: "FINX",
                    href: "/finx",
                    description: "Soluções financeiras e de pagamento",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
                  },
                  {
                    label: "EXCELTTA",
                    href: "/exceltta",
                    description: "Excelência em logística e transporte",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                  },
                  {
                    label: "LABS",
                    href: "/labs",
                    description: "Inovação e desenvolvimento de soluções",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  },
                  {
                    label: "VENTURES",
                    href: "/ventures",
                    description: "Investimentos e parcerias estratégicas",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  },
                  {
                    label: "VERITUS",
                    href: "/veritus",
                    description: "Compliance e auditoria",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  }
                ]}
              />
              
              <DropdownMenu 
                label="Radar 360" 
                mainHref="/radar360"
                items={[
                  {
                    label: "Simulador de Custos de Importação",
                    href: "/simuladores/importacao",
                    description: "Calcule impostos, fretes e taxas para importação",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  },
                  {
                    label: "Simulador de Custos de Exportação",
                    href: "/simuladores/exportacao",
                    description: "Calcule receita líquida e crédito Reintegra",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  },
                  {
                    label: "Simulador Cambial",
                    href: "/simuladores/cambio",
                    description: "Converta valores entre diferentes moedas",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
                  },
                  {
                    label: "Calculadora de Fretes Internacionais",
                    href: "/simuladores/frete-full",
                    description: "Estime custos de frete aéreo, marítimo e rodoviário",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                  },
                  {
                    label: "Simulador Tributário Comex",
                    href: "/simuladores/tributario-light",
                    description: "Entenda a carga tributária para importação e exportação",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  },
                  {
                    label: "Conversor Peso ⚖️ Volume",
                    href: "/simuladores/cubagem",
                    description: "Calcule peso cubado e otimização de frete",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                  },
                  {
                    label: "Cotações em Tempo Real",
                    href: "/radar360#cotacoes",
                    description: "Acompanhe cotações de moedas e commodities",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  },
                  {
                    label: "Commodities",
                    href: "/radar360#commodities",
                    description: "Preços e tendências de commodities",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                  }
                ]}
              />
              
              <DropdownMenu 
                label="Blog" 
                mainHref="/blog"
                items={[
                  {
                    label: "Logística",
                    href: "/blog/categoria/logistica",
                    description: "Artigos sobre logística e supply chain",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                  },
                  {
                    label: "Exportação",
                    href: "/blog/categoria/exportacao",
                    description: "Estratégias e dicas para exportação",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  },
                  {
                    label: "Importação",
                    href: "/blog/categoria/importacao",
                    description: "Guias e informações sobre importação",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  },
                  {
                    label: "Supply Chain",
                    href: "/blog/categoria/supply-chain",
                    description: "Otimização de cadeias de suprimento",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-4 4m4-4l4 4m0 0v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4m0 0h6m-6 0l4-4m-4 4l-4-4" /></svg>
                  },
                  {
                    label: "Finanças",
                    href: "/blog/categoria/financas",
                    description: "Gestão financeira e câmbio",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
                  },
                  {
                    label: "Compliance",
                    href: "/blog/categoria/compliance",
                    description: "Regulamentações e conformidade",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  },
                  {
                    label: "PMEs",
                    href: "/blog/categoria/pmes",
                    description: "Conteúdo específico para pequenas e médias empresas",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  }
                ]}
              />
              
              <DropdownMenu 
                label="FAQ" 
                mainHref="/faq"
                items={[
                  {
                    label: "Consultoria COMEX In-Company",
                    href: "/faq#consultoria-comex-in-company",
                    description: "Perguntas sobre consultoria personalizada",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  },
                  {
                    label: "Consultoria Exportação",
                    href: "/faq#consultoria-exportacao",
                    description: "Dúvidas sobre exportação",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  },
                  {
                    label: "Consultoria Importação",
                    href: "/faq#consultoria-importacao",
                    description: "Questões sobre importação",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  },
                  {
                    label: "Documentação & Procedimentos",
                    href: "/faq#documentacao-procedimentos",
                    description: "Documentação e processos",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  },
                  {
                    label: "Estratégia de Internacionalização",
                    href: "/faq#estrategia-de-internacionalizacao-supply-chain",
                    description: "Estratégias e supply chain",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  },
                  {
                    label: "Exportação de Produtos",
                    href: "/faq#exportacao-de-produtos",
                    description: "Exportação específica por produtos",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  },
                  {
                    label: "Importação – Custos & Formação de Preço",
                    href: "/faq#importacao-custos-formacao-de-preco",
                    description: "Custos e precificação de importação",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
                  },
                  {
                    label: "Logística & Frete Internacional",
                    href: "/faq#logistica-frete-internacional",
                    description: "Logística e frete internacional",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                  },
                  {
                    label: "Plataformas do Ecossistema OLV",
                    href: "/faq#plataformas-do-ecossistema-olv",
                    description: "Dúvidas sobre as plataformas OLV",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  },
                  {
                    label: "Tecnologia & Simuladores OLV",
                    href: "/faq#tecnologia-simuladores-olv",
                    description: "Tecnologia e simuladores",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  },
                  {
                    label: "Tributos & Regimes Aduaneiros",
                    href: "/faq#tributos-regimes-aduaneiros",
                    description: "Tributos e regimes especiais",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  },
                  {
                    label: "Outros",
                    href: "/faq#outros",
                    description: "Outras dúvidas gerais",
                    icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  }
                ]}
              />
              
              <Link href="/contato" className={`nav-item ${isActive('/contato') ? 'active' : ''}`} data-page="contato">Contato</Link>
            </nav>

            {/* Language switcher desktop */}
            <LanguageSwitcher className="desktop-only" />
          </div>

          {/* User Menu (avatar + settings) */}
          <UserMenu />

          {/* Botão BUSCAR – apenas mobile (ação futura) */}
          <button
            className="mobile-search-toggle md:hidden flex items-center justify-center ml-2"
            aria-label="Abrir busca"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Botão MENU Principal – mobile */}
          <button
            className="mobile-nav-toggle md:hidden flex items-center justify-center"
            aria-label="Abrir menu principal"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className="sr-only">Menu</span>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="toggle-label">Menu</span>
          </button>
        </div>
      </header>

      {/* Overlay nav mobile */}
      { /* usa portal root para overlay se quiser, mas simples div */ }
      <nav className={`nav-menu-mobile md:hidden ${navOpen ? 'show' : ''}`}>
        <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Home</Link>
        <Link href="/sobre" className={`nav-item ${isActive('/sobre') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Sobre</Link>
        <Link href="/solucoes" className={`nav-item ${isActive('/solucoes') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Soluções</Link>
        <Link href="/ecossistema" className={`nav-item ${isActive('/ecossistema') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Ecossistema</Link>
        
        {/* Radar 360 com simuladores mobile */}
        <div className="mobile-dropdown-section">
          <Link href="/radar360" className={`nav-item ${isActive('/radar360') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
            Radar 360
          </Link>
          <div className="mobile-simulators-grid">
            <Link href="/simuladores/importacao" className="mobile-simulator-item" onClick={() => setNavOpen(false)}>
              <span className="mobile-simulator-icon">📦</span>
              <span className="mobile-simulator-label">Importação</span>
            </Link>
            <Link href="/simuladores/exportacao" className="mobile-simulator-item" onClick={() => setNavOpen(false)}>
              <span className="mobile-simulator-icon">🚢</span>
              <span className="mobile-simulator-label">Exportação</span>
            </Link>
            <Link href="/simuladores/cambio" className="mobile-simulator-item" onClick={() => setNavOpen(false)}>
              <span className="mobile-simulator-icon">💱</span>
              <span className="mobile-simulator-label">Câmbio</span>
            </Link>
            <Link href="/simuladores/frete-full" className="mobile-simulator-item" onClick={() => setNavOpen(false)}>
              <span className="mobile-simulator-icon">🚚</span>
              <span className="mobile-simulator-label">Frete</span>
            </Link>
            <Link href="/simuladores/tributario-light" className="mobile-simulator-item" onClick={() => setNavOpen(false)}>
              <span className="mobile-simulator-icon">📊</span>
              <span className="mobile-simulator-label">Tributos</span>
            </Link>
            <Link href="/simuladores/cubagem" className="mobile-simulator-item" onClick={() => setNavOpen(false)}>
              <span className="mobile-simulator-icon">⚖️</span>
              <span className="mobile-simulator-label">Cubagem</span>
            </Link>
          </div>
        </div>
        
        <Link href="/blog" className={`nav-item ${isActive('/blog') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Blog</Link>
        <Link href="/faq" className={`nav-item ${isActive('/faq') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>FAQ</Link>
        <Link href="/contato" className={`nav-item ${isActive('/contato') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Contato</Link>
        {/* Language switcher mobile */}
        <LanguageSwitcher className="mt-4" />
      </nav>
    </>
  );
};

export default Header;