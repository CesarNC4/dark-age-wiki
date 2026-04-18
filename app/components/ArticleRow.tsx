"use client";

interface ArticleRowProps {
  article: {
    title: string;
    excerpt: string;
    created_at: string;
    slug: string;
  };
}

export default function ArticleRow({ article }: ArticleRowProps) {
  return (
    <div
      style={{
        padding: "1.25rem 1.5rem",
        background: "rgba(15,10,5,0.85)",
        border: "1px solid rgba(107,90,46,0.2)",
        borderLeft: "2px solid rgba(139,46,46,0.4)",
        transition: "all 0.3s",
        cursor: "pointer",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-title)",
          color: "#e8d5a0",
          fontSize: "1.1rem",
          marginBottom: "0.4rem",
        }}
      >
        {article.title}
      </h3>
      {article.excerpt && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(138,127,110,0.7)",
            fontSize: "0.85rem",
            fontStyle: "italic",
            lineHeight: "1.5",
          }}
        >
          {article.excerpt}
        </p>
      )}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          color: "rgba(107,90,46,0.4)",
          fontSize: "0.55rem",
          letterSpacing: "0.15em",
          marginTop: "0.75rem",
        }}
      >
        {new Date(article.created_at)
          .toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .toUpperCase()}
      </p>
    </div>
  );
}
