'use client';
import MainLayout from '@/components/layout/MainLayout';
import { useEffect } from 'react';

export default function FreightFullPage() {
  useEffect(() => {
    // Carregar CSS do simulador
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/simuladores/frete-novo/simulador-frete.css';
    document.head.appendChild(link);

    // Carregar JavaScript do simulador
    const script = document.createElement('script');
    script.src = '/simuladores/frete-novo/simulador-frete.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <MainLayout>
      <div className="main-content pt-24 md:pt-28">
        <div className="container mx-auto px-4">
          
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
                    <label htmlFor="weight">Peso (kg) <span className="required">*</span></label>
                    <input type="number" id="weight" placeholder="Ex: 1000" required min="0" step="0.01" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="volume">Volume (m³) <span className="required">*</span></label>
                    <input type="number" id="volume" placeholder="Ex: 5" required min="0" step="0.01" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cargo-type">Tipo de Carga</label>
                    <select id="cargo-type">
                      <option value="general">Carga Geral</option>
                      <option value="container">Container</option>
                      <option value="bulk">Granel</option>
                      <option value="dangerous">Perigosa</option>
                      <option value="refrigerated">Refrigerada</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cargo-value">Valor da Carga (USD)</label>
                    <input type="number" id="cargo-value" placeholder="Ex: 50000" min="0" step="0.01" />
                  </div>
                </div>
              </div>

              {/* Service Type Section */}
              <div className="form-section">
                <h3>Tipo de Serviço</h3>
                <div className="form-group">
                  <label htmlFor="service-type">Modalidade</label>
                  <select id="service-type">
                    <option value="fcl">FCL (Full Container Load)</option>
                    <option value="lcl">LCL (Less than Container Load)</option>
                    <option value="bulk">Granel</option>
                    <option value="roro">Ro-Ro</option>
                  </select>
                </div>
                
                {/* FCL Container Section */}
                <div className="container-section" id="fcl-container">
                  <h4>Especificações do Container</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="container-type">Tipo de Container</label>
                      <select id="container-type">
                        <option value="20gp">20&apos; GP (Standard)</option>
                        <option value="40gp">40&apos; GP (Standard)</option>
                        <option value="40hc">40&apos; HC (High Cube)</option>
                        <option value="45hc">45&apos; HC (High Cube)</option>
                        <option value="reefer">Reefer (Refrigerado)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="container-count">Quantidade</label>
                      <input type="number" id="container-count" defaultValue="1" min="1" max="10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Incoterms Section */}
              <div className="form-section">
                <h3>Incoterms</h3>
                <div className="form-group">
                  <label htmlFor="incoterm">Termo de Comércio</label>
                  <select id="incoterm">
                    <option value="exw">EXW - Ex Works</option>
                    <option value="fca">FCA - Free Carrier</option>
                    <option value="cpt">CPT - Carriage Paid To</option>
                    <option value="cip">CIP - Carriage and Insurance Paid To</option>
                    <option value="dap">DAP - Delivered at Place</option>
                    <option value="dpd">DPD - Delivered Duty Paid</option>
                    <option value="fob">FOB - Free on Board</option>
                    <option value="cfr">CFR - Cost and Freight</option>
                    <option value="cif">CIF - Cost, Insurance and Freight</option>
                  </select>
                  <button type="button" className="info-btn">
                    <span>ℹ️</span> Ver Detalhes
                  </button>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="form-actions">
                <button type="submit" className="calculate-btn" id="calculate-btn">
                  <span className="btn-icon">🚢</span>
                  Calcular Frete
                </button>
              </div>
            </form>
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
                    <label htmlFor="air-weight">Peso (kg) <span className="required">*</span></label>
                    <input type="number" id="air-weight" placeholder="Ex: 500" required min="0" step="0.01" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="air-volume">Volume (m³) <span className="required">*</span></label>
                    <input type="number" id="air-volume" placeholder="Ex: 2" required min="0" step="0.01" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="air-cargo-type">Tipo de Carga</label>
                    <select id="air-cargo-type">
                      <option value="general">Carga Geral</option>
                      <option value="dangerous">Perigosa</option>
                      <option value="refrigerated">Refrigerada</option>
                      <option value="valuable">Valiosa</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="air-cargo-value">Valor da Carga (USD)</label>
                    <input type="number" id="air-cargo-value" placeholder="Ex: 25000" min="0" step="0.01" />
                  </div>
                </div>
              </div>

              {/* Service Type Section */}
              <div className="form-section">
                <h3>Tipo de Serviço</h3>
                <div className="form-group">
                  <label htmlFor="air-service-type">Modalidade</label>
                  <select id="air-service-type">
                    <option value="express">Express</option>
                    <option value="standard">Standard</option>
                    <option value="economy">Economy</option>
                    <option value="charter">Charter</option>
                  </select>
                </div>
              </div>

              {/* Incoterms Section */}
              <div className="form-section">
                <h3>Incoterms</h3>
                <div className="form-group">
                  <label htmlFor="air-incoterm">Termo de Comércio</label>
                  <select id="air-incoterm">
                    <option value="exw">EXW - Ex Works</option>
                    <option value="fca">FCA - Free Carrier</option>
                    <option value="cpt">CPT - Carriage Paid To</option>
                    <option value="cip">CIP - Carriage and Insurance Paid To</option>
                    <option value="dap">DAP - Delivered at Place</option>
                    <option value="dpd">DPD - Delivered Duty Paid</option>
                  </select>
                  <button type="button" className="info-btn">
                    <span>ℹ️</span> Ver Detalhes
                  </button>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="form-actions">
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
                    <label htmlFor="road-weight">Peso (kg) <span className="required">*</span></label>
                    <input type="number" id="road-weight" placeholder="Ex: 2000" required min="0" step="0.01" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="road-volume">Volume (m³) <span className="required">*</span></label>
                    <input type="number" id="road-volume" placeholder="Ex: 10" required min="0" step="0.01" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="road-cargo-type">Tipo de Carga</label>
                    <select id="road-cargo-type">
                      <option value="general">Carga Geral</option>
                      <option value="dangerous">Perigosa</option>
                      <option value="refrigerated">Refrigerada</option>
                      <option value="oversized">Oversized</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="road-cargo-value">Valor da Carga (USD)</label>
                    <input type="number" id="road-cargo-value" placeholder="Ex: 15000" min="0" step="0.01" />
                  </div>
                </div>
              </div>

              {/* Service Type Section */}
              <div className="form-section">
                <h3>Tipo de Serviço</h3>
                <div className="form-group">
                  <label htmlFor="road-service-type">Modalidade</label>
                  <select id="road-service-type">
                    <option value="ftl">FTL (Full Truck Load)</option>
                    <option value="ltl">LTL (Less than Truck Load)</option>
                    <option value="express">Express</option>
                    <option value="standard">Standard</option>
                  </select>
                </div>
              </div>

              {/* Incoterms Section */}
              <div className="form-section">
                <h3>Incoterms</h3>
                <div className="form-group">
                  <label htmlFor="road-incoterm">Termo de Comércio</label>
                  <select id="road-incoterm">
                    <option value="exw">EXW - Ex Works</option>
                    <option value="fca">FCA - Free Carrier</option>
                    <option value="cpt">CPT - Carriage Paid To</option>
                    <option value="cip">CIP - Carriage and Insurance Paid To</option>
                    <option value="dap">DAP - Delivered at Place</option>
                    <option value="dpd">DPD - Delivered Duty Paid</option>
                  </select>
                  <button type="button" className="info-btn">
                    <span>ℹ️</span> Ver Detalhes
                  </button>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="form-actions">
                <button type="submit" className="calculate-btn" id="road-calculate-btn">
                  <span className="btn-icon">🚛</span>
                  Calcular Frete Terrestre
                </button>
              </div>
            </form>
          </div>

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
      </div>
    </MainLayout>
  );
} 