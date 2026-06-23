// LANDING PAGE (rota /lp). Todo o código da landing vive em src/landing/ — esta
// rota apenas reexporta a página. A landing é independente da home (/): editar
// uma não altera a outra. O Next.js (App Router) exige este arquivo de rota aqui.
export { default } from "@/landing/LandingPage";
