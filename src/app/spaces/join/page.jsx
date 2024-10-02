import { auth } from "@/auth";
import JoinSpace from "@/components/sections/JoinSpace";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();
  if (!session) {
    redirect("/auth");
  }
  return (
    <div>
      <JoinSpace />
    </div>
  );
}
