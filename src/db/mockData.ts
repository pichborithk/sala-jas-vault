import type { Db } from "../types"

const initialDb: Db = {
  productions: [
    { id: "p1", name: "Neon Reverie" },
    { id: "p2", name: "The Copper Sessions" },
    { id: "p3", name: "Midnight Protocol" },
  ],
  albums: [
    { id: "a1", production_id: "p1", name: "Neon Reverie Vol. I", year: 2023 },
    { id: "a2", production_id: "p1", name: "Neon Reverie Vol. II", year: 2024 },
    { id: "a3", production_id: "p2", name: "Copper Sessions: Raw", year: 2022 },
    { id: "a4", production_id: "p3", name: "Protocol Alpha", year: 2024 },
    { id: "a5", production_id: "p3", name: "Protocol Beta", year: 2025 },
  ],
  tracks: [
    {
      id: "t1",
      album_id: "a1",
      name: "Ultraviolet",
      duration: "3:42",
      track_number: 1
    },
    {
      id: "t2",
      album_id: "a1",
      name: "Glass Ceiling",
      duration: "4:01",
      track_number: 2
    },
    {
      id: "t3",
      album_id: "a1",
      name: "Phosphene",
      duration: "5:18",
      track_number: 3
    },
    {
      id: "t4",
      album_id: "a2",
      name: "Afterglow",
      duration: "3:55",
      track_number: 1
    },
    {
      id: "t5",
      album_id: "a2",
      name: "Drift",
      duration: "6:10",
      track_number: 2
    },
    {
      id: "t6",
      album_id: "a3",
      name: "Copper Wire",
      duration: "4:22",
      track_number: 1
    },
    {
      id: "t7",
      album_id: "a3",
      name: "Rust & Gold",
      duration: "3:30",
      track_number: 2
    },
    {
      id: "t8",
      album_id: "a4",
      name: "Init",
      duration: "2:55",
      track_number: 1
    },
    {
      id: "t9",
      album_id: "a4",
      name: "Encrypted",
      duration: "4:47",
      track_number: 2
    },
    {
      id: "t10",
      album_id: "a4",
      name: "Payload",
      duration: "3:33",
      track_number: 3
    },
    {
      id: "t11",
      album_id: "a5",
      name: "Handshake",
      duration: "5:02",
      track_number: 1
    },
    {
      id: "t12",
      album_id: "a5",
      name: "Signal Loss",
      duration: "4:19",
      track_number: 2
    },
  ],
  artists: [
    {
      id: "ar1",
      name: "Solène Marais",
      bio: "Electronic music producer from Lyon.",
      image: null
    },
    {
      id: "ar2",
      name: "Kael Voss",
      bio: "Jazz-influenced multi-instrumentalist.",
      image: null
    },
    {
      id: "ar3",
      name: "Dara Osei",
      bio: "Afrobeat and neo-soul vocalist.",
      image: null
    },
    {
      id: "ar4",
      name: "Tomas Reiner",
      bio: "Berlin-based composer and sound designer.",
      image: null
    },
    {
      id: "ar5",
      name: "Yuki Ashford",
      bio: "Ambient and experimental artist.",
      image: null
    },
  ],
  track_artist: [
    { track_id: "t1", artist_id: "ar1", role: "Primary" },
    { track_id: "t1", artist_id: "ar2", role: "Featured" },
    { track_id: "t2", artist_id: "ar1", role: "Primary" },
    { track_id: "t3", artist_id: "ar3", role: "Primary" },
    { track_id: "t4", artist_id: "ar1", role: "Primary" },
    { track_id: "t4", artist_id: "ar4", role: "Producer" },
    { track_id: "t5", artist_id: "ar5", role: "Primary" },
    { track_id: "t6", artist_id: "ar2", role: "Primary" },
    { track_id: "t7", artist_id: "ar2", role: "Primary" },
    { track_id: "t7", artist_id: "ar3", role: "Featured" },
    { track_id: "t8", artist_id: "ar4", role: "Primary" },
    { track_id: "t9", artist_id: "ar4", role: "Primary" },
    { track_id: "t10", artist_id: "ar4", role: "Primary" },
    { track_id: "t11", artist_id: "ar5", role: "Primary" },
    { track_id: "t12", artist_id: "ar5", role: "Primary" },
  ],
}

export { initialDb }