# Instruções Rápidas - Configuração de Email do Formulário

## Problema Identificado

Os emails do formulário de contato não estão chegando porque **as variáveis de ambiente não estão configuradas**.

---

## Solução Rápida (5 minutos)

### 1. Criar arquivo .env.local

Na raiz do projeto, copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

Ou crie manualmente o arquivo `.env.local` com o seguinte conteúdo:

```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_USER=consultores@olvinternacional.com.br
EMAIL_PASS=SUBSTITUA_PELA_SENHA_REAL
```

### 2. Obter a senha do email

**Opção A - Webmail Hostinger**:
1. Acesse: https://webmail.hostinger.com
2. Tente fazer login com: `consultores@olvinternacional.com.br`
3. Se conseguir logar, use essa mesma senha no `.env.local`

**Opção B - Painel Hostinger**:
1. Acesse: https://hpanel.hostinger.com
2. Login com credenciais da OLV
3. E-mails > Gerenciar
4. Encontre: `consultores@olvinternacional.com.br`
5. Copie ou redefina a senha

### 3. Editar .env.local

Abra o arquivo `.env.local` e substitua `SUBSTITUA_PELA_SENHA_REAL` pela senha verdadeira:

```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_USER=consultores@olvinternacional.com.br
EMAIL_PASS=sua_senha_aqui
```

### 4. Reiniciar o servidor

```bash
# Parar o servidor (Ctrl+C)
npm run dev
```

### 5. Testar

**Opção A - Script de teste automático**:
```bash
npm run test:email
```

Se tudo estiver correto, você verá:
```
✅ TUDO FUNCIONANDO PERFEITAMENTE!
```

**Opção B - Testar no navegador**:
1. Abrir: http://localhost:3999/contato
2. Preencher todos os campos
3. Enviar formulário
4. Verificar inbox: consultores@olvinternacional.com.br

---

## Configurar em Produção (Vercel)

### 1. Acessar Vercel

1. https://vercel.com (fazer login)
2. Selecionar projeto: **olv-site-v5**
3. Settings > Environment Variables

### 2. Adicionar variáveis

Adicione **4 variáveis** (copie e cole):

**Variável 1**:
- Key: `EMAIL_HOST`
- Value: `smtp.hostinger.com`
- Environments: ☑️ Production, ☑️ Preview, ☑️ Development

**Variável 2**:
- Key: `EMAIL_PORT`
- Value: `465`
- Environments: ☑️ Production, ☑️ Preview, ☑️ Development

**Variável 3**:
- Key: `EMAIL_USER`
- Value: `consultores@olvinternacional.com.br`
- Environments: ☑️ Production, ☑️ Preview, ☑️ Development

**Variável 4**:
- Key: `EMAIL_PASS`
- Value: `[SENHA REAL DO EMAIL]`
- Environments: ☑️ Production, ☑️ Preview, ☑️ Development

### 3. Fazer Redeploy

**Opção A - Redeploy manual**:
1. Deployments > último deployment
2. Três pontos (...) > Redeploy

**Opção B - Novo commit**:
```bash
git add .
git commit -m "Configurar variáveis de email"
git push origin perf/v5-cirurgico
```

### 4. Testar em Produção

1. Aguardar deploy finalizar (2-3 minutos)
2. Acessar: https://olvinternacional.com.br/contato
3. Enviar formulário de teste
4. Verificar inbox

---

## Verificação Rápida

### Logs esperados ao enviar (sucesso):

```
=== CONTACT FORM SUBMISSION ===
=== DEBUG EMAIL CONFIG ===
EMAIL_HOST: SET
EMAIL_PORT: 465
EMAIL_USER: SET
EMAIL_PASS: SET
SMTP connection verified successfully
Email sent successfully to: consultores@olvinternacional.com.br
✅ EMAIL SENT SUCCESSFULLY!
```

### Se algo der errado:

**Erro: "EMAIL_HOST not set"**
→ Arquivo .env.local não existe ou servidor não foi reiniciado

**Erro: "Authentication failed"**
→ Senha incorreta no EMAIL_PASS

**Erro: "SMTP connection failed"**
→ Firewall bloqueando porta 465 ou servidor SMTP indisponível

---

## Alternativa com Gmail

Se tiver dificuldades com Hostinger, use Gmail:

1. **Criar senha de app**:
   - Acesse: https://myaccount.google.com/security
   - Ative verificação em 2 etapas
   - Senhas de app > Email > Outro > Gerar
   - Copie a senha de 16 dígitos

2. **Configurar .env.local**:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=senha-de-16-digitos-gerada
```

3. **Configurar Vercel** com os mesmos valores

---

## Precisa de Ajuda?

**Documentação completa**: Veja `DIAGNOSTICO_FORMULARIO_CONTATO.md`

**Arquivos relacionados**:
- `.env.example` - Template de configuração
- `src/app/api/contact/route.ts` - API de envio
- `src/components/ContactForm.tsx` - Componente do formulário
- `scripts/testEmail.ts` - Script de teste

**Teste rápido**: `npm run test:email`

---

**Tempo estimado**: 5-10 minutos  
**Prioridade**: CRÍTICA  
**Status atual**: Código OK, falta apenas configurar variáveis

