import Link from "next/link";
import { primary, secondary } from "@/components/buttons";
import { BusinessMark, Wordmark } from "@/components/marks";
import { business } from "@/lib/brand";
import { demoRoutes } from "@/lib/demo-routes";

// The landing page: the page every link opens (DEMO-STANDARD.md). It sells the
// idea by itself, on a phone first. No prices, no statistics.

function HeroDraft() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[400px]">
      <div className="border border-line border-t-2 border-t-brand bg-surface p-5 shadow-[0_30px_60px_-36px_rgba(27,30,44,0.45)]">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-lg font-semibold">Carmen R.</p>
          <span className="rounded-[2px] bg-sun-soft px-2 py-0.5 text-xs font-semibold text-sun-ink">Waiting for your OK</span>
        </div>
        <p className="text-sm text-muted">4 tune-ups with you. The last one was 15 months ago.</p>
        <p className="mt-3 rounded-2xl rounded-bl-sm bg-bubble break-words px-3.5 py-2.5 text-[15px] leading-snug">
          Hi Carmen, it&rsquo;s {business.owner} from {business.name}. Your 3-ton central AC is due for its yearly tune-up. Want me to save you a spot before the heat?
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span className={primary}>Approve</span>
          <span className={secondary}>Edit</span>
        </div>
      </div>
      <div className="absolute -top-5 right-2 flex items-center gap-2 border border-line bg-surface px-3 py-2 shadow-[0_14px_32px_-22px_rgba(27,30,44,0.5)] lg:-right-8">
        <BusinessMark size={24} />
        <p className="text-sm font-semibold">8 past customers found</p>
      </div>
    </div>
  );
}

const steps = [
  { n: "1", title: "Reads your records", body: "The customer list you already keep: who, what system, every visit. Nothing new to type." },
  { n: "2", title: "Finds who stopped coming back", body: "Missed this year's tune-up, a plan that ran out, one repair and never back." },
  { n: "3", title: "Says who and why", body: "A short report in plain words: who is on the list, and the reason for each." },
  { n: "4", title: "You approve every message", body: "A draft for each customer, signed by you. Approve it, change it or skip it. Then it goes." },
];

const promises = [
  { title: "Nothing goes out without your OK", body: "Every message waits for you. One you skip, or never approve, is never sent." },
  { title: "Your own customers only", body: "It starts from your own records. It never writes to strangers." },
  { title: "Leaves out who asked", body: "Anyone who asked not to get texts stays off the list." },
  { title: "Sounds like you", body: "Short, friendly, signed with your name. You can change every word." },
];

export default function Landing() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Wordmark />
        <Link href={demoRoutes.demo} className={primary}>
          Try the demo
        </Link>
      </header>

      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl gap-14 px-4 pt-8 pb-20 sm:px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:pt-16">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">For businesses with a yearly visit</p>
            <h1 className="mt-3 font-display text-5xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-6xl">
              Bring back the customers who stopped calling.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Win-Back finds the past customers who stopped coming back, right in your own records, and drafts a message to each. You approve every one before it goes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={demoRoutes.demo} className={`${primary} min-h-12 px-7 text-lg`}>
                Try the demo
              </Link>
              <p className="text-sm text-muted">No signup. Opens a made-up AC company.</p>
            </div>
          </div>
          <HeroDraft />
        </section>

        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              They chose you once. They just haven&rsquo;t heard from you since.
            </h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <li key={s.n} className="border-t border-ink/80 pt-4">
                  <span className="tabular block font-display text-3xl leading-none font-semibold text-brand">{s.n}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">You stay in charge.</h2>
          <p className="mt-3 max-w-prose text-muted">Made for AC and heating companies with yearly service, and for dental and vet offices with recalls.</p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <div key={p.title} className="border-t-2 border-brand pt-3">
                <dt className="font-semibold">{p.title}</dt>
                <dd className="mt-1 text-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bg-brand text-on-brand">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Run it on a sample company.</h2>
              <p className="mt-3 max-w-2xl text-on-brand/85">
                The demo opens {business.name}, a made-up AC company in South Florida, with its past-customer records. Scan them, read the report, approve the messages you like, and watch a reply book a visit.
              </p>
            </div>
            <Link href={demoRoutes.demo} className="inline-flex min-h-12 items-center justify-center rounded-[3px] bg-coral px-7 text-lg font-semibold text-ink transition-colors duration-150 hover:bg-paper">
              Try the demo
            </Link>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:px-6">
        <p>{business.name} and its customers are made up. In the demo, no message is sent.</p>
        <p>
          Built by{" "}
          <a href="https://tekguyz.com" className="inline-flex min-h-11 items-center text-ink underline underline-offset-4">
            TEKGUYZ
          </a>
        </p>
      </footer>
    </>
  );
}
