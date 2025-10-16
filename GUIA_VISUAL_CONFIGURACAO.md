# 📧 Guia Visual - Configuração do Email em 5 Passos

**Tempo estimado**: 5 minutos  
**Dificuldade**: Fácil  

---

## 🎯 O QUE VOCÊ VAI FAZER

Configurar as credenciais de email para que o formulário de contato envie mensagens para `consultores@olvinternacional.com.br`

---

## 📝 PASSO 1: Criar arquivo de configuração

### Windows (PowerShell):
```powershell
# Copiar o template
Copy-Item .env.example .env.local
```

### Mac/Linux (Terminal):
```bash
# Copiar o template
cp .env.example .env.local
```

### Ou manualmente:
1. Abra o explorador de arquivos
2. Navegue até a raiz do projeto: `C:\Projects\olv-site-v5`
3. Crie um novo arquivo chamado `.env.local`
4. Abra o arquivo no editor de texto

---

## 🔑 PASSO 2: Adicionar credenciais

Cole este conteúdo no arquivo `.env.local`:

```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_USER=consultores@olvinternacional.com.br
EMAIL_PASS=COLE_A_SENHA_AQUI
```

**Atenção**: Substitua `COLE_A_SENHA_AQUI` pela senha real!

---

## 🔐 PASSO 3: Obter a senha do email

### Opção A - Testar no Webmail:

```
1. Abra: https://webmail.hostinger.com
   
2. Tente fazer login:
   ┌─────────────────────────────────────────┐
   │ Email: consultores@olvinternacional... │
   │ Senha: [digite a senha]                 │
   │ [Entrar]                                │
   └─────────────────────────────────────────┘
   
3. Se conseguiu entrar → Use essa senha no .env.local
   
4. Se NÃO conseguiu → Vá para Opção B
```

### Opção B - Resetar no Painel Hostinger:

```
1. Abra: https://hpanel.hostinger.com

2. Faça login com conta da OLV Internacional

3. Navegue:
   Home → E-mails → Gerenciar
   
4. Encontre: consultores@olvinternacional.com.br
   
5. Clique em: "Alterar senha" ou "Redefinir senha"
   
6. Digite uma nova senha segura
   
7. Salve e use essa senha no .env.local
```

---

## 💾 PASSO 4: Salvar e reiniciar

### A. Salvar o arquivo .env.local

No editor de texto:
```
Arquivo → Salvar (Ctrl+S)
```

**Verifique** que o arquivo está assim:
```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_USER=consultores@olvinternacional.com.br
EMAIL_PASS=sua_senha_real_aqui
```

### B. Reiniciar o servidor de desenvolvimento

No terminal onde está rodando `npm run dev`:

```
1. Parar o servidor:
   Pressione: Ctrl+C
   
2. Iniciar novamente:
   npm run dev
   
3. Aguarde a mensagem:
   ✓ Ready in X.Xs
   ✓ Local: http://localhost:3999
```

---

## ✅ PASSO 5: Testar a configuração

### Opção A - Teste Automático (Recomendado):

Abra um NOVO terminal e execute:

```bash
npm run test:email
```

**Você verá**:

```
==========================================================
TESTE DE CONFIGURAÇÃO DE EMAIL
==========================================================

1. Verificando variáveis de ambiente...
  ✓ EMAIL_HOST: smtp.hostinger.com
  ✓ EMAIL_PORT: 465
  ✓ EMAIL_USER: consultores@olvinternacional.com.br
  ✓ EMAIL_PASS: ********************

✅ Todas as variáveis estão configuradas!

2. Criando transporter do Nodemailer...
  ✓ Transporter criado com sucesso

3. Testando conexão SMTP...
  ✓ Conexão SMTP verificada com sucesso!

4. Enviando email de teste...
  ✓ Email de teste enviado com sucesso!

✅ TUDO FUNCIONANDO PERFEITAMENTE!
```

### Opção B - Teste Manual no Navegador:

1. **Abrir página**:
   ```
   http://localhost:3999/contato
   ```

2. **Preencher formulário**:
   ```
   Nome: João Silva
   Empresa: Empresa Teste
   Email: seu-email@teste.com
   Telefone: (11) 99999-9999
   Departamento: Projetos
   Assunto: Contato Comercial
   Mensagem: Teste de formulário
   ✓ Concordo com os termos
   ```

3. **Enviar**:
   - Clique em "Enviar Mensagem"
   - Botão mostrará "Enviando..."
   - Aguarde o modal de sucesso aparecer

4. **Verificar email**:
   - Abra: https://webmail.hostinger.com
   - Login: consultores@olvinternacional.com.br
   - Verifique a caixa de entrada
   - Procure por: "Nova Mensagem - Projetos"

---

## 🎉 SUCESSO!

Se o email chegou, **PARABÉNS!** Desenvolvimento local está funcionando!

---

## 🌐 CONFIGURAR PRODUÇÃO (VERCEL)

Agora que funcionou localmente, configure no Vercel:

### Passo 1: Acessar Vercel

```
1. Abra: https://vercel.com
2. Faça login
3. Selecione projeto: olv-site-v5
```

### Passo 2: Ir para Environment Variables

```
1. Clique em: Settings (⚙️)
2. Menu lateral: Environment Variables
3. Você verá uma página assim:

   ┌───────────────────────────────────────┐
   │ Environment Variables                 │
   ├───────────────────────────────────────┤
   │ [+ Add New]                           │
   │                                       │
   │ Key          Value          Env       │
   │ ───          ─────          ───       │
   │ (vazio)                               │
   └───────────────────────────────────────┘
```

### Passo 3: Adicionar Variáveis

**Clique em "+ Add New" e preencha 4 vezes**:

#### Variável 1:
```
Key: EMAIL_HOST
Value: smtp.hostinger.com
Environments: 
  ☑️ Production
  ☑️ Preview
  ☑️ Development
[Save]
```

#### Variável 2:
```
Key: EMAIL_PORT
Value: 465
Environments: 
  ☑️ Production
  ☑️ Preview
  ☑️ Development
[Save]
```

#### Variável 3:
```
Key: EMAIL_USER
Value: consultores@olvinternacional.com.br
Environments: 
  ☑️ Production
  ☑️ Preview
  ☑️ Development
[Save]
```

#### Variável 4:
```
Key: EMAIL_PASS
Value: [MESMA SENHA DO .env.local]
Environments: 
  ☑️ Production
  ☑️ Preview
  ☑️ Development
[Save]
```

### Passo 4: Fazer Redeploy

```
1. Vá em: Deployments (aba superior)

2. Veja o último deployment (topo da lista)

3. Clique nos 3 pontos (...) ao lado

4. Clique em: Redeploy

5. Confirme: Redeploy

6. Aguarde (2-3 minutos)

7. Status mudará para: Ready ✓
```

### Passo 5: Testar em Produção

```
1. Abra: https://olvinternacional.com.br/contato

2. Preencha o formulário (dados reais)

3. Envie

4. Aguarde modal de sucesso

5. Verifique email em: consultores@olvinternacional.com.br

6. Email deve chegar em até 1 minuto
```

---

## 🆘 SE ALGO DER ERRADO

### ❌ Erro: "EMAIL_HOST not set"

**Causa**: Arquivo .env.local não existe ou servidor não reiniciou

**Solução**:
```bash
# 1. Verificar se arquivo existe
ls .env.local

# 2. Se não existir, criar
cp .env.example .env.local

# 3. Reiniciar servidor
# (Ctrl+C e depois npm run dev)
```

### ❌ Erro: "Authentication failed"

**Causa**: Senha incorreta

**Solução**:
```
1. Testar login em: https://webmail.hostinger.com
2. Se não conseguir logar = senha errada
3. Resetar senha no painel Hostinger
4. Atualizar .env.local com nova senha
5. Reiniciar servidor
```

### ❌ Erro: "SMTP connection failed"

**Causa**: Firewall ou porta bloqueada

**Solução**:
```
1. Verificar antivírus/firewall
2. Desabilitar temporariamente
3. Tentar novamente
4. Se funcionar, adicionar exceção para porta 465
```

### ❌ Email não chega (mas sem erro)

**Causa**: Email na pasta SPAM

**Solução**:
```
1. Abrir webmail
2. Verificar pasta SPAM/Lixo Eletrônico
3. Procurar por "Nova Mensagem"
4. Marcar como "Não é spam"
5. Próximos emails chegarão na caixa de entrada
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

Se precisar de mais detalhes:

- **`INSTRUCOES_CONFIGURACAO_EMAIL.md`** - Instruções detalhadas
- **`DIAGNOSTICO_FORMULARIO_CONTATO.md`** - Análise técnica completa
- **`RESUMO_DIAGNOSTICO_EMAIL.md`** - Resumo executivo
- **`.env.example`** - Template de configuração

---

## 💪 COMANDOS ÚTEIS

```bash
# Testar email
npm run test:email

# Iniciar servidor
npm run dev

# Ver logs
# (aparecem no terminal onde rodou npm run dev)
```

---

## ✨ DICAS FINAIS

1. **Guarde a senha em segurança** (gerenciador de senhas)
2. **Não commite o arquivo .env.local** (já está no .gitignore)
3. **Use a mesma senha** em .env.local e Vercel
4. **Sempre reinicie o servidor** após editar .env.local
5. **Verifique SPAM** no primeiro teste

---

## 🎊 PRONTO!

Após seguir este guia:

✅ Formulário funcionará localmente  
✅ Formulário funcionará em produção  
✅ Emails chegarão em consultores@olvinternacional.com.br  
✅ Sistema totalmente operacional  

---

**Criado por**: AI Assistant  
**Data**: 16 de outubro de 2025  
**Versão**: 1.0  
**Status**: Pronto para uso ✅

