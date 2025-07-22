# GOVERNANÇA OLV – Operação Blindada

## Fluxo de trabalho institucional

1. Todas as alterações são feitas via sugestões do AI no Cursor.
2. O usuário só precisa clicar em "Apply" e depois commitar/pushar.
3. Áreas blindadas (components, styles, public, layouts) não podem ser alteradas sem checklist e autorização.
4. Commits e pushes só são permitidos se o pré-commit e o script de integridade aprovarem.
5. Nunca versionar node_modules, arquivos grandes, binários ou sensíveis.
6. Sempre manter o .gitignore atualizado.
7. Após cada ciclo importante, criar tag de snapshot: `git tag -a vX.Y-blindagem -m "Operação Blindada snapshot"`

## Áreas protegidas

- components/
- styles/
- public/
- layouts/

## Dúvidas? Consulte o AI ou este arquivo antes de qualquer alteração. 