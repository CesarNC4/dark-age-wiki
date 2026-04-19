"use client";

import MarkdownEditor from "../components/MarkdownEditor";

interface Props {
  metadata: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

const SENDAS = [
  "El Loco",
  "El Mundo",
  "El Crisol",
  "La Justicia",
  "El Sol",
  "La Furia",
  "El Inquisidor",
  "El Colgado",
  "La Sacerdotisa",
  "La Finalidad",
  "El Coloso",
  "La Ruina",
  "La Luna",
  "El Ermitaño",
  "El Demiurgo",
  "La Matriarca",
  "El Fulgor",
  "El Abismo",
  "Los Enamorados",
  "El Destino",
  "El Soberano",
  "El Juicio",
  "Ninguna",
];

const FRECUENCIAS = [
  "Freq 9",
  "Freq 8",
  "Freq 7",
  "Freq 6",
  "Freq 5",
  "Freq 4",
  "Freq 3",
  "Freq 2",
  "Freq 1",
  "Freq 0",
  "N/A",
];

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

const selectStyle = { ...inputStyle, cursor: "pointer" };

export default function FormPersonaje({ metadata, onChange }: Props) {
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
          <label style={labelStyle}>FACCIÓN / AFILIACIÓN</label>
          <input
            value={metadata.faccion || ""}
            onChange={(e) => onChange("faccion", e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>NACIONALIDAD</label>
          <input
            value={metadata.nacionalidad || ""}
            onChange={(e) => onChange("nacionalidad", e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 1rem",
        }}
      >
        <div>
          <label style={labelStyle}>SENDA</label>
          <select
            value={metadata.senda || ""}
            onChange={(e) => onChange("senda", e.target.value)}
            style={selectStyle}
          >
            <option value="">— Seleccionar —</option>
            {SENDAS.map((s) => (
              <option key={s} value={s} style={{ background: "#0a0805" }}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>FRECUENCIA ACTUAL</label>
          <select
            value={metadata.frecuencia || ""}
            onChange={(e) => onChange("frecuencia", e.target.value)}
            style={selectStyle}
          >
            <option value="">— Seleccionar —</option>
            {FRECUENCIAS.map((f) => (
              <option key={f} value={f} style={{ background: "#0a0805" }}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label style={labelStyle}>MANÍA / TIC DE CORDURA</label>
      <input
        value={metadata.mania || ""}
        onChange={(e) => onChange("mania", e.target.value)}
        style={inputStyle}
        placeholder="Ej: Girar una moneda, morderse las uñas..."
      />

      <label style={labelStyle}>HERRAMIENTA MAESTRA / CONDUCTO</label>
      <input
        value={metadata.herramienta || ""}
        onChange={(e) => onChange("herramienta", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>DESCRIPCIÓN FÍSICA</label>
      <MarkdownEditor
        value={metadata.descripcion_fisica || ""}
        onChange={(v) => onChange("descripcion_fisica", v)}
        rows={5}
      />

      <label style={labelStyle}>HISTORIA Y TRASFONDO</label>
      <MarkdownEditor
        value={metadata.historia || ""}
        onChange={(v) => onChange("historia", v)}
        rows={8}
      />

      <label style={labelStyle}>NOTAS ADICIONALES</label>
      <MarkdownEditor
        value={metadata.notas || ""}
        onChange={(v) => onChange("notas", v)}
        rows={4}
      />
    </div>
  );
}
