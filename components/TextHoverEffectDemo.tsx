import React from "react";
import { TextHoverEffect } from "./text-hover-effect";

export function TextHoverEffectDemo() {
  return (
    <div className="h-[20REM] z-15 w-full z-20 bg-clip-text dark:bg-black bg-white text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500  flex items-center justify-center">
    <TextHoverEffect text="NEXISGPT" />
    </div>
  );
}
