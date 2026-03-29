import type { ReactNode } from "react"

interface TagProps {
  children: ReactNode;
  gold?: boolean;
  className?: string;
}

const Tag = ({ children, gold = false, className = "" }: TagProps) => {
  return <span
    className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[10px] m-0.5
        ${gold
      ? "border-yellow-700/50 bg-yellow-500/10 text-yellow-400"
      : "border-stone-700 bg-stone-800 text-stone-400"
    } ${className}`
    }
  >
  {children}
  </span>
}

export default Tag