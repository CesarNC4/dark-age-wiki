import ReactMarkdown from "react-markdown";
import MarkdownBlock from "./MarkdownBlock";

interface Props {
  metadata: Record<string, string>;
}

export default function ViewArcano({ metadata }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1px",
          background: "rgba(107,90,46,0.15)",
          border: "1px solid rgba(107,90,46,0.15)",
        }}
      >
        {metadata.grupo && (
          <div
            style={{ background: "rgba(10,8,5,0.9)", padding: "1rem 1.25rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "rgba(180,100,100,0.85)",
                letterSpacing: "0.2em",
                marginBottom: "0.35rem",
              }}
            >
              GRUPO
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.grupo}
            </p>
          </div>
        )}
        {metadata.alias && (
          <div
            style={{ background: "rgba(10,8,5,0.9)", padding: "1rem 1.25rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "rgba(180,100,100,0.85)",
                letterSpacing: "0.2em",
                marginBottom: "0.35rem",
              }}
            >
              ALIAS
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.alias}
            </p>
          </div>
        )}
        {metadata.entidad && (
          <div
            style={{ background: "rgba(10,8,5,0.9)", padding: "1rem 1.25rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "rgba(180,100,100,0.85)",
                letterSpacing: "0.2em",
                marginBottom: "0.35rem",
              }}
            >
              ENTIDAD
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.entidad}
            </p>
          </div>
        )}
        {metadata.autoridad && (
          <div
            style={{ background: "rgba(10,8,5,0.9)", padding: "1rem 1.25rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "rgba(180,100,100,0.85)",
                letterSpacing: "0.2em",
                marginBottom: "0.35rem",
              }}
            >
              AUTORIDAD
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.autoridad}
            </p>
          </div>
        )}
      </div>

      {metadata.verdad_ideatica && (
        <div
          style={{
            padding: "1.5rem",
            background: "rgba(139,46,46,0.08)",
            border: "1px solid rgba(139,46,46,0.2)",
            borderLeft: "3px solid rgba(139,46,46,0.5)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "rgba(180,100,100,0.85)",
              letterSpacing: "0.2em",
              marginBottom: "0.6rem",
            }}
          >
            VERDAD IDEÁTICA
          </p>
          <div
            className="markdown-content"
            style={{
              fontFamily: "var(--font-title)",
              color: "#f0e8d8",
              fontSize: "1.05rem",
              fontStyle: "italic",
              lineHeight: "1.6",
            }}
          >
            <ReactMarkdown>{metadata.verdad_ideatica}</ReactMarkdown>
          </div>
        </div>
      )}

      <MarkdownBlock label="NEGACIÓN" value={metadata.negacion} />
      <MarkdownBlock label="DINÁMICA" value={metadata.dinamica} />
    </div>
  );
}
