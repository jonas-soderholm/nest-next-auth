"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const dynamic = "force-dynamic";

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/validate-magic-link?token=${token}`
      )
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        router.push("/");
      })
      .catch((err) => {
        console.error("Invalid or expired token:", err);
        router.push("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        {loading && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
            <p className="text-white mt-4 text-lg">
              Checking authentication...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
