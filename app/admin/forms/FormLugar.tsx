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

const TIPOS_LUGAR = [
  "Nación",
  "Ciudad",
  "Región",
  "Territorio en disputa",
  "Zona Muerta",
  "Falla de Realidad",
  "Instalación militar",
  "Otro",
];

export default function FormLugar({ metadata, onChange }: Props) {
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
          <label style={labelStyle}>TIPO DE LUGAR</label>
          <select
            value={metadata.tipo || ""}
            onChange={(e) => onChange("tipo", e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">— Seleccionar —</option>
            {TIPOS_LUGAR.map((t) => (
              <option key={t} value={t} style={{ background: "#0a0805" }}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>NACIÓN / POTENCIA</label>
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
              "Territorio neutral",
              "Desconocido",
            ].map((n) => (
              <option key={n} value={n} style={{ background: "#0a0805" }}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label style={labelStyle}>UBICACIÓN / CONTEXTO GEOGRÁFICO</label>
      <input
        value={metadata.ubicacion || ""}
        onChange={(e) => onChange("ubicacion", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>DESCRIPCIÓN GENERAL</label>
      <textarea
        rows={4}
        value={metadata.descripcion || ""}
        onChange={(e) => onChange("descripcion", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>CARACTERÍSTICAS NOTABLES</label>
      <textarea
        rows={3}
        value={metadata.caracteristicas || ""}
        onChange={(e) => onChange("caracteristicas", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>RELEVANCIA EN LA HISTORIA</label>
      <textarea
        rows={3}
        value={metadata.relevancia || ""}
        onChange={(e) => onChange("relevancia", e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}
