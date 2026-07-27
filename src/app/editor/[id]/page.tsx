import Link from 'next/link';

export default function EditorPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8 space-y-4">
      <h1 className="text-3xl font-bold">Editor</h1>
      <p className="text-slate-400">Site #{params.id} — the editor is under construction.</p>
      <Link href="/" className="underline text-slate-300 hover:text-white">Back home</Link>
    </div>
  );
}
