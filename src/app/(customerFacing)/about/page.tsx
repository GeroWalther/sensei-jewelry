export const metadata = { title: "About — Sensei" };

export default function AboutPage() {
  return (
    <article className="container-narrow max-w-2xl py-16 md:py-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">About</p>
      <h1 className="mt-3 text-4xl font-semibold md:text-5xl">A small studio. A short list of things.</h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
        <p>
          Sensei is a small studio designing essentials for everyday life. We work with a tight set of
          materials and a clear point of view: make fewer things, make them properly.
        </p>
        <p>
          Each piece starts with a function and ends with a finish you&apos;ll want to keep around. No
          seasonal drops, no overproduction — just objects intended to be used for a long time.
        </p>
        <p>
          We ship directly from our studio. Questions, repairs, or anything in between: get in touch.
        </p>
      </div>
    </article>
  );
}
