"use client";

import { useState } from "react";

interface ArticleRowProps {
  article: {
    title: string;
    excerpt: string;
    created_at: string;
    slug: string;
    category?: string;
    metadata?: Record<string, string>;
  };
}

export default function ArticleRow({ article }: ArticleRowProps) {
  const [hovered, setHovered] = useState(false);

  const getSubtitle = () => {
    const m = article.metadata || {};
    if (m.senda && m.frecuencia) return `${m.senda} · ${m.frecuencia}`;
    if (m.senda) return m.senda;
    if (m.grupo) return m.grupo;
    if (m.tipo && m.nacion) return `${m.tipo} · ${m.nacion}`;
    if (m.tipo) return m.tipo;
    if (m.autoridad) return m.autoridad;
    return null;
  };

  const subtitle = getSubtitle();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.25rem 1.75rem",
        background: hovered ? "rgba(30,22,12,0.95)" : "rgba(15,11,6,0.85)",
        border: "1px solid rgba(107,90,46,0.2)",
        borderLeft: `3px solid ${hovered ? "rgba(200,169,110,0.6)" : "rgba(139,46,46,0.4)"}`,
        transition: "all 0.25s ease",
        transform: hovered ? "translateX(5px)" : "translateX(0)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        cursor: "pointer",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: subtitle || article.excerpt ? "0.35rem" : 0,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-title)",
              color: hovered ? "#fff8e8" : "#f0e8d8",
              fontSize: "1.15rem",
              fontWeight: "700",
              transition: "color 0.25s",
              margin: 0,
            }}
          >
            {article.title}
          </h3>
          {subtitle && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: hovered
                  ? "rgba(200,169,110,0.8)"
                  : "rgba(160,120,80,0.65)",
                letterSpacing: "0.12em",
                whiteSpace: "nowrap",
                transition: "color 0.25s",
              }}
            >
              {subtitle.toUpperCase()}
            </span>
          )}
        </div>

        {article.excerpt && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(180,165,140,0.75)",
              fontSize: "0.95rem",
              fontStyle: "italic",
              lineHeight: "1.5",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {article.excerpt}
          </p>
        )}
      </div>

      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
          color: hovered ? "rgba(200,169,110,0.7)" : "rgba(107,90,46,0.3)",
          transition: "color 0.25s",
          whiteSpace: "nowrap",
        }}
      >
        {hovered ? "→" : "›"}
      </span>
    </div>
  );
}
