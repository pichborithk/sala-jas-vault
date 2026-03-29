import type { BtnSize, BtnVariant } from "../types"

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
}

const Btn = ({
               variant = "ghost",
               size = "md",
               children,
               className = "",
               ...props
             }: BtnProps) => {
  const base =
    "font-mono text-[11px] uppercase tracking-wider rounded transition-all cursor-pointer border"
  const sizes: Record<BtnSize, string> = {
    sm: "px-2 py-1",
    md: "px-3.5 py-1.5",
    lg: "px-5 py-2",
  }
  const variants: Record<BtnVariant, string> = {
    primary: "bg-yellow-500 text-stone-950 border-yellow-500 hover:bg-yellow-400 font-semibold",
    ghost: "bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200",
    danger: "bg-transparent text-red-500 border-red-800 hover:bg-red-950",
  }
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Btn