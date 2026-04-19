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
  "Desconocida",
];

const NIVELES = [
  "Clase A — Catastrófico",
  "Clase B — Peligroso",
  "Clase C — Contenible",
  "Desconocido",
];

export default function FormHorror({ metadata, onChange }: Props) {
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
          <label style={labelStyle}>SENDA DE ORIGEN</label>
          <select
            value={metadata.senda || ""}
            onChange={(e) => onChange("senda", e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
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
          <label style={labelStyle}>NIVEL DE PELIGRO</label>
          <select
            value={metadata.nivel || ""}
            onChange={(e) => onChange("nivel", e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="">— Seleccionar —</option>
            {NIVELES.map((n) => (
              <option key={n} value={n} style={{ background: "#0a0805" }}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label style={labelStyle}>DESCRIPCIÓN FÍSICA</label>
      <textarea
        rows={4}
        value={metadata.descripcion || ""}
        onChange={(e) => onChange("descripcion", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>COMPORTAMIENTO Y MOTIVACIÓN</label>
      <textarea
        rows={3}
        value={metadata.comportamiento || ""}
        onChange={(e) => onChange("comportamiento", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>HABILIDADES Y AMENAZAS</label>
      <textarea
        rows={3}
        value={metadata.habilidades || ""}
        onChange={(e) => onChange("habilidades", e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>MÉTODO DE CONTENCIÓN</label>
      <textarea
        rows={3}
        value={metadata.contencion || ""}
        onChange={(e) => onChange("contencion", e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}
