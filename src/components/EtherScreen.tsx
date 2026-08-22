"use client";
import LiquidEther from "./LiquidEther";

const EtherScreen = () => {
  return (
    <div className="overflow-hidden h-svh w-screen fixed top-0 z-0">
      <div className="w-full h-full relative">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B497CF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={true}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
    </div>
  );
};

export default EtherScreen;
