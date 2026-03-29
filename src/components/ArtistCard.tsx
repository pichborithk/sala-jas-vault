import type { Artist } from "../types"
import { helpers } from "../db/helpers.ts"

interface ArtistCardProps {
  artist: Artist;
  trackCount: number;
  onClick?: () => void;
}

const ArtistCard = ({ artist, trackCount, onClick }: ArtistCardProps) => (
  <div
    onClick={onClick}
    className="group relative cursor-pointer rounded-lg border border-stone-800 bg-stone-900 p-4
        transition-all hover:-translate-y-px hover:border-yellow-700/50 hover:bg-stone-800"
  >
    <div
      className="mb-3 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full
          border-2 border-stone-700 bg-stone-800 text-lg font-bold text-yellow-400
          transition-colors group-hover:border-yellow-700/50"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {artist.image ? (
        <img src={artist.image} alt={artist.name}
             className="h-full w-full object-cover"/>
      ) : (
        helpers.initials(artist.name)
      )}
    </div>
    <div className="text-sm font-medium text-stone-100">{artist.name}</div>
    <div className="mt-1 font-mono text-[10px] text-stone-500">
      {trackCount} track{trackCount !== 1 ? "s" : ""}
    </div>
    {artist.bio && (
      <div
        className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-stone-500">
        {artist.bio}
      </div>
    )}
  </div>
)

export default ArtistCard