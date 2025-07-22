"use client";

export function toast({ title, description }: { title: string; description?: string }) {
  // Simple fallback: browser alert + console.
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-alert
    alert(`${title}\n${description ?? ''}`);
  }
  console.log('[toast]', title, description);
} 