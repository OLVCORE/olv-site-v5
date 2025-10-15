# Configuração de Email no Vercel - Formulário de Contato

## Problema
Os emails do formulário de contato não estão chegando em `consultores@olvinternacional.com.br`

## Causa
As variáveis de ambiente de email não estão configuradas no Vercel.

---

## ✅ Solução: Configurar Variáveis de Ambiente no Vercel

### Passo 1: Acessar o Vercel Dashboard

1. Acesse: https://vercel.com
2. Faça login na conta da OLV Internacional
3. Clique no projeto: **olv-site-v5**

### Passo 2: Configurar Variáveis de Ambiente

1. No projeto, clique em **Settings** (⚙️)
2. No menu lateral, clique em **Environment Variables**
3. Adicione as seguintes variáveis:

#### Variáveis Necessárias:

```
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_USER=consultores@olvinternacional.com.br
EMAIL_PASS=[sua-senha-do-email]
```

**⚠️ IMPORTANTE**: Substitua `[sua-senha-do-email]` pela senha real da conta de email.

### Passo 3: Aplicar para Todos os Ambientes

Para cada variável, selecione:
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

### Passo 4: Salvar

Clique em **Save** para cada variável adicionada.

---

## 🔄 Passo 5: Fazer Redeploy

Após configurar as variáveis, é necessário fazer um novo deploy:

### Opção 1: Redeploy Automático
1. Vá em **Deployments**
2. Clique nos três pontos (...) do último deployment
3. Clique em **Redeploy**

### Opção 2: Novo Commit (Recomendado)
As variáveis já serão aplicadas no próximo deploy automático.

---

## 🧪 Como Testar

Após configurar as variáveis e fazer o redeploy:

1. Acesse: https://olvinternacional.com.br/contato
2. Preencha o formulário:
   - Nome: Teste
   - Empresa: Empresa Teste
   - Email: seu-email@teste.com
   - Telefone: (11) 99999-9999
   - Departamento: **Projetos** ou **Atendimento**
   - Assunto: Qualquer opção
   - Mensagem: "Teste de formulário"
   - ✓ Marcar termos

3. Clique em "Enviar Mensagem"
4. Modal de sucesso deve aparecer
5. **Verificar inbox**: consultores@olvinternacional.com.br
6. Email deve chegar em até 1 minuto

---

## 📧 Formato do Email Recebido

O email chegará com:

**Assunto**: `Nova Mensagem - Projetos - [Categoria]`

**Remetente**: `OLV Internacional <consultores@olvinternacional.com.br>`

**Conteúdo**: HTML formatado com todos os dados do formulário

---

## 🔍 Troubleshooting

### Email não chega após configurar

1. **Verificar variáveis no Vercel**:
   - Settings > Environment Variables
   - Confirmar que todas as 4 variáveis estão configuradas
   - Verificar se não há espaços extras nos valores

2. **Verificar logs do Vercel**:
   - Deployments > Ver último deployment
   - Procurar por erros no log de build/runtime
   - Procurar por "EMAIL_HOST not set" ou "Email send error"

3. **Verificar pasta de spam**:
   - Emails podem cair no spam na primeira vez
   - Marcar como "Não é spam" para futuros emails

4. **Testar credenciais SMTP**:
   - Verificar se o usuário e senha estão corretos
   - Testar login manual no webmail: https://webmail.hostinger.com

### Erro "EMAIL_HOST not set"

Significa que as variáveis não foram carregadas:
- Fazer redeploy após configurar as variáveis
- Aguardar alguns minutos para propagar

### Email chega mas formatação errada

Isso não deveria acontecer, mas se acontecer:
- Verificar se o código está na versão mais recente
- O template HTML está em `src/app/api/contact/route.ts`

---

## 📝 Informações Técnicas

### Servidor SMTP Usado
- **Host**: smtp.hostinger.com
- **Porta**: 465 (SSL/TLS)
- **Segurança**: SSL ativado
- **Autenticação**: Necessária

### Bibliotecas
- **nodemailer** v6.10.1 (já instalado)
- Configurado em: `src/app/api/contact/route.ts`

### Fluxo
1. Usuário preenche formulário → 
2. Frontend envia POST para `/api/contact` →
3. API valida dados →
4. Nodemailer conecta ao SMTP →
5. Email é enviado →
6. Resposta de sucesso retorna ao frontend →
7. Modal aparece

---

## ⚙️ Alternativa: Usar Gmail SMTP

Se preferir usar Gmail em vez de Hostinger:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=[senha-de-app-do-gmail]
```

**⚠️ IMPORTANTE**: No Gmail, você precisa criar uma "Senha de App":
1. Acessar: https://myaccount.google.com/security
2. Ativar verificação em 2 etapas
3. Criar senha de app para "Email"
4. Usar essa senha gerada no `EMAIL_PASS`

---

## ✅ Checklist de Configuração

- [ ] Acessar Vercel Dashboard
- [ ] Ir em Settings > Environment Variables
- [ ] Adicionar `EMAIL_HOST`
- [ ] Adicionar `EMAIL_PORT`
- [ ] Adicionar `EMAIL_USER`
- [ ] Adicionar `EMAIL_PASS`
- [ ] Selecionar todos os ambientes (Production, Preview, Development)
- [ ] Salvar todas as variáveis
- [ ] Fazer redeploy do projeto
- [ ] Testar formulário em produção
- [ ] Verificar recebimento do email
- [ ] Marcar email como "Não é spam" se necessário

---

## 🎯 Resultado Esperado

Após a configuração correta:
✅ Formulário funciona perfeitamente
✅ Emails chegam em menos de 1 minuto
✅ Formato profissional e organizado
✅ Todas as informações completas
✅ Departamento identificado claramente

---

**Data**: 15/10/2025
**Status**: Aguardando configuração das variáveis no Vercel
**Prioridade**: ALTA - Formulário não funcional sem essas configurações

