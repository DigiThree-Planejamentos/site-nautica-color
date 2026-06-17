import {
  Anchor,
  ArrowRight,
  Brush,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  LifeBuoy,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { getCatalog } from "@/lib/catalog/get-catalog";
import { buildSupportMessage, resolveWhatsappNumber, whatsappUrl } from "@/lib/whatsapp";

export default async function HomePage() {
  const { brands, categories, products, settings } = await getCatalog();
  const featured = products.filter((product) => product.featured).slice(0, 8);
  const supportUrl = whatsappUrl(buildSupportMessage(), resolveWhatsappNumber(settings));
  const categoryPreview = categories.slice(0, 5);
  const solutionGuides = [
    {
      icon: ShieldCheck,
      title: "Proteção de casco",
      text: "Antifouling, primers e revestimentos para reduzir incrustação e proteger a obra viva.",
      href: "/produtos?categoria=antifouling"
    },
    {
      icon: Brush,
      title: "Pintura e acabamento",
      text: "Tintas, vernizes e complementos para acabamento externo, brilho e manutenção estética.",
      href: "/produtos?categoria=vernizes-e-acabamentos"
    },
    {
      icon: Wrench,
      title: "Preparo de superfície",
      text: "Lixas, abrasivos e produtos para deixar a superfície pronta antes da aplicação.",
      href: "/produtos?categoria=lixas-e-abrasivos"
    },
    {
      icon: Droplets,
      title: "Limpeza e polimento",
      text: "Produtos para corte, brilho, proteção e manutenção depois do uso.",
      href: "/produtos?categoria=limpeza-protecao-e-polimento"
    },
    {
      icon: Sparkles,
      title: "Fibra e reparos",
      text: "Gelcoat, resinas e reforços para pequenos reparos e trabalhos em compósitos.",
      href: "/produtos?categoria=fiberglass-e-compositos"
    },
    {
      icon: LifeBuoy,
      title: "Compra assistida",
      text: "Monte uma lista e confirme aplicação, preço e disponibilidade com a equipe.",
      href: "/#como-comprar"
    }
  ];

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        {/*
          Foto de fundo do hero (full-bleed).
          TODO(admin): a imagem será gerenciada pelo futuro painel administrativo,
          via a configuração `hero_image_url` (store_settings). Enquanto o admin não
          existir, cai no arquivo local /hero/hero.jpg e, na falta dele, no fundo navy.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-navy bg-cover bg-center"
          style={{ backgroundImage: `url('${settings.hero_image_url || "/hero/hero.jpg"}')` }}
        />
        {/* Overlay para legibilidade do texto sobre a foto */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/85 via-navy/55 to-navy/90" />

        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 pb-14 pt-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="mb-5 animate-fade-up text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Náutica Color</p>
            <h1 className="max-w-3xl animate-fade-up font-heading text-3xl font-extrabold leading-[1.1] [animation-delay:80ms] sm:text-4xl lg:text-5xl">
              Proteção e performance para cada etapa da manutenção náutica.
            </h1>
            <p className="mt-5 max-w-xl animate-fade-up text-sm leading-6 text-white/80 [animation-delay:160ms]">
              Tintas, acabamentos, abrasivos e soluções de alta performance para preservar o valor, a estética e o prestígio do seu barco.
            </p>
            <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:220ms] sm:flex-row">
              <Link href="/produtos" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-bright">
                Ver produtos <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href={supportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:bg-off-white">
                <MessageCircle size={18} aria-hidden="true" /> Falar com especialista
              </a>
            </div>
          </div>

          <div className="animate-fade-up rounded-lg border border-white/15 bg-white/10 p-5 shadow-soft backdrop-blur [animation-delay:280ms]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">Compre por necessidade</p>
            <div className="mt-5 grid gap-3">
              {[
                [ShieldCheck, "Proteção de casco", "Antifouling, primers e acabamentos."],
                [Brush, "Preparação completa", "Abrasivos, polimento e limpeza."],
                [PackageCheck, "Orçamento rápido", "Carrinho enviado direto pelo WhatsApp."]
              ].map(([Icon, title, text], index) => (
                <div key={String(title)} className="flex gap-3 rounded-lg bg-white/10 p-4" style={{ animationDelay: `${320 + index * 80}ms` }}>
                  <Icon className="mt-0.5 shrink-0 text-red" size={24} aria-hidden="true" />
                  <div>
                    <h2 className="font-heading text-base font-bold text-white">{String(title)}</h2>
                    <p className="mt-1 text-sm leading-6 text-white/70">{String(text)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/10 bg-white py-5" aria-label="Categorias principais">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <p className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-red">Comprar por categoria</p>
          <div className="flex flex-wrap gap-2">
            {categoryPreview.map((category) => (
              <Link key={category.id} href={`/produtos?categoria=${category.slug}`} className="rounded-full bg-sky px-4 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-white">
                {category.name}
              </Link>
            ))}
            <Link href="/produtos" className="rounded-full bg-red px-4 py-2 text-sm font-semibold text-white hover:bg-red-bright">
              Ver tudo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16" id="categorias">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.2em] text-red">Categorias</p>
              <h2 className="mt-2 font-heading text-4xl font-extrabold text-navy">Linhas para cada etapa da manutenção.</h2>
              <p className="mt-3 max-w-2xl text-ink/70">
                A navegação foi pensada para quem precisa encontrar rápido o produto certo para casco, acabamento, reparo ou polimento.
              </p>
            </div>
            <Link href="/produtos" className="font-semibold text-navy hover:text-red">Ver catálogo completo</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Reveal key={category.id} delay={(index % 3) * 200} className="h-full">
                <Link href={`/produtos?categoria=${category.slug}`} className="group flex h-full flex-col rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white">{index + 1}</span>
                  <h3 className="mt-5 font-heading text-2xl font-bold text-navy group-hover:text-red">{category.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-ink/65">
                    Ver produtos, marcas e opções disponíveis para essa linha.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red">
                    Explorar <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.2em] text-white/65">Guias rápidos</p>
            <h2 className="mt-2 font-heading text-4xl font-extrabold">Encontre pela aplicação, não só pelo nome do produto.</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionGuides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <Reveal key={guide.title} delay={(index % 3) * 160} className="h-full">
                  <Link href={guide.href} className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/10 p-6 transition hover:bg-white hover:text-navy">
                    <Icon className="text-red" size={28} aria-hidden="true" />
                    <h3 className="mt-4 font-heading text-xl font-bold">{guide.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-white/70 group-hover:text-ink/70">{guide.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-red">
                      Ver soluções <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.2em] text-red">Destaques</p>
              <h2 className="mt-2 font-heading text-4xl font-extrabold text-navy">Produtos de referência para seu carrinho.</h2>
              <p className="mt-3 max-w-2xl text-ink/70">
                Itens selecionados para começar o orçamento e acelerar a conversa com a equipe.
              </p>
            </div>
            <Link href="/produtos" className="font-semibold text-navy hover:text-red">Ver todos os produtos</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 180} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal className="h-full">
            <div className="h-full rounded-lg bg-white p-8 shadow-soft">
              <ClipboardCheck className="mb-5 text-red" size={34} aria-hidden="true" />
              <p className="font-bold uppercase tracking-[0.2em] text-red">Compra assistida</p>
              <h2 className="mt-3 font-heading text-4xl font-extrabold text-navy">O site ajuda a montar a lista. A equipe confirma o produto certo.</h2>
              <p className="mt-4 text-ink/70">
                Produtos náuticos dependem de superfície, aplicação, rendimento, preparação e disponibilidade. Por isso o carrinho vira uma solicitação de orçamento pelo WhatsApp.
              </p>
              <a href={supportUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-bright">
                <MessageCircle size={18} aria-hidden="true" /> Pedir indicação
              </a>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Escolha por etapa", "Comece por casco, acabamento, reparo, preparo ou polimento."],
              ["Monte o carrinho", "Adicione os itens de interesse sem compromisso de checkout."],
              ["Envie pelo WhatsApp", "A lista chega pronta para a equipe revisar com você."],
              ["Confirme aplicação", "Preço, estoque, rendimento e compatibilidade são validados antes da compra."]
            ].map(([title, text], index) => (
              <Reveal key={title} delay={(index % 2) * 160} className="h-full">
                <div className="h-full rounded-lg border border-navy/10 bg-white p-6">
                  <CheckCircle2 className="mb-4 text-red" aria-hidden="true" />
                  <h3 className="font-heading text-xl font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="marcas" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-bold uppercase tracking-[0.2em] text-red">Marcas parceiras</p>
          <h2 className="mt-2 font-heading text-4xl font-extrabold text-navy">Linhas profissionais em um catálogo único.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {brands.map((brand, index) => (
              <Reveal key={brand.id} delay={(index % 6) * 120} className="h-full">
                <div className="h-full rounded-lg bg-white p-5 text-center font-heading text-xl font-bold text-navy shadow-sm">
                  {brand.name}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-white/65">Náutica Color</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold">Mais do que pintura, é sobre preservar valor, estética e prestígio.</h2>
          </div>
          <p className="text-lg leading-8 text-white/75">
            Um catálogo focado em soluções para embarcações, preparado para consulta rápida, montagem do carrinho e atendimento direto pela equipe da loja.
          </p>
        </div>
      </section>

      <section id="como-comprar" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-extrabold text-navy">Como comprar pelo WhatsApp</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {["Explore marcas e categorias.", "Adicione produtos ao carrinho.", "Envie a lista pelo WhatsApp.", "Confirme preço, estoque e condições."].map((step, index) => (
              <Reveal key={step} delay={(index % 4) * 180} className="h-full">
                <div className="h-full rounded-lg border border-navy/10 p-5">
                  <CheckCircle2 className="mb-4 text-red" aria-hidden="true" />
                  <p className="font-semibold text-navy">{step}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-soft">
            <MapPin className="mb-5 text-red" size={34} aria-hidden="true" />
            <h2 className="font-heading text-4xl font-extrabold text-navy">Atendimento na Marina Verolme.</h2>
            <p className="mt-4 text-ink/70">{settings.location}</p>
            <p className="mt-2 text-ink/70">Telefone: {settings.phone}</p>
            <p className="mt-2 text-ink/70">WhatsApp: {settings.whatsapp_visible}</p>
            <a href={supportUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-bright">
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
