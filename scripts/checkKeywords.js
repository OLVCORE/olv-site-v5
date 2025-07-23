const fs = require('fs');
const path = require('path');

// Minimal set of blindadas to assert presence
const requiredKeywords = [
  'Consultoria em exportação',
  'Consultoria em importação',
  'Exportação de produtos',
  'Logística internacional',
  '3PL',
  '4PL',
];

function main() {
  const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    console.error('⚠️  Não foi possível localizar src/app/layout.tsx');
    process.exit(1);
  }
  const content = fs.readFileSync(layoutPath, 'utf8');
  const missing = requiredKeywords.filter((kw) => !content.includes(kw));

  if (missing.length) {
    console.error('❌ Palavras-chave ausentes em src/app/layout.tsx:', missing);
    process.exit(1);
  }

  console.log('✅ Verificação de palavras-chave concluída com sucesso.');
}

if (require.main === module) {
  main();
} 