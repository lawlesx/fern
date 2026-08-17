"use client";

import GlassButton from "@/components/GlassButton";
import { Mic } from "lucide-react";
import Link from "next/link";

const RedirectToHomeButton = () => {
  return (
    <div className="fixed bottom-4 z-50 tracking-normal left-1/2 -translate-x-1/2">
      <GlassButton glassSize={80}>
        <Link href="/">
          <Mic className="w-6 h-6" />
        </Link>
      </GlassButton>
    </div>
  );
};

export default RedirectToHomeButton;
