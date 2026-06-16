# Deploy na Vercel

## 1. Enviar arquivos ao GitHub

Confirme o remote antes do push:

```bash
git remote -v
```

Use o repositório `DigiThree-Planejamentos/site-nautica-color`.

## 2. Importar na Vercel

Na Vercel, clique em **Add New > Project** e selecione o repositório do GitHub.

## 3. Framework

A Vercel deve detectar **Next.js** automaticamente. Se necessário, selecione manualmente.

## 4. Variáveis

Cadastre:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_SLUG=nautica-color
NEXT_PUBLIC_WHATSAPP_NUMBER=5524998447844
NEXT_PUBLIC_SITE_URL=https://seu-dominio
```

## 5. Primeiro deploy

Clique em **Deploy**. O build esperado é `npm run build`.

## 6. Domínio

Depois do deploy, acesse **Settings > Domains** e configure o domínio oficial quando disponível.

## 7. Validar produção

Confira home, catálogo, página de produto, links de WhatsApp, imagens, SEO básico e persistência do orçamento.

## 8. Novo deploy após variáveis

Após alterar variáveis, use **Redeploy** no deployment mais recente para garantir que o build receba os novos valores.

## 9. Preview deployments

Branches e pull requests geram deployments de preview automaticamente quando a integração com GitHub está ativa.
