"use client";

import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitch: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // If saved theme exists, use it, otherwise keep dark
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Remove theme classes from body
    document.body.classList.remove('theme-light', 'theme-dark');
    // Add new theme class
    document.body.classList.add(`theme-${newTheme}`);
    
    // Update meta tag for theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        newTheme === 'dark' ? '#0a0f1d' : '#ffffff'
      );
    }
  };
  
  return (
    <div className="theme-switch-wrapper">
      <label className="theme-switch">
        <input 
          type="checkbox" 
          checked={theme === 'light'} 
          onChange={toggleTheme}
        />
        <div className="switch-inner">
          <span className="switch-icon moon-icon">
            <FaMoon size={14} color="#d4af37" />
          </span>
          <span className="switch-icon sun-icon">
            <FaSun size={14} color="#f8cc35" />
          </span>
        </div>
      </label>
    </div>
  );
};

export default ThemeSwitch; 