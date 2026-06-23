import { Anchor, ArrowRight, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { CategoryTable } from "@/landing/CategoryTable";
import { HeroSearch } from "@/landing/HeroSearch";
import { HeroWave } from "@/landing/HeroWave";
import { StoreExperience } from "@/landing/StoreExperience";
import { ProductShowcase } from "@/landing/ProductShowcase";
import { Eyebrow } from "@/landing/Eyebrow";
import { Reveal } from "@/landing/Reveal";
import { getCatalog } from "@/lib/catalog/get-catalog";
import { productPhotos } from "@/lib/catalog/product-photos";
import { buildSupportMessage, resolveWhatsappNumber, whatsappUrl } from "@/lib/whatsapp";

/**
 * LANDING PAGE — rota /lp.
 *
 * Página totalmente isolada da home (/): todos os componentes que ela usa vivem
 * em src/landing/. Mexer aqui ou em src/landing/ NÃO altera a home, e mexer na
 * home (src/home/) NÃO altera a landing. Só compartilham a infraestrutura de
 * dados/carrinho (lib, types, CartStepper), também usada pelo catálogo.
 */
export default async function LandingPage() {
  const { brands, categories, products, settings } = await getCatalog();
  // Produtos com foto real (vinda do catálogo, via productPhotos) ficam como
  // estão. Os demais recebem fotos APENAS DEMONSTRATIVAS distribuídas por índice.
  const examplePhotos = [
    "/products/examples/weg-tinta-galao.png",
    "/products/examples/3m-finesse-it-polish.png",
    "/products/examples/weg-diluente.png",
    "/products/examples/sikaflex-295-uv.png"
  ];
  const featured = products
    .filter((product) => product.featured)
    .slice(0, 8)
    .map((product, index) => ({
      ...product,
      imageUrl: productPhotos[product.slug] ?? examplePhotos[index % examplePhotos.length]
    }));
  const whatsappNumber = resolveWhatsappNumber(settings);
  const supportUrl = whatsappUrl(buildSupportMessage(), whatsappNumber);
  // Quantidade de produtos por categoria, exibida na tabela de categorias.
  const categoryCounts = products.reduce<Record<string, number>>((acc, product) => {
    const slug = product.category?.slug;
    if (slug) acc[slug] = (acc[slug] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        {/*
          Foto de fundo do hero (full-bleed).
          TODO(admin): a imagem será gerenciada pelo futuro painel administrativo,
          via a configuração `hero_image_url` (store_settings). Enquanto o admin não
          existir, cai na foto local da fachada e, na falta dela, no fundo navy.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-navy bg-cover bg-center"
          style={{ backgroundImage: `url('${settings.hero_image_url || "/hero/fachada-nautica.png"}')` }}
        />
        {/* Overlay para legibilidade do texto sobre a foto */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/70 to-navy-light/55" />
        {/* Brilho náutico sutil para dar profundidade */}
        <div aria-hidden="true" className="absolute -right-24 top-4 -z-10 h-80 w-80 rounded-full bg-red/20 blur-3xl" />

        <div className="mx-auto flex min-h-[740px] max-w-7xl flex-col items-center justify-center gap-8 px-4 pb-52 pt-24 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-5 inline-flex animate-fade-up items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-red">
              <Anchor size={14} aria-hidden="true" /> Náutica Color
            </p>
            <h1 className="animate-fade-up font-heading text-2xl font-extrabold leading-[1.1] [animation-delay:80ms] sm:text-3xl lg:text-4xl">
              Tudo para a manutenção da sua embarcação.
            </h1>
            <p className="mx-auto mt-5 max-w-xl animate-fade-up text-sm leading-7 text-white/80 [animation-delay:160ms]">
              Tintas, antifouling, acabamentos e abrasivos de alta performance. Encontre o produto certo e monte seu orçamento em minutos.
            </p>
          </div>

          <div className="w-full max-w-2xl animate-fade-up [animation-delay:220ms]">
            <HeroSearch categories={categories} />
          </div>

          <div className="flex animate-fade-up flex-col items-center gap-3 [animation-delay:260ms] sm:flex-row">
            <a
              href={supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red px-7 text-sm font-semibold text-white shadow-soft transition hover:bg-red-bright"
            >
              <MessageCircle size={18} aria-hidden="true" /> Falar com o atendimento
            </a>
            <Link
              href="#produtos"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-navy"
            >
              Ver produtos <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="flex animate-fade-up flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-white/75 [animation-delay:300ms]">
            {[
              [ShieldCheck, "Linha profissional"],
              [MessageCircle, "Orçamento pelo WhatsApp"],
              [MapPin, "Marina Verolme · Angra dos Reis"]
            ].map(([Icon, label]) => (
              <span key={String(label)} className="inline-flex items-center gap-2">
                <Icon className="text-red" size={18} aria-hidden="true" /> {String(label)}
              </span>
            ))}
          </div>
        </div>

        {/* Onda náutica: desliza para a esquerda (loop) e sobe/desce com o scroll */}
        <HeroWave />
      </section>

      {/* -mt-px: a seção branca sobrepõe 1px o pé do hero para fechar a fresta
          de sub-pixel (hairline cinza do fundo do body #edecec) que o navegador
          deixa vazar na emenda das seções em zoom/DPI fracionário. */}
      <section className="relative -mt-px overflow-hidden bg-white pb-20 pt-28" id="categorias">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <Eyebrow>Categorias</Eyebrow>
            </div>
            <Link href="/produtos" className="inline-flex items-center gap-2 font-semibold text-navy transition hover:text-red">
              Ver catálogo completo <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <CategoryTable categories={categories} counts={categoryCounts} />
        </div>
      </section>

      <section id="produtos" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <Eyebrow>Produtos em destaque</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-navy sm:text-4xl">Escolha o produto e fale com o atendimento.</h2>
              <p className="mt-4 text-ink/70">
                Seleção de itens profissionais para a manutenção da sua embarcação. Clique em <strong className="font-semibold text-navy">Falar no WhatsApp</strong> para tirar dúvidas direto com a equipe — ou monte um carrinho de orçamento com vários itens.
              </p>
            </div>
            <Link href="/produtos" className="inline-flex items-center gap-2 font-semibold text-navy transition hover:text-red">
              Ver catálogo completo <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ProductShowcase products={featured} whatsappNumber={whatsappNumber} />
        </div>
      </section>

      <StoreExperience supportUrl={supportUrl} />

      <section id="marcas" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>Marcas parceiras</Eyebrow>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-navy sm:text-4xl">Linhas profissionais em um catálogo único.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {brands.map((brand, index) => (
              <Reveal key={brand.id} delay={(index % 6) * 120} className="h-full">
                <div className="grid h-full place-items-center rounded-lg bg-white p-6 text-center font-heading text-xl font-bold text-navy shadow-sm ring-1 ring-navy/5 transition-all hover:-translate-y-1 hover:text-red hover:shadow-soft">
                  {brand.name}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-soft">
            <MapPin className="mb-5 text-red" size={34} aria-hidden="true" />
            <Eyebrow>Contato</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-extrabold text-navy sm:text-4xl">Atendimento na Marina Verolme.</h2>
            <p className="mt-4 text-ink/70">{settings.location}</p>
            <p className="mt-2 text-ink/70">Telefone: {settings.phone}</p>
            <p className="mt-2 text-ink/70">WhatsApp: {settings.whatsapp_visible}</p>
            <a href={supportUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red px-5 text-sm font-semibold text-white transition hover:bg-red-bright">
              <MessageCircle size={18} aria-hidden="true" /> Chamar no WhatsApp
            </a>
          </div>
          <div className="rounded-lg bg-navy p-8 text-white shadow-soft">
            <Anchor className="mb-5 text-white" size={34} aria-hidden="true" />
            <h2 className="font-heading text-3xl font-extrabold">Perguntas frequentes</h2>
            <div className="mt-6 space-y-5">
              {[
                ["Os preços são finais?", "Não. São valores demonstrativos e devem ser confirmados com a loja."],
                ["O site vende online?", "O carrinho reúne os produtos e envia a lista para atendimento via WhatsApp."],
                ["A equipe indica o produto correto?", "Sim. Confirme aplicação, disponibilidade e condições diretamente com a equipe."]
              ].map(([question, answer]) => (
                <div key={question}>
                  <h3 className="font-semibold">{question}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/70">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <a href={supportUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Náutica Color pelo WhatsApp" className="fixed bottom-4 right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-red text-white shadow-soft hover:bg-red-bright sm:bottom-6">
        <MessageCircle aria-hidden="true" />
      </a>
    </main>
  );
}
