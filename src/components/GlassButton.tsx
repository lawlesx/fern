import { ButtonHTMLAttributes } from "react";
import GlassSurface from "./GlassSurface";

const GlassButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <GlassSurface
      borderRadius={100}
      height={100}
      width={100}
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
