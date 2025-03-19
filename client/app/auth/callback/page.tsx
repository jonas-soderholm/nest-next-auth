"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/login"); // Redirect if no token
      return;
    }

    // Validate the token with the backend
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/validate-magic-link?token=${token}`
      )
      .then((res) => {
        console.log("Login successful:", res.data);
        localStorage.setItem("token", res.data.access_token); // ✅ Store the token
        router.push("/"); // Redirect to home page
      })
      .catch((err) => {
        console.error("Invalid or expired token:", err);
        router.push("/login"); // Redirect back on error
      });
  }, [token, router]);

  return <p>Logging in...</p>;
}
