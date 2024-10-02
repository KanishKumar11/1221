import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export function SongCard({ song }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <div className="relative">
      <Link href={song.spotifyUrl}>
        <Image
          src={song.coverUrl}
          alt={`${song.title} by ${song.artist}`}
          width={200}
          height={200}
          className="rounded-lg"
        />
      </Link>
      {song.comment && (
        <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
          <DialogTrigger asChild>
            <button
              className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setIsCommentOpen(true)}
            >
              💬
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{song.title}</DialogTitle>
              <DialogDescription>{song.artist}</DialogDescription>
            </DialogHeader>
            <p>{song.comment}</p>
          </DialogContent>
        </Dialog>
      )}
      {/* <div className="mt-2">
        <h3 className="font-semibold">{song.title}</h3>
        <p className="text-sm text-gray-500">{song.artist}</p>
      </div> */}
    </div>
  );
}
