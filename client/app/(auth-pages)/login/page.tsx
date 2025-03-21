"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailNotRegistered, setEmailNotRegistered] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign In with:", { email });

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/signin`, { email })
      .then((res) => {
        console.log("Response:", res.data);
        setEmailSent(true); // Set success state
        setEmail(""); // Clear email field
      })
      .catch((err) => {
        console.error("Error:", err);
        setEmailNotRegistered("Email not registered.");
      });
  };

  return (
    <div className="p-6 mt-[6rem] bg-gray-900 text-white rounded-lg max-w-[90%] sm:max-w-[40rem] mx-auto">
      {emailSent ? (
        <div>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Log In</h2>
          <p className="text-sm sm:text-base">
            Email sent! Check your email at{" "}
            <span className="font-semibold">{email}</span>. You should have a
            login link in a few seconds!
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">Log In</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              required
            />
            <p className="text-sm sm:text-base">
              {
                "We'll send you an email with a magic link that will log you in. No need for a password!"
              }
            </p>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer w-full"
            >
              Email Link
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
                className="mt-1"
              >
                <path d="m720-160-56-56 63-64H560v-80h167l-63-64 56-56 160 160-160 160ZM160-280q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h520q33 0 56.5 23.5T760-760v204q-10-2-20-3t-20-1q-10 0-20 .5t-20 2.5v-147L416-520 160-703v343h323q-2 10-2.5 20t-.5 20q0 10 1 20t3 20H160Zm58-480 198 142 204-142H218Zm-58 400v-400 400Z" />
              </svg>
            </button>
            {emailNotRegistered && (
              <p className="text-red-400 text-xs">{emailNotRegistered}</p>
            )}
            <p className="text-sm sm:text-base">
              {"Don't have an account? "}
              <Link href="/register">
                <button className="text-blue-500 hover:underline cursor-pointer">
                  Register
                </button>
              </Link>{" "}
              for one.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
