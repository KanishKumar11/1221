import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Space from "@/models/Space";
import { connectDb } from "@/lib/connectDb";
import SpaceManagement from "@/components/sections/SpaceManagement";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Home from "@/components/sections/Home";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/auth");
  }
  await connectDb();
  const userId = session.user.id;
  const userSpaces = await Space.find({
    users: userId,
  });

  return (
    <main className="min-h-screen">
      <BackgroundBeamsWithCollision>
        {userSpaces.length > 0 ? (
          <Home spaceId={userSpaces[0]._id.toString()} user={session.user} />
        ) : (
          <SpaceManagement />
        )}
      </BackgroundBeamsWithCollision>
    </main>
  );
}
