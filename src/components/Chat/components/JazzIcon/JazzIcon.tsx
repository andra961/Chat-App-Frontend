import React, { useEffect, useRef } from "react";
import jazzicon from "@metamask/jazzicon";
import "./jazzicon.css";

type JazzIconProps = {
  seed: number;
  diameter: number;
};

const JazzIcon = ({ seed, diameter = 30 }: JazzIconProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const icon = containerRef.current?.appendChild(jazzicon(diameter, seed));

    return () => {
      icon.remove();
    };
  }, [seed, diameter]);

  return <div className="jazzIconContainer" ref={containerRef} />;
};

export default JazzIcon;
