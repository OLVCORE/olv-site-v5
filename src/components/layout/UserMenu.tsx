"use client";

import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaUserCog,
  FaUsers,
  FaTerminal,
  FaSun,
  FaMoon,
  FaDesktop,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import AuthModal from "../auth/AuthModal";

const themeOptions = [
  { value: "system", icon: <FaDesktop size={14} />, label: "System" },
  { value: "light", icon: <FaSun size={14} />, label: "Light" },
  { value: "dark", icon: <FaMoon size={14} />, label: "Dark" },
] as const;

export default function UserMenu() {
  type ThemeValue = (typeof themeOptions)[number]["value"];
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeValue>("system");
  const [showAuth, setShowAuth] = useState(false);

  // TODO: integrate real auth; null indicates not authenticated
  const user: { name: string; email: string } | null = null;

  // init theme
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as ThemeValue | null) ?? "dark";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function applyTheme(value: ThemeValue) {
    document.body.classList.remove("theme-light", "theme-dark");
    if (value === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.body.classList.add(prefersDark ? "theme-dark" : "theme-light");
    } else {
      document.body.classList.add(`theme-${value}`);
    }
  }

  function selectTheme(value: ThemeValue) {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  }

  // outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".user-menu-wrapper")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="user-menu-wrapper relative">
      <button
        aria-label="Menu do usuário"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="user-menu-dropdown"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent text-[var(--color-accent)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-64 rounded-md border border-gray-600 bg-[var(--color-surface)] shadow-lg p-4 space-y-3 z-[3000]" id="user-menu-dropdown" role="menu">
          {user && (
            <>
              {/* profile */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--color-accent)] flex-shrink-0">
                  <Image src="/images/olv-logo.jpeg" alt="Avatar" width={40} height={40} className="object-cover" />
                </div>
                <div className="text-sm leading-tight">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs opacity-80">{user.email}</p>
                </div>
              </div>

              {/* links */}
              <ul className="flex flex-col gap-1 text-sm">
                <li>
                  <a href="/core" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700/30">
                    <FaTachometerAlt size={14} /> Dashboard
                  </a>
                </li>
                <li>
                  <a href="/account" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700/30">
                    <FaUserCog size={14} /> Account Settings
                  </a>
                </li>
                <li>
                  <a href="/team" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700/30">
                    <FaUsers size={14} /> Create Team
                  </a>
                </li>
              </ul>
            </>
          )}

          {!user && (
            <button className="w-full px-3 py-2 rounded text-sm bg-[var(--color-accent)] text-on-primary hover:opacity-90" onClick={() => setShowAuth(true)}>Entrar / Criar Conta</button>
          )}

          {/* theme selector */}
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wide opacity-70">
              <FaTerminal size={12} /> Theme
            </div>
            <div className="flex gap-2">
              {themeOptions.map((opt) => (
                <button
                  key={opt.value}
                  title={opt.label}
                  className={`flex items-center justify-center w-8 h-8 rounded border hover:bg-gray-700/30 ${
                    theme === opt.value ? "border-[var(--color-accent)]" : "border-transparent"
                  }`}
                  onClick={() => selectTheme(opt.value)}
                >
                  {opt.icon}
                </button>
              ))}
            </div>
          </div>

          <ul className="flex flex-col gap-1 text-sm pt-2 border-t border-gray-700/60">
            <li>
              <a href="/" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700/30">
                <FaHome size={14} /> Home Page
              </a>
            </li>
            {user && (
              <li>
                <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700/30 w-full text-left" onClick={() => supabase.auth.signOut()}>
                  <FaSignOutAlt size={14} /> Log Out
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      {showAuth && <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />}
    </div>
  );
} 