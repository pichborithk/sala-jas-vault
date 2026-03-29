import { useEffect, useState } from "react"
import type { Db } from "../types"
import { helpers, PAGE_SIZE } from "../db/helpers.ts"
import SectionHeader from "../components/SectionHeader.tsx"
import Btn from "../components/Btn.tsx"
import SearchBar from "../components/SearchBar.tsx"
import EmptyState from "../components/EmptyState.tsx"
import Th from "../components/Th.tsx"
import Td from "../components/Td.tsx"
import Tag from "../components/Tag.tsx"
import Pagination from "../components/Pagination.tsx"

interface TracksProps {
  db: Db;
  search: string;
  onOpenAssign: (trackId?: string) => void;
}

const Tracks = ({ db, search, onOpenAssign }: TracksProps) => {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")

  useEffect(() => {
    setPage(1)
    setQuery(search)
  }, [search])

  const q = (query || search).toLowerCase()
  const filtered = db.tracks.filter((t) => {
    if (!q) return true
    const album = db.albums.find((a) => a.id === t.album_id)
    const artists = helpers.artistsByTrack(db, t.id)
    return (
      t.name.toLowerCase().includes(q) ||
      (album?.name ?? "").toLowerCase().includes(q) ||
      artists.some((a) => a.name.toLowerCase().includes(q))
    )
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="p-7">
      <SectionHeader title="Tracks" count={filtered.length}>
        <Btn variant="primary" onClick={() => onOpenAssign()}>+ Add Artist to
          Track</Btn>
      </SectionHeader>

      <div className="mb-4 flex gap-2">
        <SearchBar
          value={query}
          onChange={(v) => {
            setQuery(v)
            setPage(1)
          }}
          placeholder="Search by title, album, or artist..."
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="◈" message="No tracks found."/>
      ) : (
        <div className="overflow-hidden rounded-lg border border-stone-800">
          <table className="w-full">
            <thead>
            <tr className="border-b border-stone-800 bg-stone-900/80">
              <Th>#</Th><Th>Title</Th><Th>Album</Th><Th>Artists</Th><Th>Dur.</Th><Th/>
            </tr>
            </thead>
            <tbody>
            {slice.map((t) => {
              const artists = helpers.artistsByTrack(db, t.id)
              const album = db.albums.find((a) => a.id === t.album_id)
              const production = album
                ? db.productions.find((p) => p.id === album.production_id)
                : null

              return (
                <tr key={t.id}
                    className="border-b border-stone-800 last:border-0 hover:bg-stone-800/40 transition-colors">
                  <Td mono>{t.track_number}</Td>
                  <Td>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div
                      className="mt-0.5 font-mono text-[10px] text-stone-600">{t.id}</div>
                  </Td>
                  <Td>
                    <div className="text-sm">{album?.name ?? "—"}</div>
                    {production && (
                      <div
                        className="mt-0.5 font-mono text-[10px] text-stone-500">
                        {production.name}
                      </div>
                    )}
                  </Td>
                  <Td>
                    {artists.length > 0 ? (
                      artists.map((a) => (
                        <Tag key={`${a.id}-${a.role}`}
                             gold={a.role === "Primary"} className="text-[9px]">
                          {a.name}
                        </Tag>
                      ))
                    ) : (
                      <span className="font-mono text-xs text-stone-600">No artists</span>
                    )}
                  </Td>
                  <Td mono>{t.duration}</Td>
                  <Td>
                    <Btn
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenAssign(t.id)
                      }}
                    >
                      + Artist
                    </Btn>
                  </Td>
                </tr>
              )
            })}
            </tbody>
          </table>
          <Pagination page={page} totalPages={totalPages} onPage={setPage}/>
        </div>
      )}
    </div>
  )
}

export default Tracks