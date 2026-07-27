import { Link, useParams } from 'react-router-dom';

export default function ThankYou() {
  const { siteId } = useParams<{ siteId: string }>();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-8 text-center text-ink">
      <h1 className="font-serif text-3xl font-semibold">Thank you!</h1>
      <p className="mt-2 max-w-sm text-muted">
        Site {siteId} is being generated. We&apos;ll email you a link to your editor shortly.
      </p>
      <Link to="/" className="mt-6 text-sm text-muted underline hover:text-ink">
        Back home
      </Link>
    </div>
  );
}
