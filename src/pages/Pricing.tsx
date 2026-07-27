import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-8 text-center text-ink">
      <h1 className="font-serif text-3xl font-semibold">Pricing</h1>
      <p className="mt-2 max-w-sm text-muted">
        Pricing details are coming soon. Build your site free in the meantime.
      </p>
      <Link to="/onboard" className="mt-6 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-olive-dark">
        Build My Site Free
      </Link>
      <Link to="/" className="mt-4 text-sm text-muted underline hover:text-ink">Back home</Link>
    </div>
  );
}
