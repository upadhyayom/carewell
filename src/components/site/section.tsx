import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-16 sm:px-8 md:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-inset ring-brand-600/10",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-brand-500" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 max-w-2xl md:mb-14", center && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-pretty text-base leading-relaxed text-ink-500 md:text-lg">{lead}</p>}
    </Reveal>
  );
}
