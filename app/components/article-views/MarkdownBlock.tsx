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
        padding: "1.5rem 1.75rem",
        background: accent ? "rgba(139,46,46,0.07)" : "rgba(10,8,5,0.7)",
        border: "1px solid rgba(107,90,46,0.18)",
        borderLeft: accent
          ? "3px solid rgba(139,46,46,0.5)"
          : "1px solid rgba(107,90,46,0.18)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: accent ? "rgba(180,100,100,0.8)" : "rgba(160,140,100,0.7)",
          letterSpacing: "0.2em",
          marginBottom: "0.75rem",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
      <div
        className="markdown-content"
        style={{
          fontFamily: "var(--font-body)",
          color: "rgba(240,232,218,0.92)",
          fontSize: "1rem",
          lineHeight: "1.85",
        }}
      >
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    </div>
  );
}
