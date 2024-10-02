"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function JoinSpace() {
  const [spaceId, setSpaceId] = useState("");
  const router = useRouter();
  const handleJoinSpace = () => {
    if (!spaceId.trim()) {
      toast.error("Space ID cannot be empty.");
      return;
    }

    router.push(`${window.location.origin}/spaces/${spaceId}/join`);
  };

  return (
    <div className="space-y-4 min-h-screen bg-cover bg-[url('/images/2.svg')] max-w-lg flex items-end mx-auto">
      <div className="backdrop-blur-2xl bg-white/40 w-full p-5 rounded-t-3xl flex gap-2 flex-col text-white">
        <h2 className="text-lg font-semibold">Join a Space</h2>
        <Input
          type="text"
          placeholder="Enter space ID"
          value={spaceId}
          onChange={(e) => setSpaceId(e.target.value)}
          className="mb-2 text-white placeholder:text-white" // Ensure input text is visible
        />
        <Button
          onClick={handleJoinSpace}
          className="w-full font-medium text-xl py-6"
        >
          Join Space
        </Button>
      </div>
    </div>
  );
}
