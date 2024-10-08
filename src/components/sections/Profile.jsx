"use client";
import { BellIcon, Share, Share2Icon, ShareIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RecentSongs } from "@/components/sections/RecentSongs";
import AllSongs from "@/components/sections/AllSongs";
import { RecommendSong } from "@/components/sections/RecommendSong";
import Dock from "@/components/Dock";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import { Share1Icon } from "@radix-ui/react-icons";

export default function Profile({ spaces, spaceId, user }) {
  const [activeSpace, setActiveSpace] = useState(
    () => localStorage.getItem("activeSpace") || spaces[0]._id
  );
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // Store activeSpace in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("activeSpace", activeSpace);
  }, [activeSpace]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    console.log(activeSpace);
    const fetchSpaceDetails = async () => {
      console.log("func --- exe");
      try {
        console.log("try --- exe");
        const response = await axios.get(`/api/spaces/${activeSpace}`);
        console.log("res --- exe");
        const spaceData = response.data;
        setSpaceDetails(spaceData);
        console.log(spaceData);

        // Fetch user details from space's user IDs
        const userPromises = spaceData.users.map((userId) =>
          axios.post(`/api/user`, {
            userId,
          })
        );
        const userResponses = await Promise.all(userPromises);
        const users = userResponses.map((res) => res.data);
        setUserDetails(users);
      } catch (error) {
        toast.error("Failed to fetch space or user details.");
      }
    };

    fetchSpaceDetails();
  }, [activeSpace]);
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/spaces/${activeSpace}/join`;

    if (navigator.share) {
      navigator
        .share({
          title: "Join my Space",
          text: `Join my space "${createdSpace.data.spaceName}" using this link:`,
          url: shareUrl,
        })
        .then(() => {
          toast.success("Link successfully shared!");
        })
        .catch((error) => {
          toast.error("Error sharing the link.");
        });
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch(() => {
          toast.error("Failed to copy the link to clipboard.");
        });
    }
  };
  console.log(spaceDetails);
  console.log(activeSpace);
  return (
    <div className="flex min-h-screen w-full sm:max-w-lg bg-gradient-to-b  to-white via-white mx-auto flex-col p-5 relative pb-28">
      <div className="flex items-center justify-between">
        {" "}
        <div className=" text-white py-5 rounded-2xl text-center flex items-center justify-center gap-4">
          <div className="flex">
            {userDetails.map((user, index) => (
              <Image
                key={user.user._id}
                src={user?.user.image}
                alt={user.user.name}
                width={50}
                height={50}
                className={`${index > 0 ? "-ml-2 " : ""} rounded-full`}
              />
            ))}
          </div>
          <div className="text-left">
            <h1 className="text-2xl text-black">
              You &{" "}
              {userDetails.find((u) => u.user._id !== user._id)?.user.name}
            </h1>
            <p className="text-green-500">
              connected since{" "}
              {new Date(spaceDetails?.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between bg-[#282828] rounded-md text-white p-5 mt-10 ">
        <div>
          <h2 className="text-3xl">{spaceDetails?.spaceName}</h2>
          <div className="flex items-center gap-2 ">
            {" "}
            <div className="h-3 w-3 bg-emerald-500" />
            <p className="text-emerald-500">{activeSpace}</p>
          </div>
        </div>
        <div
          className="text-white p-2 bg-gray-600/70 rounded-md hover:scale-105 ease-in-out transition-all cursor-pointer "
          onClick={handleShare}
        >
          <Share2Icon />
        </div>
      </div>
      <div className="flex items-center justify-center flex-col gap-10 my-10 mt-16">
        <div className="bg-pink-500 px-4 py-1 rounded -rotate-6 text-white text-2xl">
          {" "}
          #Couples
        </div>
        <div className="flex gap-10 items-center">
          {userDetails.map((user, index) => (
            <div
              className="flex gap-2 items-center -rotate-6 font-medium text-xl"
              key={index}
            >
              <Image
                src={user?.user.image}
                alt={user.user.name}
                width={80}
                height={80}
                className={` rounded-md`}
              />
              {user?.user.name.split(" ")[0]}
            </div>
          ))}
        </div>
        <div className="text-2xl max-w-[280px] text-center font-medium">
          wow you&#39;re in relationship since 1 year
        </div>
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
