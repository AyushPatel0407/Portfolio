/**
 * Section heading (BRAND.md): a shell prompt with the command, then the h2 and an optional lede.
 */
export default function SectionLabel({
  children,
  title,
  intro,
}: {
  index?: string;
  children: React.ReactNode;
  title?: React.ReactNode;
  intro?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      {title ? (
        <p aria-hidden className="code mb-3 text-muted">
          <span className="text-ok">ayush@portfolio</span>:<span className="text-link">~</span>$ <span className="text-foreground">{children}</span>
        </p>
      ) : null}
      <h2 className="title text-[1.8rem] leading-[1.1] sm:text-[2.5rem]">{title ?? children}</h2>
      {intro && <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-2">{intro}</p>}
    </div>
  );
}
