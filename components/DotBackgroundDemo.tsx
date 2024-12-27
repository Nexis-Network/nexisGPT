import React from "react";
import { TextHoverEffectDemo } from "./TextHoverEffectDemo";

export function DotBackgroundDemo() {
  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* TextHoverEffectDemo positioned in the center */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <TextHoverEffectDemo />
      </div>
    </div>
  );
}
