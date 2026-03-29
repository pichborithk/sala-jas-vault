interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({
                     value,
                     onChange,
                     placeholder = "Search..."
                   }: SearchBarProps) => (
  <div
    className="flex flex-1 items-center gap-2 rounded border border-stone-800 bg-stone-900 px-3 py-2">
    <span className="text-sm text-stone-600">⌕</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent text-sm text-stone-200 outline-none placeholder:text-stone-600"
    />
    {value && (
      <button
        onClick={() => onChange("")}
        className="text-xs text-stone-600 hover:text-stone-400"
      >
        ✕
      </button>
    )}
  </div>
)

export default SearchBar