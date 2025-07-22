import { useEffect } from 'react';

interface WebVitalsData {
  name: string;
  value: number;
  id: string;
}

export const WebVitals: React.FC = () => {
  useEffect(() => {
    // Função para enviar métricas para Google Analytics
    const sendToAnalytics = (metric: WebVitalsData) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }
    };

    // Importar e configurar web-vitals
    const importWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
        
        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getFCP(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      } catch (error) {
        console.warn('Web Vitals não disponível:', error);
      }
    };

    importWebVitals();
  }, []);

  return null;
};

// Hook para monitorar performance de componentes específicos
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'component_render_time', {
          event_category: 'Performance',
          event_label: componentName,
          value: Math.round(duration),
          non_interaction: true,
        });
      }
    };
  }, [componentName]);
};

// Hook para monitorar interações do usuário
export const useInteractionMonitor = (action: string, category: string = 'User Interaction') => {
  const trackInteraction = (label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  return trackInteraction;
}; 