# Supabase Setup

## 1. Abrir o SQL Editor

No painel do Supabase, selecione o projeto compartilhado e acesse **SQL Editor** no menu lateral.

## 2. Copiar a migration

Abra `supabase/migrations/001_nautica_catalog.sql`, copie todo o conteúdo e revise o comentário inicial sobre a divergência de WhatsApp.

## 3. Executar a migration

Cole o SQL no editor e clique em **Run**. A migration é idempotente e cria somente objetos com prefixo `store_`. Ela não usa `DROP TABLE`, `TRUNCATE`, nem altera tabelas antigas.

## 4. Confirmar tabelas

No **Table Editor**, confirme a existência de:

- `store_sites`
- `store_brands`
- `store_categories`
- `store_products`
- `store_settings`

## 5. Localizar Project URL

Acesse **Project Settings > API** e copie a **Project URL**.

## 6. Localizar Publishable Key

Na mesma tela, copie a chave pública/publishable. Não use `service_role`, senha do banco ou connection string no frontend.

## 7. Configurar `.env.local`

Crie `.env.local` localmente com:

```bash
NEXT_PUBLIC_SUPABASE_URL=sua_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_publishable_key
NEXT_PUBLIC_SITE_SLUG=nautica-color
NEXT_PUBLIC_WHATSAPP_NUMBER=5524998447844
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 8. Variáveis na Vercel

Em **Project Settings > Environment Variables**, cadastre as mesmas variáveis, ajustando `NEXT_PUBLIC_SITE_URL` para a URL de produção.

## 9. Validar policies

No SQL Editor, rode consultas como anon/public pelo API Explorer ou teste o site sem login. SELECT deve funcionar para registros ativos e públicos. INSERT, UPDATE e DELETE devem ser bloqueados para `anon` e `authenticated`.

## 10. Confirmar que tabelas antigas não foram alteradas

No Table Editor, filtre por `store_` e confirme que a execução criou somente essas tabelas. As tabelas dos outros sites não são referenciadas pela migration.

## Cache e revalidação

As consultas públicas usam revalidação simples de 60 segundos no Next.js. Isso evita congelar o catálogo no build e deixa o projeto pronto para uma futura chamada de `revalidatePath` ou tag de cache após alterações no painel administrativo.
