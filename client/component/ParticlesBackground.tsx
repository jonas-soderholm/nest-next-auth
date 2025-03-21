"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine); // Loads slim version of tsparticles
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "transparent", // Keeps background transparent
        },
        particles: {
          number: {
            value: 40, // Number of particles
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#ffffff" }, // Particle color
          shape: { type: "circle" },
          opacity: { value: 0.4, random: true },
          size: { value: 2, random: true },
          move: {
            enable: true,
            speed: 0.4, // Speed of floating particles
            direction: "none",
            outModes: { default: "out" },
          },
        },
      }}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
}
