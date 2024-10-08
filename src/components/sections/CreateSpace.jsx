"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // Importing sonner toast
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function CreateSpace() {
  const [spaceName, setSpaceName] = useState("");
  const [createdSpace, setCreatedSpace] = useState(null);
  const router = useRouter();

  const createSpace = async (name) => {
    const response = await axios.post("/api/spaces", { name });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createSpace,
    onSuccess: (space) => {
      setCreatedSpace(space); // Store the space details after creation
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create space. Please try again."
      );
    },
  });

  const handleCreateSpace = () => {
    if (!spaceName.trim()) {
      toast.error("Space name cannot be empty.");
      return;
    }

    mutation.mutate(spaceName);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/spaces/${createdSpace.data._id}/join`;

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

  return (
    <div className="space-y-4 min-h-screen bg-cover bg-[url('/images/1.svg')] sm:max-w-lg w-full  flex items-end mx-auto">
      <div className="backdrop-blur-xl bg-white/40 w-full p-5 rounded-t-3xl flex gap-2 flex-col text-white pb-10">
        {!createdSpace ? (
          <>
            <h1 className="font-medium text-4xl my-8 text-center">
              Name your space
            </h1>
            <Input
              type="text"
              placeholder="Enter space name"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              className="mb-2  placeholder:text-white text-white"
            />
            <Button
              onClick={handleCreateSpace}
              disabled={mutation.isLoading}
              className="w-full font-medium text-xl py-6"
            >
              {mutation.isLoading ? "Creating..." : "Create Space"}
            </Button>
          </>
        ) : (
          <div className="mt-8 bg-white/20 p-4 rounded-lg">
            <h2 className="font-bold text-2xl mb-2 text-center">
              Space Created!
            </h2>
            <p className="text-lg">
              <strong>Space Name:</strong> {createdSpace.data.spaceName}
            </p>
            <p className="text-lg">
              <strong>Space ID:</strong> {createdSpace.data._id}
            </p>

            <div className="flex gap-4 mt-6">
              <Button
                onClick={() => {
                  router.push(`/`);
                  localStorage.setItem("activeSpace", createdSpace.data._id);
                }}
                className="w-full font-medium text-lg py-4"
              >
                View Space
              </Button>
              <Button
                onClick={handleShare}
                className="w-full font-medium text-lg py-4"
              >
                Share
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
