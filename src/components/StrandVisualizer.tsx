"use client";

import useAudioAnalyser from "@/hooks/useAudioAnalyser";
import Strands from "./Strands";

// import { YourStrandComponent } from "./YourStrandComponent";

interface StrandVisualizerProps {
  stream: MediaStream | null;
}

export function StrandVisualizer({ stream }: StrandVisualizerProps) {
  // This state now lives HERE.
  // Only this tiny component will re-render 60 times a second.
  const volume = useAudioAnalyser(stream, 0.03);

  return (
    <div className="overflow-hidden h-screen w-screen fixed top-0 z-0">
      <Strands amplitude={1 + volume * 10} speed={1 + volume * 0.3} />
    </div>
  );
}
