---
title: Como usar o Simulador de Impostos de Importação OLV
slug: simulador-tax-importacao
description: >-
  Manual rápido para calcular II, IPI, PIS/COFINS e ICMS com o simulador
  tributário (versão light) da OLV.
mainQuestion: Como funciona o simulador de impostos de importação da OLV?
faqs:
  - q: Como funciona o simulador de impostos de importação da OLV?
    a: >-
      Com NCM, origem, estado de destino e valor FOB, o sistema calcula todos os
      impostos de importação e gera planilha detalhada.
updated: '2025-06-27'
keywords: 'usar, o, simulador, impostos, importação, olv'
---

## Resposta rápida

O **Simulador Tributário Light** utiliza a **TEC 2024**, tabela TIPI e convênios ICMS para estimar a carga tributária de importação. Basta:

1. Informar **NCM** (8 dígitos) – autocomplete com filtro.
2. Selecionar **país de origem** – determina acordos (Mercosul, ACEs, GSP). A plataforma aplica reduções de Tarifa Externa Comum.
3. Definir **estado de destino** – carrega alíquota ICMS interna e eventuais incentivos (ex.: Reintegra BA 3 %).
4. Inserir **FOB, frete e seguro** (USD) – conversão automática PTAX.
5. Clicar em **"Calcular"** – retorno em < 2 s.

Resultado exibido:

| Imposto | Base de cálculo | Valor (R$) |
|---------|-----------------|------------|
| II | Valor Aduaneiro | 0 a 20 % |
| IPI | VA + II | 0 a 15 % |
| PIS | VA + II + IPI | 2,1 % |
| COFINS | VA + II + IPI | 9,65 % |
| ICMS | fórmula própria | 4–20 % |

Um **gráfico de pizza** mostra a participação de cada tributo.

---

### Fórmula ICMS aplicada

`Base = (VA + II + IPI + PIS + COFINS + Outras) ÷ (1 − alíq_ICMS)`  
`ICMS = Base × alíq_ICMS`

A fórmula segue o art. 13, §1º, VI, LC 87/1996 (Lei Kandir) e Ajuste SINIEF 12/21.

---

### Mini-FAQ

| Pergunta | Resposta breve |
| --- | --- |
| O simulador considera AFRMM? | Sim; se modal = marítimo, AFRMM 8 % sobre frete integra VA. |
| Há opção de Drawback? | Na versão light, não. A versão premium permite marcar suspensão PIS/COFINS e II. |
| Posso exportar para Excel? | Sim, botão "Exportar XLS" gera planilha com todas as fórmulas. |

---

### Fontes oficiais

* TEC 2024 (Portaria ME 791/2023)
* TIPI 2024 (Decreto 11.158/2022)
* Convênio ICMS 105/2023 – Alíquotas internas atualizadas
* Manual de Importação Siscomex (jul 2024)

> Cálculos validados pela equipe fiscal da OLV Internacional em julho 2024. 
