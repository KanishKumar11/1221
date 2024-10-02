"use client";
import { BellIcon } from "lucide-react";
import React, { useState } from "react";
import { RecentSongs } from "./RecentSongs";
import AllSongs from "./AllSongs";
import { RecommendSong } from "./RecommendSong";

export default function Home({ spaceId, user }) {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen w-full sm:max-w-lg bg-gradient-to-b from-[#79c3de] to-white via-white mx-auto flex-col p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Hey {user.name}</h1>
          <p>You&#39;re the best!</p>
        </div>
        <div className="p-3 rounded-full backdrop-blur-lg bg-white/20 text-white">
          <BellIcon />
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="mt-5 flex justify-center space-x-4">
        <button
          className={`py-2 px-4 rounded ${
            activeTab === "all"
              ? "bg-black text-white shadow-lg "
              : "bg-transparent text-gray-500 rounded-full bg-white"
          } rounded-[50px] px-7`}
          onClick={() => handleTabClick("all")}
        >
          All Songs
        </button>{" "}
        <button
          className={`py-2 px-4 rounded ${
            activeTab === "recent"
              ? "bg-black text-white shadow-lg "
              : "bg-transparent text-gray-500 rounded-full bg-white"
          } rounded-[50px] px-7`}
          onClick={() => handleTabClick("recent")}
        >
          Recent
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "recent" && <RecentSongs spaceId={spaceId} />}
        {activeTab === "all" && <AllSongs spaceId={spaceId} />}
      </div>
      <div className="mt-auto mx-auto">
        <RecommendSong spaceId={spaceId} />
      </div>
    </div>
  );
}
