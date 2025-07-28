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
                        <select id="cargo-type" required>
                          <option value="">Selecione o tipo de carga</option>
                          <option value="container">Container</option>
                          <option value="bulk">Granel</option>
                          <option value="break-bulk">Break Bulk</option>
                          <option value="dangerous">Carga Perigosa</option>
                          <option value="refrigerated">Refrigerada</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="weight">Peso (kg) <span className="required">*</span></label>
                        <input type="number" id="weight" placeholder="0" required min="0" step="0.01" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="volume">Volume (m³) <span className="required">*</span></label>
                        <input type="number" id="volume" placeholder="0" required min="0" step="0.01" />
                      </div>
                    </div>
                  </div>

                  {/* Service and Incoterms Section */}
                  <div className="form-section">
                    <h3>Serviço e Incoterms</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="service-type">Tipo de Serviço <span className="required">*</span></label>
                        <select id="service-type" required>
                          <option value="">Selecione o tipo de serviço</option>
                          <option value="fcl">FCL - Container Completo</option>
                          <option value="lcl">LCL - Carga Solta</option>
                          <option value="bulk">Bulk - Granel</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="incoterm">Incoterm <span className="required">*</span></label>
                        <select id="incoterm" required>
                          <option value="">Selecione o Incoterm</option>
                          <option value="exw">EXW - Ex Works</option>
                          <option value="fca">FCA - Free Carrier</option>
                          <option value="cpt">CPT - Carriage Paid To</option>
                          <option value="cip">CIP - Carriage and Insurance Paid To</option>
                          <option value="dap">DAP - Delivered at Place</option>
                          <option value="dpu">DPU - Delivered at Place Unloaded</option>
                          <option value="ddp">DDP - Delivered Duty Paid</option>
                          <option value="fas">FAS - Free Alongside Ship</option>
                          <option value="fob">FOB - Free on Board</option>
                          <option value="cfr">CFR - Cost and Freight</option>
                          <option value="cif">CIF - Cost, Insurance and Freight</option>
                        </select>
                        <button type="button" className="info-btn">
                          <span>ℹ️</span> Ver Detalhes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <div className="form-actions">
                    <button type="submit" className="calculate-btn">
                      <span className="btn-icon">⚡</span>
                      Calcular Frete
                    </button>
                  </div>
                </form>

                {/* Results Section */}
                <div className="results-section" id="results" style={{display: 'none'}}>
                  <h3>Resultado do Cálculo</h3>
                  <div className="results-grid">
                    <div className="result-card">
                      <h4>Custo Total</h4>
                      <div className="result-value" id="total-cost">$0.00</div>
                    </div>
                    <div className="result-card">
                      <h4>Frete</h4>
                      <div className="result-value" id="freight-cost">$0.00</div>
                    </div>
                    <div className="result-card">
                      <h4>Seguro</h4>
                      <div className="result-value" id="insurance-cost">$0.00</div>
                    </div>
                    <div className="result-card">
                      <h4>Alfândega</h4>
                      <div className="result-value" id="customs-cost">$0.00</div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button type="button" className="action-btn quotation-btn">
                      <span>📋</span> Gerar Pedido de Cotação
                    </button>
                    <button type="button" className="action-btn template-btn">
                      <span>👁️</span> Visualizar Template
                    </button>
                    <button type="button" className="action-btn report-btn">
                      <span>📊</span> Gerar Relatório Executivo
                    </button>
                  </div>
                </div>
              </div>

              {/* Air Modal Content */}
              <div className="modal-content" id="air-modal">
                <form className="freight-form" id="air-form">
                  {/* Similar structure for air freight */}
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

                  <div className="form-section">
                    <h3>Carga e Dimensões</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="air-cargo-type">Tipo de Carga <span className="required">*</span></label>
                        <select id="air-cargo-type" required>
                          <option value="">Selecione o tipo de carga</option>
                          <option value="general">Carga Geral</option>
                          <option value="dangerous">Carga Perigosa</option>
                          <option value="perishable">Perecível</option>
                          <option value="valuable">Valiosa</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="air-weight">Peso (kg) <span className="required">*</span></label>
                        <input type="number" id="air-weight" placeholder="0" required min="0" step="0.01" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="air-volume">Volume (m³) <span className="required">*</span></label>
                        <input type="number" id="air-volume" placeholder="0" required min="0" step="0.01" />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Serviço e Incoterms</h3>
                    <div className="form-grid">
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
                          <option value="fca">FCA - Free Carrier</option>
                          <option value="cpt">CPT - Carriage Paid To</option>
                          <option value="cip">CIP - Carriage and Insurance Paid To</option>
                          <option value="dap">DAP - Delivered at Place</option>
                          <option value="ddp">DDP - Delivered Duty Paid</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="calculate-btn">
                      <span className="btn-icon">⚡</span>
                      Calcular Frete
                    </button>
                  </div>
                </form>
              </div>

              {/* Road Modal Content */}
              <div className="modal-content" id="road-modal">
                <form className="freight-form" id="road-form">
                  {/* Similar structure for road freight */}
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

                  <div className="form-section">
                    <h3>Carga e Dimensões</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="road-cargo-type">Tipo de Carga <span className="required">*</span></label>
                        <select id="road-cargo-type" required>
                          <option value="">Selecione o tipo de carga</option>
                          <option value="general">Carga Geral</option>
                          <option value="dangerous">Carga Perigosa</option>
                          <option value="refrigerated">Refrigerada</option>
                          <option value="bulk">Granel</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-weight">Peso (kg) <span className="required">*</span></label>
                        <input type="number" id="road-weight" placeholder="0" required min="0" step="0.01" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-volume">Volume (m³) <span className="required">*</span></label>
                        <input type="number" id="road-volume" placeholder="0" required min="0" step="0.01" />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Serviço e Incoterms</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="road-service-type">Tipo de Serviço <span className="required">*</span></label>
                        <select id="road-service-type" required>
                          <option value="">Selecione o tipo de serviço</option>
                          <option value="ftl">FTL - Full Truck Load</option>
                          <option value="ltl">LTL - Less Than Truck Load</option>
                          <option value="express">Express</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-incoterm">Incoterm <span className="required">*</span></label>
                        <select id="road-incoterm" required>
                          <option value="">Selecione o Incoterm</option>
                          <option value="exw">EXW - Ex Works</option>
                          <option value="fca">FCA - Free Carrier</option>
                          <option value="cpt">CPT - Carriage Paid To</option>
                          <option value="dap">DAP - Delivered at Place</option>
                          <option value="ddp">DDP - Delivered Duty Paid</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="calculate-btn">
                      <span className="btn-icon">⚡</span>
                      Calcular Frete
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
} 