'use client';
import MainLayout from '@/components/layout/MainLayout';
import { useEffect } from 'react';

export default function FreightFullPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/simuladores/frete-novo/simulador-frete.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = '/simuladores/frete-novo/simulador-frete.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <MainLayout>
      <div className="main-content pt-24 md:pt-28">
        <div className="container mx-auto px-4">
          {/* Header */}
          <header className="header">
            <div className="container">
              <div className="header-content">
                <div className="logo">
                  <img src="https://olvinternacional.com.br/logo.png" alt="OLV Internacional" className="logo-img" />
                  <span className="logo-text">OLV Internacional</span>
                </div>
                <div className="api-status">
                  <div className="status-item">
                    <span className="status-dot" id="weather-status"></span>
                    <span className="status-text">Clima</span>
                  </div>
                  <div className="status-item">
                    <span className="status-dot" id="traffic-status"></span>
                    <span className="status-text">Tráfego</span>
                  </div>
                  <div className="status-item">
                    <span className="status-dot" id="currency-status"></span>
                    <span className="status-text">Câmbio</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="main-content">
            <div className="container">
              
              {/* Development Banner */}
              <div className="development-banner">
                <div className="banner-content">
                  <span className="banner-icon">🚧</span>
                  <span className="banner-text">Simuladores Multimodal em Desenvolvimento</span>
                  <span className="banner-badge">BETA</span>
                </div>
              </div>

              {/* Title Section */}
              <div className="title-section">
                <h1>Simulador de Frete Internacional</h1>
                <p>Calcule custos de frete marítimo, aéreo e terrestre com dados em tempo real</p>
              </div>

              {/* Modal Navigation */}
              <div className="modal-nav">
                <button className="modal-btn active" data-modal="maritime">
                  <span className="modal-icon">🚢</span>
                  <span className="modal-text">Marítimo</span>
                </button>
                <button className="modal-btn" data-modal="air">
                  <span className="modal-icon">✈️</span>
                  <span className="modal-text">Aéreo</span>
                </button>
                <button className="modal-btn" data-modal="road">
                  <span className="modal-icon">🚛</span>
                  <span className="modal-text">Terrestre</span>
                </button>
              </div>

              {/* Commercial Direction */}
              <div className="direction-selector">
                <button className="direction-btn active" data-direction="import">Importação</button>
                <button className="direction-btn" data-direction="export">Exportação</button>
              </div>

              {/* Maritime Modal Content */}
              <div className="modal-content active" id="maritime-modal">
                <form className="freight-form" id="maritime-form">
                  {/* Route Section */}
                  <div className="form-section">
                    <h3>Rota e Origem/Destino</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="origin">Origem <span className="required">*</span></label>
                        <input type="text" id="origin" placeholder="Digite a origem" required 
                               title="Digite o porto, cidade ou país de origem da carga. Ex: Santos, São Paulo, Brasil" />
                        <div className="autocomplete-list" id="origin-list"></div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="destination">Destino <span className="required">*</span></label>
                        <input type="text" id="destination" placeholder="Digite o destino" required
                               title="Digite o porto, cidade ou país de destino da carga. Ex: Shanghai, China" />
                        <div className="autocomplete-list" id="destination-list"></div>
                      </div>
                    </div>
                  </div>

                  {/* Cargo Section */}
                  <div className="form-section">
                    <h3>Carga e Dimensões</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="cargo-type">Tipo de Carga <span className="required">*</span></label>
                        <select id="cargo-type" required title="Selecione o tipo de carga que será transportada">
                          <option value="">Selecione o tipo de carga</option>
                          <option value="general">Carga Geral</option>
                          <option value="container">Container</option>
                          <option value="bulk">Granel</option>
                          <option value="liquid">Líquido</option>
                          <option value="dangerous">Perigosa</option>
                          <option value="refrigerated">Refrigerada</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="weight">Peso (kg) <span className="required">*</span></label>
                        <input type="number" id="weight" placeholder="0.00" min="0" step="0.01" required
                               title="Digite o peso total da carga em quilogramas" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="volume">Volume (m³) <span className="required">*</span></label>
                        <input type="number" id="volume" placeholder="0.00" min="0" step="0.01" required
                               title="Digite o volume total da carga em metros cúbicos" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="taxable-weight">Peso Taxável (kg)</label>
                        <input type="number" id="taxable-weight" placeholder="Calculado automaticamente" readOnly
                               title="Peso utilizado para cálculo de frete (maior entre peso real e volumétrico)" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="volumetric-weight">Peso Volumétrico (kg)</label>
                        <input type="number" id="volumetric-weight" placeholder="Calculado automaticamente" readOnly
                               title="Peso calculado com base no volume (1m³ = 1000kg para frete marítimo)" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="service-type">Tipo de Serviço <span className="required">*</span></label>
                        <select id="service-type" required title="Selecione o tipo de serviço de transporte marítimo">
                          <option value="">Selecione o tipo de serviço</option>
                          <option value="FCL">FCL - Full Container Load (Container Completo)</option>
                          <option value="LCL">LCL - Less than Container Load (Carga Parcial)</option>
                          <option value="bulk">Granel (Bulk Cargo)</option>
                        </select>
                      </div>
                      <div className="form-group container-section" style={{display: 'none'}}>
                        <label htmlFor="container-type">Tipo de Container</label>
                        <select id="container-type" title="Selecione o tipo de container para FCL">
                          <option value="">Selecione o container</option>
                          <option value="20GP">20&apos; GP (General Purpose)</option>
                          <option value="40GP">40&apos; GP (General Purpose)</option>
                          <option value="40HC">40&apos; HC (High Cube)</option>
                          <option value="45HC">45&apos; HC (High Cube)</option>
                          <option value="20RF">20&apos; RF (Reefer)</option>
                          <option value="40RF">40&apos; RF (Reefer)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="cargo-value">Valor da Carga (USD)</label>
                        <input type="number" id="cargo-value" placeholder="0.00" min="0" step="0.01"
                               title="Digite o valor declarado da carga para cálculo de seguro" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="ncm">Código NCM</label>
                        <input type="text" id="ncm" placeholder="Ex: 8471.30.00"
                               title="Código NCM para classificação fiscal da mercadoria" />
                        <div className="ncm-info" id="ncm-info" style={{display: 'none'}}>
                          <p>Descrição do NCM será exibida aqui</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Incoterms Section */}
                  <div className="form-section">
                    <h3>Incoterms</h3>
                    <div className="form-group">
                      <label htmlFor="incoterm">Termo de Comércio <span className="required">*</span></label>
                      <select id="incoterm" required title="Selecione o Incoterm que define as responsabilidades">
                        <option value="">Selecione o Incoterm</option>
                        <option value="EXW">EXW - Ex Works</option>
                        <option value="FCA">FCA - Free Carrier</option>
                        <option value="CPT">CPT - Carriage Paid To</option>
                        <option value="CIP">CIP - Carriage and Insurance Paid To</option>
                        <option value="DAP">DAP - Delivered at Place</option>
                        <option value="DPU">DPU - Delivered at Place Unloaded</option>
                        <option value="DDP">DDP - Delivered Duty Paid</option>
                        <option value="FAS">FAS - Free Alongside Ship</option>
                        <option value="FOB">FOB - Free on Board</option>
                        <option value="CFR">CFR - Cost and Freight</option>
                        <option value="CIF">CIF - Cost, Insurance and Freight</option>
                      </select>
                      <button type="button" className="info-btn" id="incoterm-info-btn">
                        <span>ℹ️</span> Ver Detalhes
                      </button>
                    </div>
                  </div>

                  {/* Calculate Section */}
                  <div className="calculate-section">
                    <button type="submit" className="calculate-btn" id="calculate-btn">
                      <span className="btn-icon">🚢</span>
                      Calcular Frete Marítimo
                    </button>
                  </div>
                </form>

                {/* Results Section */}
                <div className="results-section" id="results-section" style={{display: 'none'}}>
                  <div className="results-header">
                    <h2>Resultados do Cálculo</h2>
                    <div className="results-summary">
                      <div className="summary-item">
                        <span className="summary-label">Origem:</span>
                        <span className="summary-value" id="result-origin">-</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Destino:</span>
                        <span className="summary-value" id="result-destination">-</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Peso:</span>
                        <span className="summary-value" id="result-weight">-</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Volume:</span>
                        <span className="summary-value" id="result-volume">-</span>
                      </div>
                    </div>
                  </div>

                  <div className="results-content">
                    <div className="cost-breakdown">
                      <h3>Detalhamento de Custos</h3>
                      <div className="cost-grid">
                        <div className="cost-item">
                          <span className="cost-label">Frete Base</span>
                          <span className="cost-value" id="base-freight">-</span>
                        </div>
                        <div className="cost-item">
                          <span className="cost-label">Sobretaxas</span>
                          <span className="cost-value" id="surcharges">-</span>
                        </div>
                        <div className="cost-item">
                          <span className="cost-label">Seguro</span>
                          <span className="cost-value" id="insurance">-</span>
                        </div>
                        <div className="cost-item">
                          <span className="cost-label">Taxas Portuárias</span>
                          <span className="cost-value" id="port-fees">-</span>
                        </div>
                        <div className="cost-item">
                          <span className="cost-label">Documentação</span>
                          <span className="cost-value" id="documentation">-</span>
                        </div>
                        <div className="cost-item">
                          <span className="cost-label">Operacional</span>
                          <span className="cost-value" id="operational">-</span>
                        </div>
                      </div>
                    </div>

                    <div className="total-section">
                      <div className="total-item">
                        <span className="total-label">Total Frete</span>
                        <span className="total-value" id="total-freight">-</span>
                      </div>
                      <div className="total-item">
                        <span className="total-label">Total por kg</span>
                        <span className="total-value" id="total-per-kg">-</span>
                      </div>
                      <div className="total-item">
                        <span className="total-label">Total por m³</span>
                        <span className="total-value" id="total-per-m3">-</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button className="action-btn quotation-btn">
                      <span className="btn-icon">📋</span>
                      Gerar Pedido de Cotação
                    </button>
                    <button className="action-btn template-btn">
                      <span className="btn-icon">👁️</span>
                      Visualizar Template
                    </button>
                    <button className="action-btn report-btn">
                      <span className="btn-icon">📊</span>
                      Gerar Relatório Executivo
                    </button>
                  </div>
                </div>
              </div>

              {/* Air Modal Content */}
              <div className="modal-content" id="air-modal">
                <form className="freight-form" id="air-form">
                  {/* Route Section */}
                  <div className="form-section">
                    <h3>Rota e Origem/Destino</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="air-origin">Origem <span className="required">*</span></label>
                        <input type="text" id="air-origin" placeholder="Digite a origem" required />
                        <div className="autocomplete-list" id="air-origin-list"></div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="air-destination">Destino <span className="required">*</span></label>
                        <input type="text" id="air-destination" placeholder="Digite o destino" required />
                        <div className="autocomplete-list" id="air-destination-list"></div>
                      </div>
                    </div>
                  </div>

                  {/* Cargo Section */}
                  <div className="form-section">
                    <h3>Carga e Dimensões</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="air-cargo-type">Tipo de Carga <span className="required">*</span></label>
                        <select id="air-cargo-type" required>
                          <option value="">Selecione o tipo de carga</option>
                          <option value="general">Carga Geral</option>
                          <option value="dangerous">Perigosa</option>
                          <option value="refrigerated">Refrigerada</option>
                          <option value="valuable">Valiosa</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="air-weight">Peso (kg) <span className="required">*</span></label>
                        <input type="number" id="air-weight" placeholder="0.00" min="0" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="air-volume">Volume (m³) <span className="required">*</span></label>
                        <input type="number" id="air-volume" placeholder="0.00" min="0" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="air-cargo-value">Valor da Carga (USD)</label>
                        <input type="number" id="air-cargo-value" placeholder="0.00" min="0" step="0.01" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="air-service-type">Tipo de Serviço <span className="required">*</span></label>
                        <select id="air-service-type" required>
                          <option value="">Selecione o tipo de serviço</option>
                          <option value="express">Express</option>
                          <option value="standard">Standard</option>
                          <option value="economy">Economy</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="air-incoterm">Incoterm <span className="required">*</span></label>
                        <select id="air-incoterm" required>
                          <option value="">Selecione o Incoterm</option>
                          <option value="EXW">EXW - Ex Works</option>
                          <option value="FCA">FCA - Free Carrier</option>
                          <option value="CPT">CPT - Carriage Paid To</option>
                          <option value="CIP">CIP - Carriage and Insurance Paid To</option>
                          <option value="DAP">DAP - Delivered at Place</option>
                          <option value="DDP">DDP - Delivered Duty Paid</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Calculate Section */}
                  <div className="calculate-section">
                    <button type="submit" className="calculate-btn" id="air-calculate-btn">
                      <span className="btn-icon">✈️</span>
                      Calcular Frete Aéreo
                    </button>
                  </div>
                </form>
              </div>

              {/* Road Modal Content */}
              <div className="modal-content" id="road-modal">
                <form className="freight-form" id="road-form">
                  {/* Route Section */}
                  <div className="form-section">
                    <h3>Rota e Origem/Destino</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="road-origin">Origem <span className="required">*</span></label>
                        <input type="text" id="road-origin" placeholder="Digite a origem" required />
                        <div className="autocomplete-list" id="road-origin-list"></div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-destination">Destino <span className="required">*</span></label>
                        <input type="text" id="road-destination" placeholder="Digite o destino" required />
                        <div className="autocomplete-list" id="road-destination-list"></div>
                      </div>
                    </div>
                  </div>

                  {/* Cargo Section */}
                  <div className="form-section">
                    <h3>Carga e Dimensões</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="road-cargo-type">Tipo de Carga <span className="required">*</span></label>
                        <select id="road-cargo-type" required>
                          <option value="">Selecione o tipo de carga</option>
                          <option value="general">Carga Geral</option>
                          <option value="dangerous">Perigosa</option>
                          <option value="refrigerated">Refrigerada</option>
                          <option value="oversized">Oversized</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-weight">Peso (kg) <span className="required">*</span></label>
                        <input type="number" id="road-weight" placeholder="0.00" min="0" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-volume">Volume (m³) <span className="required">*</span></label>
                        <input type="number" id="road-volume" placeholder="0.00" min="0" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-cargo-value">Valor da Carga (USD)</label>
                        <input type="number" id="road-cargo-value" placeholder="0.00" min="0" step="0.01" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-service-type">Tipo de Serviço <span className="required">*</span></label>
                        <select id="road-service-type" required>
                          <option value="">Selecione o tipo de serviço</option>
                          <option value="ftl">FTL (Full Truck Load)</option>
                          <option value="ltl">LTL (Less than Truck Load)</option>
                          <option value="express">Express</option>
                          <option value="standard">Standard</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-incoterm">Incoterm <span className="required">*</span></label>
                        <select id="road-incoterm" required>
                          <option value="">Selecione o Incoterm</option>
                          <option value="EXW">EXW - Ex Works</option>
                          <option value="FCA">FCA - Free Carrier</option>
                          <option value="CPT">CPT - Carriage Paid To</option>
                          <option value="CIP">CIP - Carriage and Insurance Paid To</option>
                          <option value="DAP">DAP - Delivered at Place</option>
                          <option value="DDP">DDP - Delivered Duty Paid</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Calculate Section */}
                  <div className="calculate-section">
                    <button type="submit" className="calculate-btn" id="road-calculate-btn">
                      <span className="btn-icon">🚛</span>
                      Calcular Frete Terrestre
                    </button>
                  </div>
                </form>
              </div>

              {/* Modals */}
              <div className="modal" id="incoterm-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Detalhes do Incoterm</h3>
                    <button className="close-btn">&times;</button>
                  </div>
                  <div className="modal-body" id="incoterm-details">
                    {/* Content will be loaded dynamically */}
                  </div>
                </div>
              </div>

              <div className="modal" id="quotation-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Pedido de Cotação</h3>
                    <button className="close-btn">&times;</button>
                  </div>
                  <div className="modal-body">
                    <div className="quotation-preview" id="quotation-preview-content">
                      {/* Content will be loaded dynamically */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal" id="template-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Template de Documentação</h3>
                    <button className="close-btn">&times;</button>
                  </div>
                  <div className="modal-body">
                    <div className="template-preview" id="template-preview-content">
                      {/* Content will be loaded dynamically */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal" id="report-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Relatório Executivo</h3>
                    <button className="close-btn">&times;</button>
                  </div>
                  <div className="modal-body">
                    <div className="executive-report-preview" id="executive-report-preview-content">
                      {/* Content will be loaded dynamically */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
} 