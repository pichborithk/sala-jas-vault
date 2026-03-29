interface StatCardProps {
  label: string;
  value: number;
  sub?: string;
  onClick?: () => void;
}

const StatCard = ({ label, value, sub, onClick }: StatCardProps) => (
  <div
    onClick={onClick}
    className="group relative cursor-pointer overflow-hidden rounded-lg border border-stone-800
        bg-stone-900 p-5 transition-all hover:border-stone-700"
  >
    <div
      className="absolute left-0 right-0 top-0 h-px bg-yellow-500 opacity-0 transition-opacity group-hover:opacity-100"/>
    <div
      className="mb-2 font-mono text-[10px] uppercase tracking-widest text-stone-500">
      {label}
    </div>
    <div
      className="text-4xl font-black text-yellow-400"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {value}
    </div>
    {sub && <div className="mt-1.5 text-xs text-stone-500">{sub}</div>}
  </div>
)

export default StatCard