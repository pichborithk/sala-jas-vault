import type { Album, ArtistWithRole, Db, Track } from "../types"

const helpers = {
  albumsByProduction: (db: Db, pid: string): Album[] =>
    db.albums.filter((a) => a.production_id === pid),

  tracksByAlbum: (db: Db, aid: string): Track[] =>
    db.tracks.filter((t) => t.album_id === aid),

  artistsByTrack: (db: Db, tid: string): ArtistWithRole[] =>
    db.track_artist
      .filter((ta) => ta.track_id === tid)
      .flatMap((ta) => {
        const artist = db.artists.find((a) => a.id === ta.artist_id)
        return artist ? [{ ...artist, role: ta.role }] : []
      }),

  trackCountForArtist: (db: Db, aid: string): number =>
    db.track_artist.filter((ta) => ta.artist_id === aid).length,

  initials: (name: string): string =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),

  nextId: (prefix: string): string => `${prefix}_${Date.now()}`,
}

const PAGE_SIZE = 8

export { helpers, PAGE_SIZE }