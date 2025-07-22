"use client";

import React from 'react';

/**
 * Componente para facilitar o tracking de eventos do Google Tag Manager
 * Seguindo a Operação Blindada - apenas adicionando funcionalidade
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });
  }
};

// Eventos específicos do site OLV
export const trackPageView = (pageName: string) => {
  trackEvent('page_view', {
    page_name: pageName,
    page_location: window.location.href,
    page_title: document.title
  });
};

export const trackContactForm = (formType: string) => {
  trackEvent('form_submit', {
    form_type: formType,
    page_location: window.location.href
  });
};

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    page_location: window.location.href,
    contact_method: 'whatsapp'
  });
};

export const trackSimulatorUse = (simulatorType: string) => {
  trackEvent('simulator_use', {
    simulator_type: simulatorType,
    page_location: window.location.href
  });
};

export const trackBlogView = (articleTitle: string, category: string) => {
  trackEvent('blog_view', {
    article_title: articleTitle,
    category: category,
    page_location: window.location.href
  });
};

export const trackPlatformView = (platformName: string) => {
  trackEvent('platform_view', {
    platform_name: platformName,
    page_location: window.location.href
  });
};

export const trackLeadGeneration = (source: string, medium: string) => {
  trackEvent('lead_generation', {
    source: source,
    medium: medium,
    page_location: window.location.href
  });
};

export const trackPhoneCall = () => {
  trackEvent('phone_call', {
    page_location: window.location.href,
    contact_method: 'phone'
  });
};

export const trackEmailClick = () => {
  trackEvent('email_click', {
    page_location: window.location.href,
    contact_method: 'email'
  });
};

export const trackDownload = (fileType: string, fileName: string) => {
  trackEvent('file_download', {
    file_type: fileType,
    file_name: fileName,
    page_location: window.location.href
  });
};

// Hook para tracking automático de páginas
export const usePageTracking = (pageName: string) => {
  React.useEffect(() => {
    trackPageView(pageName);
  }, [pageName]);
};

// Componente para tracking automático
export const PageTracker: React.FC<{ pageName: string }> = ({ pageName }) => {
  React.useEffect(() => {
    trackPageView(pageName);
  }, [pageName]);

  return null;
};

export default {
  trackEvent,
  trackPageView,
  trackContactForm,
  trackWhatsAppClick,
  trackSimulatorUse,
  trackBlogView,
  trackPlatformView,
  trackDownload,
  usePageTracking,
  PageTracker
}; 