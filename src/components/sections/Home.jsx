"use client";
import { BellIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { RecentSongs } from "./RecentSongs";
import AllSongs from "./AllSongs";
import { RecommendSong } from "./RecommendSong";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Dock from "../Dock";

export default function Home({ spaces, spaceId, user }) {
  const [activeSpace, setActiveSpace] = useState(
    () => localStorage.getItem("activeSpace") || spaces[0]._id
  );
  const [activeTab, setActiveTab] = useState("all");

  // Store activeSpace in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("activeSpace", activeSpace);
  }, [activeSpace]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen w-full sm:max-w-lg bg-gradient-to-b from-[#79c3de] to-white via-white mx-auto flex-col p-5 relative pb-28">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Hey {user.name}</h1>
          <p>You&#39;re the best!</p>
        </div>
        <div className=" text-black flex flex-col ">
          <BellIcon className="bg-white/20 backdrop-blur-lg p-1 text-white ml-auto mb-2 rounded-full " />
          <Select value={activeSpace} onValueChange={setActiveSpace}>
            <SelectTrigger>
              <SelectValue placeholder="Select the space" />
            </SelectTrigger>
            <SelectContent className="text-black">
              {spaces.map((space) => (
                <SelectItem key={space._id} value={space._id}>
                  {space.spaceName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        {activeTab === "recent" && <RecentSongs spaceId={activeSpace} />}
        {activeTab === "all" && <AllSongs spaceId={activeSpace} />}
      </div>
      <div className="mt-auto mx-auto mb-20">
        <RecommendSong spaceId={activeSpace} />
      </div>
      <div className="bg-red-400 mx-auto w-full">
        <Dock />
      </div>
    </div>
  );
}
