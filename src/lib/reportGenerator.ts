// Sistema de geração de relatórios para o simulador de frete
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Interfaces para dados de relatório
export interface FreightReportData {
  simulationId: string;
  timestamp: Date;
  userInputs: {
    origin: string;
    destination: string;
    weight: number;
    volume: number;
    incoterm: string;
    cargoType: string;
  };
  results: {
    totalCost: { usd: number; brl: number };
    breakdown: Array<{
      name: string;
      usd: number;
      brl: number;
      percentage: number;
    }>;
    timeline: Array<{
      day: number;
      event: string;
      status: string;
      cost: number;
    }>;
    modalComparison: Array<{
      modal: string;
      cost: number;
      time: number;
      carbon: number;
      reliability: number;
    }>;
    alerts: Array<{
      type: string;
      message: string;
      icon: string;
    }>;
  };
  metadata: {
    version: string;
    generatedBy: string;
    dataSource: string;
  };
}

// Função para gerar relatório PDF
export async function generatePDFReport(data: FreightReportData): Promise<Blob> {
  const doc = new jsPDF();
  
  // Configurações de estilo
  const titleFontSize = 18;
  const subtitleFontSize = 14;
  const normalFontSize = 12;
  const smallFontSize = 10;
  
  let yPosition = 20;
  
  // Cabeçalho
  doc.setFontSize(titleFontSize);
  doc.setFont('helvetica', 'bold');
  doc.text('Relatório de Simulação de Frete', 105, yPosition, { align: 'center' });
  
  yPosition += 15;
  
  // Informações da simulação
  doc.setFontSize(subtitleFontSize);
  doc.setFont('helvetica', 'bold');
  doc.text('Informações da Simulação', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(normalFontSize);
  doc.setFont('helvetica', 'normal');
  
  const simulationInfo = [
    ['ID da Simulação:', data.simulationId],
    ['Data/Hora:', data.timestamp.toLocaleString('pt-BR')],
    ['Origem:', data.userInputs.origin],
    ['Destino:', data.userInputs.destination],
    ['Peso:', `${data.userInputs.weight} kg`],
    ['Volume:', `${data.userInputs.volume} m³`],
    ['Incoterm:', data.userInputs.incoterm],
    ['Tipo de Carga:', data.userInputs.cargoType]
  ];
  
  simulationInfo.forEach(([label, value]) => {
    doc.text(label, 20, yPosition);
    doc.text(value, 80, yPosition);
    yPosition += 7;
  });
  
  yPosition += 10;
  
  // Resultados principais
  doc.setFontSize(subtitleFontSize);
  doc.setFont('helvetica', 'bold');
  doc.text('Resultados Principais', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(normalFontSize);
  doc.setFont('helvetica', 'normal');
  
  doc.text(`Custo Total: $${data.results.totalCost.usd.toFixed(2)} (R$ ${data.results.totalCost.brl.toFixed(2)})`, 20, yPosition);
  yPosition += 7;
  
  // Breakdown de custos
  yPosition += 5;
  doc.setFontSize(subtitleFontSize);
  doc.setFont('helvetica', 'bold');
  doc.text('Breakdown de Custos', 20, yPosition);
  
  yPosition += 10;
  
  const breakdownData = data.results.breakdown.map(item => [
    item.name,
    `$${item.usd.toFixed(2)}`,
    `R$ ${item.brl.toFixed(2)}`,
    `${item.percentage.toFixed(1)}%`
  ]);
  
  (doc as any).autoTable({
    startY: yPosition,
    head: [['Componente', 'USD', 'BRL', '%']],
    body: breakdownData,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: smallFontSize }
  });
  
  yPosition = (doc as any).lastAutoTable.finalY + 10;
  
  // Comparação de modais
  if (data.results.modalComparison.length > 0) {
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Comparação de Modais', 20, yPosition);
    
    yPosition += 10;
    
    const modalData = data.results.modalComparison.map(modal => [
      modal.modal,
      `$${modal.cost.toFixed(2)}`,
      `${modal.time} dias`,
      `${modal.carbon} kg CO₂`,
      `${modal.reliability}%`
    ]);
    
    (doc as any).autoTable({
      startY: yPosition,
      head: [['Modal', 'Custo', 'Tempo', 'Carbono', 'Confiabilidade']],
      body: modalData,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
      styles: { fontSize: smallFontSize }
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }
  
  // Timeline
  if (data.results.timeline.length > 0) {
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Timeline de Transporte', 20, yPosition);
    
    yPosition += 10;
    
    const timelineData = data.results.timeline.map(item => [
      `Dia ${item.day}`,
      item.event,
      item.status,
      `$${item.cost.toFixed(2)}`
    ]);
    
    (doc as any).autoTable({
      startY: yPosition,
      head: [['Dia', 'Evento', 'Status', 'Custo']],
      body: timelineData,
      theme: 'grid',
      headStyles: { fillColor: [245, 158, 11] },
      styles: { fontSize: smallFontSize }
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }
  
  // Alertas
  if (data.results.alerts.length > 0) {
    doc.setFontSize(subtitleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Alertas e Recomendações', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(normalFontSize);
    doc.setFont('helvetica', 'normal');
    
    data.results.alerts.forEach(alert => {
      doc.text(`${alert.icon} ${alert.message}`, 20, yPosition);
      yPosition += 7;
    });
  }
  
  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(smallFontSize);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Página ${i} de ${pageCount} | Gerado em ${new Date().toLocaleString('pt-BR')} | ${data.metadata.generatedBy}`,
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  return doc.output('blob');
}

// Função para gerar relatório Excel
export async function generateExcelReport(data: FreightReportData): Promise<Blob> {
  const workbook = XLSX.utils.book_new();
  
  // Planilha 1: Resumo Executivo
  const summaryData = [
    ['RELATÓRIO DE SIMULAÇÃO DE FRETE'],
    [''],
    ['Informações da Simulação'],
    ['ID da Simulação', data.simulationId],
    ['Data/Hora', data.timestamp.toLocaleString('pt-BR')],
    ['Origem', data.userInputs.origin],
    ['Destino', data.userInputs.destination],
    ['Peso (kg)', data.userInputs.weight],
    ['Volume (m³)', data.userInputs.volume],
    ['Incoterm', data.userInputs.incoterm],
    ['Tipo de Carga', data.userInputs.cargoType],
    [''],
    ['Resultados Principais'],
    ['Custo Total (USD)', data.results.totalCost.usd],
    ['Custo Total (BRL)', data.results.totalCost.brl],
    [''],
    ['Custo por kg (USD)', data.results.totalCost.usd / data.userInputs.weight],
    ['Custo por m³ (USD)', data.results.totalCost.usd / data.userInputs.volume]
  ];
  
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumo Executivo');
  
  // Planilha 2: Breakdown de Custos
  const breakdownHeaders = ['Componente', 'USD', 'BRL', 'Percentual (%)'];
  const breakdownData = data.results.breakdown.map(item => [
    item.name,
    item.usd,
    item.brl,
    item.percentage
  ]);
  
  const breakdownSheet = XLSX.utils.aoa_to_sheet([breakdownHeaders, ...breakdownData]);
  XLSX.utils.book_append_sheet(workbook, breakdownSheet, 'Breakdown de Custos');
  
  // Planilha 3: Comparação de Modais
  if (data.results.modalComparison.length > 0) {
    const modalHeaders = ['Modal', 'Custo (USD)', 'Tempo (dias)', 'Carbono (kg CO₂)', 'Confiabilidade (%)'];
    const modalData = data.results.modalComparison.map(modal => [
      modal.modal,
      modal.cost,
      modal.time,
      modal.carbon,
      modal.reliability
    ]);
    
    const modalSheet = XLSX.utils.aoa_to_sheet([modalHeaders, ...modalData]);
    XLSX.utils.book_append_sheet(workbook, modalSheet, 'Comparação de Modais');
  }
  
  // Planilha 4: Timeline
  if (data.results.timeline.length > 0) {
    const timelineHeaders = ['Dia', 'Evento', 'Status', 'Custo (USD)', 'Custo Acumulado (USD)'];
    const timelineData = data.results.timeline.map((item, index) => {
      const accumulatedCost = data.results.timeline
        .slice(0, index + 1)
        .reduce((sum, d) => sum + d.cost, 0);
      
      return [
        item.day,
        item.event,
        item.status,
        item.cost,
        accumulatedCost
      ];
    });
    
    const timelineSheet = XLSX.utils.aoa_to_sheet([timelineHeaders, ...timelineData]);
    XLSX.utils.book_append_sheet(workbook, timelineSheet, 'Timeline');
  }
  
  // Planilha 5: Alertas
  if (data.results.alerts.length > 0) {
    const alertHeaders = ['Tipo', 'Mensagem', 'Ícone'];
    const alertData = data.results.alerts.map(alert => [
      alert.type,
      alert.message,
      alert.icon
    ]);
    
    const alertSheet = XLSX.utils.aoa_to_sheet([alertHeaders, ...alertData]);
    XLSX.utils.book_append_sheet(workbook, alertSheet, 'Alertas');
  }
  
  // Planilha 6: Metadados
  const metadataData = [
    ['Metadados'],
    [''],
    ['Versão', data.metadata.version],
    ['Gerado por', data.metadata.generatedBy],
    ['Fonte de dados', data.metadata.dataSource],
    ['Data de geração', new Date().toLocaleString('pt-BR')]
  ];
  
  const metadataSheet = XLSX.utils.aoa_to_sheet(metadataData);
  XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Metadados');
  
  // Gerar arquivo
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

// Função para gerar relatório executivo (versão simplificada)
export async function generateExecutiveReport(data: FreightReportData): Promise<Blob> {
  const doc = new jsPDF();
  
  let yPosition = 20;
  
  // Título
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Relatório Executivo - Simulação de Frete', 105, yPosition, { align: 'center' });
  
  yPosition += 20;
  
  // KPIs principais
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Principais Indicadores', 20, yPosition);
  
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  
  doc.text(`💰 Custo Total: $${data.results.totalCost.usd.toFixed(2)}`, 20, yPosition);
  yPosition += 10;
  doc.text(`⏱️ Tempo de Trânsito: ${data.results.timeline.length > 0 ? data.results.timeline[data.results.timeline.length - 1].day : 'N/A'} dias`, 20, yPosition);
  yPosition += 10;
  doc.text(`🌱 Pegada de Carbono: ${data.results.modalComparison.length > 0 ? data.results.modalComparison[0].carbon : 'N/A'} kg CO₂`, 20, yPosition);
  
  yPosition += 20;
  
  // Recomendações
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Recomendações', 20, yPosition);
  
  yPosition += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const recommendations = [
    '• Analise a comparação de modais para otimizar custos',
    '• Considere consolidar cargas para reduzir custos unitários',
    '• Monitore o timeline para evitar atrasos',
    '• Avalie opções de seguro adequadas ao seu risco'
  ];
  
  recommendations.forEach(rec => {
    doc.text(rec, 20, yPosition);
    yPosition += 8;
  });
  
  return doc.output('blob');
}

// Função para salvar relatório no histórico
export function saveReportToHistory(data: FreightReportData): void {
  try {
    const history = JSON.parse(localStorage.getItem('freightSimulationHistory') || '[]');
    history.push({
      ...data,
      id: data.simulationId,
      createdAt: new Date().toISOString()
    });
    
    // Manter apenas os últimos 50 relatórios
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }
    
    localStorage.setItem('freightSimulationHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Erro ao salvar relatório no histórico:', error);
  }
}

// Função para carregar histórico de relatórios
export function loadReportHistory(): FreightReportData[] {
  try {
    const history = JSON.parse(localStorage.getItem('freightSimulationHistory') || '[]');
    return history.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
  } catch (error) {
    console.error('Erro ao carregar histórico de relatórios:', error);
    return [];
  }
}

// Função para excluir relatório do histórico
export function deleteReportFromHistory(simulationId: string): void {
  try {
    const history = JSON.parse(localStorage.getItem('freightSimulationHistory') || '[]');
    const filteredHistory = history.filter((item: any) => item.simulationId !== simulationId);
    localStorage.setItem('freightSimulationHistory', JSON.stringify(filteredHistory));
  } catch (error) {
    console.error('Erro ao excluir relatório do histórico:', error);
  }
} 