export function ConnectLearningResources() {
  return (
    <section
      aria-labelledby="blaaiz-learning-heading"
      className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-white shadow-sm"
    >
      <div className="border-b border-[var(--color-line)] px-4 py-4 sm:px-5">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-accent)]">
          Integration status
        </p>
        <h2
          id="blaaiz-learning-heading"
          className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold"
        >
          Blaaiz sandbox setup
        </h2>
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-sm leading-6 text-[var(--color-ink-muted)]">
          The current payout journey is an explicitly labelled mock. Blaaiz
          sandbox access and OAuth credentials have not been configured, so this
          app does not request access tokens or create provider payouts.
        </p>
        <a
          href="https://docs.blaaiz.com/docs/guides/authentication"
          className="focus-ring mt-3 inline-flex min-h-11 items-center rounded-md font-semibold text-[var(--color-brand)] underline decoration-[var(--color-brand)] underline-offset-4 hover:text-[var(--color-accent)]"
        >
          Read Blaaiz authentication docs
          <span aria-hidden="true" className="ml-1">↗</span>
        </a>
      </div>
    </section>
  );
}
