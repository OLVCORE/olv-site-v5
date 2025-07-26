"use client";

import React, { useState } from 'react';
import { SimulatorReport, useSimulatorReport } from '../base/SimulatorReport';
import { ValidatedInput, SimulatorValidationRules } from '../base/ValidationFeedback';
import { LoadingAnimation } from '../shared/AnimationSystem';
import { toast, Toaster } from 'react-hot-toast';

export default function ImportCostCalculatorEnhanced() {
  const { reportData, loading, generateReport } = useSimulatorReport();
  const [isCalculating, setIsCalculating] = useState(false);
  const [formData, setFormData] = useState({
    fob: '',
    freight: '',
    insurance: '',
    exchange: '5.00',
    ii: '12',
    ipi: '0',
    pis: '2,10',
    cofins: '9,65',
    icms: '18',
    customs: '0',
    misc: '0'
  });

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      // Simular cálculo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const calculationData = {
        FOB: parseFloat(formData.fob) || 0,
        Freight: parseFloat(formData.freight) || 0,
        Insurance: parseFloat(formData.insurance) || 0,
        II: parseFloat(formData.ii) || 0,
        IPI: parseFloat(formData.ipi) || 0,
        PIS: parseFloat(formData.pis) || 0,
        COFINS: parseFloat(formData.cofins) || 0,
        ICMS: parseFloat(formData.icms) || 0,
        Customs: parseFloat(formData.customs) || 0,
        Misc: parseFloat(formData.misc) || 0
      };

      await generateReport(calculationData);
      toast.success('Cálculo concluído com sucesso!');
    } catch {
      toast.error('Erro ao calcular custos');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleExport = (format: 'pdf' | 'xls') => {
    toast.success(`Exportando relatório em ${format.toUpperCase()}...`);
  };

  const handleSave = (name: string) => {
    toast.success(`Simulação "${name}" salva com sucesso!`);
  };

  const handleContact = () => {
    window.open('/contato', '_blank');
  };

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Formulário */}
        <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Dados da Importação
            </h2>
            
            <div className="space-y-4">
              <ValidatedInput
                value={formData.fob}
                onChange={(value) => setFormData(prev => ({ ...prev, fob: value }))}
                rules={[SimulatorValidationRules.currency(0)]}
                label="Valor FOB (USD)"
                placeholder="0,00"
                onValidationChange={(isValid) => {
                  if (!isValid) toast.error('Valor FOB deve ser maior ou igual a zero');
                }}
              />

              <ValidatedInput
                value={formData.freight}
                onChange={(value) => setFormData(prev => ({ ...prev, freight: value }))}
                rules={[SimulatorValidationRules.nonNegative()]}
                label="Frete Internacional (USD)"
                placeholder="0,00"
              />

              <ValidatedInput
                value={formData.insurance}
                onChange={(value) => setFormData(prev => ({ ...prev, insurance: value }))}
                rules={[SimulatorValidationRules.nonNegative()]}
                label="Seguro (USD)"
                placeholder="0,00"
              />

              <ValidatedInput
                value={formData.exchange}
                onChange={(value) => setFormData(prev => ({ ...prev, exchange: value }))}
                rules={[SimulatorValidationRules.positive()]}
                label="Taxa de Câmbio (BRL)"
                placeholder="5,00"
              />

              <div className="grid grid-cols-2 gap-4">
                <ValidatedInput
                  value={formData.ii}
                  onChange={(value) => setFormData(prev => ({ ...prev, ii: value }))}
                  rules={[SimulatorValidationRules.percentage(0, 100)]}
                  label="II (%)"
                  placeholder="12"
                />

                <ValidatedInput
                  value={formData.ipi}
                  onChange={(value) => setFormData(prev => ({ ...prev, ipi: value }))}
                  rules={[SimulatorValidationRules.percentage(0, 100)]}
                  label="IPI (%)"
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ValidatedInput
                  value={formData.pis}
                  onChange={(value) => setFormData(prev => ({ ...prev, pis: value }))}
                  rules={[SimulatorValidationRules.percentage(0, 100)]}
                  label="PIS (%)"
                  placeholder="2,10"
                />

                <ValidatedInput
                  value={formData.cofins}
                  onChange={(value) => setFormData(prev => ({ ...prev, cofins: value }))}
                  rules={[SimulatorValidationRules.percentage(0, 100)]}
                  label="COFINS (%)"
                  placeholder="9,65"
                />
              </div>

              <ValidatedInput
                value={formData.icms}
                onChange={(value) => setFormData(prev => ({ ...prev, icms: value }))}
                rules={[SimulatorValidationRules.percentage(0, 100)]}
                label="ICMS (%)"
                placeholder="18"
              />

              <div className="grid grid-cols-2 gap-4">
                <ValidatedInput
                  value={formData.customs}
                  onChange={(value) => setFormData(prev => ({ ...prev, customs: value }))}
                  rules={[SimulatorValidationRules.nonNegative()]}
                  label="Despesas Aduaneiras (USD)"
                  placeholder="0,00"
                />

                <ValidatedInput
                  value={formData.misc}
                  onChange={(value) => setFormData(prev => ({ ...prev, misc: value }))}
                  rules={[SimulatorValidationRules.nonNegative()]}
                  label="Outras Despesas (USD)"
                  placeholder="0,00"
                />
              </div>

              <button
                onClick={handleCalculate}
                disabled={isCalculating}
                className="w-full btn btn-primary py-3 text-lg font-semibold disabled:opacity-50"
              >
                {isCalculating ? 'Calculando...' : 'Calcular Custos'}
              </button>
            </div>
          </div>

        {/* Relatório */}
        <LoadingAnimation isLoading={isCalculating}>
          {reportData ? (
            <SimulatorReport
              title="Relatório de Custo de Importação"
              description="Análise detalhada de custos e tributos para importação"
              data={reportData}
              loading={loading}
              onExport={handleExport}
              onSave={handleSave}
              onContact={handleContact}
            />
          ) : (
            <div className="glass p-6 rounded-2xl shadow-gold card-hover text-center">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Aguardando Cálculo
                </h3>
                <p className="text-sm">
                  Preencha os dados e clique em &quot;Calcular Custos&quot; para gerar o relatório
                </p>
              </div>
            </div>
          )}
        </LoadingAnimation>
      </div>
    </>
  );
} 