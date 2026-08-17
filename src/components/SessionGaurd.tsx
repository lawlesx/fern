"use client";

import { authClient } from "@/lib/auth-client";
import HomeListener from "./HomeListener";

const SessionGaurd = () => {
  const { data: session, isPending } = authClient.useSession();

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  if (isPending)
    return <div className="font-audiowide text-2xl text-white">Loading...</div>;

  if (session) return <HomeListener />;

  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-center text-white font-audiowide">
          Welcome to <br />
          Fern
        </h1>
        <p className="text-lg text-white/60 font-exo2">
          Please log in to continue.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="button rounded-2xl px-8 py-4"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
};

export default SessionGaurd;
