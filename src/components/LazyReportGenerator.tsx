"use client";

// Imports removidos pois não são utilizados neste arquivo

// Lazy load do gerador de relatórios (jsPDF + XLSX - ~500KB)
// Nota: reportGenerator.ts não é um componente React, então não usamos lazy loading aqui
// Em vez disso, vamos fazer lazy loading das funções quando necessário

// Componente de loading para relatórios
const ReportLoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
    <p className="text-gray-600 dark:text-gray-400 text-sm">Carregando gerador de relatórios...</p>
  </div>
);

// Wrapper para o gerador de relatórios (sem lazy loading de componente)
export const ReportGenerator = (_props: any) => {
  // Este componente não precisa de lazy loading pois reportGenerator.ts
  // não é um componente React, mas sim funções utilitárias
  return <ReportLoadingSpinner />;
};

// Re-export das funções principais com lazy loading
export const generatePDFReport = async (data: any) => {
  const { generatePDFReport: lazyGeneratePDFReport } = await import('../lib/reportGenerator');
  return lazyGeneratePDFReport(data);
};

export const generateExcelReport = async (data: any) => {
  const { generateExcelReport: lazyGenerateExcelReport } = await import('../lib/reportGenerator');
  return lazyGenerateExcelReport(data);
};

export const generateExecutiveReport = async (data: any) => {
  const { generateExecutiveReport: lazyGenerateExecutiveReport } = await import('../lib/reportGenerator');
  return lazyGenerateExecutiveReport(data);
};
