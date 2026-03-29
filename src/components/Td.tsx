import type { ReactNode } from "react"

interface TdProps {
  children?: ReactNode;
  mono?: boolean;
  size?: "sm" | "md";
}

const Td = ({ children, mono = false, size = "md" }: TdProps) => {
  const pad = size === "sm" ? "px-4 py-2" : "px-4 py-3"
  return (
    <td
      className={`${pad} align-middle text-stone-300 ${mono ? "font-mono text-xs text-stone-500" : ""}`}>
      {children}
    </td>
  )
}

export default Td