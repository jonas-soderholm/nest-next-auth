"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign Up with:", { email });

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, { email })
      .then((res) => {
        console.log("Response:", res.data);
        setRegistered(true);
      })
      .catch((err) => {
        console.error("Error:", err);
        setEmailAlreadyInUse("Email already in use.");
      });
  };

  return (
    <>
      <div className="p-6 mt-[10rem] bg-gray-900 text-white rounded-lg max-w-[40rem] mx-auto">
        {registered ? (
          <div>
            <h2 className="text-4xl font-bold mb-4">Register</h2>
            <p>
              You have successfully registered! Check {email} for a secure login
              link.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white py-2 rounded cursor-pointer"
              >
                Register
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
                </svg>
              </button>
              {emailAlreadyInUse && (
                <p className="text-red-400 text-xs">{emailAlreadyInUse}</p>
              )}
              <p>
                Have an account already?{" "}
                <Link href="/login">
                  <button className="text-blue-500 hover:underline cursor-pointer">
                    Log In
                  </button>
                </Link>{" "}
                instead.
              </p>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
