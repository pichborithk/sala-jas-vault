import type { Page } from "../types"
import SearchBar from "./SearchBar.tsx"

const PAGE_TITLES: Record<Page, string> = {
  dashboard: "Dashboard",
  productions: "Productions",
  artists: "Artists",
  tracks: "Tracks",
}

interface TopbarProps {
  currentPage: Page;
  globalSearch: string;
  onGlobalSearch: (val: string) => void;
}

const Topbar = ({ currentPage, globalSearch, onGlobalSearch }: TopbarProps) => (
  <div
    className="flex h-14 flex-shrink-0 items-center gap-4 border-b border-stone-800 bg-stone-950 px-7">
    <div>
      <div
        className="text-[17px] font-bold leading-tight text-stone-100"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {PAGE_TITLES[currentPage]}
      </div>
      <div className="font-mono text-[10px] text-stone-600">
        A&R Vault › {PAGE_TITLES[currentPage]}
      </div>
    </div>
    <div className="ml-auto w-56">
      <SearchBar value={globalSearch} onChange={onGlobalSearch}
                 placeholder="Search anything..."/>
    </div>
  </div>
)

export default Topbar