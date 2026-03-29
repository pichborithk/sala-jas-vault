import { useState } from "react"
import type { Db } from "../types"
import SectionHeader from "../components/SectionHeader.tsx"
import EmptyState from "../components/EmptyState.tsx"
import { helpers } from "../db/helpers.ts"
import Tag from "../components/Tag.tsx"
import Th from "../components/Th.tsx"
import Td from "../components/Td.tsx"

const Productions = ({ db, search }: { db: Db; search: string }) => {
  const [openProds, setOpenProds] = useState<Record<string, boolean>>({})
  const [openAlbums, setOpenAlbums] = useState<Record<string, boolean>>({})

  const filtered = db.productions.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  )

  const toggleProd = (id: string) => setOpenProds((prev) => ({
    ...prev,
    [id]: !prev[id]
  }))
  const toggleAlbum = (id: string) => setOpenAlbums((prev) => ({
    ...prev,
    [id]: !prev[id]
  }))

  return (
    <div className="p-7">
      <SectionHeader title="Productions" count={filtered.length}/>

      {filtered.length === 0 ? (
        <EmptyState icon="◉" message="No productions found."/>
      ) : (
        filtered.map((p) => {
          const albums = helpers.albumsByProduction(db, p.id)
          const totalTracks = albums.flatMap((a) => helpers.tracksByAlbum(db, a.id)).length
          const artistIds = new Set(
            albums
              .flatMap((a) => helpers.tracksByAlbum(db, a.id))
              .flatMap((t) => helpers.artistsByTrack(db, t.id))
              .map((a) => a.id)
          )

          return (
            <div key={p.id}
                 className="mb-3 overflow-hidden rounded-lg border border-stone-800">
              {/* Production header */}
              <button
                onClick={() => toggleProd(p.id)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-stone-800/50 transition-colors"
              >
                <div className="flex-1">
                  <div
                    className="font-bold text-stone-100"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-xs text-stone-500">
                    {albums.length} album{albums.length !== 1 ? "s" : ""} · {totalTracks} tracks
                    · {artistIds.size} artists
                  </div>
                </div>
                <Tag gold>{p.id}</Tag>
                <span
                  className={`text-sm text-stone-500 transition-transform duration-200 ${
                    openProds[p.id] ? "rotate-90" : ""
                  }`}
                >›</span>
              </button>

              {/* Albums */}
              {openProds[p.id] && (
                <div
                  className="border-t border-stone-800 bg-stone-950/50 px-5 pb-4">
                  {albums.map((a) => {
                    const tracks = helpers.tracksByAlbum(db, a.id)
                    return (
                      <div key={a.id}
                           className="mt-3 overflow-hidden rounded border border-stone-800">
                        <button
                          onClick={() => toggleAlbum(a.id)}
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left hover:bg-stone-800/40 transition-colors"
                        >
                          <span className="text-sm text-yellow-500">◈</span>
                          <div className="flex-1">
                            <span
                              className="text-sm font-medium text-stone-200">{a.name}</span>
                            <span
                              className="ml-2 font-mono text-[10px] text-stone-500">
                              {a.year} · {tracks.length} tracks
                            </span>
                          </div>
                          <span
                            className={`text-xs text-stone-600 transition-transform duration-200 ${
                              openAlbums[a.id] ? "rotate-90" : ""
                            }`}
                          >›</span>
                        </button>

                        {openAlbums[a.id] && (
                          <div className="border-t border-stone-800">
                            <table className="w-full">
                              <thead>
                              <tr
                                className="border-b border-stone-800 bg-stone-900/60">
                                <Th>#</Th><Th>Title</Th><Th>Artists</Th><Th>Duration</Th>
                              </tr>
                              </thead>
                              <tbody>
                              {tracks.map((t) => {
                                const tArtists = helpers.artistsByTrack(db, t.id)
                                return (
                                  <tr key={t.id}
                                      className="border-b border-stone-800/50 last:border-0 hover:bg-stone-800/30 transition-colors">
                                    <Td mono size="sm">{t.track_number}</Td>
                                    <Td size="sm">
                                      <span
                                        className="font-medium text-stone-200">{t.name}</span>
                                    </Td>
                                    <Td size="sm">
                                      {tArtists.map((a) => (
                                        <Tag key={a.id}
                                             gold={a.role === "Primary"}>{a.name}</Tag>
                                      ))}
                                    </Td>
                                    <Td mono size="sm">{t.duration}</Td>
                                  </tr>
                                )
                              })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

export default Productions