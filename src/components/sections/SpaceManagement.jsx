import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function SpaceManagement() {
  return (
    <div className="space-y-4 min-h-screen bg-cover bg-[url('/images/1.svg')] sm:max-w-lg w-full flex items-end mx-auto">
      <div className="backdrop-blur-xl bg-white/40 w-full p-5 rounded-t-3xl flex gap-2 flex-col text-white">
        <Link href="/spaces/create">
          <Button className="w-full font-medium text-xl py-6">
            Create Space
          </Button>
        </Link>

        <Link href="/spaces/join">
          <Button className="w-full font-medium text-xl py-6">
            Join Space
          </Button>
        </Link>
        <p>
          Spaces are your private sanctuary—a place for you and your partner to
          create beautiful memories and grow deeper in love, every day. 💖 And
          don't worry, you can only create one space—because we believe in true
          love, not double dating! 😄
        </p>
      </div>
    </div>
  );
}
