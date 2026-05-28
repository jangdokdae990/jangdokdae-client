export function formatPrice(value: number): string {
  return value.toLocaleString('ko-KR') + '원';
}

export function formatChangeRate(rate: number): string {
  const sign = rate >= 0 ? '+' : '';
  return `${sign}${rate.toFixed(2)}%`;
}
