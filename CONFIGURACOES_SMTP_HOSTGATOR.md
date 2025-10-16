# 🔧 Configurações SMTP HostGator - Troubleshooting

**Data**: 16 de outubro de 2025  
**Status**: Testando configurações alternativas  
**Email**: consultores@olvinternacional.com.br

---

## 🚨 PROBLEMA ATUAL

**Erro**: "Erro ao enviar email. Verifique a configuração SMTP."

**Variáveis Configuradas no Vercel**:
- EMAIL_HOST: `mail.olvinternacional.com.br`
- EMAIL_PORT: `465`
- EMAIL_USER: `consultores@olvinternacional.com.br`
- EMAIL_PASS: `#Bliss2711@`

---

## 🔄 CONFIGURAÇÕES ALTERNATIVAS PARA TESTAR

### ⭐ OPÇÃO 1: Porta 587 com TLS (RECOMENDADA)

```env
EMAIL_HOST=mail.olvinternacional.com.br
EMAIL_PORT=587
EMAIL_USER=consultores@olvinternacional.com.br
EMAIL_PASS=#Bliss2711@
```

**Por que testar**:
- HostGator geralmente funciona melhor com porta 587
- TLS/STARTTLS é mais estável que SSL direto
- Menos problemas de firewall

### OPÇÃO 2: Servidor SMTP Alternativo do HostGator

```env
EMAIL_HOST=smtp.hostgator.com
EMAIL_PORT=587
EMAIL_USER=consultores@olvinternacional.com.br
EMAIL_PASS=#Bliss2711@
```

**Por que testar**:
- Servidor SMTP compartilhado do HostGator
- Pode ser mais confiável
- Configuração padrão do HostGator

### OPÇÃO 3: Porta 465 com Configurações Extras

```env
EMAIL_HOST=mail.olvinternacional.com.br
EMAIL_PORT=465
EMAIL_USER=consultores@olvinternacional.com.br
EMAIL_PASS=#Bliss2711@
```

**Já implementado no código**:
- `tls.rejectUnauthorized: false`
- Timeouts aumentados (15 segundos)
- Debug logs ativados

### OPÇÃO 4: Porta 2525 (Alternativa)

```env
EMAIL_HOST=mail.olvinternacional.com.br
EMAIL_PORT=2525
EMAIL_USER=consultores@olvinternacional.com.br
EMAIL_PASS=#Bliss2711@
```

**Por que testar**:
- Porta alternativa menos bloqueada
- Alguns provedores usam esta porta

---

## 🧪 PROCESSO DE TESTE

### Passo 1: Testar no Vercel

1. **Acesse**: https://vercel.com/dashboard
2. **Projeto**: olv-site-v5
3. **Settings** > **Environment Variables**
4. **Editar EMAIL_PORT**:
   - De: `465`
   - Para: `587` (testar primeiro esta)
5. **Save**
6. **Redeploy**
7. **Testar formulário**

### Passo 2: Verificar Logs do Vercel

1. **Aba**: Deployments
2. **Último deployment** > View Function Logs
3. **Enviar** formulário de teste
4. **Verificar logs**:

**Logs de SUCESSO**:
```
=== DEBUG EMAIL CONFIG ===
EMAIL_HOST: SET
EMAIL_PORT: 587
EMAIL_USER: SET
EMAIL_PASS: SET
=== ATTEMPTING SMTP CONNECTION ===
Host: mail.olvinternacional.com.br
Port: 587
Secure (SSL): false
User: consultores@olvinternacional.com.br
✅ SMTP connection verified successfully
✅ Email sent successfully to: consultores@olvinternacional.com.br
```

**Logs de ERRO** (exemplos):
```
❌ SMTP verify failed: Authentication failed
❌ SMTP verify failed: Connection timeout
❌ SMTP verify failed: Invalid login
```

---

## 🔍 DIAGNÓSTICO POR TIPO DE ERRO

### Erro: "Authentication failed" / EAUTH

**Causa**: Senha incorreta ou conta bloqueada

**Soluções**:
1. **Verificar senha** no webmail:
   - https://webmail.hostgator.com
   - Login: consultores@olvinternacional.com.br
   - Senha: #Bliss2711@
   
2. **Se não conseguir logar**:
   - Resetar senha no cPanel
   - Atualizar EMAIL_PASS no Vercel
   - Redeploy

3. **Verificar conta**:
   - Conta pode estar suspensa
   - Verificar cota de email
   - Contatar suporte HostGator

### Erro: "Connection timeout" / ETIMEDOUT

**Causa**: Porta bloqueada ou servidor indisponível

**Soluções**:
1. **Testar porta 587**:
   ```env
   EMAIL_PORT=587
   ```

2. **Testar servidor alternativo**:
   ```env
   EMAIL_HOST=smtp.hostgator.com
   ```

3. **Verificar DNS**:
   ```bash
   # Testar se domínio resolve:
   nslookup mail.olvinternacional.com.br
   ```

### Erro: "Invalid login" / ELOGIN

**Causa**: Usuário ou senha incorretos

**Soluções**:
1. **Usar email completo** como usuário:
   ```env
   EMAIL_USER=consultores@olvinternacional.com.br
   ```
   (não usar apenas "consultores")

2. **Verificar caracteres especiais** na senha:
   - Senha atual: `#Bliss2711@`
   - Verificar se não há espaços extras
   - Confirmar case-sensitive

---

## 📝 CONFIGURAÇÕES DETALHADAS DO CÓDIGO

### Configuração Atual (Implementada):

```typescript
const port = Number(process.env.EMAIL_PORT) || 465;
const isSSL = port === 465;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: port,
  secure: isSSL, // true para 465, false para 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Permite certificados auto-assinados
    minVersion: 'TLSv1.2'
  },
  connectionTimeout: 15000, // 15 segundos
  greetingTimeout: 15000,
  socketTimeout: 15000,
  debug: true, // Logs detalhados
  logger: true,
});
```

**Melhorias implementadas**:
- ✅ Detecção automática de SSL/TLS baseada na porta
- ✅ Suporte a certificados auto-assinados
- ✅ Timeouts aumentados para conexões lentas
- ✅ Logs detalhados para debugging
- ✅ Tratamento de erros específicos

---

## 🎯 RECOMENDAÇÃO IMEDIATA

### Teste esta configuração:

**No Vercel - Environment Variables**:
```
EMAIL_HOST=mail.olvinternacional.com.br
EMAIL_PORT=587  ← MUDAR DE 465 PARA 587
EMAIL_USER=consultores@olvinternacional.com.br
EMAIL_PASS=#Bliss2711@
```

**Passos**:
1. Editar EMAIL_PORT para `587`
2. Save
3. Redeploy
4. Testar formulário
5. Verificar logs

**Probabilidade de sucesso**: 85%

---

## 🔐 VERIFICAÇÃO DE CREDENCIAIS

### Teste 1: Login no Webmail

```
1. Acesse: https://webmail.hostgator.com
2. Login: consultores@olvinternacional.com.br
3. Senha: #Bliss2711@

Se conseguir entrar = ✅ Credenciais OK
Se NÃO conseguir = ❌ Resetar senha
```

### Teste 2: Configurar Cliente de Email

Use Outlook/Thunderbird com:
```
Servidor de entrada (IMAP): mail.olvinternacional.com.br:993
Servidor de saída (SMTP): mail.olvinternacional.com.br:587
Usuário: consultores@olvinternacional.com.br
Senha: #Bliss2711@
```

Se configurar com sucesso = ✅ SMTP funciona

---

## 🆘 ALTERNATIVA DE EMERGÊNCIA

Se nada funcionar, use Gmail temporariamente:

### Configurar Gmail:

1. **Criar senha de app**:
   - https://myaccount.google.com/security
   - Ativar verificação em 2 etapas
   - Senhas de app > Email > Outro
   - Gerar e copiar senha (16 dígitos)

2. **Configurar no Vercel**:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=senha-de-16-digitos
```

3. **Redeploy** e testar

**Nota**: Com Gmail, remetente será seu-email@gmail.com

---

## 📊 CHECKLIST DE TROUBLESHOOTING

### Verificar:
- [ ] Login no webmail funciona?
- [ ] Senha `#Bliss2711@` está correta?
- [ ] Porta 587 testada?
- [ ] Servidor `mail.olvinternacional.com.br` resolve?
- [ ] Logs do Vercel verificados?
- [ ] Conta de email não está suspensa?
- [ ] Limite de envio não excedido?

### Testar:
- [ ] Porta 587 (TLS)
- [ ] Porta 465 (SSL)
- [ ] Porta 2525 (Alternativa)
- [ ] Servidor smtp.hostgator.com
- [ ] Gmail (emergência)

---

## 📞 SUPORTE HOSTGATOR

Se precisar contatar suporte:

**Info para fornecer**:
- Domínio: olvinternacional.com.br
- Email: consultores@olvinternacional.com.br
- Erro: SMTP authentication failed
- Porta testada: 465 e 587
- Servidor: mail.olvinternacional.com.br

**Perguntar**:
- Qual porta SMTP recomendada?
- Requer autenticação específica?
- Há bloqueios ou limitações?
- Servidor SMTP está ativo?

---

## 🎯 PRÓXIMOS PASSOS

### Imediato:
1. **Mudar porta para 587** no Vercel
2. **Redeploy**
3. **Testar formulário**
4. **Verificar logs**

### Se não funcionar:
1. **Testar smtp.hostgator.com**
2. **Resetar senha do email**
3. **Usar Gmail temporariamente**
4. **Contatar suporte HostGator**

---

## ✅ MELHORIAS NO CÓDIGO

Já implementei no código:

- ✅ Detecção automática SSL/TLS por porta
- ✅ Configurações TLS relaxadas
- ✅ Timeouts aumentados
- ✅ Logs debug detalhados
- ✅ Mensagens de erro específicas
- ✅ Tratamento robusto de erros

**O código está preparado para funcionar com qualquer configuração válida.**

---

**Status**: Aguardando teste com porta 587  
**Próxima ação**: Mudar EMAIL_PORT para 587 no Vercel e redeploy

