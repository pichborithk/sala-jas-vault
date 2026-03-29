import type { ReactNode } from "react"

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <div
      className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-stone-500">
      {label}
    </div>
    {children}
  </div>
)

export default Field