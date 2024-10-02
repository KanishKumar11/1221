import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import Auth from "./_components/Auth";

export default async function page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <Auth />
    </div>
  );
}
