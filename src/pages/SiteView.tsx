import { useParams } from 'react-router-dom';

interface SiteViewProps {
  siteIdOverride?: string;
}

export default function SiteView({ siteIdOverride }: SiteViewProps) {
  const { siteId: routeSiteId } = useParams<{ siteId: string }>();
  const siteId = siteIdOverride ?? routeSiteId;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-8 text-center text-ink">
      <h1 className="font-serif text-3xl font-semibold">Site View</h1>
      <p className="mt-2 max-w-sm text-muted">
        {siteId ? `Site ${siteId}` : 'No site'} — the client site renderer, Instant Editor, and
        Vault land here in Phase 5+.
      </p>
    </div>
  );
}
