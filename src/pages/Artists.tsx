import { useEffect, useState } from "react"
import type { Db, ViewMode } from "../types"
import { helpers, PAGE_SIZE } from "../db/helpers.ts"
import Btn from "../components/Btn.tsx"
import SectionHeader from "../components/SectionHeader.tsx"
import SearchBar from "../components/SearchBar.tsx"
import EmptyState from "../components/EmptyState.tsx"
import ArtistCard from "../components/ArtistCard.tsx"
import Pagination from "../components/Pagination.tsx"
import Th from "../components/Th.tsx"
import Td from "../components/Td.tsx"

interface ArtistsProps {
  db: Db;
  search: string;
  onOpenCreateArtist: () => void;
  onOpenAssign: (trackId?: string) => void;
}

const Artists = ({
                   db,
                   search,
                   onOpenCreateArtist,
                   onOpenAssign
                 }: ArtistsProps) => {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [view, setView] = useState<ViewMode>("grid")

  useEffect(() => {
    setPage(1)
    setQuery(search)
  }, [search])

  const q = (query || search).toLowerCase()
  const filtered = db.artists.filter(
    (a) => !q || a.name.toLowerCase().includes(q) || (a.bio ?? "").toLowerCase().includes(q)
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="p-7">
      <SectionHeader title="Artists" count={filtered.length}>
        <div
          className="flex overflow-hidden rounded border border-stone-800 bg-stone-900">
          {(["grid", "list"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-2.5 py-1.5 text-xs transition-colors ${
                view === v ? "bg-stone-800 text-yellow-400" : "text-stone-500 hover:text-stone-300"
              }`}
            >
              {v === "grid" ? "⊞" : "≡"}
            </button>
          ))}
        </div>
        <Btn onClick={() => onOpenAssign()}>+ Add to Track</Btn>
        <Btn variant="primary" onClick={onOpenCreateArtist}>+ New Artist</Btn>
      </SectionHeader>

      <div className="mb-4 flex gap-2">
        <SearchBar
          value={query}
          onChange={(v) => {
            setQuery(v)
            setPage(1)
          }}
          placeholder="Search artists..."
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="◎" message="No artists found. Create one!"/>
      ) : view === "grid" ? (
        <>
          <div className="mb-4 grid grid-cols-4 gap-3">
            {slice.map((a) => (
              <ArtistCard key={a.id} artist={a}
                          trackCount={helpers.trackCountForArtist(db, a.id)}/>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPage={setPage}/>
        </>
      ) : (
        <div
          className="mb-4 overflow-hidden rounded-lg border border-stone-800">
          <table className="w-full">
            <thead>
            <tr className="border-b border-stone-800 bg-stone-900/80">
              <Th>Artist</Th><Th>Bio</Th><Th>Tracks</Th><Th>ID</Th>
            </tr>
            </thead>
            <tbody>
            {slice.map((a) => (
              <tr key={a.id}
                  className="border-b border-stone-800 last:border-0 hover:bg-stone-800/50 transition-colors">
                <Td>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full
                          border border-stone-700 bg-stone-800 text-xs font-bold text-yellow-400"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {helpers.initials(a.name)}
                    </div>
                    <span className="text-sm font-medium">{a.name}</span>
                  </div>
                </Td>
                <Td>
                    <span className="text-xs text-stone-500">
                      {a.bio ? a.bio.slice(0, 70) + (a.bio.length > 70 ? "…" : "") : "—"}
                    </span>
                </Td>
                <Td mono>{helpers.trackCountForArtist(db, a.id)}</Td>
                <Td mono><span className="text-[11px]">{a.id}</span></Td>
              </tr>
            ))}
            </tbody>
          </table>
          <Pagination page={page} totalPages={totalPages} onPage={setPage}/>
        </div>
      )}
    </div>
  )
}

export default Artists