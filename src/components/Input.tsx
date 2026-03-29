import type { InputHTMLAttributes } from "react"

const Input = ({
                 className = "",
                 ...props
               }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`w-full rounded border border-stone-700 bg-stone-800 px-3 py-2 text-sm
        text-stone-100 outline-none placeholder:text-stone-600 focus:border-yellow-700
        transition-colors ${className}`}
    {...props}
  />
)

export default Input