import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  const handleLogin = async () => {
    await signIn("google");
  };
  return (
    <div onClick={handleLogin}>
      <div className="flex items-center justify-center   ">
        <button className="flex gap-2 items-center bg-white  border border-gray-300 drop-shadow-md px-6 py-3  font-medium text-gray-800  hover:bg-gray-200/10 focus:outline-none focus:ring-2 focus:ring-offset-2 text-xl focus:ring-gray-500 rounded-full">
          <FcGoogle className="text-2xl" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
