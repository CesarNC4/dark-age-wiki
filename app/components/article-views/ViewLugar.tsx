import MarkdownBlock from "./MarkdownBlock";

interface Props {
  metadata: Record<string, string>;
}

export default function ViewLugar({ metadata }: Props) {
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
        {metadata.tipo && (
          <div
            style={{ background: "rgba(10,8,5,0.9)", padding: "1rem 1.25rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "rgba(180,100,100,0.85)",
                letterSpacing: "0.2em",
                marginBottom: "0.35rem",
              }}
            >
              TIPO
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.tipo}
            </p>
          </div>
        )}
        {metadata.nacion && (
          <div
            style={{ background: "rgba(10,8,5,0.9)", padding: "1rem 1.25rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "rgba(180,100,100,0.85)",
                letterSpacing: "0.2em",
                marginBottom: "0.35rem",
              }}
            >
              NACIÓN
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.nacion}
            </p>
          </div>
        )}
        {metadata.ubicacion && (
          <div
            style={{ background: "rgba(10,8,5,0.9)", padding: "1rem 1.25rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "rgba(180,100,100,0.85)",
                letterSpacing: "0.2em",
                marginBottom: "0.35rem",
              }}
            >
              UBICACIÓN
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.ubicacion}
            </p>
          </div>
        )}
      </div>
      <MarkdownBlock
        label="DESCRIPCIÓN GENERAL"
        value={metadata.descripcion}
        accent={true}
      />
      <MarkdownBlock
        label="CARACTERÍSTICAS NOTABLES"
        value={metadata.caracteristicas}
      />
      <MarkdownBlock
        label="RELEVANCIA EN LA HISTORIA"
        value={metadata.relevancia}
      />
    </div>
  );
}
