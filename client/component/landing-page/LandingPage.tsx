"use client";

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome email.</h1>
        <p className="text-lg text-gray-300 mb-6">
          You are now securly logged in without giving out your password.
        </p>
        <p className="text-lg text-gray-300 mb-6">
          You are not signed in yet, sign in to see your account
        </p>
      </div>
    </>
  );
}
