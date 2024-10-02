"use client";

import { useEffect, useState } from "react";
import { SongCard } from "./SongCard";
import { fetchAllSongs } from "@/app/_actions/songs";

export default function AllSongs({ spaceId }) {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function loadSongs() {
      try {
        const fetchedSongs = await fetchAllSongs({ spaceId });
        setSongs(fetchedSongs);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadSongs();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Songs</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
}
