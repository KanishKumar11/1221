import { useQuery } from "@tanstack/react-query";
import { SongCard } from "./SongCard";
import { fetchRecentSongs } from "@/app/_actions/songs";

export function RecentSongs({ spaceId }) {
  async function fetchSongs() {
    const response = await fetchRecentSongs({ spaceId });

    return response;
  }
  const {
    data: songs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentSongs"],
    queryFn: fetchSongs,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <div>Error fetching recent songs</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Songs</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
