import { auth } from "@/auth";
import CreateSpace from "@/components/sections/CreateSpace";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import React from "react";

export default async function page() {
  const session = await auth();
  if (!session) {
    redirect("/auth");
  }
  return (
    <div>
      <BackgroundBeamsWithCollision>
        <CreateSpace />
      </BackgroundBeamsWithCollision>
    </div>
  );
}
