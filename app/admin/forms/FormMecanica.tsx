"use client";

interface Props {
  metadata: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "rgba(20,15,8,0.8)",
  border: "1px solid rgba(107,90,46,0.2)",
  color: "#e8d5a0",
  fontFamily: "var(--font-body)",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box" as const,
  marginBottom: "1rem",
  resize: "vertical" as const,
};

const labelStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.6rem",
  color: "rgba(107,90,46,0.6)",
  letterSpacing: "0.2em",
  display: "block",
  marginBottom: "0.4rem",
};

export default function FormMecanica({ metadata, onChange }: Props) {
  return (
    <div>
      <label style={labelStyle}>DESCRIPCIÓN GENERAL</label>
      <textarea
        rows={4}
        value={metadata.descripcion || ""}
        onChange={(e) => onChange("descripcion", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>CÓMO FUNCIONA</label>
      <textarea
        rows={4}
        value={metadata.funcionamiento || ""}
        onChange={(e) => onChange("funcionamiento", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>CONSECUENCIAS Y EFECTOS</label>
      <textarea
        rows={3}
        value={metadata.consecuencias || ""}
        onChange={(e) => onChange("consecuencias", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>LIMITACIONES</label>
      <textarea
        rows={3}
        value={metadata.limitaciones || ""}
        onChange={(e) => onChange("limitaciones", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>NOTAS Y EXCEPCIONES</label>
      <textarea
        rows={3}
        value={metadata.notas || ""}
        onChange={(e) => onChange("notas", e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}
