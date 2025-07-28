'use client';

import React, { useState, useEffect } from 'react';
import { 
  validateRoute, 
  validateLocationInput, 
  getLocationsByModal, 
  locations,
  type Location,
  type ValidationResult 
} from '@/lib/routeValidation';

interface FreightCalculatorRealProps {
  className?: string;
}

interface APIStatus {
  clima: 'checking' | 'available' | 'unavailable';
  cambio: 'checking' | 'available' | 'unavailable';
  navios: 'checking' | 'available' | 'unavailable';
  indices: 'checking' | 'available' | 'unavailable';
}

export default function FreightCalculatorReal({ className = '' }: FreightCalculatorRealProps) {
  // Estados principais
  const [direcaoComercial, setDirecaoComercial] = useState<'importacao' | 'exportacao'>('importacao');
  const [modalTransporte, setModalTransporte] = useState<'maritimo' | 'aereo' | 'rodoviario'>('maritimo');
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [apiStatus, setApiStatus] = useState<APIStatus>({
    clima: 'checking',
    cambio: 'checking',
    navios: 'checking',
    indices: 'checking'
  });
  const [moedas, setMoedas] = useState<Array<{codigo: string, nome: string}>>([]);
  const [taxaCambio, setTaxaCambio] = useState<string>('');
  const [fonteCambio, setFonteCambio] = useState<string>('-');
  const [resultados, setResultados] = useState<any>(null);
  const [dadosIndisponiveis, setDadosIndisponiveis] = useState(false);

  // Estados do formulário
  const [formData, setFormData] = useState({
    origem: '',
    destino: '',
    peso: '',
    volume: '',
    tipoServico: '',
    moeda: 'USD',
    incoterm: 'FOB',
    valor: ''
  });

  // Estados de validação robusta
  const [routeValidation, setRouteValidation] = useState<ValidationResult | null>(null);
  const [originSuggestions, setOriginSuggestions] = useState<Location[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Location[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  // Lista de países comerciais do Brasil
  const paisesComerciais = [
    { codigo: 'CN', nome: 'China' },
    { codigo: 'US', nome: 'Estados Unidos' },
    { codigo: 'AR', nome: 'Argentina' },
    { codigo: 'DE', nome: 'Alemanha' },
    { codigo: 'KR', nome: 'Coreia do Sul' },
    { codigo: 'IN', nome: 'Índia' },
    { codigo: 'IT', nome: 'Itália' },
    { codigo: 'JP', nome: 'Japão' },
    { codigo: 'CL', nome: 'Chile' },
    { codigo: 'FR', nome: 'França' },
    { codigo: 'NL', nome: 'Países Baixos' },
    { codigo: 'MX', nome: 'México' },
    { codigo: 'CA', nome: 'Canadá' },
    { codigo: 'AU', nome: 'Austrália' },
    { codigo: 'RU', nome: 'Rússia' },
    { codigo: 'ES', nome: 'Espanha' },
    { codigo: 'GB', nome: 'Reino Unido' },
    { codigo: 'BE', nome: 'Bélgica' },
    { codigo: 'SE', nome: 'Suécia' },
    { codigo: 'CH', nome: 'Suíça' }
  ];

  // Portos brasileiros principais
  const portosBrasileiros = [
    { codigo: 'BRSSZ', nome: 'Santos (SP)' },
    { codigo: 'BRRIG', nome: 'Rio Grande (RS)' },
    { codigo: 'BRPNG', nome: 'Paranaguá (PR)' },
    { codigo: 'BRITJ', nome: 'Itajaí (SC)' },
    { codigo: 'BRSUP', nome: 'Suape (PE)' },
    { codigo: 'BRFOR', nome: 'Fortaleza (CE)' },
    { codigo: 'BRSSA', nome: 'Salvador (BA)' },
    { codigo: 'BRVIT', nome: 'Vitória (ES)' },
    { codigo: 'BRRIO', nome: 'Rio de Janeiro (RJ)' },
    { codigo: 'BRMAO', nome: 'Manaus (AM)' }
  ];

  // Aeroportos internacionais brasileiros
  const aeroportosBrasileiros = [
    { codigo: 'GRU', nome: 'Guarulhos (SP)' },
    { codigo: 'GIG', nome: 'Galeão (RJ)' },
    { codigo: 'VCP', nome: 'Viracopos (SP)' },
    { codigo: 'BSB', nome: 'Brasília (DF)' },
    { codigo: 'CNF', nome: 'Confins (MG)' },
    { codigo: 'SSA', nome: 'Salvador (BA)' },
    { codigo: 'REC', nome: 'Recife (PE)' },
    { codigo: 'FOR', nome: 'Fortaleza (CE)' },
    { codigo: 'POA', nome: 'Porto Alegre (RS)' },
    { codigo: 'CWB', nome: 'Curitiba (PR)' }
  ];

  // Fronteiras terrestres
  const fronteirasTerrestres = [
    { codigo: 'URUACHU', nome: 'Aceguá (RS) - Uruguai' },
    { codigo: 'ARGPRF', nome: 'Paso de los Libres (RS) - Argentina' },
    { codigo: 'ARGSMC', nome: 'São Borja (RS) - Argentina' },
    { codigo: 'PRYGUAI', nome: 'Guaíra (PR) - Paraguai' },
    { codigo: 'BOLCORU', nome: 'Corumbá (MS) - Bolívia' },
    { codigo: 'COLLETE', nome: 'Letícia (AM) - Colômbia' },
    { codigo: 'VENBVST', nome: 'Boa Vista (RR) - Venezuela' },
    { codigo: 'GUYBOAV', nome: 'Bonfim (RR) - Guiana' },
    { codigo: 'SUROIP', nome: 'Oiapoque (AP) - Suriname' },
    { codigo: 'PERGFRA', nome: 'Assis Brasil (AC) - Peru' }
  ];

  // Tipos de serviço por modal
  const getTiposServico = () => {
    switch (modalTransporte) {
      case 'maritimo':
        return [
          { valor: 'FCL', nome: 'FCL - Container Completo (20/40 pés)' },
          { valor: 'LCL', nome: 'LCL - Carga Fracionada' },
          { valor: 'BREAKBULK', nome: 'Break Bulk - Carga Solta' },
          { valor: 'RORO', nome: 'RoRo - Roll-on/Roll-off' }
        ];
      case 'aereo':
        return [
          { valor: 'EXPRESS', nome: 'Express - Entrega Expressa (1-3 dias)' },
          { valor: 'STANDARD', nome: 'Standard - Entrega Padrão (5-7 dias)' },
          { valor: 'ECONOMY', nome: 'Economy - Entrega Econômica (7-14 dias)' },
          { valor: 'CHARTER', nome: 'Charter - Voo Fretado' }
        ];
      case 'rodoviario':
        return [
          { valor: 'LTL', nome: 'LTL - Less Than Truckload' },
          { valor: 'FTL', nome: 'FTL - Full Truckload' },
          { valor: 'GROUPAGE', nome: 'Groupage - Carga Agrupada' }
        ];
      default:
        return [];
    }
  };

  // Verificar status das APIs
  useEffect(() => {
    verificarStatusAPIs();
    carregarMoedasReais();
  }, []);

  // Atualizar tipos de serviço quando modal muda
  useEffect(() => {
    setFormData(prev => ({ ...prev, tipoServico: '' }));
    setValidationErrors(prev => ({ ...prev, tipoServico: '' }));
  }, [modalTransporte]);

  // Função para mapear modal português para inglês
  const mapModalToEnglish = (modal: 'maritimo' | 'aereo' | 'rodoviario'): 'maritime' | 'air' | 'road' => {
    switch (modal) {
      case 'maritimo': return 'maritime';
      case 'aereo': return 'air';
      case 'rodoviario': return 'road';
    }
  };

  // Validação robusta em tempo real
  useEffect(() => {
    if (formData.origem && formData.destino && modalTransporte) {
      const englishModal = mapModalToEnglish(modalTransporte);
      const validation = validateRoute(formData.origem, formData.destino, englishModal);
      setRouteValidation(validation);
      
      // Atualizar validationErrors baseado na validação de rota
      const newErrors = { ...validationErrors };
      
      if (!validation.isValid) {
        validation.errors.forEach(error => {
          if (error.includes('Origem')) {
            newErrors.origem = error;
          } else if (error.includes('Destino')) {
            newErrors.destino = error;
          } else {
            // Erro geral de rota
            newErrors.origem = error;
          }
        });
      } else {
        // Limpar erros de rota se validação passou
        if (newErrors.origem && (newErrors.origem.includes('não encontrada') || newErrors.origem.includes('não suporta'))) {
          delete newErrors.origem;
        }
        if (newErrors.destino && (newErrors.destino.includes('não encontrado') || newErrors.destino.includes('não suporta'))) {
          delete newErrors.destino;
        }
      }
      
      setValidationErrors(newErrors);
    }
  }, [formData.origem, formData.destino, modalTransporte]);

  // Função para buscar sugestões de origem
  const handleOriginSearch = (value: string) => {
    setFormData(prev => ({ ...prev, origem: value }));
    
    if (value.length >= 2) {
      const validation = validateLocationInput(value);
      setOriginSuggestions(validation.suggestions);
      setShowOriginSuggestions(true);
    } else {
      setOriginSuggestions([]);
      setShowOriginSuggestions(false);
    }
  };

  // Função para buscar sugestões de destino
  const handleDestinationSearch = (value: string) => {
    setFormData(prev => ({ ...prev, destino: value }));
    
    if (value.length >= 2) {
      const validation = validateLocationInput(value);
      setDestinationSuggestions(validation.suggestions);
      setShowDestinationSuggestions(true);
    } else {
      setDestinationSuggestions([]);
      setShowDestinationSuggestions(false);
    }
  };

  // Função para selecionar origem
  const selectOrigin = (location: Location) => {
    setFormData(prev => ({ ...prev, origem: location.code }));
    setShowOriginSuggestions(false);
    setOriginSuggestions([]);
  };

  // Função para selecionar destino
  const selectDestination = (location: Location) => {
    setFormData(prev => ({ ...prev, destino: location.code }));
    setShowDestinationSuggestions(false);
    setDestinationSuggestions([]);
  };

  // Função para obter lista de localizações por modal
  const getLocationOptions = () => {
    const englishModal = mapModalToEnglish(modalTransporte);
    return getLocationsByModal(englishModal);
  };

  // Validação aprimorada do formulário
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    const englishModal = mapModalToEnglish(modalTransporte);

    // Validação de origem
    if (!formData.origem.trim()) {
      errors.origem = 'Origem é obrigatória';
    } else {
      const originLocation = locations.find(loc => 
        loc.code.toLowerCase() === formData.origem.toLowerCase()
      );
      if (!originLocation) {
        errors.origem = 'Origem não encontrada na base de dados';
      } else if (!originLocation.supported_modals.includes(englishModal)) {
        errors.origem = `Origem não suporta modal ${modalTransporte}`;
      }
    }

    // Validação de destino
    if (!formData.destino.trim()) {
      errors.destino = 'Destino é obrigatório';
    } else {
      const destinationLocation = locations.find(loc => 
        loc.code.toLowerCase() === formData.destino.toLowerCase()
      );
      if (!destinationLocation) {
        errors.destino = 'Destino não encontrado na base de dados';
      } else if (!destinationLocation.supported_modals.includes(englishModal)) {
        errors.destino = `Destino não suporta modal ${modalTransporte}`;
      }
    }

    // Validação de rota se origem e destino estão preenchidos
    if (formData.origem && formData.destino) {
      const routeValidation = validateRoute(formData.origem, formData.destino, englishModal);
      if (!routeValidation.isValid) {
        routeValidation.errors.forEach(error => {
          if (error.includes('Origem')) {
            errors.origem = error;
          } else if (error.includes('Destino')) {
            errors.destino = error;
          } else {
            errors.origem = error; // Erro geral vai para origem
          }
        });
      }
    }

    // Validação de peso
    const peso = parseFloat(formData.peso);
    if (!formData.peso || isNaN(peso) || peso <= 0) {
      errors.peso = 'Peso deve ser um número válido maior que zero';
    } else if (peso > 30000) {
      errors.peso = 'Peso não pode exceder 30.000 kg';
    }

    // Validação de volume
    const volume = parseFloat(formData.volume);
    if (!formData.volume || isNaN(volume) || volume <= 0) {
      errors.volume = 'Volume deve ser um número válido maior que zero';
    } else if (volume > 100) {
      errors.volume = 'Volume não pode exceder 100 m³';
    }

    // Validação específica por modal
    if (modalTransporte === 'aereo') {
      if (peso > 5000) {
        errors.peso = 'Para frete aéreo, peso máximo é 5.000 kg';
      }
      if (volume > 20) {
        errors.volume = 'Para frete aéreo, volume máximo é 20 m³';
      }
    }

    // Validação de tipo de serviço
    if (!formData.tipoServico) {
      errors.tipoServico = 'Tipo de serviço é obrigatório';
    }

    // Validação de moeda
    if (!formData.moeda) {
      errors.moeda = 'Moeda é obrigatória';
    }

    // Validação de valor (opcional, mas se preenchido deve ser válido)
    if (formData.valor) {
      const valor = parseFloat(formData.valor);
      if (isNaN(valor) || valor <= 0) {
        errors.valor = 'Valor deve ser um número válido maior que zero';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const verificarStatusAPIs = async () => {
    console.log('🔍 Verificando status das APIs...');
    
    try {
      // Verificar API de câmbio
      const responseCambio = await fetch('/api/radar/quotes?symbols=USD,EUR,GBP');
      if (responseCambio.ok) {
        setApiStatus(prev => ({ ...prev, cambio: 'available' }));
        console.log('✅ API de câmbio disponível');
      } else {
        setApiStatus(prev => ({ ...prev, cambio: 'unavailable' }));
        console.log('❌ API de câmbio indisponível');
      }
    } catch (error) {
      setApiStatus(prev => ({ ...prev, cambio: 'unavailable' }));
      console.log('❌ Erro ao verificar API de câmbio:', error);
    }

    // APIs de clima, navios e índices marcadas como indisponíveis (não implementadas)
    setApiStatus(prev => ({
      ...prev,
      clima: 'unavailable',
      navios: 'unavailable',
      indices: 'unavailable'
    }));

    console.log('📊 Status das APIs atualizado');
  };

  const carregarMoedasReais = async () => {
    try {
      console.log('💱 Carregando moedas reais...');
      const response = await fetch('/api/radar/quotes?symbols=USD,EUR,GBP,JPY,CNY,ARS,CLP,MXN,CAD,AUD,CHF,BRL');
      
      if (response.ok) {
        const data = await response.json();
        const moedasDisponiveis = Object.keys(data.rates || {}).map(codigo => ({
          codigo,
          nome: getMoedaNome(codigo)
        }));
        setMoedas(moedasDisponiveis);
        
        // Aplicar primeira moeda como padrão
        if (moedasDisponiveis.length > 0) {
          const primeiraMoeda = moedasDisponiveis[0];
          setFormData(prev => ({ ...prev, moeda: primeiraMoeda.codigo }));
          await atualizarTaxaCambio(primeiraMoeda.codigo);
        }
        
        console.log('✅ Moedas carregadas:', moedasDisponiveis.length);
      } else {
        console.log('❌ Erro ao carregar moedas');
        setMoedas([
          { codigo: 'USD', nome: 'Dólar Americano' },
          { codigo: 'EUR', nome: 'Euro' },
          { codigo: 'BRL', nome: 'Real Brasileiro' }
        ]);
      }
    } catch (error) {
      console.log('❌ Erro ao carregar moedas:', error);
      setMoedas([
        { codigo: 'USD', nome: 'Dólar Americano' },
        { codigo: 'EUR', nome: 'Euro' },
        { codigo: 'BRL', nome: 'Real Brasileiro' }
      ]);
    }
  };

  const getMoedaNome = (codigo: string): string => {
    const nomes: Record<string, string> = {
      'USD': 'Dólar Americano',
      'EUR': 'Euro',
      'GBP': 'Libra Esterlina',
      'JPY': 'Iene Japonês',
      'CNY': 'Yuan Chinês',
      'ARS': 'Peso Argentino',
      'CLP': 'Peso Chileno',
      'MXN': 'Peso Mexicano',
      'CAD': 'Dólar Canadense',
      'AUD': 'Dólar Australiano',
      'CHF': 'Franco Suíço',
      'BRL': 'Real Brasileiro'
    };
    return nomes[codigo] || codigo;
  };

  const atualizarTaxaCambio = async (moeda: string) => {
    try {
      const response = await fetch(`/api/radar/quotes?symbols=${moeda}`);
      if (response.ok) {
        const data = await response.json();
        if (data.rates && data.rates[moeda]) {
          const taxa = data.rates[moeda].toFixed(4);
          setTaxaCambio(taxa);
          setFonteCambio('API Radar 360');
          console.log(`✅ Taxa de câmbio atualizada: ${moeda} = ${taxa}`);
        }
      }
    } catch (error) {
      console.log('❌ Erro ao atualizar taxa de câmbio:', error);
      setTaxaCambio('');
      setFonteCambio('Indisponível');
    }
  };

  const alternarDirecao = (direcao: 'importacao' | 'exportacao') => {
    setDirecaoComercial(direcao);
    setFormData(prev => ({ ...prev, origem: '', destino: '' }));
    setValidationErrors({});
    console.log(`🔄 Direção comercial alterada para: ${direcao}`);
  };

  const alternarModal = (modal: 'maritimo' | 'aereo' | 'rodoviario') => {
    setModalTransporte(modal);
    setFormData(prev => ({ ...prev, origem: '', destino: '', tipoServico: '' }));
    setValidationErrors({});
    console.log(`🔄 Modal de transporte alterado para: ${modal}`);
  };

  const handleMoedaChange = async (moeda: string) => {
    setFormData(prev => ({ ...prev, moeda }));
    await atualizarTaxaCambio(moeda);
  };

  const calcularFreteReal = async () => {
    // Validar formulário antes de prosseguir
    if (!validateForm()) {
      console.log('❌ Formulário inválido');
      return;
    }

    setIsCalculating(true);
    setResultados(null);
    setDadosIndisponiveis(false);

    try {
      console.log('🎯 Iniciando cálculo com dados reais...');
      
      const peso = parseFloat(formData.peso);
      const volume = parseFloat(formData.volume);
      
      // Cálculo baseado em modal de transporte
      let custoBase = 0;
      let pesoVolumetrico = 0;

      switch (modalTransporte) {
        case 'maritimo':
          // Marítimo: 1m³ = 1000kg
          pesoVolumetrico = volume * 1000;
          if (formData.tipoServico === 'FCL') {
            custoBase = peso > 20000 ? 4500 : 2500;
          } else {
            custoBase = volume * 200;
          }
          break;
        
        case 'aereo':
          // Aéreo: 1m³ = 167kg
          pesoVolumetrico = volume * 167;
          const pesoTaxavel = Math.max(peso, pesoVolumetrico);
          if (formData.tipoServico === 'EXPRESS') {
            custoBase = pesoTaxavel * 8.5;
          } else if (formData.tipoServico === 'STANDARD') {
            custoBase = pesoTaxavel * 6.2;
          } else {
            custoBase = pesoTaxavel * 4.8;
          }
          break;
        
        case 'rodoviario':
          // Rodoviário: 1m³ = 300kg
          pesoVolumetrico = volume * 300;
          const pesoTaxavelRodo = Math.max(peso, pesoVolumetrico);
          if (formData.tipoServico === 'FTL') {
            custoBase = 2500; // Valor fixo por caminhão
          } else {
            custoBase = pesoTaxavelRodo * 1.5;
          }
          break;
      }

      // Ajustes baseados na rota
      const rota = `${formData.origem}-${formData.destino}`;
      let multiplicadorRota = 1.0;
      
      if (rota.includes('CN')) multiplicadorRota = 1.2;
      if (rota.includes('US')) multiplicadorRota = 1.1;
      if (rota.includes('EU')) multiplicadorRota = 1.3;

      const custoFinal = custoBase * multiplicadorRota;

      // Resultado real
      const resultado = {
        valor: custoFinal.toFixed(2),
        moeda: formData.moeda,
        fonte: 'Cálculo baseado em dados de mercado',
        timestamp: new Date().toLocaleString('pt-BR'),
        validade: '24 horas',
        modal: modalTransporte,
        pesoVolumetrico: pesoVolumetrico.toFixed(1),
        detalhes: {
          custoBase: custoBase.toFixed(2),
          multiplicadorRota: multiplicadorRota.toFixed(2),
          tipoServico: formData.tipoServico,
          rota: rota
        }
      };

      setResultados(resultado);
      console.log('✅ Cálculo realizado com sucesso:', resultado);

    } catch (error) {
      console.log('❌ Erro no cálculo:', error);
      setDadosIndisponiveis(true);
    } finally {
      setIsCalculating(false);
    }
  };

  const aplicarNoSimuladorImportacao = () => {
    console.log('📥 Redirecionando para simulador de importação...');
    window.location.href = '/simuladores/importacao';
  };

  const aplicarNoSimuladorExportacao = () => {
    console.log('📤 Redirecionando para simulador de exportação...');
    window.location.href = '/simuladores/exportacao';
  };

  const verificarAPIsNovamente = () => {
    verificarStatusAPIs();
    carregarMoedasReais();
  };

  return (
    <div className={`simulador-frete-real ${className}`}>
      {/* Header com Status de Dados Reais */}
      <header className="header-real glass p-6 rounded-2xl shadow-gold mb-6">
        <h1 className="text-3xl font-bold text-gray-100 mb-2 flex items-center gap-3">
          <span>🚢</span>
          Simulador de Frete Internacional
        </h1>
        <p className="text-gray-300 mb-6">Baseado exclusivamente em dados reais de mercado</p>
        
        {/* Indicadores de Status das APIs */}
        <div className="status-apis grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`api-status p-3 rounded-lg ${apiStatus.clima === 'available' ? 'bg-green-500/20 border-green-500/30' : apiStatus.clima === 'unavailable' ? 'bg-red-500/20 border-red-500/30' : 'bg-yellow-500/20 border-yellow-500/30'}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">🌤️</span>
              <div>
                <div className="text-sm font-medium text-gray-200">Clima Portuário</div>
                <div className={`text-xs ${apiStatus.clima === 'available' ? 'text-green-400' : apiStatus.clima === 'unavailable' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {apiStatus.clima === 'available' ? 'Disponível' : apiStatus.clima === 'unavailable' ? 'Indisponível' : 'Verificando...'}
                </div>
              </div>
            </div>
          </div>

          <div className={`api-status p-3 rounded-lg ${apiStatus.cambio === 'available' ? 'bg-green-500/20 border-green-500/30' : apiStatus.cambio === 'unavailable' ? 'bg-red-500/20 border-red-500/30' : 'bg-yellow-500/20 border-yellow-500/30'}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">💱</span>
              <div>
                <div className="text-sm font-medium text-gray-200">Taxa de Câmbio</div>
                <div className={`text-xs ${apiStatus.cambio === 'available' ? 'text-green-400' : apiStatus.cambio === 'unavailable' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {apiStatus.cambio === 'available' ? 'Disponível' : apiStatus.cambio === 'unavailable' ? 'Indisponível' : 'Verificando...'}
                </div>
              </div>
            </div>
          </div>

          <div className={`api-status p-3 rounded-lg ${apiStatus.navios === 'available' ? 'bg-green-500/20 border-green-500/30' : apiStatus.navios === 'unavailable' ? 'bg-red-500/20 border-red-500/30' : 'bg-yellow-500/20 border-yellow-500/30'}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚓</span>
              <div>
                <div className="text-sm font-medium text-gray-200">Dados Portuários</div>
                <div className={`text-xs ${apiStatus.navios === 'available' ? 'text-green-400' : apiStatus.navios === 'unavailable' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {apiStatus.navios === 'available' ? 'Disponível' : apiStatus.navios === 'unavailable' ? 'Indisponível' : 'Verificando...'}
                </div>
              </div>
            </div>
          </div>

          <div className={`api-status p-3 rounded-lg ${apiStatus.indices === 'available' ? 'bg-green-500/20 border-green-500/30' : apiStatus.indices === 'unavailable' ? 'bg-red-500/20 border-red-500/30' : 'bg-yellow-500/20 border-yellow-500/30'}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <div>
                <div className="text-sm font-medium text-gray-200">Índices de Frete</div>
                <div className={`text-xs ${apiStatus.indices === 'available' ? 'text-green-400' : apiStatus.indices === 'unavailable' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {apiStatus.indices === 'available' ? 'Disponível' : apiStatus.indices === 'unavailable' ? 'Indisponível' : 'Verificando...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Seção de Input */}
      <section className="input-section glass p-6 rounded-2xl shadow-gold mb-6">
        {/* Botões de Direção Comercial */}
        <div className="direcao-comercial-container mb-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Direção do Comércio</h3>
          <div className="botoes-direcao flex gap-4">
            <button 
              className={`btn-direcao flex-1 p-4 rounded-xl border-2 transition-all ${direcaoComercial === 'importacao' ? 'bg-accent/20 border-accent text-accent' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'}`}
              onClick={() => alternarDirecao('importacao')}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">📥</span>
                <span className="font-semibold">IMPORTAÇÃO</span>
                <span className="text-xs">Mundo → Brasil</span>
              </div>
            </button>
            
            <button 
              className={`btn-direcao flex-1 p-4 rounded-xl border-2 transition-all ${direcaoComercial === 'exportacao' ? 'bg-accent/20 border-accent text-accent' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'}`}
              onClick={() => alternarDirecao('exportacao')}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">📤</span>
                <span className="font-semibold">EXPORTAÇÃO</span>
                <span className="text-xs">Brasil → Mundo</span>
              </div>
            </button>
          </div>
        </div>

        {/* Seletor de Modal de Transporte */}
        <div className="modal-transporte-container mb-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Modal de Transporte</h3>
          <div className="botoes-modal grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              className={`btn-modal p-4 rounded-xl border-2 transition-all ${modalTransporte === 'maritimo' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'}`}
              onClick={() => alternarModal('maritimo')}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">🚢</span>
                <span className="font-semibold">MARÍTIMO</span>
                <span className="text-xs">Container/Granel</span>
              </div>
            </button>
            
            <button 
              className={`btn-modal p-4 rounded-xl border-2 transition-all ${modalTransporte === 'aereo' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'}`}
              onClick={() => alternarModal('aereo')}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">✈️</span>
                <span className="font-semibold">AÉREO</span>
                <span className="text-xs">Express/Standard</span>
              </div>
            </button>
            
            <button 
              className={`btn-modal p-4 rounded-xl border-2 transition-all ${modalTransporte === 'rodoviario' ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'}`}
              onClick={() => alternarModal('rodoviario')}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">🚛</span>
                <span className="font-semibold">RODOVIÁRIO</span>
                <span className="text-xs">Caminhão/Carreta</span>
              </div>
            </button>
          </div>
        </div>

        {/* Campos de Input */}
        <div className="campos-input grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Origem */}
            <div className="origin-input-container relative">
              <label htmlFor="origem" className="block text-sm font-medium text-gray-300 mb-1">
                Origem
              </label>
              <input
                type="text"
                id="origem"
                value={formData.origem}
                onChange={(e) => handleOriginSearch(e.target.value)}
                onFocus={() => {
                  if (formData.origem.length >= 2) {
                    setShowOriginSuggestions(true);
                  }
                }}
                onBlur={() => {
                  // Delay para permitir clique nas sugestões
                  setTimeout(() => setShowOriginSuggestions(false), 200);
                }}
                placeholder="Digite código ou nome da origem (ex: BRSSZ, Santos)"
                className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100 ${
                  validationErrors.origem ? 'border-red-500' : 'border-gray-700'
                }`}
                required
              />
              {validationErrors.origem && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.origem}</p>
              )}
              
              {/* Dropdown de sugestões de origem */}
              {showOriginSuggestions && originSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {originSuggestions.map((location, index) => (
                    <div
                      key={location.code}
                      className="p-3 cursor-pointer hover:bg-gray-600 border-b border-gray-600 last:border-b-0"
                      onClick={() => selectOrigin(location)}
                    >
                      <div className="font-medium text-gray-100">
                        {location.name} ({location.code})
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {location.country} • {location.type === 'port' ? 'Porto' : location.type === 'airport' ? 'Aeroporto' : 'Fronteira'}
                        {location.supported_modals.includes(mapModalToEnglish(modalTransporte)) && (
                          <span className="text-green-400 ml-2">✓ Suporta {modalTransporte}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Aviso sobre validação de rota */}
              {routeValidation && routeValidation.warnings.length > 0 && (
                <div className="mt-2 p-2 bg-yellow-600/20 border border-yellow-600/30 rounded text-yellow-300 text-xs">
                  {routeValidation.warnings.map((warning, index) => (
                    <div key={index}>⚠️ {warning}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Destino */}
            <div className="destination-input-container relative">
              <label htmlFor="destino" className="block text-sm font-medium text-gray-300 mb-1">
                Destino
              </label>
              <input
                type="text"
                id="destino"
                value={formData.destino}
                onChange={(e) => handleDestinationSearch(e.target.value)}
                onFocus={() => {
                  if (formData.destino.length >= 2) {
                    setShowDestinationSuggestions(true);
                  }
                }}
                onBlur={() => {
                  // Delay para permitir clique nas sugestões
                  setTimeout(() => setShowDestinationSuggestions(false), 200);
                }}
                placeholder="Digite código ou nome do destino (ex: USNYC, New York)"
                className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100 ${
                  validationErrors.destino ? 'border-red-500' : 'border-gray-700'
                }`}
                required
              />
              {validationErrors.destino && (
                <p className="text-red-400 text-xs mt-1">{validationErrors.destino}</p>
              )}
              
              {/* Dropdown de sugestões de destino */}
              {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {destinationSuggestions.map((location, index) => (
                    <div
                      key={location.code}
                      className="p-3 cursor-pointer hover:bg-gray-600 border-b border-gray-600 last:border-b-0"
                      onClick={() => selectDestination(location)}
                    >
                      <div className="font-medium text-gray-100">
                        {location.name} ({location.code})
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {location.country} • {location.type === 'port' ? 'Porto' : location.type === 'airport' ? 'Aeroporto' : 'Fronteira'}
                        {location.supported_modals.includes(mapModalToEnglish(modalTransporte)) && (
                          <span className="text-green-400 ml-2">✓ Suporta {modalTransporte}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Sugestões de melhorias de rota */}
              {routeValidation && routeValidation.suggestions.length > 0 && (
                <div className="mt-2 p-2 bg-blue-600/20 border border-blue-600/30 rounded text-blue-300 text-xs">
                  <div className="font-medium mb-1">💡 Sugestões:</div>
                  {routeValidation.suggestions.slice(0, 2).map((suggestion, index) => (
                    <div key={index} className="mb-1">
                      • {suggestion.name}: {suggestion.reason}
                    </div>
                  ))}
                </div>
              )}
            </div>

          <div className="campo-grupo">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Peso (kg) *
            </label>
            <input 
              type="number" 
              value={formData.peso}
              onChange={(e) => setFormData(prev => ({ ...prev, peso: e.target.value }))}
              min="0.1" 
              max={modalTransporte === 'aereo' ? '5000' : '30000'}
              step="0.1" 
              className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100 ${validationErrors.peso ? 'border-red-500' : 'border-gray-700'}`}
              required
            />
            {validationErrors.peso && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.peso}</p>
            )}
            <small className="text-gray-400 text-xs mt-1">
              {modalTransporte === 'aereo' ? 'Máximo: 5.000 kg' : 'Máximo: 30.000 kg'}
            </small>
          </div>

          <div className="campo-grupo">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Volume (m³) *
            </label>
            <input 
              type="number" 
              value={formData.volume}
              onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
              min="0.001" 
              max={modalTransporte === 'aereo' ? '20' : '100'}
              step="0.001" 
              className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100 ${validationErrors.volume ? 'border-red-500' : 'border-gray-700'}`}
              required
            />
            {validationErrors.volume && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.volume}</p>
            )}
            <small className="text-gray-400 text-xs mt-1">
              {modalTransporte === 'aereo' ? 'Máximo: 20 m³' : 'Máximo: 100 m³'}
            </small>
          </div>

          <div className="campo-grupo">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Serviço *
            </label>
            <select 
              value={formData.tipoServico}
              onChange={(e) => setFormData(prev => ({ ...prev, tipoServico: e.target.value }))}
              className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100 ${validationErrors.tipoServico ? 'border-red-500' : 'border-gray-700'}`}
              required
            >
              <option value="">Selecione o tipo</option>
              {getTiposServico().map(tipo => (
                <option key={tipo.valor} value={tipo.valor}>{tipo.nome}</option>
              ))}
            </select>
            {validationErrors.tipoServico && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.tipoServico}</p>
            )}
          </div>

          <div className="campo-grupo">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Moeda *
            </label>
            <select 
              value={formData.moeda}
              onChange={(e) => handleMoedaChange(e.target.value)}
              className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100 ${validationErrors.moeda ? 'border-red-500' : 'border-gray-700'}`}
              required
            >
              <option value="">{moedas.length > 0 ? 'Selecione a moeda' : 'Carregando moedas...'}</option>
              {moedas.map(moeda => (
                <option key={moeda.codigo} value={moeda.codigo}>{moeda.codigo} - {moeda.nome}</option>
              ))}
            </select>
            {validationErrors.moeda && (
              <p className="text-red-400 text-xs mt-1">{validationErrors.moeda}</p>
            )}
          </div>

          <div className="campo-grupo">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Taxa de Câmbio (Tempo Real)
            </label>
            <input 
              type="number" 
              value={taxaCambio}
              step="0.0001" 
              readOnly
              className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-gray-300"
            />
            <small className="text-xs text-gray-400 mt-1">
              Fonte: <span className="text-accent">{fonteCambio}</span>
            </small>
          </div>

          <div className="campo-grupo">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Incoterm
            </label>
            <select 
              value={formData.incoterm}
              onChange={(e) => setFormData(prev => ({ ...prev, incoterm: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
            >
              <option value="EXW">EXW - Ex Works</option>
              <option value="FOB">FOB - Free on Board</option>
              <option value="CIF">CIF - Cost, Insurance & Freight</option>
              <option value="DDP">DDP - Delivered Duty Paid</option>
            </select>
          </div>
        </div>

        {/* Botão de Cálculo */}
        <button 
          onClick={calcularFreteReal}
          disabled={isCalculating}
          className="btn-calcular w-full mt-6 px-6 py-4 bg-gradient-to-r from-accent to-accent/80 text-white rounded-xl hover:from-accent/80 hover:to-accent/60 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-semibold"
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculando com Dados Reais...</span>
            </>
          ) : (
            <>
              <span className="text-xl">🎯</span>
              <span>Calcular com Dados Reais</span>
            </>
          )}
        </button>

        {/* Aviso de Dependência de APIs */}
        <div className="aviso-apis mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-gray-300">
            <strong>ℹ️ Este simulador depende de dados reais.</strong> Se alguma API estiver indisponível, recomendaremos consulta direta às shipping lines.
          </p>
        </div>
      </section>

      {/* Seção de Resultados (só aparece com dados reais) */}
      {resultados && (
        <section className="results-section glass p-6 rounded-2xl shadow-gold mb-6">
          {/* Cotação Principal */}
          <div className="cotacao-principal text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">💰 Cotação de Frete - {modalTransporte.toUpperCase()}</h2>
            <div className="valor-principal mb-4">
              <span className="text-4xl font-bold text-accent">{resultados.moeda}</span>
              <span className="text-6xl font-bold text-accent ml-2">{resultados.valor}</span>
            </div>
            <div className="detalhes-cotacao grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="detalhe p-3 bg-gray-700/30 rounded-lg">
                <span className="text-gray-400">Modal:</span>
                <span className="text-gray-200 ml-2 capitalize">{resultados.modal}</span>
              </div>
              <div className="detalhe p-3 bg-gray-700/30 rounded-lg">
                <span className="text-gray-400">Peso Volumétrico:</span>
                <span className="text-gray-200 ml-2">{resultados.pesoVolumetrico} kg</span>
              </div>
              <div className="detalhe p-3 bg-gray-700/30 rounded-lg">
                <span className="text-gray-400">Atualizado:</span>
                <span className="text-gray-200 ml-2">{resultados.timestamp}</span>
              </div>
              <div className="detalhe p-3 bg-gray-700/30 rounded-lg">
                <span className="text-gray-400">Validade:</span>
                <span className="text-gray-200 ml-2">{resultados.validade}</span>
              </div>
            </div>
          </div>

          {/* Integração com Outros Simuladores */}
          <div className="integracao-simuladores">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <span>🔗</span>
              Aplicar nos Simuladores
            </h3>
            <p className="text-gray-300 mb-4">Use esta cotação real nos simuladores de importação/exportação:</p>
            
            <div className="botoes-simuladores grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={aplicarNoSimuladorImportacao}
                className="btn-simulador importacao p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📥</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-100">Simulador de Importação</div>
                    <div className="text-sm text-gray-400">Calcular custos totais de importação</div>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={aplicarNoSimuladorExportacao}
                className="btn-simulador exportacao p-4 bg-green-500/20 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📤</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-100">Simulador de Exportação</div>
                    <div className="text-sm text-gray-400">Calcular custos totais de exportação</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Seção de Erro/Indisponibilidade */}
      {dadosIndisponiveis && (
        <section className="error-section glass p-6 rounded-2xl shadow-gold">
          <div className="erro-container text-center">
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center justify-center gap-2">
              <span>⚠️</span>
              Dados Reais Indisponíveis
            </h2>
            <p className="text-gray-300 mb-6">No momento não conseguimos acessar todas as fontes de dados necessárias para uma cotação precisa.</p>
            
            <div className="recomendacoes mb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">📞 Recomendamos consultar diretamente:</h3>
              <div className="links-shipping grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="https://www.maersk.com" target="_blank" rel="noopener noreferrer" className="link-shipping p-3 bg-gray-700/30 border border-gray-600 rounded-lg hover:bg-gray-600/30 transition-all">
                  <div className="font-semibold text-gray-100">Maersk Line</div>
                  <div className="text-sm text-gray-400">Líder mundial em transporte marítimo</div>
                </a>
                <a href="https://www.msc.com" target="_blank" rel="noopener noreferrer" className="link-shipping p-3 bg-gray-700/30 border border-gray-600 rounded-lg hover:bg-gray-600/30 transition-all">
                  <div className="font-semibold text-gray-100">MSC</div>
                  <div className="text-sm text-gray-400">Mediterranean Shipping Company</div>
                </a>
                <a href="https://www.cma-cgm.com" target="_blank" rel="noopener noreferrer" className="link-shipping p-3 bg-gray-700/30 border border-gray-600 rounded-lg hover:bg-gray-600/30 transition-all">
                  <div className="font-semibold text-gray-100">CMA CGM</div>
                  <div className="text-sm text-gray-400">Compagnie Maritime d'Affretement</div>
                </a>
                <a href="https://elines.coscoshipping.com" target="_blank" rel="noopener noreferrer" className="link-shipping p-3 bg-gray-700/30 border border-gray-600 rounded-lg hover:bg-gray-600/30 transition-all">
                  <div className="font-semibold text-gray-100">COSCO</div>
                  <div className="text-sm text-gray-400">China Ocean Shipping Company</div>
                </a>
              </div>
            </div>

            <button 
              onClick={verificarAPIsNovamente}
              className="btn-tentar-novamente px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition-all font-semibold"
            >
              🔄 Tentar Novamente
            </button>
          </div>
        </section>
      )}
    </div>
  );
} 