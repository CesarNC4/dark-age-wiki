"use client";

import MarkdownEditor from "../components/MarkdownEditor";

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
};

const labelStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.6rem",
  color: "rgba(107,90,46,0.6)",
  letterSpacing: "0.2em",
  display: "block",
  marginBottom: "0.4rem",
};

const GRUPOS = [
  "Grupo 1 — Los Señores del Misterio",
  "Grupo 2 — La Omnipotencia",
  "Grupo 3 — La Eterna Oscuridad",
  "Grupo 4 — La Calamidad",
  "Grupo 5 — El Demonio del Conocimiento",
  "Grupo 6 — El Origen de la Vida",
  "Grupo 7 — El Padre de los Diablos",
  "Grupo 8 — La Rueda",
  "Grupo 9 — El Orden",
];

export default function FormArcano({ metadata, onChange }: Props) {
  return (
    <div>
      <label style={labelStyle}>ALIAS / NOMBRE ALTERNATIVO</label>
      <input
        value={metadata.alias || ""}
        onChange={(e) => onChange("alias", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>GRUPO</label>
      <select
        value={metadata.grupo || ""}
        onChange={(e) => onChange("grupo", e.target.value)}
        style={{ ...inputStyle, cursor: "pointer" }}
      >
        <option value="">— Seleccionar grupo —</option>
        {GRUPOS.map((g) => (
          <option key={g} value={g} style={{ background: "#0a0805" }}>
            {g}
          </option>
        ))}
      </select>

      <label style={labelStyle}>AUTORIDAD</label>
      <input
        value={metadata.autoridad || ""}
        onChange={(e) => onChange("autoridad", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>VERDAD IDEÁTICA</label>
      <MarkdownEditor
        value={metadata.verdad_ideatica || ""}
        onChange={(v) => onChange("verdad_ideatica", v)}
        rows={4}
      />

      <label style={labelStyle}>NEGACIÓN</label>
      <MarkdownEditor
        value={metadata.negacion || ""}
        onChange={(v) => onChange("negacion", v)}
        rows={5}
      />

      <label style={labelStyle}>DINÁMICA</label>
      <MarkdownEditor
        value={metadata.dinamica || ""}
        onChange={(v) => onChange("dinamica", v)}
        rows={5}
      />

      <label style={labelStyle}>ENTIDAD ASOCIADA</label>
      <input
        value={metadata.entidad || ""}
        onChange={(e) => onChange("entidad", e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}
