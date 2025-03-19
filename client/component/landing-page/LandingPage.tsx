"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ParticlesBackground from "@/component/ParticlesBackground";

export default function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    // (Optional) Verify the token with the backend for extra security
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("User Data:", res.data);
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.error("Authentication failed:", err);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return null; // Loading state
  }

  return (
    <div className="mt-[8rem] w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center text-white">
        {isAuthenticated ? (
          <>
            <ParticlesBackground />
            <h1 className="md:text-4xl text-xs font-bold mb-6">
              Welcome back {user}!
            </h1>
            <p className="md:text-lg text-xs text-gray-300 mb-6">
              You are securely logged in without giving away your password!
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6 ">Welcome!</h1>
            <p className="text-lg text-gray-300 mb-6">
              You are not signed in yet. Sign in to see your account.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}
