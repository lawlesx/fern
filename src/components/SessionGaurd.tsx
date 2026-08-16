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
    <button
      onClick={handleGoogleLogin}
      className="button rounded-2xl px-8 py-4"
    >
      Sign in with Google
    </button>
  );
};

export default SessionGaurd;
