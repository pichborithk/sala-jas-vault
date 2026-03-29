import type { Artist, ArtistRole, Db, Page } from "./types"
import { useCallback, useState } from "react"
import useToast from "./hooks/useToast.ts"
import { initialDb } from "./db/mockData.ts"
import { helpers } from "./db/helpers.ts"
import Sidebar from "./components/Sidebar.tsx"
import Topbar from "./components/Topbar.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import Productions from "./pages/Productions.tsx"
import Artists from "./pages/Artists.tsx"
import Tracks from "./pages/Tracks.tsx"
import Modal from "./components/Modal.tsx"
import Btn from "./components/Btn.tsx"
import Field from "./components/Field.tsx"
import Input from "./components/Input.tsx"
import Textarea from "./components/Textarea.tsx"
import StyledSelect from "./components/StyledSelect.tsx"
import ToastContainer from "./components/Toast.tsx"

const ARTIST_ROLES: ArtistRole[] = ["Primary", "Featured", "Producer", "Composer", "Remixer"];

export default function App() {
  const [db, setDb]                 = useState<Db>(initialDb);
  const [page, setPage]             = useState<Page>("dashboard");
  const [globalSearch, setGlobalSearch] = useState("");

  // Modal visibility
  const [createArtistOpen, setCreateArtistOpen] = useState(false);
  const [assignOpen,        setAssignOpen]        = useState(false);

  // Create Artist form
  const [artistName,  setArtistName]  = useState("");
  const [artistImage, setArtistImage] = useState("");
  const [artistBio,   setArtistBio]   = useState("");

  // Assign Artist form
  const [assignTrack,  setAssignTrack]  = useState("");
  const [assignArtist, setAssignArtist] = useState("");
  const [assignRole,   setAssignRole]   = useState<ArtistRole>("Primary");

  const { toasts, toast } = useToast();

  const navigate = useCallback((p: Page) => {
    setPage(p);
    setGlobalSearch("");
  }, []);

  const openCreateArtist = () => {
    setArtistName(""); setArtistImage(""); setArtistBio("");
    setCreateArtistOpen(true);
  };

  const openAssign = (trackId = "") => {
    setAssignTrack(trackId);
    setAssignArtist("");
    setAssignRole("Primary");
    setAssignOpen(true);
  };

  const handleCreateArtist = () => {
    if (!artistName.trim()) {
      toast("Artist name is required.", "error");
      return;
    }
    const newArtist: Artist = {
      id:    helpers.nextId("ar"),
      name:  artistName.trim(),
      image: artistImage.trim() || null,
      bio:   artistBio.trim()   || null,
    };
    setDb((prev) => ({ ...prev, artists: [...prev.artists, newArtist] }));
    setCreateArtistOpen(false);
    toast(`"${newArtist.name}" created successfully.`, "success");
  };

  const handleAssignArtist = () => {
    if (!assignTrack || !assignArtist) {
      toast("Please select both a track and an artist.", "error");
      return;
    }
    const exists = db.track_artist.find(
      (ta) => ta.track_id === assignTrack && ta.artist_id === assignArtist
    );
    if (exists) {
      toast("This artist is already linked to this track.", "error");
      return;
    }

    const track  = db.tracks.find((t) => t.id === assignTrack);
    const artist = db.artists.find((a) => a.id === assignArtist);
    if (!track || !artist) return;

    setDb((prev) => ({
      ...prev,
      track_artist: [
        ...prev.track_artist,
        { track_id: assignTrack, artist_id: assignArtist, role: assignRole },
      ],
    }));
    setAssignOpen(false);
    toast(`"${artist.name}" added to "${track.name}" as ${assignRole}.`, "success");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap');
        @keyframes slideIn { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
        @keyframes modalIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        body { font-family:'IBM Plex Sans',sans-serif; background:#0c0a09; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#292524; border-radius:3px; }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-stone-950 text-stone-200">
        <Sidebar currentPage={page} onNavigate={navigate} db={db} />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Topbar currentPage={page} globalSearch={globalSearch} onGlobalSearch={setGlobalSearch} />

          <main className="flex-1 overflow-y-auto">
            {page === "dashboard"   && <Dashboard   db={db} onNavigate={navigate} onOpenCreateArtist={openCreateArtist} onOpenAssign={openAssign} />}
            {page === "productions" && <Productions db={db} search={globalSearch} />}
            {page === "artists"     && <Artists     db={db} search={globalSearch} onOpenCreateArtist={openCreateArtist} onOpenAssign={openAssign} />}
            {page === "tracks"      && <Tracks      db={db} search={globalSearch} onOpenAssign={openAssign} />}
          </main>
        </div>
      </div>

      {/* ── Create Artist Modal ── */}
      <Modal
        open={createArtistOpen}
        onClose={() => setCreateArtistOpen(false)}
        title="New Artist"
        footer={
          <>
            <Btn onClick={() => setCreateArtistOpen(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={handleCreateArtist}>Create Artist</Btn>
          </>
        }
      >
        <Field label="Artist Name *">
          <Input
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="e.g. Miles Davis"
            onKeyDown={(e) => e.key === "Enter" && handleCreateArtist()}
            autoFocus
          />
        </Field>
        <Field label="Image URL">
          <Input
            value={artistImage}
            onChange={(e) => setArtistImage(e.target.value)}
            placeholder="https://..."
            type="url"
          />
        </Field>
        <Field label="Bio">
          <Textarea
            value={artistBio}
            onChange={(e) => setArtistBio(e.target.value)}
            placeholder="Short biography..."
            rows={3}
          />
        </Field>
      </Modal>

      {/* ── Assign Artist to Track Modal ── */}
      <Modal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        title="Add Artist to Track"
        footer={
          <>
            <Btn onClick={() => setAssignOpen(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={handleAssignArtist}>Add to Track</Btn>
          </>
        }
      >
        <Field label="Track">
          <StyledSelect value={assignTrack} onChange={(e) => setAssignTrack(e.target.value)}>
            <option value="">Select a track…</option>
            {db.tracks.map((t) => {
              const album = db.albums.find((a) => a.id === t.album_id);
              return (
                <option key={t.id} value={t.id}>
                  {t.name}{album ? ` — ${album.name}` : ""}
                </option>
              );
            })}
          </StyledSelect>
        </Field>
        <Field label="Artist">
          <StyledSelect value={assignArtist} onChange={(e) => setAssignArtist(e.target.value)}>
            <option value="">Select an artist…</option>
            {db.artists.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </StyledSelect>
        </Field>
        <Field label="Role">
          <StyledSelect
            value={assignRole}
            onChange={(e) => setAssignRole(e.target.value as ArtistRole)}
          >
            {ARTIST_ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </StyledSelect>
        </Field>
      </Modal>

      <ToastContainer toasts={toasts} />
    </>
  );
}