import type { Db, Page } from "../types"

interface NavItemDef {
  id: Page;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItemDef[] = [
  { id: "dashboard", label: "Dashboard", icon: "◈" },
  { id: "productions", label: "Productions", icon: "◉" },
  { id: "artists", label: "Artists", icon: "◎" },
  { id: "tracks", label: "Tracks", icon: "◈" },
]

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  db: Db;
}

const Sidebar = ({ currentPage, onNavigate, db }: SidebarProps) => {
  const badgeFor = (id: Page): number | null => {
    if (id === "productions") return db.productions.length
    if (id === "artists") return db.artists.length
    if (id === "tracks") return db.tracks.length
    return null
  }

  return (
    <nav
      className="flex w-52 flex-shrink-0 flex-col border-r border-stone-800 bg-stone-950 min-h-screen">
      <div className="border-b border-stone-800 px-5 py-7">
        <div
          className="text-xl font-black leading-none text-yellow-400"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          A&R Vault
        </div>
        <div
          className="mt-1 font-mono text-[9px] uppercase tracking-widest text-stone-600">
          Music Library System
        </div>
      </div>

      <div className="flex-1 py-4">
        <div
          className="px-5 pb-1.5 pt-3 font-mono text-[9px] uppercase tracking-widest text-stone-600">
          Overview
        </div>
        {NAV_ITEMS.slice(0, 1).map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={currentPage === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}

        <div
          className="px-5 pb-1.5 pt-5 font-mono text-[9px] uppercase tracking-widest text-stone-600">
          Catalog
        </div>
        {NAV_ITEMS.slice(1).map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={currentPage === item.id}
            onClick={() => onNavigate(item.id)}
            badge={badgeFor(item.id)}
          />
        ))}
      </div>

      <div
        className="border-t border-stone-800 px-5 py-4 font-mono text-[10px] text-stone-600">
        v1.0 · mock data
      </div>
    </nav>
  )
}

interface NavItemProps {
  item: NavItemDef;
  active: boolean;
  onClick: () => void;
  badge?: number | null;
}

const NavItem = ({ item, active, onClick, badge }: NavItemProps) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-2.5 border-l-2 px-5 py-2.5 text-left text-[13.5px] transition-all
        ${active
      ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
      : "border-transparent text-stone-500 hover:bg-stone-900 hover:text-stone-200"
    }`}
  >
    <span className="w-4 text-center text-sm opacity-80">{item.icon}</span>
    {item.label}
    {badge != null && (
      <span
        className={`ml-auto rounded-full border px-1.5 py-px font-mono text-[10px]
            ${active
          ? "border-yellow-700/50 bg-yellow-500/10 text-yellow-400"
          : "border-stone-800 bg-stone-900 text-stone-600"
        }`}
      >
          {badge}
        </span>
    )}
  </button>
)

export default Sidebar