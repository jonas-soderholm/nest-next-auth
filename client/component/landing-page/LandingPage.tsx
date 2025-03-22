"use client";

import { useRouter } from "next/navigation";
import ParticlesBackground from "@/component/ParticlesBackground";
import useAuth from "@/hooks/useAuth";

export default function LandingPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <div className="mt-[200px] w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center text-white">
        {isAuthenticated ? (
          <>
            <ParticlesBackground />
            <h1 className="md:text-4xl text-xs font-bold mb-6">
              Welcome back {user}!
            </h1>
            <p className="md:text-lg text-xs text-gray-300 mb-6">
              You are now securely logged in without giving away your password!
            </p>
            <button
              onClick={() => {
                logout();
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
