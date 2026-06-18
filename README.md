# Náutica Color

Prévia funcional de catálogo digital para a Náutica Color, preparada para deploy na Vercel por integração com GitHub e dados públicos vindos do Supabase.

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Supabase e PostgreSQL
- `@supabase/supabase-js`
- React Context com `useReducer`
- `localStorage` para o carrinho de compras
- Lucide React
- ESLint

## Instalação

```bash
npm install
```

## Execução local

```bash
npm run dev
```

## Build

```bash
npm run lint
npm run typecheck
npm run build
```

## Estrutura

- `src/app`: rotas, metadata, sitemap e robots.
- `src/components`: layout, home, catálogo, produtos, carrinho e UI.
- `src/context`: estado do carrinho de compras.
- `src/lib/catalog`: camada de dados Supabase e fallback demonstrativo.
- `src/lib/supabase`: cliente público.
- `src/lib/whatsapp.ts`: geração de mensagens e links.
- `supabase/migrations`: migration idempotente do catálogo.
- `docs`: guias de Supabase, Vercel e painel futuro.
- `public`: logotipo provisório, favicon e placeholders SVG.

## Supabase

Execute `supabase/migrations/001_nautica_catalog.sql` manualmente no SQL Editor do projeto compartilhado. A migration cria apenas objetos `store_`, ativa RLS, concede SELECT público e revoga escrita para `anon` e `authenticated`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_SLUG=nautica-color
NEXT_PUBLIC_WHATSAPP_NUMBER=5524998447844
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Nunca colocar no navegador ou no repositório: `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`, senha do banco, connection string PostgreSQL, token pessoal ou credenciais administrativas.

## WhatsApp

A prioridade do número é:

1. `NEXT_PUBLIC_WHATSAPP_NUMBER`
2. Configuração pública `store_settings.whatsapp_number`
3. Fallback demonstrativo `5524998447844`

## Produtos e preços

Os 16 produtos demonstrativos estão no seed da migration com `demo_price = true`, `stock_status = on_request` e valores em centavos. Atualizações futuras devem ser feitas pelo banco ou pelo painel administrativo planejado.

## Imagens

As imagens atuais são placeholders SVG locais em `public/products/placeholders`. Substituir por imagens oficiais autorizadas ou arquivos do Supabase Storage quando disponíveis.

## Deploy

Veja `docs/DEPLOY_VERCEL.md`. O projeto está preparado para deploy automático na Vercel após push para a branch principal.

Checklist de validação: `docs/PRODUCTION_CHECKLIST.md`.

## Futuro painel administrativo

Veja `docs/ADMIN_ROADMAP.md`. O painel deverá usar Supabase Auth, RLS e nunca expor chaves administrativas no navegador.

## Alertas pendentes

- Confirmar o nome oficial: Náutica Color ou Náutica Colors.
- Confirmar o WhatsApp oficial, pois o briefing também menciona `(27) 99244-4944`.
- Confirmar os preços.
- Confirmar as marcas.
- Confirmar o inventário completo.
- Substituir o logotipo provisório.
- Substituir imagens demonstrativas.
- Validar informações institucionais.
