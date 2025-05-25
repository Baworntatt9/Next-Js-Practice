"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center pt-[20vh]">
      <h1 className="text-3xl font-bold mb-4 text-white">Sign Out</h1>
      <p className="mb-6 text-gray-300">Are you sure you want to sign out?</p>
      <div className="flex space-x-4">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-white border border-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition text-center"
        >
          Sign Out
        </button>
        <button
          onClick={() => router.back()}
          className="text-red-400 border border-red-400 px-5 py-2 rounded-full text-sm hover:bg-red-400 hover:text-white transition text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
