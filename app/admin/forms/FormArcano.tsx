"use client";

interface Props {
  metadata: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

const field = (
  label: string,
  key: string,
  value: string,
  onChange: (k: string, v: string) => void,
  multiline = false,
) => {
  const style = {
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
  const label_style = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    color: "rgba(107,90,46,0.6)",
    letterSpacing: "0.2em",
    display: "block",
    marginBottom: "0.4rem",
  };
  return (
    <div key={key}>
      <label style={label_style}>{label}</label>
      {multiline ? (
        <textarea
          rows={4}
          value={value || ""}
          onChange={(e) => onChange(key, e.target.value)}
          style={style}
        />
      ) : (
        <input
          value={value || ""}
          onChange={(e) => onChange(key, e.target.value)}
          style={style}
        />
      )}
    </div>
  );
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
      {field("ALIAS / NOMBRE ALTERNATIVO", "alias", metadata.alias, onChange)}
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "rgba(107,90,46,0.6)",
            letterSpacing: "0.2em",
            display: "block",
            marginBottom: "0.4rem",
          }}
        >
          GRUPO
        </label>
        <select
          value={metadata.grupo || ""}
          onChange={(e) => onChange("grupo", e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            background: "rgba(20,15,8,0.8)",
            border: "1px solid rgba(107,90,46,0.2)",
            color: "#e8d5a0",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            outline: "none",
            boxSizing: "border-box",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
        >
          <option value="">— Seleccionar grupo —</option>
          {GRUPOS.map((g) => (
            <option key={g} value={g} style={{ background: "#0a0805" }}>
              {g}
            </option>
          ))}
        </select>
      </div>
      {field("AUTORIDAD", "autoridad", metadata.autoridad, onChange)}
      {field(
        "VERDAD IDEÁTICA",
        "verdad_ideatica",
        metadata.verdad_ideatica,
        onChange,
        true,
      )}
      {field("NEGACIÓN", "negacion", metadata.negacion, onChange, true)}
      {field("DINÁMICA", "dinamica", metadata.dinamica, onChange, true)}
      {field("ENTIDAD ASOCIADA", "entidad", metadata.entidad, onChange)}
    </div>
  );
}
