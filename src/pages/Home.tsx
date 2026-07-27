import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Check,
  Hammer,
  Home as HomeIcon,
  Pencil,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
} from 'lucide-react';

const industries = [
  {
    name: 'Law',
    description: 'Attorneys, firms & legal practices',
    icon: Scale,
    bg: 'bg-violet-100',
    fg: 'text-violet-700',
  },
  {
    name: 'Medical',
    description: 'Clinics, practitioners & health services',
    icon: Stethoscope,
    bg: 'bg-fuchsia-100',
    fg: 'text-fuchsia-700',
  },
  {
    name: 'Restaurant',
    description: 'Menus, reservations & online ordering',
    icon: UtensilsCrossed,
    bg: 'bg-rose-100',
    fg: 'text-rose-700',
  },
  {
    name: 'Trades',
    description: 'Plumbers, electricians & contractors',
    icon: Hammer,
    bg: 'bg-sky-100',
    fg: 'text-sky-700',
  },
  {
    name: 'Real Estate',
    description: 'Agents, brokers & listings',
    icon: HomeIcon,
    bg: 'bg-amber-100',
    fg: 'text-amber-700',
  },
  {
    name: 'Insurance',
    description: 'Agents, brokers & coverage plans',
    icon: ShieldCheck,
    bg: 'bg-blue-100',
    fg: 'text-blue-700',
  },
  {
    name: 'Accounting',
    description: 'CPAs, bookkeepers & tax professionals',
    icon: Briefcase,
    bg: 'bg-red-100',
    fg: 'text-red-700',
  },
];

const steps = [
  {
    number: 1,
    title: 'Tell Us What You Do',
    description: 'Share your business name, industry, and a few details. Takes about 2 minutes.',
  },
  {
    number: 2,
    title: 'We Handle the Design',
    description: 'Our team selects the best designs that fit your industry — no choices needed on your end, just yet.',
  },
  {
    number: 3,
    title: 'Receive your working website in 24 hrs',
    description: 'Our AI-assisted team builds your professional website and has it ready within 24 hours.',
  },
];

const templateTags = [
  ['Law', 'Medical', 'Accounting', 'Real Estate', 'Engineering', 'Beauty', 'Trades'],
  ['Restaurant', 'Retail', 'Coaching', 'Education', 'Nonprofit'],
];

const tagColors = [
  'text-violet-700',
  'text-teal-700',
  'text-red-700',
  'text-blue-700',
  'text-coral',
  'text-pink-700',
  'text-emerald-700',
];

function NumberedBadge({ n, className }: { n: number; className: string }) {
  return (
    <div
      className={`absolute flex h-9 w-9 items-center justify-center rounded-full bg-coral text-sm font-bold text-white shadow-lg ring-4 ring-cream ${className}`}
    >
      {n}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <nav className="flex items-center justify-between border-b border-cream-soft px-6 py-3 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-serif text-lg font-semibold">Launchsite</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-ink/80">
          <Link to="/" className="hover:text-ink">Home</Link>
          <Link to="/pricing" className="hover:text-ink">Pricing</Link>
        </div>
      </nav>

      <section className="grid grid-cols-1 items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="relative mx-auto w-full max-w-md py-6">
          <div className="rounded-3xl bg-gradient-to-br from-orange-100 via-amber-50 to-cream-soft p-10">
            <div className="rotate-[-2deg] rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between text-xs font-semibold text-muted">
                <span className="flex items-center gap-1 text-olive">
                  <Check className="h-3.5 w-3.5" /> Your Info
                </span>
                <span className="flex items-center gap-1 text-olive">
                  <Check className="h-3.5 w-3.5" /> Your Photos
                </span>
                <span className="text-ink">3. Go Live</span>
              </div>

              <div className="relative mb-6 rounded-lg border border-dashed border-muted/40 p-4">
                <div className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-olive text-white shadow">
                  <Pencil className="h-3 w-3" />
                </div>
                <p className="font-serif text-xl font-semibold leading-snug text-ink sm:text-2xl">
                  Williams Family Law
                </p>
              </div>

              <button
                type="button"
                className="w-full rounded-lg bg-coral py-3 text-center text-sm font-bold uppercase tracking-wide text-white shadow"
              >
                Launch
              </button>
            </div>
          </div>

          <NumberedBadge n={1} className="left-2 top-0" />
          <NumberedBadge n={2} className="right-4 top-8" />
          <NumberedBadge n={3} className="right-0 top-1/2" />
          <NumberedBadge n={4} className="bottom-8 right-8" />
          <NumberedBadge n={5} className="bottom-2 left-1/3" />
          <NumberedBadge n={6} className="bottom-8 left-0" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-olive">
            <Sparkles className="h-3.5 w-3.5" /> Free Website Launcher
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            <span className="text-ink">Your business online</span>
            <br />
            <span className="text-olive">in minutes.</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Tell us what you do, pick a style, and we&apos;ll build you a beautiful, professional
            website. No tech skill required. 100% free launcher. Building your site costs
            nothing. You pay only after two weeks of use and satisfaction.
          </p>
          <Link
            to="/onboard"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-olive-dark"
          >
            Build My Site Free <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-muted">No credit card needed to build &bull; Free to build</p>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-olive">Built For Your Industry</span>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
            We build sites for businesses like yours
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-4">
            {industries.slice(0, 4).map((industry) => (
              <IndustryCard key={industry.name} industry={industry} />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {industries.slice(4).map((industry) => (
              <IndustryCard key={industry.name} industry={industry} />
            ))}
          </div>
          <p className="mt-6 text-center text-sm italic text-muted">...and many more</p>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-olive">Simple Process</span>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">How it works</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-10 text-center sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-olive text-sm font-bold text-white">
                {step.number}
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/onboard"
            className="inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-olive-dark"
          >
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-cream-soft px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-olive">Purpose-Built Templates</span>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
            Special Design for Your Industry
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Every industry has different needs. Launchsite loads a purpose-built design the
            moment you select your field — different pages, layout, colours, and copy, all
            tailored to what your customers expect.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {templateTags.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center gap-2">
              {row.map((tag, i) => (
                <span
                  key={tag}
                  className={`rounded-full border border-muted/20 bg-cream px-4 py-1.5 text-sm font-medium ${tagColors[(rowIndex * 7 + i) % tagColors.length]}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/onboard"
            className="inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-olive-dark"
          >
            See All Templates <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function IndustryCard({
  industry,
}: {
  industry: (typeof industries)[number];
}) {
  const Icon = industry.icon;
  return (
    <div className="w-[210px] rounded-xl border border-muted/15 bg-white p-5 shadow-sm">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${industry.bg}`}>
        <Icon className={`h-5 w-5 ${industry.fg}`} />
      </div>
      <h3 className="mt-3 font-serif text-base font-semibold">{industry.name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">{industry.description}</p>
    </div>
  );
}
