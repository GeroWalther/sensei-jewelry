import Image from "next/image";

export const metadata = { title: "About — Sensei" };

export default function AboutPage() {
  return (
    <>
      <article className="container-narrow max-w-3xl py-16 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">About Sensei</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold md:text-6xl">
          Fine jewellery, made slowly.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
          We&apos;re a small studio in Lisbon making a short list of pieces we&apos;d wear every day —
          and that we&apos;d be proud to hand down.
        </p>

        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=85"
            alt="Sensei studio"
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="prose-spacing mt-12 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            Sensei began in 2021 with a frustration. We were tired of fine jewellery that sat in
            drawers — too precious to wear — and tired of fashion jewellery that didn&apos;t last a
            season. We wanted something in between: pieces with the weight and integrity of an
            heirloom, made for an ordinary Tuesday.
          </p>
          <p>
            So we narrowed everything down. A short list of forms, refined over months instead of
            weeks. Recycled metals from refiners we&apos;ve visited. Lab-grown and traceable stones
            with paper trails we can show you. Every piece cast, finished and packed in our studio
            by a team of four.
          </p>

          <h2 className="!text-2xl !font-semibold !text-foreground !leading-tight md:!text-3xl pt-6">
            How a piece comes together
          </h2>
          <p>
            Most of our rings begin as a wax carving on a bench in front of a north-facing window.
            We rework them, hold them, wear them — until they feel right. Then we cast them in 14k
            or 9k recycled gold using a small foundry partner in Porto, finish them by hand, and
            send them through a four-stage quality check before they ever reach a box.
          </p>
          <p>
            We don&apos;t do drops, releases or capsule collections. We add a new piece when it&apos;s
            ready — usually two or three a year. The collection is intentionally small. We&apos;d rather
            do eight things well than eighty things adequately.
          </p>

          <h2 className="!text-2xl !font-semibold !text-foreground !leading-tight md:!text-3xl pt-6">
            What we promise
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>100% recycled precious metals, traceable to refinery.</li>
            <li>Lab-grown or origin-verified stones; no exceptions.</li>
            <li>Free lifetime cleaning, and free re-plating after the first five years.</li>
            <li>Carbon-neutral shipping, in compostable packaging.</li>
            <li>A straightforward repair policy — and a real person to talk to when you need one.</li>
          </ul>

          <h2 className="!text-2xl !font-semibold !text-foreground !leading-tight md:!text-3xl pt-6">
            Say hello
          </h2>
          <p>
            We answer every email ourselves. Questions about sizing, custom engraving, gifting,
            or anything else — write to <a href="mailto:hello@sensei.studio" className="text-foreground underline-offset-4 hover:underline">hello@sensei.studio</a>.
            We aim to reply within one working day.
          </p>
        </div>
      </article>
    </>
  );
}
