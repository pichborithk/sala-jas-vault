import type { ReactNode } from "react"


interface SectionHeaderProps {
  title: string;
  count?: number;
  children?: ReactNode;
}

const SectionHeader = ({ title, count, children }: SectionHeaderProps) => (
  <div className="mb-4 flex items-baseline gap-3">
    <h2
      className="text-xl font-bold text-stone-100"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {title}
    </h2>
    {count != null && (
      <span
        className="font-mono text-[11px] text-stone-500">{count} records</span>
    )}
    <div className="ml-auto flex items-center gap-2">{children}</div>
  </div>
)

export default SectionHeader