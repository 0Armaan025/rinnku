"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert(result.error);
    }
  };

  const toggleAuthMode = () => setIsRegistering((prev) => !prev);

  if (session) {
    return (
<div className=" flex flex-col items-center justify-center bg-gradient-to-b from-[#030213] to-[#0f0a2d] bg-cover bg-no-repeat">
<p className="text-lg  font-semibold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Welcome, {session.user?.name}!
        </p>
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen mt-32 max-w-md mx-auto p-6 rounded-lg shadow-md flex flex-col items-center gap-6 ">
    <button
  className="w-full py-2 px-4 rounded-md bg-gradient-to-r  from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
>
  Sign In with Google
</button>

      
      <div className="w-full border-t border-gray-500"></div>
      
      <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        {isRegistering ? "Register" : "Login"} with Email
      </h2>
      
      <form onSubmit={handleEmailAuth} className="w-full flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-600 p-2 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-600 p-2 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
        >
          {isRegistering ? "Sign Up" : "Login"}
        </button>
      </form>
      
      <button
        onClick={toggleAuthMode}
        className="text-sm text-gray-400 hover:underline"
      >
        {isRegistering
          ? "Already have an account? Login"
          : "No account? Register"}
      </button>
    </div>
    </>
  );
}
