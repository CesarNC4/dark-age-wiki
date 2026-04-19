import MarkdownBlock from "./MarkdownBlock";

interface Props {
  metadata: Record<string, string>;
}

const NIVEL_COLOR: Record<string, string> = {
  "Clase A — Catastrófico": "rgba(139,46,46,0.7)",
  "Clase B — Peligroso": "rgba(139,90,46,0.7)",
  "Clase C — Contenible": "rgba(107,90,46,0.7)",
};

export default function ViewHorror({ metadata }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1px",
          background: "rgba(107,90,46,0.15)",
          border: "1px solid rgba(107,90,46,0.15)",
        }}
      >
        {metadata.senda && (
          <div
            style={{ background: "rgba(10,8,5,0.9)", padding: "1rem 1.25rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "rgba(139,46,46,0.6)",
                letterSpacing: "0.2em",
                marginBottom: "0.35rem",
              }}
            >
              SENDA DE ORIGEN
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#e8d5a0",
                fontSize: "0.9rem",
              }}
            >
              {metadata.senda}
            </p>
          </div>
        )}
        {metadata.nivel && (
          <div
            style={{ background: "rgba(10,8,5,0.9)", padding: "1rem 1.25rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "rgba(139,46,46,0.6)",
                letterSpacing: "0.2em",
                marginBottom: "0.35rem",
              }}
            >
              NIVEL DE PELIGRO
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: NIVEL_COLOR[metadata.nivel] || "#e8d5a0",
                fontWeight: "bold",
              }}
            >
              {metadata.nivel}
            </p>
          </div>
        )}
      </div>
      <MarkdownBlock
        label="DESCRIPCIÓN FÍSICA"
        value={metadata.descripcion}
        accent={true}
      />
      <MarkdownBlock
        label="COMPORTAMIENTO Y MOTIVACIÓN"
        value={metadata.comportamiento}
      />
      <MarkdownBlock
        label="HABILIDADES Y AMENAZAS"
        value={metadata.habilidades}
      />
      <MarkdownBlock label="MÉTODO DE CONTENCIÓN" value={metadata.contencion} />
    </div>
  );
}
