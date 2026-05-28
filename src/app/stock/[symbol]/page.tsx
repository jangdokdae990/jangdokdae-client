type Params = Promise<{ symbol: string }>;

export default async function StockDetailPage({ params }: { params: Params }) {
  const { symbol } = await params;
  return <main>종목 상세: {symbol}</main>;
}
