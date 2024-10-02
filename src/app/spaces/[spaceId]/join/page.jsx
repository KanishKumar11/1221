"use client";

import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function JoinSpace({ params }) {
  const [isJoining, setIsJoining] = useState(false);
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const router = useRouter();
  const session = useSession();

  // Fetch space details and user data based on spaceId
  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {
        const response = await axios.get(`/api/spaces/${params.spaceId}`);
        const spaceData = response.data;
        setSpaceDetails(spaceData);

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
  }, [params.spaceId]);
  const handleJoin = async () => {
    setIsJoining(true);
    try {
      await axios.post(`/api/spaces/${params.spaceId}/join`);
      toast.success("You have successfully joined the space.");
      router.push(`/`);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to join space. Please try again."
      );
    } finally {
      setIsJoining(false);
    }
  };

  // Redirect unauthenticated users
  if (session.status == "unauthenticated") {
    redirect("/auth");
  }

  return (
    <BackgroundBeamsWithCollision>
      <div className="space-y-4 min-h-screen bg-cover bg-[url('/images/2.svg')] sm:max-w-lg w-full flex items-end mx-auto">
        <div className="backdrop-blur-xl bg-white/40 w-full p-5 rounded-t-3xl flex gap-2 flex-col text-white pb-10">
          {spaceDetails ? (
            <>
              <div className="bg-black text-white py-5 rounded-2xl text-center flex items-center justify-center gap-4">
                <div className="flex">
                  {/* Display user images from the space's users */}
                  {userDetails.map((user, index) => (
                    <Image
                      key={user.user._id}
                      src={user?.user.image}
                      alt={user.user.name}
                      width={30}
                      height={30}
                      className={`${index > 0 ? "-ml-2 " : ""} rounded-full`}
                    />
                  ))}
                  <Image
                    src={session.data?.user.image}
                    alt={``}
                    width={30}
                    height={30}
                    className="-ml-2 rounded-full"
                  />
                </div>
                Join {spaceDetails.spaceName} :)
              </div>
              <p className="mb-4 text-center">
                {userDetails && userDetails[0]?.user.name} is inviting you to a
                special space—a place for you and your partner to create
                beautiful memories and grow deeper in love, one moment at a
                time. 🌸
              </p>
              <Button
                onClick={handleJoin}
                disabled={isJoining}
                className="w-full font-medium text-xl py-6"
              >
                {isJoining ? "Joining..." : "View Space"}
              </Button>
            </>
          ) : (
            <p className="text-center">Loading space details...</p>
          )}
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
