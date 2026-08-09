import { ButtonHTMLAttributes } from "react";
import GlassSurface from "./GlassSurface";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  glassSize?: number;
}

const GlassButton = ({ glassSize = 100, ...props }: GlassButtonProps) => {
  return (
    <GlassSurface
      borderRadius={100}
      height={glassSize}
      width={glassSize}
      displace={0.5}
      distortionScale={-180}
      redOffset={50}
      greenOffset={10}
      blueOffset={20}
      brightness={50}
      opacity={0.93}
      mixBlendMode="screen"
    >
      <button {...props}>{props.children}</button>
    </GlassSurface>
  );
};

export default GlassButton;
