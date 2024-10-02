import AllSongs from "@/components/sections/AllSongs";
import { RecommendSong } from "@/components/sections/RecommendSong";

export default function Space({ params }) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Space: {params.spaceId}</h1>
      <RecommendSong />
      <AllSongs />
      {/* Display shared songs here */}
    </div>
  );
}
