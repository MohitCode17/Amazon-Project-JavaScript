export function formatMoney(price) {
  return (Math.round(price) / 100).toFixed(2);
}
