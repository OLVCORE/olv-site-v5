# 🔍 Configuração do Google Search Console

## 📋 Passos para Configuração

### 1. Acessar Google Search Console
- Vá para: https://search.google.com/search-console
- Faça login com sua conta Google

### 2. Adicionar Propriedade
- Clique em "Adicionar propriedade"
- Digite: `https://olvinternacional.com.br`
- Selecione "Prefixo de URL"

### 3. Verificar Propriedade
Escolha um dos métodos de verificação:

#### Método 1: Arquivo HTML (Recomendado)
- Baixe o arquivo de verificação fornecido pelo Google
- Faça upload para a pasta `public/` do projeto
- O arquivo será acessível em: `https://olvinternacional.com.br/nome-do-arquivo.html`

#### Método 2: Meta Tag
- Copie a meta tag fornecida pelo Google
- Adicione no arquivo `src/app/layout.tsx` na seção `<head>`
- Exemplo:
```html
<meta name="google-site-verification" content="SEU_CODIGO_AQUI" />
```

### 4. Configurar Sitemap
- Após a verificação, vá para "Sitemaps"
- Adicione: `https://olvinternacional.com.br/sitemap.xml`
- O sitemap já está configurado automaticamente

### 5. Configurar Google Analytics 4
- Vá para: https://analytics.google.com/
- Crie uma nova propriedade para o site
- Copie o Measurement ID (formato: G-XXXXXXXXXX)
- Substitua no arquivo `src/app/layout.tsx`:
```typescript
<GoogleAnalytics measurementId="G-XXXXXXXXXX" />
```

## 🎯 Funcionalidades Implementadas

### ✅ SEO Otimizado
- Schema Markup completo (Organization, LocalBusiness, Service, FAQ)
- Sitemap dinâmico
- Robots.txt otimizado
- Meta tags completas
- Open Graph e Twitter Cards

### ✅ Performance
- Core Web Vitals monitoramento
- Otimização de imagens (WebP/AVIF)
- Lazy loading
- Preload de recursos críticos
- Compressão e cache otimizados

### ✅ Analytics
- Google Tag Manager configurado
- Google Analytics 4 pronto
- Eventos personalizados
- Monitoramento de performance

## 📊 Métricas Importantes

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### SEO
- **PageSpeed Insights**: Otimizado
- **Mobile-Friendly**: Sim
- **Structured Data**: Implementado
- **Sitemap**: Automático

## 🔧 Próximos Passos

1. **Configurar Google Search Console** (seguir passos acima)
2. **Configurar Google Analytics 4** (substituir Measurement ID)
3. **Monitorar métricas** no Google Search Console
4. **Otimizar conteúdo** baseado nos dados
5. **Configurar alertas** para problemas de SEO

## 📈 Benefícios Esperados

- Melhor posicionamento nos motores de busca
- Aumento do tráfego orgânico
- Melhor experiência do usuário
- Dados detalhados de performance
- Insights para otimizações futuras 