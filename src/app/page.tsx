import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-extrabold">Launchsite Platform</h1>
      <div className="flex gap-4">
        <Link href="/onboarding" className="p-4 bg-slate-800 border rounded-lg">Onboarding</Link>
        <Link href="/editor/101" className="p-4 bg-slate-800 border rounded-lg">Editor</Link>
        <Link href="/vault/101" className="p-4 bg-slate-800 border rounded-lg">Vault</Link>
      </div>
    </div>
  );
}
