"use client";
import React from "react";
import { GiElectric } from "react-icons/gi";
import GoogleLogin from "./GoogleLogin";
import { Card, CardContent } from "@/components/ui/card";

export default function Auth() {
  return (
    <div className="w-full bg-[#F4F6F8] min-h-screen flex items-center justify-center">
      <Card className="mx-2">
        <CardContent className="p-7 py-12">
          <div className="max-w-xs mx-auto flex items-center justify-between flex-col min-h-[300px] ">
            <button className="px-8 py-2 rounded-full relative bg-[#DBE9FF] text-[#0066FF] text-xl hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border  flex items-center gap-2">
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-[#0066FF] to-transparent" />
              <GiElectric />
              <span className="relative z-20">Log-in</span>
            </button>
            <div className="flex flex-col items-center">
              <h1 className="text-[#231F20] font-medium my-4 text-center text-4xl">
                Welcome back to <span className="text-[#0066FF]">1221</span>
              </h1>
              <p>Log in to create your 1221</p>
            </div>
            <GoogleLogin />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
