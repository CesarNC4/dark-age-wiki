"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"symbol" | "pulse" | "glitch" | "done">(
    "symbol",
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("pulse"), 2800);
    const t2 = setTimeout(() => setPhase("glitch"), 3800);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 4600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "#050403",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* Glitch overlay */}
          {phase === "glitch" && (
            <>
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: [0, 1, 0, 1, 0],
                  opacity: [0, 0.6, 0, 0.4, 0],
                }}
                transition={{ duration: 0.8, times: [0, 0.2, 0.4, 0.7, 1] }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,46,46,0.15) 2px, rgba(139,46,46,0.15) 4px)",
                  transformOrigin: "center",
                  pointerEvents: "none",
                }}
              />
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, -8, 4, -4, 8, 0] }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: "rgba(107,90,46,0.04)",
                  mixBlendMode: "screen",
                }}
              />
            </>
          )}

          {/* Símbolo SVG animado */}
          <motion.div
            animate={
              phase === "pulse" || phase === "glitch"
                ? {
                    scale: [1, 1.06, 1],
                    filter: [
                      "brightness(1)",
                      "brightness(1.6)",
                      "brightness(1)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ position: "relative" }}
          >
            <svg
              width="320"
              height="320"
              viewBox="0 0 680 680"
              style={{ overflow: "visible" }}
            >
              <defs>
                <radialGradient id="ig" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0a0805" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx="340" cy="340" r="280" fill="url(#ig)" />

              {/* Anillo exterior */}
              <motion.circle
                cx="340"
                cy="340"
                r="260"
                fill="none"
                stroke="#6b5a2e"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Triángulo Plano Ideático */}
              <motion.polygon
                points="340,140 500,420 180,420"
                fill="none"
                stroke="#8b2e2e"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              />

              {/* Triángulo Plano Físico */}
              <motion.polygon
                points="340,540 180,260 500,260"
                fill="none"
                stroke="#6b5a2e"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
              />

              {/* Círculo interno */}
              <motion.circle
                cx="340"
                cy="340"
                r="80"
                fill="none"
                stroke="#c8a96e"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 0.8, delay: 1.5, ease: "easeInOut" }}
              />

              {/* Cruz */}
              <motion.line
                x1="340"
                y1="265"
                x2="340"
                y2="415"
                stroke="#c8a96e"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              />
              <motion.line
                x1="265"
                y1="340"
                x2="415"
                y2="340"
                stroke="#c8a96e"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 0.5, delay: 2 }}
              />

              {/* Ojo central */}
              <motion.ellipse
                cx="340"
                cy="340"
                rx="36"
                ry="20"
                fill="none"
                stroke="#c8a96e"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              />

              {/* Pupila */}
              <motion.circle
                cx="340"
                cy="340"
                r="8"
                fill="#8b2e2e"
                fillOpacity="0.6"
                stroke="#c8a96e"
                strokeWidth="0.8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 2.5 }}
              />

              {/* Punto central */}
              <motion.circle
                cx="340"
                cy="340"
                r="2"
                fill="#e8d5a0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.2, delay: 2.6 }}
              />
            </svg>
          </motion.div>

          {/* Texto bajo el símbolo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "symbol" ? 0 : 0.4 }}
            transition={{ duration: 1, delay: 0 }}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              color: "#6b5a2e",
              letterSpacing: "0.4em",
              marginTop: "2rem",
              textTransform: "uppercase",
            }}
          >
            El Velo se abre
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
