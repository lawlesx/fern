"use client";

import FloatingLines from "./FloatingLines";

const FloatingLinesBackground = () => {
  return (
    <div className="fixed z-0 w-full h-svh top-0 left-0">
      <FloatingLines
        enabledWaves={["top", "middle", "bottom"]}
        // Array - specify line count per wave; Number - same count for all waves
        lineCount={8}
        // Array - specify line distance per wave; Number - same distance for all waves
        lineDistance={8}
        bendRadius={9}
        bendStrength={-2}
        interactive
        parallax={true}
        animationSpeed={1}
        linesGradient={["#e945f5", "#10B981", "#3B82F6"]}
        mixBlendMode="normal"
        middleWavePosition={{
          x: 0,
          y: -0.75,
          rotate: 1,
        }}
      />
    </div>
  );
};

export default FloatingLinesBackground;
