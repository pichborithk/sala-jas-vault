const StyledSelect = ({
                        children,
                        className = "",
                        ...props
                      }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={`w-full cursor-pointer rounded border border-stone-700 bg-stone-800 px-3 py-2
        text-sm text-stone-100 outline-none focus:border-yellow-700 transition-colors ${className}`}
    {...props}
  >
    {children}
  </select>
)

export default StyledSelect