// 500000 → "KES 500,000"
export function formatKES(amount: number): string {
  return `KES ${amount.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}
