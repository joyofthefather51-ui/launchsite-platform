import { useParams } from 'react-router-dom';

export default function MasterEditView() {
  const { siteId } = useParams<{ siteId: string }>();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink p-8 text-center text-white">
      <h1 className="font-serif text-3xl font-semibold">Master Edit View</h1>
      <p className="mt-2 max-w-sm text-white/60">
        Admin-level canvas editing for site {siteId} lands here in Phase 8.
      </p>
    </div>
  );
}
