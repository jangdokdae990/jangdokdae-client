type Params = Promise<{ id: string }>;

export default async function IssueDocentDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  return <main>이슈 상세: {id}</main>;
}
