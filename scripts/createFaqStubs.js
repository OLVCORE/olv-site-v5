const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content', 'answers');
if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });

/**
 * Helper to generate front-matter and placeholder markdown
 */
function makeMarkdown({ title, slug, description }) {
  return `---
title: "${title}"
slug: "${slug}"
description: "${description}"
mainQuestion: "${title}?"
faqs:
  - q: "${title}?"
    a: "Resposta curta em desenvolvimento."
---

## Resposta rápida

*Conteúdo em elaboração.*

### Como fazer passo a passo

1. Passo 1 – texto.
2. Passo 2 – texto.
3. Passo 3 – texto.

---

### FAQ relacionado

| Pergunta | Resposta |
| --- | --- |
| Exemplo 1 | Placeholder |
| Exemplo 2 | Placeholder |

---

> Esta resposta faz parte da base de conhecimento da OLV Internacional.
`;
}

const topics = [
  { slug: 'quanto-custa-importar-da-china', title: 'Quanto custa importar da China', description: 'Estimativa de custos para importação da China em 2024.' },
  { slug: 'calculo-frete-internacional-passo-a-passo', title: 'Cálculo de frete internacional passo a passo', description: 'Guia para calcular frete marítimo e aéreo.' },
  { slug: 'regimes-aduaneiros-especiais-quais-sao', title: 'Quais são os regimes aduaneiros especiais', description: 'Visão geral de Drawback, RECOF, Admissão Temporária e outros.' },
  { slug: 'como-funciona-ex-tarifario', title: 'Como funciona o ex-tarifário', description: 'Processo de solicitação de redução de II para máquinas e equipamentos.' },
  { slug: 'habilitar-radar-siscomex-requisitos', title: 'Como habilitar Radar Siscomex', description: 'Passo a passo e documentos para Radar.' },
  { slug: 'formacao-do-preco-de-exportacao', title: 'Formação do preço de exportação', description: 'Como calcular preço FOB para exportar.' },
  { slug: 'compliance-internacional-obrigatorio', title: 'Compliance internacional é obrigatório?', description: 'Requisitos de compliance em operações globais.' },
  { slug: 'cotacao-dolar-impacto-importacao', title: 'Como a cotação do dólar impacta a importação', description: 'Estratégias de hedge cambial.' },
  { slug: 'logistica-4-0-beneficios-supply-chain', title: 'Logística 4.0 e benefícios na supply chain', description: 'Tecnologias e ganhos de eficiência.' },
  { slug: 'planejamento-tributario-importacao', title: 'Planejamento tributário na importação', description: 'Estratégias para reduzir carga tributária.' },
  { slug: 'custos-portuarios-no-despacho', title: 'Custos portuários no despacho aduaneiro', description: 'Tabela de custos e como prever.' },
  { slug: 'diferenca-entre-incoterms-2020', title: 'Diferença entre INCOTERMS 2020', description: 'Principais mudanças e efeitos.' },
  { slug: 'escolher-transportadora-internacional', title: 'Como escolher transportadora internacional', description: 'Critérios para selecionar forwarders.' },
  { slug: 'seguro-de-carga-internacional', title: 'Seguro de carga internacional', description: 'Coberturas e cálculo de prêmio.' },
  { slug: 'negociar-cambio-para-importacao', title: 'Como negociar câmbio para importação', description: 'Melhores práticas de FX.' },
  { slug: 'importacao-drop-shipping-regulamentacao', title: 'Drop Shipping e regulamentação no Brasil', description: 'Riscos e obrigações.' },
  { slug: 'reduzir-lead-time-importacao', title: 'Como reduzir lead time na importação', description: 'Táticas logísticas e aduaneiras.' },
  { slug: 'controle-de-riscos-aduaneiros', title: 'Controle de riscos aduaneiros', description: 'Mapeamento e mitigação.' },
  { slug: 'simulador-custo-importacao-como-usar', title: 'Como usar o simulador de custo de importação', description: 'Passo a passo na plataforma OLV.' },
  { slug: 'ncm-classificacao-fiscal', title: 'Classificação fiscal do NCM', description: 'Critérios e consulta.' },
  { slug: 'documentos-necessarios-exportacao', title: 'Documentos necessários para exportação', description: 'Lista e responsabilidades.' },
  { slug: 'drawback-suspensao-beneficios', title: 'Benefícios do Drawback Suspensão', description: 'Economia tributária.' },
  { slug: 'siscomex-li-declaracao-como-fazer', title: 'Como fazer LI no Siscomex', description: 'Procedimento passo a passo.' },
  { slug: 'certificado-origem-para-aco', title: 'Certificado de origem para aço', description: 'Quando é exigido e como obter.' },
  { slug: 'licenciamento-anvisa-importacao', title: 'Licenciamento ANVISA na importação', description: 'Produtos sujeitos e processo.' },
  { slug: 'despacho-aduaneiro-etapas', title: 'Etapas do despacho aduaneiro', description: 'Fluxo completo.' },
  { slug: 'demurrage-porto-como-evitar', title: 'Como evitar demurrage no porto', description: 'Boas práticas logísticas.' },
  { slug: 'armazenagem-alfandegada-custos', title: 'Custos de armazenagem alfandegada', description: 'Como calcular e reduzir.' },
  { slug: 'trading-company-vs-importacao-propria', title: 'Trading company vs importação própria', description: 'Prós e contras.' },
  // Plataformas
  { slug: 'stratevo-o-que-e', title: 'O que é a plataforma STRATEVO', description: 'Visão geral da plataforma de inteligência estratégica.' },
  { slug: 'exceltta-o-que-e', title: 'O que é a plataforma EXCELTTA', description: 'Visão geral de analytics avançado.' },
  { slug: 'connecta-o-que-e', title: 'O que é a plataforma CONNECTA', description: 'Rede de fornecedores homologados.' },
  { slug: 'engage-o-que-e', title: 'O que é a plataforma ENGAGE', description: 'CRM e qualificação de leads.' },
  { slug: 'finx-o-que-e', title: 'O que é a plataforma FINX', description: 'Gestão financeira internacional.' },
  { slug: 'labs-o-que-e', title: 'O que é a plataforma LABS', description: 'Laboratório de inovação da OLV.' },
  { slug: 'ventures-o-que-e', title: 'O que é a plataforma VENTURES', description: 'Investimentos e novos negócios.' },
  { slug: 'veritus-o-que-e', title: 'O que é a plataforma VERITUS', description: 'Compliance e due diligence.' },
  { slug: 'core-o-que-e', title: 'O que é a plataforma OLV CORE', description: 'Cockpit central de dados e IA.' },
  { slug: 'academy-o-que-e', title: 'O que é a plataforma OLV ACADEMY', description: 'Capacitação e formação técnica.' },
];

topics.forEach((t) => {
  const filePath = path.join(contentDir, `${t.slug}.md`);
  if (fs.existsSync(filePath)) return; // não sobrescreve existentes
  fs.writeFileSync(filePath, makeMarkdown(t));
  console.log(`Created ${filePath}`);
}); 