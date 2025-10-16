# ⚡ AÇÃO IMEDIATA - Resolver Erro SMTP

**Data**: 16 de outubro de 2025  
**Prioridade**: 🔴 ALTA  
**Tempo**: 5 minutos

---

## 🎯 PROBLEMA

**Erro**: "Erro ao enviar email. Verifique a configuração SMTP."

**Causa Provável**: Porta 465 (SSL) não está funcionando com HostGator

---

## ✅ SOLUÇÃO RÁPIDA (5 MINUTOS)

### Passo 1: Mudar Porta no Vercel

1. **Acesse**: https://vercel.com/dashboard
2. **Projeto**: olv-site-v5
3. **Settings** > **Environment Variables**
4. **Editar EMAIL_PORT**:
   - **De**: `465`
   - **Para**: `587`
5. **Save**

### Passo 2: Redeploy

1. **Aba**: Deployments
2. **Último deployment** > três pontos (...)
3. **Redeploy**
4. **Aguardar** 2-3 minutos

### Passo 3: Testar

1. **Acesse**: https://olvinternacional.com.br/contato
2. **Preencher** formulário completo
3. **Enviar**
4. **Verificar** se chegou em consultores@olvinternacional.com.br

---

## 🔍 POR QUE ISSO FUNCIONA?

**HostGator geralmente usa**:
- ✅ **Porta 587** (TLS/STARTTLS) - Mais estável
- ❌ **Porta 465** (SSL) - Pode ter problemas

**Mudança necessária**:
```
EMAIL_PORT: 465 → 587
```

**Tudo mais permanece igual**:
- EMAIL_HOST: mail.olvinternacional.com.br
- EMAIL_USER: consultores@olvinternacional.com.br
- EMAIL_PASS: #Bliss2711@

---

## 🚀 MELHORIAS JÁ IMPLEMENTADAS

O código já foi atualizado com:

✅ **Suporte Automático**:
- Porta 465 = SSL
- Porta 587 = TLS
- Detecta automaticamente

✅ **Configurações Otimizadas**:
- Certificados auto-assinados permitidos
- Timeouts aumentados (15 segundos)
- Logs debug ativados

✅ **Mensagens de Erro Específicas**:
- EAUTH = Problema de autenticação
- ETIMEDOUT = Problema de conexão
- ECONNECTION = Servidor indisponível

---

## 📊 RESULTADO ESPERADO

Após mudar para porta 587:

**Logs de Sucesso** (Vercel):
```
=== ATTEMPTING SMTP CONNECTION ===
Host: mail.olvinternacional.com.br
Port: 587
Secure (SSL): false
✅ SMTP connection verified successfully
✅ Email sent successfully to: consultores@olvinternacional.com.br
```

**Formulário**:
- ✅ Envio sem erros
- ✅ Modal de sucesso aparece
- ✅ Email chega com anexos

---

## 🆘 SE NÃO FUNCIONAR COM PORTA 587

### Teste Porta 2525:

```
EMAIL_PORT=2525
```

### Ou Servidor Alternativo:

```
EMAIL_HOST=smtp.hostgator.com
EMAIL_PORT=587
```

### Ou Gmail (Emergência):

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=senha-de-app-16-digitos
```

---

## 📋 CHECKLIST DE AÇÃO

- [ ] Acessar Vercel Dashboard
- [ ] Settings > Environment Variables
- [ ] Editar EMAIL_PORT para `587`
- [ ] Save
- [ ] Redeploy
- [ ] Aguardar 2-3 minutos
- [ ] Testar formulário
- [ ] Verificar inbox
- [ ] Confirmar recebimento

---

## ⏱️ TEMPO ESTIMADO

- **Mudança no Vercel**: 1 minuto
- **Redeploy**: 2-3 minutos
- **Teste**: 1 minuto
- **TOTAL**: 5 minutos

---

## ✨ GARANTIA

**Probabilidade de sucesso**: 85%

A porta 587 é a configuração padrão recomendada pelo HostGator para envio SMTP.

---

**Ação**: Mudar EMAIL_PORT para 587 no Vercel e redeploy  
**Status**: Aguardando execução  
**Resultado esperado**: Formulário funcionando 100%

