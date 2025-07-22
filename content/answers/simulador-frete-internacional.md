---
title: Como usar o Simulador de Frete Internacional OLV
slug: simulador-frete-internacional
description: >-
  Guia de uso do simulador de frete internacional (versão light) da plataforma
  OLV para importação e exportação.
mainQuestion: Como funciona o simulador de frete internacional da OLV?
faqs:
  - q: Como funciona o simulador de frete internacional da OLV?
    a: >-
      Basta informar origem, destino, tipo de carga e peso/volume; o sistema
      devolve faixas de frete em tempo real com base em cotações de armadores e
      tabelas locais.
updated: '2025-06-27'
keywords: 'usar, o, simulador, frete, internacional, olv'
---

## Resposta rápida

O **Simulador de Frete Internacional OLV** calcula, em segundos, uma estimativa de frete marítimo (FCL/LCL) ou aéreo para mais de **2 600 portos e aeroportos**. Os valores vêm de três fontes:

1. **Tabelas spot** de armadores (MSC, Maersk, CMA-CGM) atualizadas toda segunda-feira.
2. **Feeds FIATA/IATA** (frete aéreo) com variação semanal.
3. **Banco interno de cotações OLV** (20k+ registros históricos) ponderado por sazonalidade.

O algoritmo pondera tarifa base, BAF, CAF e adicionais como **ISPS, THC, IMO e ETS-UE** (para rotas Europa 2024).

---

### Passo a passo de utilização

1. **Selecione modal** – Marítimo (FCL/LCL) ou Aéreo.
2. **Defina origem e destino** – Busque por cidade/porto; o autocomplete usa banco UN/LOCODE.
3. **Informe carga** – Peso bruto (kg) e volume (m³). Para FCL, escolha container (20', 40', HC, Reefer).
4. **Escolha serviço** – Port-to-Port, Door-to-Port ou Door-to-Door.
5. **Clique em "Calcular"** – Em ~1,5 s, o simulador retorna:
   • Tarifa **mínima, média e máxima** (R$)
   • **ETA** base (dias de trânsito)
   • Breakdown de adicionais (BAF, THC, etc.)
6. **Exportar** – Baixe PDF ou XLS com a simulação (incluso no plano gratuito).

> Os valores são indicativos; use a função **"Solicitar cotação vinculante"** para receber oferta firmada do armador ou agente.

---

### Mini-FAQ

| Pergunta | Resposta breve |
| --- | --- |
| A simulação inclui seguro? | Não; seguro internacional é calculado à parte (0,45 % FOB médio). |
| Posso simular cargas IMO classe 1? | Apenas na versão premium; a versão light bloqueia classes 1, 6.2 e 7. |
| Qual a frequência de atualização dos preços? | Semanal para spot, diária para feeds FIATA/IATA. |

---

### Fontes de dados

* FIATA Review Freight Rate Report (mai 2024)
* IATA TACT Air Cargo Rates (jul 2024)
* Tabelas públicas armadores MSC 2024-07-01
* Histórico de cotações OLV (2019-2024)

> Dados e metodologia auditados pelo OLV Labs em julho 2024. 
