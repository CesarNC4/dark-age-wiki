"use client";

import MarkdownEditor from "../components/MarkdownEditor";

interface Props {
  metadata: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

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
      <MarkdownEditor
        value={metadata.descripcion || ""}
        onChange={(v) => onChange("descripcion", v)}
        rows={5}
      />

      <label style={labelStyle}>CÓMO FUNCIONA</label>
      <MarkdownEditor
        value={metadata.funcionamiento || ""}
        onChange={(v) => onChange("funcionamiento", v)}
        rows={5}
      />

      <label style={labelStyle}>CONSECUENCIAS Y EFECTOS</label>
      <MarkdownEditor
        value={metadata.consecuencias || ""}
        onChange={(v) => onChange("consecuencias", v)}
        rows={4}
      />

      <label style={labelStyle}>LIMITACIONES</label>
      <MarkdownEditor
        value={metadata.limitaciones || ""}
        onChange={(v) => onChange("limitaciones", v)}
        rows={4}
      />

      <label style={labelStyle}>NOTAS Y EXCEPCIONES</label>
      <MarkdownEditor
        value={metadata.notas || ""}
        onChange={(v) => onChange("notas", v)}
        rows={4}
      />
    </div>
  );
}
