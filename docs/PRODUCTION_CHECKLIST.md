# Checklist de producao

Use este checklist antes de publicar ou apresentar a versao final da Nautica Color.

## Validacoes que podem ser feitas agora

- Rodar `npm run lint`.
- Rodar `npm run typecheck`.
- Rodar `npm run build`.
- Abrir a home e conferir header, hero, categorias, destaques, marcas, contato e footer.
- Abrir `/produtos` e testar busca, filtro por categoria, filtro por marca, ordenacao e limpar filtros.
- Abrir ao menos uma pagina de produto e conferir imagem, preco de referencia, especificacoes, CTA de carrinho e CTA de WhatsApp.
- Adicionar produtos ao carrinho, alterar quantidade, remover item, limpar carrinho e conferir persistencia apos recarregar a pagina.
- Conferir se os links de WhatsApp abrem com mensagem preenchida.
- Conferir `/robots.txt` e `/sitemap.xml`.
- Conferir responsivo em mobile e desktop.
- Confirmar que screenshots locais `.next-*.png`, logs e builds nao aparecem no `git status`.

## Validacoes dependentes da empresa

- Confirmar nome oficial: Nautica Color ou Nautica Colors.
- Confirmar WhatsApp oficial.
- Confirmar telefone, endereco, Instagram e texto institucional.
- Confirmar marcas comercializadas.
- Confirmar produtos, SKUs, unidades, precos e disponibilidade.
- Substituir logotipo provisorio por arquivo oficial.
- Substituir placeholders por imagens oficiais autorizadas.
- Confirmar se os textos sobre preco demonstrativo, estoque e compra assistida estao corretos comercialmente.

## Supabase

- Executar `supabase/migrations/001_nautica_catalog.sql` no SQL Editor do projeto compartilhado.
- Confirmar que foram criadas apenas tabelas com prefixo `store_`.
- Confirmar RLS ativo nas tabelas publicas.
- Confirmar SELECT publico para registros ativos.
- Confirmar que INSERT, UPDATE e DELETE estao bloqueados para `anon` e `authenticated`.
- Preencher `NEXT_PUBLIC_SUPABASE_URL`.
- Preencher `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Preencher `NEXT_PUBLIC_SITE_SLUG=nautica-color`.
- Preencher `NEXT_PUBLIC_WHATSAPP_NUMBER` com o numero oficial quando confirmado.
- Validar que o site carrega dados do Supabase e nao apenas o fallback demonstrativo.

## Vercel

- Importar o repositorio `DigiThree-Planejamentos/site-nautica-color`.
- Confirmar framework Next.js.
- Cadastrar variaveis de ambiente para Preview e Production.
- Definir `NEXT_PUBLIC_SITE_URL` com a URL final de producao.
- Fazer deploy e validar home, catalogo, produto, carrinho, WhatsApp, robots e sitemap.
- Configurar dominio oficial quando estiver disponivel.
- Fazer redeploy apos qualquer alteracao em variaveis de ambiente.

## Seguranca

- Nunca publicar `SUPABASE_SERVICE_ROLE_KEY`.
- Nunca publicar senha do banco ou connection string PostgreSQL.
- Nunca colocar tokens pessoais, credenciais administrativas ou chaves secretas em variaveis `NEXT_PUBLIC_`.
- Manter o painel administrativo futuro com Auth, RLS e policies especificas para administradores.
