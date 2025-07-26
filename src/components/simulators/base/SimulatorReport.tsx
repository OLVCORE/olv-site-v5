"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CostDistributionChart, ViabilityIndicator, CostBreakdownTable } from './ChartComponents';
import { ReportSkeleton } from './LoadingStates';
import { SequentialReportAnimation, AnimatedCard, AnimatedChart, AnimatedTable } from '../shared/AnimationSystem';
import { toast } from 'react-hot-toast';

interface CostData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface SimulatorReportProps {
  title: string;
  description: string;
  data: {
    costs: CostData[];
    totalCost: number;
    currency: string;
    viabilityScore: number;
    viabilityLabel: string;
  };
  loading?: boolean;
  onExport?: (format: 'pdf' | 'xls') => void;
  onSave?: (name: string) => void;
  onContact?: () => void;
  className?: string;
}

export const SimulatorReport: React.FC<SimulatorReportProps> = ({
  title,
  description,
  data,
  loading = false,
  onExport,
  onSave,
  onContact,
  className = ''
}) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'xls'>('pdf');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState('');

  const handleExport = () => {
    if (onExport) {
      onExport(exportFormat);
      toast.success(`Relatório exportado em ${exportFormat.toUpperCase()}`);
    }
  };

  const handleSave = () => {
    if (saveName.trim() && onSave) {
      onSave(saveName.trim());
      setShowSaveDialog(false);
      setSaveName('');
      toast.success('Simulação salva com sucesso!');
    } else {
      toast.error('Digite um nome para salvar');
    }
  };

  if (loading) {
    return <ReportSkeleton />;
  }

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-lg text-sm md:text-base ${className}`}>
      <SequentialReportAnimation>
        {/* Cabeçalho Corporativo */}
        <AnimatedCard delay={0.1}>
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {description}
            </p>
          </div>
        </AnimatedCard>

        {/* Gráficos e Indicadores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AnimatedChart delay={0.2}>
            <CostDistributionChart
              data={data.costs}
              totalCost={data.totalCost}
              currency={data.currency}
              type="pie"
            />
          </AnimatedChart>

          <div className="space-y-4">
            <AnimatedCard delay={0.3}>
              <ViabilityIndicator
                score={data.viabilityScore}
                label={data.viabilityLabel}
              />
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Resumo Executivo
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Custo Total:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: data.currency === 'USD' ? 'USD' : 'BRL',
                        minimumFractionDigits: 2,
                      }).format(data.totalCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Maior Custo:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {data.costs[0]?.name} ({data.costs[0]?.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Viabilidade:</span>
                    <span className={`font-semibold ${
                      data.viabilityScore >= 80 ? 'text-green-600' :
                      data.viabilityScore >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {data.viabilityScore}%
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>

        {/* Tabela Detalhada */}
        <AnimatedTable delay={0.5}>
          <CostBreakdownTable data={data.costs} />
        </AnimatedTable>

        {/* Call-to-Action Corporativo */}
        <AnimatedCard delay={0.6}>
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Consultoria Especializada
            </h4>
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <p>• <strong>Reduzir custos</strong> com negociação de fretes e seguros</p>
              <p>• <strong>Minimizar tributos</strong> com classificação NCM correta</p>
              <p>• <strong>Otimizar logística</strong> com roteirização inteligente</p>
              <p>• <strong>Consultoria especializada</strong> em comércio exterior</p>
            </div>
          </div>
        </AnimatedCard>

        {/* Disclaimer */}
        <AnimatedCard delay={0.7}>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            ⚠️ Valores aproximados. Para cálculos precisos e otimização, consulte nossos especialistas.
          </p>
        </AnimatedCard>

        {/* Botões de Ação */}
        <AnimatedCard delay={0.8}>
          <div className="mt-6 space-y-4">
            {/* Seção de Download */}
            <div className="flex items-center gap-3">
              <select 
                value={exportFormat} 
                onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'xls')} 
                className="glass px-4 py-2 rounded-lg text-white shadow-gold card-hover transition-all duration-300 border border-accent/20 backdrop-blur-sm text-sm bg-transparent"
              >
                <option value="pdf" className="bg-gray-800 text-white">📄 PDF</option>
                <option value="xls" className="bg-gray-800 text-white">📊 XLS</option>
              </select>
              <button 
                type="button" 
                onClick={handleExport}
                className="glass px-6 py-2 rounded-lg text-white shadow-gold card-hover transition-all duration-300 flex items-center gap-2 border border-accent/20 backdrop-blur-sm text-sm font-medium"
              >
                <span className="text-accent">⬇️</span>
                Baixar Relatório
              </button>
            </div>
            
            {/* Botões de Ação Principais */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                type="button"
                onClick={() => setShowSaveDialog(true)}
                className="glass px-6 py-3 rounded-lg text-white shadow-gold card-hover transition-all duration-300 flex items-center justify-center gap-2 border border-green-500/20 backdrop-blur-sm text-sm font-medium bg-gradient-to-r from-green-600/20 to-green-700/20"
              >
                <span className="text-green-400">💾</span>
                Salvar Simulação
              </button>
              
              <button 
                type="button"
                onClick={onContact}
                className="glass px-6 py-3 rounded-lg text-white shadow-gold card-hover transition-all duration-300 flex items-center justify-center gap-2 border border-accent/20 backdrop-blur-sm text-sm font-medium bg-gradient-to-r from-accent/20 to-accent/30 animate-pulse"
              >
                <span className="text-accent">💬</span>
                Falar com Especialista
              </button>
            </div>
          </div>
        </AnimatedCard>
      </SequentialReportAnimation>

      {/* Modal de Salvar */}
      <AnimatePresence>
        {showSaveDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setShowSaveDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 border-2 border-accent"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Salvar Simulação
              </h3>
              <input
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="Nome da simulação"
                className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white"
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowSaveDialog(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  onClick={handleSave}
                  className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/80"
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Hook para gerenciar dados do relatório
export const useSimulatorReport = () => {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async (calculationData: any) => {
    setLoading(true);
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Processar dados para o relatório
      const costs = Object.entries(calculationData).map(([key, value]: [string, any]) => ({
        name: key,
        value: value || 0,
        percentage: 0, // Será calculado
        color: getColorForCost(key)
      }));

      const totalCost = costs.reduce((sum, cost) => sum + cost.value, 0);
      
      // Calcular percentuais
      costs.forEach(cost => {
        cost.percentage = totalCost > 0 ? (cost.value / totalCost) * 100 : 0;
      });

      // Ordenar por valor decrescente
      costs.sort((a, b) => b.value - a.value);

      // Calcular score de viabilidade
      const taxBurden = costs
        .filter(cost => ['II', 'IPI', 'PIS', 'COFINS', 'ICMS'].includes(cost.name))
        .reduce((sum, cost) => sum + cost.percentage, 0);

      const viabilityScore = Math.max(0, 100 - taxBurden);

      setReportData({
        costs,
        totalCost,
        currency: 'BRL',
        viabilityScore: Math.round(viabilityScore),
        viabilityLabel: 'Viabilidade da Importação'
      });
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      toast.error('Erro ao gerar relatório');
    } finally {
      setLoading(false);
    }
  };

  return {
    reportData,
    loading,
    generateReport
  };
};

// Função auxiliar para cores
const getColorForCost = (costName: string): string => {
  const colorMap: Record<string, string> = {
    FOB: '#10B981',
    Freight: '#3B82F6',
    Insurance: '#8B5CF6',
    II: '#EF4444',
    IPI: '#F59E0B',
    PIS: '#EC4899',
    COFINS: '#06B6D4',
    ICMS: '#84CC16',
    Customs: '#F97316',
    Misc: '#6B7280'
  };
  
  return colorMap[costName] || '#6B7280';
}; 