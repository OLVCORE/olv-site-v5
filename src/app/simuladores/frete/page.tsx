import React from 'react';
import FreightCalculatorReal from '@/components/simulators/FreightCalculatorReal';
import SimLayout from '@/components/simulators/SimLayout';
import Icon from '@/components/icons/Icon';

export const metadata = {
  title: 'Simulador de Frete Internacional | OLV Internacional',
  description: 'Calcule de forma rápida custos de frete internacional (marítimo, aéreo, rodoviário) com o simulador gratuito da OLV Internacional.',
};

export default function FreightPage() {
  return (
    <SimLayout
      calculator={<FreightCalculatorReal />}
      guide={(
        <div className="glass p-6 rounded-2xl shadow-gold card-hover">
          <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <Icon src="/icons/faq.svg" alt="Guia" size="xs" className="text-accent" />
            🚢 Simulador de Frete com Dados Reais
          </h2>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <h3 className="font-semibold text-green-400 mb-2">✅ Dados 100% Reais:</h3>
              <ul className="space-y-1">
                <li>• <strong>Taxas de Câmbio</strong>: API Radar 360 em tempo real</li>
                <li>• <strong>Países Comerciais</strong>: Lista completa do Brasil</li>
                <li>• <strong>Portos Brasileiros</strong>: Principais portos nacionais</li>
                <li>• <strong>Cálculos Transparentes</strong>: Baseados em dados de mercado</li>
                <li>• <strong>Status de APIs</strong>: Indicadores visuais de disponibilidade</li>
              </ul>
            </div>
            
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h3 className="font-semibold text-blue-400 mb-2">🎯 Como Usar:</h3>
              <ol className="list-decimal pl-4 space-y-1">
                <li><strong>Verificar APIs</strong>: Status das fontes de dados</li>
                <li><strong>Definir Direção</strong>: Importação ou Exportação</li>
                <li><strong>Preencher Dados</strong>: Origem, destino, peso, volume</li>
                <li><strong>Selecionar Serviço</strong>: FCL ou LCL</li>
                <li><strong>Calcular</strong>: Receber cotação real</li>
              </ol>
            </div>

            <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
              <h3 className="font-semibold text-yellow-400 mb-2">⚠️ Transparência Total:</h3>
              <p>Este simulador mostra claramente quais dados estão disponíveis e quais não. Se alguma API estiver indisponível, recomendamos consulta direta às shipping lines.</p>
            </div>
          </div>
        </div>
      )}
    />
  );
} 