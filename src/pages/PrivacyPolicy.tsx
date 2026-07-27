import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-cream px-6 py-16 text-ink">
      <h1 className="font-serif text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        This page is a placeholder. The full privacy policy will be published here before
        launch.
      </p>
      <Link to="/" className="mt-6 inline-block text-sm text-muted underline hover:text-ink">
        Back home
      </Link>
    </div>
  );
}
