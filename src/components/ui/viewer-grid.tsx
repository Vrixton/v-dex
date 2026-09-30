export function ViewerGrid() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <span
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-brand-cyan) 1px, transparent 1px), linear-gradient(to bottom, var(--color-brand-cyan) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {[0, 1.33, 2.66].map((delay) => (
        <span
          key={delay}
          style={{ animationDelay: `${delay}s` }}
          className="absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-cyan motion-safe:animate-radar-ping motion-reduce:opacity-[0.07]"
        />
      ))}

      <span className="absolute top-1/2 left-1/2 h-px w-40 -translate-x-1/2 -translate-y-1/2 bg-brand-cyan opacity-[0.07]" />
      <span className="absolute top-1/2 left-1/2 h-40 w-px -translate-x-1/2 -translate-y-1/2 bg-brand-cyan opacity-[0.07]" />

      <span
        className="absolute inset-x-6 top-0 h-2 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--color-brand-cyan) 0 1px, transparent 1px 18px)",
        }}
      />
      <span
        className="absolute inset-x-6 bottom-0 h-2 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--color-brand-cyan) 0 1px, transparent 1px 18px)",
        }}
      />
      <span
        className="absolute inset-y-6 left-0 w-2 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--color-brand-cyan) 0 1px, transparent 1px 18px)",
        }}
      />
      <span
        className="absolute inset-y-6 right-0 w-2 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--color-brand-cyan) 0 1px, transparent 1px 18px)",
        }}
      />
    </span>
  );
}
