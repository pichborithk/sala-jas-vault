export type Page = "dashboard" | "productions" | "artists" | "tracks";
export type ArtistRole = "Primary" | "Featured" | "Producer" | "Composer" | "Remixer";
export type ToastType = "success" | "error";
export type ViewMode = "grid" | "list";
export type BtnVariant = "primary" | "ghost" | "danger";
export type BtnSize = "sm" | "md" | "lg";

export interface Production {
  id: string;
  name: string;
}

export interface Album {
  id: string;
  production_id: string;
  name: string;
  year: number;
}

export interface Track {
  id: string;
  album_id: string;
  name: string;
  duration: string;
  track_number: number;
}

export interface Artist {
  id: string;
  name: string;
  bio: string | null;
  image: string | null;
}

export interface TrackArtist {
  track_id: string;
  artist_id: string;
  role: ArtistRole;
}

/** Artist with role attached — returned by artistsByTrack() */
export interface ArtistWithRole extends Artist {
  role: ArtistRole;
}

export interface Db {
  productions: Production[];
  albums: Album[];
  tracks: Track[];
  artists: Artist[];
  track_artist: TrackArtist[];
}

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}