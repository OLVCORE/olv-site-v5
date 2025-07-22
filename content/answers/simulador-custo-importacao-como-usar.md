---
title: Como usar o simulador de custo de importação
slug: simulador-custo-importacao-como-usar
description: Passo a passo na plataforma OLV.
mainQuestion: Como usar o simulador de custo de importação?
faqs:
  - q: Como usar o simulador de custo de importação?
    a: >-
      Insira NCM, origem, destino, FOB e clique em Calcular; o simulador gera em
      30 s o custo total com tributos, frete e AFRMM e permite exportar
      PDF/Excel.
updated: '2025-06-27'
keywords: 'usar, o, simulador, custo, importação'
---

## Resposta rápida

O **Simulador de Custo de Importação OLV** calcula impostos, frete, AFRMM e despesas portuárias para qualquer NCM em menos de 30 s. Basta informar **NCM, país de origem, estado de destino, valor FOB e modalidade de frete**.

### Campos de entrada e lógica de cálculo

| Campo | Fonte de dados | O que faz | Observação |
| --- | --- | --- | --- |
| NCM (8 dígitos) | TEC + TIPI | Puxa alíquotas de II e IPI | Atualização trimestral |
| País de origem | OMC | Verifica acordos (ACE 59, Mercosul) | Ajusta II conforme preferencial |
| Estado destino | Tabela ICMS 2024 | Calcula ICMS por dentro | SP 18 %, SC 17 %, etc. |
| Valor FOB | Usuário | Base de todos tributos | USD ou EUR |
| Frete estimado | API Freightos | Soma ao VA | Pode editar manualmente |
| Seguro (%) | 0,8 % default | Inclui no VA | Editável |

### Passo a passo

1. **Acesse** menu "Simuladores → Custo de Importação".  
2. **Selecione NCM**: digite os 4 primeiros dígitos e escolha na lista.  
3. **Informe** FOB (USD), origem e estado destino.  
4. **Clique "Calcular"**: em até 2 s exibe tabela detalhada.  
5. **Baixe** PDF ou Excel para anexar no orçamento.  
6. **Ajuste cenários** alterando frete, modalidade (FOB/CIF) ou quantidade.

### Exemplo rápido

Produto **NCM 8471.30.12** (notebook), FOB US$ 500, origem China, destino SP:  
• II 0 %, IPI 0 %, PIS/COFINS 11,75 %, ICMS 18 %  
• Custo tributário total: **US$ 134** (26,8 % sobre FOB).  
PDF gerado em 3 páginas com memória de cálculo.

### Mini-FAQ

| Pergunta | Resposta breve |
| --- | --- |
| Posso salvar projetos? | Sim, usuários logados salvam até 50 cenários. |
| Cobre regimes especiais? | Versão Premium inclui Drawback e Ex-Tarifário. |
| A base de ICMS é atualizada? | Sim, todo 1º útil via API Confaz. |

---

### FAQ relacionado

| Pergunta | Resposta breve |
| --- | --- |
| O simulador atualiza câmbio automaticamente? | Sim, usa PTAX de fechamento diária ou TRM caso selecione COP. |
| Posso exportar os cálculos em JSON via API? | Sim, endpoint `/api/report-download?format=json` requer token Premium. |
| Aceita NCM de 10 dígitos? | Aceita 8 ou 10 dígitos; se 10, aplica alíquota do destaque, senão usa 8 dígitos TEC. |

---

> Conteúdo auditado pelo OLV Labs, julho 2024.
