export function CrtSweep() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden motion-reduce:hidden"
    >
      <span className="absolute inset-0 motion-safe:animate-crt-sweep">
        <span className="absolute inset-x-0 top-0 h-16 -translate-y-1/2 bg-gradient-to-b from-transparent via-sweep to-transparent opacity-10" />
        <span className="absolute inset-x-0 top-0 h-px bg-brand-cyan/4 shadow-glow-md" />
      </span>
    </span>
  );
}
