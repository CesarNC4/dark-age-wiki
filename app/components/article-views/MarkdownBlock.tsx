import ReactMarkdown from "react-markdown";

interface Props {
  label: string;
  value: string;
  accent?: boolean;
}

export default function MarkdownBlock({ label, value, accent = false }: Props) {
  if (!value) return null;
  return (
    <div
      style={{
        padding: "1.25rem",
        background: accent ? "rgba(139,46,46,0.06)" : "rgba(10,8,5,0.7)",
        border: "1px solid rgba(107,90,46,0.15)",
        borderLeft: accent
          ? "3px solid rgba(139,46,46,0.4)"
          : "1px solid rgba(107,90,46,0.15)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          color: accent ? "rgba(139,46,46,0.6)" : "rgba(107,90,46,0.5)",
          letterSpacing: "0.2em",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </p>
      <div
        className="markdown-content"
        style={{
          fontFamily: "var(--font-body)",
          color: "rgba(232,224,208,0.85)",
          fontSize: "0.95rem",
          lineHeight: "1.7",
        }}
      >
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </div>
  );
}
