import type { ReactNode } from "react"

const Th = ({ children }: { children?: ReactNode }) => (
  <th
    className="whitespace-nowrap px-4 py-2.5 text-left font-mono text-[10px] font-medium uppercase tracking-widest text-stone-500">
    {children}
  </th>
)

export default Th