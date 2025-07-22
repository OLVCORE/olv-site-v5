 Este roteiro deve ser seguido SEMPRE antes de qualquer alteração, commit, push ou deploy em qualquer projeto do ecossistema OLV.

---

## 🚦 INICIAR OPERAÇÃO BLINDADA

**Etapa:** [Descreva aqui o que deseja fazer: ex: "Testar ingestão de feed", "Ajustar script de ingestão", "Criar novo endpoint API", etc.]

---

### ✅ CHECKLIST DE INTEGRIDADE (antes de qualquer commit ou push):

- [ ] Nenhum arquivo da área BLINDADA foi alterado (`/components`, `/styles`, `/public`, `/app/layout.tsx`, layouts, animações, responsividade, identidade visual)
- [ ] Apenas arquivos autorizados foram modificados (`scripts/*.ts`, `feeds_sources.json`, `vercel.json`, endpoints API)
- [ ] Todos os testes de ingestão, simulação ou navegação foram validados em ambiente de staging/deploy
- [ ] Responsividade e aparência visual permanecem intactas
- [ ] Nenhum asset visual foi removido ou sobrescrito
- [ ] A aparência atual continua sendo a versão "melhor registrada"
- [ ] `.gitignore` está reforçado e atualizado
- [ ] Não há arquivos proibidos no commit (`.env`, `.env.local`, `.next/`, `node_modules/`, `*.log`, `tsconfig.tsbuildinfo`, `out/`, `dist/`, `*.backup`)

---

### 🧾 SNAPSHOT DE PROTEÇÃO (opcional, recomendado antes de mudanças grandes):

```bash
git tag -a vX.Y-blindagem -m "Blindagem confirmada após progresso válido"
git push origin vX.Y-blindagem
```

---

### ⚙️ COMANDOS AUTORIZADOS PARA ESTA OPERAÇÃO:

```bash
# Adicione apenas arquivos fora da área blindada
git add scripts/feeds_sources.json
git add scripts/*.ts
git add vercel.json
git add package.json
git commit -m "feat: [descreva brevemente a alteração autorizada]"
git push origin main
```

---

### 🧪 CHECKLIST DE VALIDAÇÃO PÓS-DEPLOY:

- [ ] Deploy automático no Vercel concluído sem erros
- [ ] Endpoint relevante responde corretamente (ex: `/api/posts?limit=5`)
- [ ] Página do blog (`/blog`) exibe posts normalmente
- [ ] Painel admin (`/admin/ingest-status`) mostra logs de ingestão
- [ ] Supabase: tabela `posts` e `ingest_logs` atualizadas
- [ ] Nenhuma regressão visual ou funcional detectada

---

**⚠️ NUNCA execute scripts ou comandos que alterem partes visuais sem autorização explícita.**  
**⚠️ Sempre consulte a liderança antes de qualquer alteração estrutural.**  
**⚠️ Sempre crie snapshot antes de mudanças grandes.**

---

**Este arquivo é referência permanente para qualquer operação no projeto OLV.** 