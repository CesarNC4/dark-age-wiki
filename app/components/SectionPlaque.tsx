"use client";

import Link from "next/link";
import { useState } from "react";

interface SectionPlaqueProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  order_index: number;
  featured?: boolean;
  arcNumber?: string;
}

export default function SectionPlaque({
  name,
  slug,
  description,
  order_index,
  featured = false,
  arcNumber,
}: SectionPlaqueProps) {
  const [hovered, setHovered] = useState(false);

  if (featured) {
    return (
      <Link
        href={`/wiki/${slug}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            padding: "2rem 1.75rem",
            cursor: "pointer",
            transition: "all 0.4s ease",
            background: hovered
              ? "linear-gradient(160deg, rgba(35,22,10,0.97) 0%, rgba(50,30,12,0.95) 100%)"
              : "linear-gradient(160deg, rgba(20,13,6,0.94) 0%, rgba(30,18,8,0.90) 100%)",
            border: "1px solid rgba(107,90,46,0.25)",
            borderTop: `2px solid ${hovered ? "rgba(200,169,110,0.7)" : "rgba(139,46,46,0.5)"}`,
            boxShadow: hovered
              ? "0 16px 48px rgba(0,0,0,0.8), inset 0 1px 0 rgba(200,169,110,0.15), 0 0 30px rgba(139,46,46,0.1)"
              : "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(200,169,110,0.07)",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            height: "100%",
          }}
        >
          {/* Ornamentos esquinas */}
          <span
            style={{
              position: "absolute",
              top: "0.5rem",
              left: "0.7rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "rgba(139,46,46,0.5)",
            }}
          >
            ◆
          </span>
          <span
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.7rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "rgba(139,46,46,0.5)",
            }}
          >
            ◆
          </span>
          <span
            style={{
              position: "absolute",
              bottom: "0.5rem",
              left: "0.7rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "rgba(107,90,46,0.3)",
            }}
          >
            ◇
          </span>
          <span
            style={{
              position: "absolute",
              bottom: "0.5rem",
              right: "0.7rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "rgba(107,90,46,0.3)",
            }}
          >
            ◇
          </span>

          {/* Número arcano */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(139,46,46,0.6)",
              letterSpacing: "0.3em",
              marginBottom: "0.75rem",
            }}
          >
            {arcNumber} · Tratado Principal
          </p>

          {/* Título grande */}
          <h3
            style={{
              fontFamily: "var(--font-title)",
              color: hovered ? "#f0e0b0" : "#e8d5a0",
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "0.75rem",
              letterSpacing: "0.03em",
              lineHeight: "1.2",
              transition: "color 0.3s",
            }}
          >
            {name}
          </h3>

          {/* Separador */}
          <div
            style={{
              width: hovered ? "80px" : "40px",
              height: "1px",
              background:
                "linear-gradient(to right, rgba(139,46,46,0.7), transparent)",
              marginBottom: "0.75rem",
              transition: "width 0.4s ease",
            }}
          />

          {/* Descripción */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(138,127,110,0.85)",
              fontSize: "0.9rem",
              lineHeight: "1.7",
              fontStyle: "italic",
            }}
          >
            {description}
          </p>

          {/* Indicador de entrada */}
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(-8px)",
              transition: "all 0.3s ease",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "rgba(200,169,110,0.7)",
                letterSpacing: "0.2em",
              }}
            >
              ACCEDER →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Versión secundaria (para el panel expandible)
  return (
    <Link
      href={`/wiki/${slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          padding: "1.25rem 1.5rem",
          cursor: "pointer",
          transition: "all 0.3s ease",
          background: hovered ? "rgba(25,18,10,0.95)" : "rgba(15,10,5,0.85)",
          border: "1px solid rgba(107,90,46,0.2)",
          borderLeft: `2px solid ${hovered ? "rgba(139,46,46,0.6)" : "rgba(107,90,46,0.3)"}`,
          transform: hovered ? "translateX(4px)" : "translateX(0)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            color: "rgba(107,90,46,0.5)",
            letterSpacing: "0.2em",
            marginBottom: "0.3rem",
          }}
        >
          {String(order_index).padStart(2, "0")}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-title)",
            color: hovered ? "#f0e0b0" : "#c8b896",
            fontSize: "1rem",
            fontWeight: "700",
            marginBottom: "0.3rem",
            transition: "color 0.3s",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(138,127,110,0.7)",
            fontSize: "0.8rem",
            fontStyle: "italic",
            lineHeight: "1.5",
          }}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
