'use client';

import { useEffect } from 'react';

export default function WebVitalsMonitor() {
  useEffect(() => {
    // Monitoramento de Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Enviar para analytics se necessário
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime)
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(entry.processingStart - entry.startTime)
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('CLS:', clsValue);
            
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'CLS',
                value: Math.round(clsValue * 1000) / 1000
              });
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // FCP (First Contentful Paint)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        console.log('FCP:', firstEntry.startTime);
        
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FCP',
            value: Math.round(firstEntry.startTime)
          });
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    }
  }, []);

  return null;
} 