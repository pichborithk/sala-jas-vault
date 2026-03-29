import type { Db, Page } from "../types"
import StatCard from "../components/StatCard.tsx"
import SectionHeader from "../components/SectionHeader.tsx"
import Btn from "../components/Btn.tsx"
import Th from "../components/Th.tsx"
import { helpers } from "../db/helpers.ts"
import Td from "../components/Td.tsx"
import Tag from "../components/Tag.tsx"
import ArtistCard from "../components/ArtistCard.tsx"

interface DashboardProps {
  db: Db;
  onNavigate: (page: Page) => void;
  onOpenCreateArtist: () => void;
  onOpenAssign: (trackId?: string) => void;
}

const Dashboard = ({ db, onNavigate, onOpenCreateArtist }: DashboardProps) => {
  const recentTracks  = [...db.tracks].reverse().slice(0, 6);
  const recentArtists = [...db.artists].reverse().slice(0, 4);

  return (
    <div className="space-y-7 p-7">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Productions" value={db.productions.length} sub={`${db.albums.length} albums`}                   onClick={() => onNavigate("productions")} />
        <StatCard label="Albums"      value={db.albums.length}      sub={`across ${db.productions.length} productions`}   onClick={() => onNavigate("productions")} />
        <StatCard label="Tracks"      value={db.tracks.length}      sub={`${db.track_artist.length} artist links`}         onClick={() => onNavigate("tracks")} />
        <StatCard label="Artists"     value={db.artists.length}     sub="in catalog"                                       onClick={() => onNavigate("artists")} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent tracks */}
        <div>
          <SectionHeader title="Recent Tracks">
            <Btn onClick={() => onNavigate("tracks")}>View all</Btn>
          </SectionHeader>
          <div className="overflow-hidden rounded-lg border border-stone-800">
            <table className="w-full">
              <thead>
              <tr className="border-b border-stone-800 bg-stone-900/80">
                <Th>#</Th><Th>Title</Th><Th>Artists</Th><Th>Dur.</Th>
              </tr>
              </thead>
              <tbody>
              {recentTracks.map((t) => {
                const artists = helpers.artistsByTrack(db, t.id);
                const album   = db.albums.find((a) => a.id === t.album_id);
                return (
                  <tr key={t.id} className="border-b border-stone-800 last:border-0 hover:bg-stone-800/50 transition-colors">
                    <Td mono>{t.track_number}</Td>
                    <Td>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="mt-0.5 font-mono text-[10px] text-stone-500">{album?.name}</div>
                    </Td>
                    <Td>
                      {artists.length > 0
                        ? artists.slice(0, 2).map((a) => <Tag key={a.id}>{a.name}</Tag>)
                        : <span className="font-mono text-xs text-stone-600">—</span>}
                    </Td>
                    <Td mono>{t.duration}</Td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent artists */}
        <div>
          <SectionHeader title="Artists">
            <Btn variant="primary" onClick={onOpenCreateArtist}>+ New Artist</Btn>
            <Btn onClick={() => onNavigate("artists")}>View all</Btn>
          </SectionHeader>
          <div className="grid grid-cols-2 gap-3">
            {recentArtists.map((a) => (
              <ArtistCard
                key={a.id}
                artist={a}
                trackCount={helpers.trackCountForArtist(db, a.id)}
                onClick={() => onNavigate("artists")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;