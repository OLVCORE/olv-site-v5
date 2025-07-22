"use client";

import React, { useEffect, useState } from "react";
import { FaCog, FaCheck, FaSignOutAlt, FaHome, FaTachometerAlt, FaUserCog, FaTerminal } from "react-icons/fa";
import Image from "next/image";

// Available theme options
const themeOptions = [
  { value: "system", label: "Sistema" },
  { value: "light", label: "Claro" },
  { value: "dark", label: "Escuro" },
] as const;

type ThemeValue = (typeof themeOptions)[number]["value"];

// Utility: apply theme classes to <body>
function applyTheme(theme: ThemeValue) {
  const body = document.body;
  body.classList.remove("theme-light", "theme-dark");

  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    body.classList.add(prefersDark ? "theme-dark" : "theme-light");
  } else {
    body.classList.add(`theme-${theme}`);
  }
}

const SettingsMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeValue>("system");

  // Load initial value
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as ThemeValue | null) ?? "system";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const handleSelect = (value: ThemeValue) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".settings-menu-wrapper")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="settings-menu-wrapper fixed top-3 left-3 z-[3000] lg:top-4 lg:left-4">
      <button
        aria-label="Abrir configurações"
        className="settings-trigger flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-700/20 transition-colors bg-[var(--color-surface)] border border-[var(--color-accent)] text-[var(--color-accent)]"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaCog size={18} />
      </button>

      {open && (
        <div
          className="mt-2 w-60 rounded-md border border-gray-600 bg-[var(--color-surface)] shadow-lg z-[2600] p-4"
        >
          {/* User section */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--color-accent)] flex-shrink-0">
              <Image src="/images/olv-logo.jpeg" alt="Avatar" width={40} height={40} className="object-cover" />
            </div>
            <div className="text-sm leading-tight">
              <p className="font-semibold">Marcos Oliveira</p>
              <p className="text-xs opacity-80">marcos@olv.com.br</p>
            </div>
          </div>

          {/* Navigation links */}
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
              <details className="group">
                <summary className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700/30 cursor-pointer list-none">
                  <FaTerminal size={14} /> Tema
                </summary>
                <ul className="mt-1 ml-4 flex flex-col gap-1">
                  {themeOptions.map((opt) => (
                    <li key={opt.value}>
                      <button
                        className="flex w-full items-center justify-between rounded px-2 py-1 hover:bg-gray-700/30"
                        onClick={() => handleSelect(opt.value)}
                      >
                        {opt.label}
                        {opt.value === theme && <FaCheck size={12} />}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <a href="/" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700/30">
                <FaHome size={14} /> Home Page
              </a>
            </li>
            <li>
              <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700/30 w-full text-left">
                <FaSignOutAlt size={14} /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu; 