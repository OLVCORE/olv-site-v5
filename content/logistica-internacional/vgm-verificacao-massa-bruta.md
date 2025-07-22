---
title: VGM – Verificação da Massa Bruta Bruta do contêiner
slug: vgm-verificacao-massa-bruta
description: Regras da SOLAS para VGM, métodos de pesagem e prazos de envio aos armadores.
mainQuestion: Como calcular e transmitir o VGM do contêiner para a companhia marítima?
keywords: 'VGM, SOLAS, pesagem, contêiner, exportação'
updated: '2025-07-02'
faqs:
  - q: Quais métodos de pesagem são aceitos?
    a: >-
      Método 1 (pesagem do contêiner cheio) ou Método 2 (somar tara + peso da carga verificada).
  - q: Prazo para informar o VGM?
    a: >-
      Normalmente até 24 h antes do cut-off físico; varia por terminal.
---

## Resposta rápida

**VGM (Verified Gross Mass)** é o peso bruto verificado do contêiner exigido pela **Convenção SOLAS** desde 2016. Sem VGM transmitido, o terminal bloqueia o gate-in.

---

### 1. Métodos de pesagem

| Método   | Como funciona                                       | Requisitos                                                                                  |
| -------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Método 1 | Pesagem do contêiner carregado em balança calibrada | Certificado Inmetro classe III                                                              |
| Método 2 | Soma tara + peso de cada item embalado              | Exportador deve possuir **Sistema de Gestão ISO 9001** ou equivalente validado pelo armador |

### 2. Fórmula (Método 2)

```
VGM = Tara (kg) + Σ (Peso mercadoria + dunnage + pallets)
```

### 3. Prazos e canais de envio

| Armadora | Deadline                     | Canal                             |
| -------- | ---------------------------- | --------------------------------- |
| Maersk   | 24 h antes do cut-off físico | Portal **Maersk Shipment** ou EDI |
| MSC      | 12 h antes                   | INTTRA / EDI                      |
| CMA CGM  | 24 h antes                   | VGM webform                       |

### 4. Penalidades por VGM incorreto

| Desvio          | Ação no terminal      | Custo                  |
| --------------- | --------------------- | ---------------------- |
| > 500 kg ou 5 % | Repesagem obrigatória | BRL 450 + demora       |
| Ausente         | Gate-in bloqueado     | Truck standby + diária |

### 5. Boas práticas

• Balanças calibradas a cada 6 meses (IBAMA portarias).  
• Incluir **ID da balança** e número do lacre no arquivo VGM.  
• Validar tara no portal da armadora (base de dados tare weight ISO 6346).

---

## Perguntas frequentes adicionais

1. **É obrigatório assinar digitalmente?** SIM conforme Resolução ANTAQ 29/2022.
2. **Carga IMO precisa VGM diferente?** Não, mas desvio aceito é menor (±300 kg).

---

> Última revisão: Julho 2025.
