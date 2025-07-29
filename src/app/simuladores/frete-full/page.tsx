'use client';
import MainLayout from '@/components/layout/MainLayout';
import { useEffect } from 'react';

export default function FreightFullPage() {
  useEffect(() => {
    // Carregar o CSS do simulador
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/simuladores/frete-novo/simulador-frete.css';
    document.head.appendChild(link);

    // Carregar o JavaScript do simulador
    const script = document.createElement('script');
    script.src = '/simuladores/frete-novo/simulador-frete.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (link.parentNode) document.head.removeChild(link);
      if (script.parentNode) document.body.removeChild(script);
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
                <p className="info-comercial">O Brasil possui relações comerciais com mais de <strong>200 países e territórios</strong>.</p>
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
                        <input type="number" id="weight" placeholder="0.00" min="0.01" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="volume">Volume (m³) <span className="required">*</span></label>
                        <input type="number" id="volume" placeholder="0.00" min="0.01" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cargo-value">Valor da Mercadoria (USD) <span className="required">*</span></label>
                        <input type="number" id="cargo-value" placeholder="0.00" min="0.01" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="container-type">Tipo de Container</label>
                        <select id="container-type">
                          <option value="20ft">20ft Standard</option>
                          <option value="40ft">40ft Standard</option>
                          <option value="40ft-hc">40ft High Cube</option>
                          <option value="reefer">Reefer</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Services Section */}
                  <div className="form-section">
                    <h3>Serviços Adicionais</h3>
                    <div className="services-grid">
                      <div className="service-item">
                        <input type="checkbox" id="insurance" />
                        <label htmlFor="insurance">Seguro de Carga</label>
                      </div>
                      <div className="service-item">
                        <input type="checkbox" id="customs" />
                        <label htmlFor="customs">Despacho Aduaneiro</label>
                      </div>
                      <div className="service-item">
                        <input type="checkbox" id="storage" />
                        <label htmlFor="storage">Armazenagem</label>
                      </div>
                      <div className="service-item">
                        <input type="checkbox" id="handling" />
                        <label htmlFor="handling">Manuseio</label>
                      </div>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <div className="form-section">
                    <button type="submit" className="calculate-btn">
                      <span className="btn-icon">🧮</span>
                      <span className="btn-text">Calcular Frete</span>
                    </button>
                  </div>
                </form>
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
                        <label htmlFor="air-weight">Peso (kg) <span className="required">*</span></label>
                        <input type="number" id="air-weight" placeholder="0.00" min="0.01" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="air-volume">Volume (m³) <span className="required">*</span></label>
                        <input type="number" id="air-volume" placeholder="0.00" min="0.01" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="air-cargo-value">Valor da Mercadoria (USD) <span className="required">*</span></label>
                        <input type="number" id="air-cargo-value" placeholder="0.00" min="0.01" step="0.01" required />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <button type="submit" className="calculate-btn">
                      <span className="btn-icon">🧮</span>
                      <span className="btn-text">Calcular Frete Aéreo</span>
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
                        <label htmlFor="road-weight">Peso (kg) <span className="required">*</span></label>
                        <input type="number" id="road-weight" placeholder="0.00" min="0.01" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-volume">Volume (m³) <span className="required">*</span></label>
                        <input type="number" id="road-volume" placeholder="0.00" min="0.01" step="0.01" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="road-cargo-value">Valor da Mercadoria (USD) <span className="required">*</span></label>
                        <input type="number" id="road-cargo-value" placeholder="0.00" min="0.01" step="0.01" required />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <button type="submit" className="calculate-btn">
                      <span className="btn-icon">🧮</span>
                      <span className="btn-text">Calcular Frete Terrestre</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Results Section */}
              <div className="results-section" id="results-section" style={{ display: 'none' }}>
                <div className="results-header">
                  <h2>Resultados do Cálculo</h2>
                  <button className="close-btn" id="close-results">×</button>
                </div>
                <div className="results-content" id="results-content">
                  {/* Results will be populated by JavaScript */}
                </div>
              </div>

              {/* Report Buttons */}
              <div className="report-buttons" id="report-buttons" style={{ display: 'none' }}>
                <button className="report-btn" id="generate-quote">
                  <span className="btn-icon">📋</span>
                  <span className="btn-text">Gerar Pedido de Cotação</span>
                </button>
                <button className="report-btn" id="view-template">
                  <span className="btn-icon">📄</span>
                  <span className="btn-text">Visualizar Template</span>
                </button>
                <button className="report-btn" id="executive-report">
                  <span className="btn-icon">📊</span>
                  <span className="btn-text">Relatório Executivo</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
} 