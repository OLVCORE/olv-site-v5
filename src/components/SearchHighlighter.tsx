"use client";
import { useEffect } from 'react';

export default function SearchHighlighter() {
  useEffect(() => {
    const term = sessionStorage.getItem('lastSearchTerm');
    if (!term) return;
    sessionStorage.removeItem('lastSearchTerm');
    if (term.length < 2) return;

    const regex = new RegExp(`(${term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node: Node | null;
    let firstEl: HTMLElement | null = null;
    let processed = 0;
    while ((node = walker.nextNode()) && processed < 5000) {
      processed++;
      if (!node || !node.nodeValue) continue;
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'MARK'].includes(parent.tagName)) continue;
      if (!regex.test(node.nodeValue)) continue;
      const span = document.createElement('span');
      span.innerHTML = node.nodeValue.replace(regex, '<mark class="bg-purple-600/40 text-gray-100 font-bold">$1</mark>');
      parent.replaceChild(span, node);
      if (!firstEl) {
        firstEl = span.querySelector('mark') as HTMLElement;
      }
    }
    if (firstEl && firstEl.scrollIntoView) {
      firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);
  return null;
} 