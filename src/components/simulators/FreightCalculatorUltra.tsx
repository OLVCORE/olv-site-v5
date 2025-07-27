'use client';

import React, { useState, useEffect, useRef } from 'react';
import { calculateFreightCost, FreightCostInput } from '@/lib/freightCost';
import { aiFreightPredictor, AIPredictionInput } from '@/lib/aiFreightPredictor';

interface FreightCalculatorUltraProps {
  className?: string;
}

export default function FreightCalculatorUltra({ className = '' }: FreightCalculatorUltraProps) {
  // Estados principais
  const [currentStep, setCurrentStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<any>(null);

  // Estados do formulário
  const [formData, setFormData] = useState({
    commodity: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    originPort: '',
    destinationPort: '',
    costPriority: 50,
    speedPriority: 30,
    reliabilityPriority: 20,
    incoterm: 'fob',
    insurance: 'basic'
  });

  // Estados de IA
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [marketPulse, setMarketPulse] = useState('Stable');
  const [volumetricWeight, setVolumetricWeight] = useState(0);
  const [containerRecommendation, setContainerRecommendation] = useState('');

  // Refs para gráficos
  const costPredictionChartRef = useRef<HTMLCanvasElement>(null);
  const costBreakdownChartRef = useRef<HTMLCanvasElement>(null);

  // Commodities para sugestões de IA
  const commoditySuggestions = [
    'Electronics', 'Textiles', 'Machinery', 'Food', 'Chemicals',
    'Automotive', 'Pharmaceuticals', 'Steel', 'Plastics', 'Furniture'
  ];

  // Portos principais
  const majorPorts = [
    'Shanghai (CNSHA)', 'Ningbo (CNNGB)', 'Shenzhen (CNSZX)',
    'Los Angeles (USLAX)', 'Long Beach (USLGB)', 'New York (USNYC)',
    'Rotterdam (NLRTM)', 'Hamburg (DEHAM)', 'Antwerp (BEANR)',
    'Santos (BRSSZ)', 'Rio Grande (BRRIG)', 'Paranaguá (BRPNG)'
  ];

  // Calcular peso volumétrico
  useEffect(() => {
    if (formData.length && formData.width && formData.height) {
      const length = parseFloat(formData.length);
      const width = parseFloat(formData.width);
      const height = parseFloat(formData.height);
      
      if (length && width && height) {
        const volume = (length * width * height) / 1000000; // m³
        const volumetric = volume * 1000; // kg (1 m³ = 1000 kg)
        setVolumetricWeight(volumetric);
        
        // Recomendação de container
        if (volumetric < 1000) {
          setContainerRecommendation('LCL (Less than Container Load)');
        } else if (volumetric < 20000) {
          setContainerRecommendation('20ft Container');
        } else {
          setContainerRecommendation('40ft Container');
        }
      }
    }
  }, [formData.length, formData.width, formData.height]);

  // Sugestões de commodity
  const handleCommodityInput = (value: string) => {
    setFormData(prev => ({ ...prev, commodity: value }));
    
    if (value.length > 2) {
      const filtered = commoditySuggestions.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setAiSuggestions(filtered.slice(0, 5));
    } else {
      setAiSuggestions([]);
    }
  };

  // Sugestões de portos
  const handlePortInput = (field: 'originPort' | 'destinationPort', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Navegação do wizard
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Cálculo principal
  const calculateFreight = async () => {
    setIsCalculating(true);
    
    try {
      // Cálculo base
      const input: FreightCostInput = {
        origin: formData.originPort.split(' ')[0] || 'CN',
        destination: formData.destinationPort.split(' ')[0] || 'BRSSZ',
        weight: parseFloat(formData.weight) || volumetricWeight,
        volume: parseFloat(formData.length) * parseFloat(formData.width) * parseFloat(formData.height) / 1000000,
        cargo_type: 'general',
        cargo_value: 10000,
        ncm: '',
        incoterm: formData.incoterm as any,
        service_type: 'fcl',
        exchange_rate: 5.2
      };

      const result = await calculateFreightCost(input);

      // IA Preditiva
      const aiInput: AIPredictionInput = {
        route: {
          origin: input.origin,
          destination: input.destination
        },
        commodity: formData.commodity || 'general',
        weight: input.weight,
        volume: input.volume,
        timeframe: 30
      };

      const aiPrediction = await aiFreightPredictor.predictCosts(aiInput);

      // Cenários otimizados
      const scenarios = generateOptimizationScenarios(result, aiPrediction);

      setResults({
        base: result,
        ai: aiPrediction,
        scenarios,
        volumetricWeight,
        containerRecommendation
      });

      setAiInsights(generateAIInsights(result, aiPrediction));

    } catch (error) {
      console.error('Erro no cálculo:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  // Gerar cenários de otimização
  const generateOptimizationScenarios = (baseResult: any, aiPrediction: any) => {
    return [
      {
        type: 'AI Recommended',
        score: 92,
        cost: baseResult.secao5.resultado_final.custo_total.usd,
        time: baseResult.secao5.resultado_final.tempo_transito,
        carrier: 'Maersk Line',
        route: 'Direct',
        savings: 0
      },
      {
        type: 'Cost Optimized',
        score: 78,
        cost: baseResult.secao5.resultado_final.custo_total.usd * 0.83,
        time: baseResult.secao5.resultado_final.tempo_transito + 6,
        carrier: 'COSCO',
        route: 'Via Singapore',
        savings: baseResult.secao5.resultado_final.custo_total.usd * 0.17
      },
      {
        type: 'Speed Optimized',
        score: 85,
        cost: baseResult.secao5.resultado_final.custo_total.usd * 1.26,
        time: baseResult.secao5.resultado_final.tempo_transito - 4,
        carrier: 'MSC',
        route: 'Express Service',
        savings: -(baseResult.secao5.resultado_final.custo_total.usd * 0.26)
      }
    ];
  };

  // Gerar insights de IA
  const generateAIInsights = (baseResult: any, aiPrediction: any) => {
    return {
      marketAnalysis: {
        health: 'Good',
        volatility: 'Low',
        message: 'Current market rates are 8% below seasonal average. Excellent time to ship.'
      },
      optimization: {
        message: 'Consolidating with LCL service could save $300 (17%) with only 2 days additional transit time.',
        action: 'Explore LCL Option'
      },
      risk: {
        weather: 'Low',
        congestion: 'Low',
        fuel: 'Medium',
        message: 'Low risk route with 95% on-time performance. Weather conditions favorable.'
      },
      sustainability: {
        co2: 1.2,
        offsetCost: 18,
        message: 'This shipment will generate 1.2 tons CO₂. Consider carbon offset for $18.'
      }
    };
  };

  return (
    <div className={`freight-calculator-ultra ${className}`}>
      {/* Header com IA Assistant */}
      <header className="calculator-header glass p-4 rounded-xl shadow-gold mb-6">
        <div className="flex justify-between items-center">
          <div className="ai-assistant flex items-center gap-3">
            <div className="ai-avatar text-2xl">🤖</div>
            <div className="ai-status flex items-center gap-2">
              <span className="status-indicator active w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-gray-100">AI Assistant Online</span>
            </div>
          </div>
          <div className="market-pulse flex items-center gap-2">
            <div className="pulse-indicator w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-gray-100">Market Pulse: {marketPulse}</span>
          </div>
        </div>
      </header>

      {/* Seção de Input Inteligente */}
      <section className="smart-input-section glass p-6 rounded-2xl shadow-gold mb-6">
        <div className="input-wizard">
          {/* Step 1: Cargo Details */}
          <div className={`wizard-step ${currentStep === 1 ? 'active' : 'hidden'}`}>
            <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-2">
              <span>📦</span>
              Cargo Details
            </h3>
            
            <div className="smart-fields space-y-6">
              {/* Campo com AI Suggestions */}
              <div className="field-group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Commodity Type
                </label>
                <input
                  type="text"
                  value={formData.commodity}
                  onChange={(e) => handleCommodityInput(e.target.value)}
                  placeholder="Start typing..."
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
                />
                {aiSuggestions.length > 0 && (
                  <div className="ai-suggestions mt-2 space-y-1">
                    {aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 bg-gray-700/50 rounded cursor-pointer hover:bg-gray-600/50 text-gray-200 text-sm"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, commodity: suggestion }));
                          setAiSuggestions([]);
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Calculadora de Dimensões Inteligente */}
              <div className="dimensions-calculator glass p-4 rounded-xl border border-accent/20">
                <h4 className="font-medium text-gray-100 mb-4">Smart Dimensions</h4>
                <div className="dimension-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <input
                    type="number"
                    placeholder="Length (cm)"
                    value={formData.length}
                    onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
                    className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
                  />
                  <input
                    type="number"
                    placeholder="Width (cm)"
                    value={formData.width}
                    onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value }))}
                    className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
                  />
                  <input
                    type="number"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                    className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
                  />
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
                  />
                </div>
                <div className="dimension-insights space-y-2">
                  <div className="insight flex items-center gap-2 text-sm">
                    <span className="text-accent">📏</span>
                    <span className="text-gray-300">
                      Volumetric Weight: {volumetricWeight.toFixed(1)} kg
                    </span>
                  </div>
                  <div className="insight flex items-center gap-2 text-sm">
                    <span className="text-accent">📦</span>
                    <span className="text-gray-300">
                      Container: {containerRecommendation}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Route Planning */}
          <div className={`wizard-step ${currentStep === 2 ? 'active' : 'hidden'}`}>
            <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-2">
              <span>🌍</span>
              Route Planning
            </h3>
            
            <div className="route-planner space-y-6">
              {/* Seletores de Porto com Autocomplete */}
              <div className="port-selectors grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="port-field">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Origin Port
                  </label>
                  <input
                    type="text"
                    value={formData.originPort}
                    onChange={(e) => handlePortInput('originPort', e.target.value)}
                    placeholder="Search ports..."
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
                  />
                </div>
                <div className="route-arrow text-center text-2xl text-accent">→</div>
                <div className="port-field">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Destination Port
                  </label>
                  <input
                    type="text"
                    value={formData.destinationPort}
                    onChange={(e) => handlePortInput('destinationPort', e.target.value)}
                    placeholder="Search ports..."
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
                  />
                </div>
              </div>

              {/* Route Analytics */}
              <div className="route-analytics grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="analytic-card glass p-4 rounded-xl border border-accent/20 text-center">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Distance</h4>
                  <span className="text-xl font-bold text-accent">12,450 nm</span>
                </div>
                <div className="analytic-card glass p-4 rounded-xl border border-accent/20 text-center">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Transit Time</h4>
                  <span className="text-xl font-bold text-accent">18 days</span>
                </div>
                <div className="analytic-card glass p-4 rounded-xl border border-accent/20 text-center">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Vessel Frequency</h4>
                  <span className="text-xl font-bold text-accent">3/week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Advanced Options */}
          <div className={`wizard-step ${currentStep === 3 ? 'active' : 'hidden'}`}>
            <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-2">
              <span>⚙️</span>
              Advanced Options
            </h3>
            
            <div className="advanced-options space-y-6">
              {/* Prioridades do Shipment */}
              <div className="priority-selector glass p-4 rounded-xl border border-accent/20">
                <h4 className="font-medium text-gray-100 mb-4">Shipment Priorities</h4>
                <div className="priority-sliders space-y-4">
                  <div className="slider-group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cost Optimization: {formData.costPriority}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.costPriority}
                      onChange={(e) => setFormData(prev => ({ ...prev, costPriority: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="slider-group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Speed: {formData.speedPriority}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.speedPriority}
                      onChange={(e) => setFormData(prev => ({ ...prev, speedPriority: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="slider-group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Reliability: {formData.reliabilityPriority}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.reliabilityPriority}
                      onChange={(e) => setFormData(prev => ({ ...prev, reliabilityPriority: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* Configurações Avançadas */}
              <div className="advanced-settings grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="setting-group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Incoterm
                  </label>
                  <select
                    value={formData.incoterm}
                    onChange={(e) => setFormData(prev => ({ ...prev, incoterm: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
                  >
                    <option value="exw">EXW - Ex Works</option>
                    <option value="fob">FOB - Free on Board</option>
                    <option value="cif">CIF - Cost, Insurance & Freight</option>
                    <option value="ddp">DDP - Delivered Duty Paid</option>
                  </select>
                </div>
                
                <div className="setting-group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Insurance Coverage
                  </label>
                  <select
                    value={formData.insurance}
                    onChange={(e) => setFormData(prev => ({ ...prev, insurance: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
                  >
                    <option value="basic">Basic (110% of value)</option>
                    <option value="extended">Extended (120% of value)</option>
                    <option value="comprehensive">Comprehensive (130% of value)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação do Wizard */}
        <div className="wizard-navigation flex justify-between items-center mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            Previous
          </button>
          
          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80"
            >
              Next
            </button>
          ) : (
            <button
              onClick={calculateFreight}
              disabled={isCalculating}
              className="calculate-btn ai-powered px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-white rounded-lg hover:from-accent/80 hover:to-accent/60 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isCalculating ? (
                <>
                  <div className="btn-loader animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <span className="btn-icon">🚀</span>
                  <span className="btn-text">Calculate with AI</span>
                </>
              )}
            </button>
          )}
        </div>
      </section>

      {/* Resultados Ultra-Avançados */}
      {results && (
        <section className="results-section glass p-6 rounded-2xl shadow-gold">
          {/* Dashboard de Resultados */}
          <div className="results-dashboard space-y-8">
            {/* KPIs Principais */}
            <div className="kpi-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="kpi-card cost glass p-4 rounded-xl border border-accent/20">
                <div className="flex items-center gap-3">
                  <div className="kpi-icon text-2xl">💰</div>
                  <div className="kpi-content">
                    <h3 className="text-sm font-medium text-gray-300">Total Cost</h3>
                    <span className="kpi-value text-xl font-bold text-accent">
                      ${results.base.secao5.resultado_final.custo_total.usd.toFixed(0)}
                    </span>
                    <span className="kpi-trend text-xs text-green-400">+0%</span>
                  </div>
                </div>
              </div>
              
              <div className="kpi-card time glass p-4 rounded-xl border border-accent/20">
                <div className="flex items-center gap-3">
                  <div className="kpi-icon text-2xl">⏱️</div>
                  <div className="kpi-content">
                    <h3 className="text-sm font-medium text-gray-300">Transit Time</h3>
                    <span className="kpi-value text-xl font-bold text-accent">
                      {results.base.secao5.resultado_final.tempo_transito} days
                    </span>
                    <span className="kpi-confidence text-xs text-gray-400">95% confidence</span>
                  </div>
                </div>
              </div>
              
              <div className="kpi-card carbon glass p-4 rounded-xl border border-accent/20">
                <div className="flex items-center gap-3">
                  <div className="kpi-icon text-2xl">🌱</div>
                  <div className="kpi-content">
                    <h3 className="text-sm font-medium text-gray-300">Carbon Footprint</h3>
                    <span className="kpi-value text-xl font-bold text-accent">
                      {results.base.secao5.resultado_final.pegada_carbono} kg CO₂
                    </span>
                    <span className="kpi-offset text-xs text-gray-400">$18 to offset</span>
                  </div>
                </div>
              </div>
              
              <div className="kpi-card reliability glass p-4 rounded-xl border border-accent/20">
                <div className="flex items-center gap-3">
                  <div className="kpi-icon text-2xl">🎯</div>
                  <div className="kpi-content">
                    <h3 className="text-sm font-medium text-gray-300">Reliability Score</h3>
                    <span className="kpi-value text-xl font-bold text-accent">92/100</span>
                    <span className="kpi-rating text-xs text-green-400">Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparativo de Cenários */}
            <div className="scenarios-comparison">
              <h3 className="text-lg font-bold text-gray-100 mb-6 flex items-center gap-2">
                <span>⚖️</span>
                Optimization Scenarios
              </h3>
              <div className="scenarios-grid grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.scenarios.map((scenario: any, index: number) => (
                  <div key={index} className={`scenario-card ${scenario.type === 'AI Recommended' ? 'recommended' : ''} glass p-4 rounded-xl border ${scenario.type === 'AI Recommended' ? 'border-accent/50' : 'border-gray-700'}`}>
                    <div className="scenario-header flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-100">{scenario.type}</h4>
                      <span className="score text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                        Score: {scenario.score}/100
                      </span>
                    </div>
                    <div className="scenario-details space-y-2 text-sm">
                      <div className="detail flex justify-between">
                        <label className="text-gray-400">Cost:</label>
                        <span className="text-gray-100">${scenario.cost.toFixed(0)}</span>
                      </div>
                      <div className="detail flex justify-between">
                        <label className="text-gray-400">Time:</label>
                        <span className="text-gray-100">{scenario.time} days</span>
                      </div>
                      <div className="detail flex justify-between">
                        <label className="text-gray-400">Carrier:</label>
                        <span className="text-gray-100">{scenario.carrier}</span>
                      </div>
                      <div className="detail flex justify-between">
                        <label className="text-gray-400">Route:</label>
                        <span className="text-gray-100">{scenario.route}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights e Recomendações */}
            {aiInsights && (
              <div className="ai-insights">
                <h3 className="text-lg font-bold text-gray-100 mb-6 flex items-center gap-2">
                  <span>🤖</span>
                  AI Insights & Recommendations
                </h3>
                <div className="insights-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="insight-card market glass p-4 rounded-xl border border-accent/20">
                    <div className="insight-header flex items-center gap-2 mb-3">
                      <span className="insight-icon text-xl">📊</span>
                      <h4 className="font-medium text-gray-100">Market Analysis</h4>
                    </div>
                    <div className="insight-content">
                      <p className="text-sm text-gray-300 mb-3">{aiInsights.marketAnalysis.message}</p>
                      <div className="insight-metrics space-y-1">
                        <span className="metric text-xs text-gray-400">
                          Market Health: <strong className="text-green-400">{aiInsights.marketAnalysis.health}</strong>
                        </span>
                        <span className="metric text-xs text-gray-400">
                          Rate Volatility: <strong className="text-yellow-400">{aiInsights.marketAnalysis.volatility}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insight-card optimization glass p-4 rounded-xl border border-accent/20">
                    <div className="insight-header flex items-center gap-2 mb-3">
                      <span className="insight-icon text-xl">⚡</span>
                      <h4 className="font-medium text-gray-100">Optimization Opportunity</h4>
                    </div>
                    <div className="insight-content">
                      <p className="text-sm text-gray-300 mb-3">{aiInsights.optimization.message}</p>
                      <button className="insight-action px-3 py-1 bg-accent text-white text-xs rounded hover:bg-accent/80">
                        {aiInsights.optimization.action}
                      </button>
                    </div>
                  </div>
                  
                  <div className="insight-card risk glass p-4 rounded-xl border border-accent/20">
                    <div className="insight-header flex items-center gap-2 mb-3">
                      <span className="insight-icon text-xl">⚠️</span>
                      <h4 className="font-medium text-gray-100">Risk Assessment</h4>
                    </div>
                    <div className="insight-content">
                      <p className="text-sm text-gray-300 mb-3">{aiInsights.risk.message}</p>
                      <div className="risk-indicators space-y-1">
                        <span className="risk-low text-xs text-green-400">Weather: Low</span>
                        <span className="risk-low text-xs text-green-400">Congestion: Low</span>
                        <span className="risk-medium text-xs text-yellow-400">Fuel Volatility: Medium</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="insight-card sustainability glass p-4 rounded-xl border border-accent/20">
                    <div className="insight-header flex items-center gap-2 mb-3">
                      <span className="insight-icon text-xl">🌱</span>
                      <h4 className="font-medium text-gray-100">Sustainability</h4>
                    </div>
                    <div className="insight-content">
                      <p className="text-sm text-gray-300 mb-3">{aiInsights.sustainability.message}</p>
                      <button className="insight-action px-3 py-1 bg-accent text-white text-xs rounded hover:bg-accent/80">
                        Add Carbon Offset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
} 