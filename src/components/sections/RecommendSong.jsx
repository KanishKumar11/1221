"use client";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getSpotifySongDetails } from "@/lib/spotify";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";

export function RecommendSong({ spaceId }) {
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [comment, setComment] = useState("");
  const [songDetails, setSongDetails] = useState(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSongLinkSubmit = async () => {
    setIsLoading(true);
    try {
      const details = await getSpotifySongDetails(spotifyUrl);
      setSongDetails(details);
      setStep(2);
    } catch (error) {
      toast.error("Failed to fetch song details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecommendationSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/songs", {
        ...songDetails,
        spotifyUrl,
        comment,
        spaceId,
      });
      if (response.status == 200) {
        toast.success("Your song has been added to the space.");
        location.reload();
        setSpotifyUrl("");
        setComment("");
        setStep(1);
        setSongDetails(null);
        setIsOpen(false);
      } else {
        throw new Error("Failed to recommend song");
      }
    } catch (error) {
      toast.error("Failed to recommend song. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-12 flex items-center justify-center w-full  bg-white/40 backdrop-blur-xl p-4 max-w-lg mx-auto left-1/2 -translate-x-1/2">
        <Button
          className="w-[80%] text-xl px-14 py-7"
          onClick={() => setIsOpen(true)}
        >
          <FaHeart className="mr-2 text-rose-500" />
          Recommend a Song
        </Button>
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild></DrawerTrigger>
        <DrawerContent className="h-auto ">
          <div className="bg-[url('/images/1.svg')]  ">
            <div className="-mt-6 rounded-t-lg backdrop-blur-3xl  bg-white/60 flex items-center justify-center flex-col text-xl gap-4 p-8 text-left">
              <Image
                src={songDetails?.coverUrl || "/images/3.svg"}
                alt=""
                height="120"
                width="120"
                className="rounded-xl"
              />
              {songDetails ? (
                <div>
                  {" "}
                  <p className="text-2xl font-bold">{songDetails.title}</p>
                  <p>{songDetails.artist}</p>
                </div>
              ) : (
                <>Enter Link Below</>
              )}
            </div>
          </div>
          <DrawerHeader>
            <DrawerTitle>Recommend a Song</DrawerTitle>
          </DrawerHeader>
          <div className="grid gap-4 py-4 px-4">
            {step === 1 && (
              <>
                <DrawerDescription>
                  Paste a Spotify song link to proceed.
                </DrawerDescription>
                <Input
                  placeholder="Spotify song link"
                  value={spotifyUrl}
                  onChange={(e) => setSpotifyUrl(e.target.value)}
                />
                <Button
                  onClick={handleSongLinkSubmit}
                  disabled={isLoading || !spotifyUrl}
                >
                  {isLoading ? "Fetching details..." : "Next"}
                  <FaArrowRight className="ml-2" />
                </Button>
              </>
            )}

            {step === 2 && songDetails && (
              <>
                <DrawerDescription>
                  Song details fetched successfully! Would you like to add a
                  comment?
                </DrawerDescription>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p>
                    <strong>Title:</strong> {songDetails.title}
                  </p>
                  <p>
                    <strong>Artist:</strong> {songDetails.artist}
                  </p>
                </div>
                <Button onClick={() => setStep(3)}>
                  Next
                  <FaArrowRight className="ml-2" />
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <DrawerDescription>
                  Add a comment about this song.
                </DrawerDescription>
                <Textarea
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  onClick={handleRecommendationSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Recommending..." : "Recommend"}
                </Button>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
