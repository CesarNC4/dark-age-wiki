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

export default function FormFaccion({ metadata, onChange }: Props) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 1rem",
        }}
      >
        <div>
          <label style={labelStyle}>TIPO DE ORGANIZACIÓN</label>
          <select
            value={metadata.tipo || ""}
            onChange={(e) => onChange("tipo", e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">— Seleccionar —</option>
            {[
              "Logia / Secreta",
              "Militar",
              "Gubernamental",
              "Comercial",
              "Criminal",
              "Religiosa",
              "Otra",
            ].map((t) => (
              <option key={t} value={t} style={{ background: "#0a0805" }}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>NACIÓN / BASE DE OPERACIONES</label>
          <select
            value={metadata.nacion || ""}
            onChange={(e) => onChange("nacion", e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">— Seleccionar —</option>
            {[
              "Ostral",
              "Avalon",
              "Khavar",
              "Nova",
              "Internacional",
              "Desconocida",
            ].map((n) => (
              <option key={n} value={n} style={{ background: "#0a0805" }}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label style={labelStyle}>MIEMBROS NOTABLES</label>
      <input
        value={metadata.miembros || ""}
        onChange={(e) => onChange("miembros", e.target.value)}
        style={inputStyle}
        placeholder="Ej: Maven, Julian..."
      />

      <label style={labelStyle}>DESCRIPCIÓN Y OBJETIVOS</label>
      <MarkdownEditor
        value={metadata.descripcion || ""}
        onChange={(v) => onChange("descripcion", v)}
        rows={5}
      />

      <label style={labelStyle}>ESTRUCTURA INTERNA</label>
      <MarkdownEditor
        value={metadata.estructura || ""}
        onChange={(v) => onChange("estructura", v)}
        rows={4}
      />

      <label style={labelStyle}>RELACIONES CON OTRAS FACCIONES</label>
      <MarkdownEditor
        value={metadata.relaciones || ""}
        onChange={(v) => onChange("relaciones", v)}
        rows={4}
      />
    </div>
  );
}
