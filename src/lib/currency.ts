export function centsToReais(cents: number) {
  return cents / 100;
}

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(centsToReais(cents));
}
