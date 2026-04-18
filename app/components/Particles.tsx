"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function DustParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Particles
        id="dust"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        options={{
          fullScreen: false,
          background: { color: { value: "transparent" } },
          fpsLimit: 30,
          particles: {
            number: { value: 35 },
            color: { value: ["#c8a96e", "#8b6e3a", "#e8d5a0"] },
            opacity: {
              value: { min: 0.05, max: 0.25 },
              animation: { enable: true, speed: 0.3, sync: false },
            },
            size: {
              value: { min: 0.5, max: 2.5 },
            },
            move: {
              enable: true,
              speed: 0.2,
              direction: "top",
              random: true,
              straight: false,
              outModes: "out",
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}
