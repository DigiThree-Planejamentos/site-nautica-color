// HOME DO SITE (rota /). Todo o código da home vive em src/home/ — esta rota
// apenas reexporta a página. A home é independente da landing (/lp): editar uma
// não altera a outra. O Next.js (App Router) exige este arquivo de rota aqui.
export { default } from "@/home/HomePage";
