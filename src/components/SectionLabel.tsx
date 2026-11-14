export default function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-baseline gap-4 border-t border-line pt-6">
      <span className="font-mono text-xs text-accent">{index}</span>
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{children}</h2>
    </div>
  );
}
