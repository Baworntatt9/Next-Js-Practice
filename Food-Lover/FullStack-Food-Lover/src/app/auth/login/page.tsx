"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else if (result?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="items-center justify-center pt-[10vh]">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center p-6">
        <h1 className="text-[32px] font-bold mb-4 text-white font-robotoMono">
          LOGIN
        </h1>

        {error && (
          <div className="w-full bg-red-100 text-red-700 p-2 mb-4 rounded text-sm font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full">
          <table className="w-full border-collapse border-none text-black">
            <tbody>
              <tr>
                <td>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-black bg-white font-mono my-2"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-black bg-white font-mono my-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="submit"
            className="mt-4 w-[195px] font-robotoMono bg-black mx-auto text-white py-2 rounded-[48px] 
             flex justify-center items-center 
             transition-transform duration-200 transform hover:scale-105"
          >
            Sign In
          </button>
          <div className="mt-4 font-robotoMono mx-auto py-2 text-gray-300 flex justify-center items-center">
            <Link
              href="/auth/register"
              className="items-center justify-center hover:underline hover:text-gray-200"
            >
              Create account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
