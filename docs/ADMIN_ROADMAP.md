# Futuro Painel Administrativo

O painel administrativo não foi implementado nesta etapa.

Funcionalidades previstas:

- Login com Supabase Auth.
- Controle de administradores.
- Cadastro e edição de marcas.
- Cadastro e edição de categorias.
- Cadastro e edição de produtos.
- Alteração de preços.
- Upload de imagens para storage autorizado.
- Ativação e desativação de produtos.
- Marcação de produtos em destaque.
- Ordenação de marcas e categorias.
- Configurações de contato.
- Histórico básico de alterações.

Requisitos de segurança:

- Utilizar autenticação e RLS.
- Criar policies específicas para administradores.
- Não usar chaves administrativas no navegador.
- Não expor `service_role`, senha do banco, connection string ou tokens pessoais.
- Manter os objetos administrativos isolados e compatíveis com o projeto Supabase compartilhado.
