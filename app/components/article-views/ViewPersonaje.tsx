import MarkdownBlock from "./MarkdownBlock";

interface Props {
  metadata: Record<string, string>;
}

export default function ViewPersonaje({ metadata }: Props) {
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
        {metadata.faccion && (
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
              FACCIÓN
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.faccion}
            </p>
          </div>
        )}
        {metadata.nacionalidad && (
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
              NACIONALIDAD
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.nacionalidad}
            </p>
          </div>
        )}
        {metadata.senda && (
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
              SENDA
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.senda}
            </p>
          </div>
        )}
        {metadata.frecuencia && (
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
              FRECUENCIA
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.frecuencia}
            </p>
          </div>
        )}
        {metadata.herramienta && (
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
              HERRAMIENTA
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#f0e8d8",
                fontSize: "1rem",
              }}
            >
              {metadata.herramienta}
            </p>
          </div>
        )}
      </div>

      {metadata.mania && (
        <div
          style={{
            padding: "1.25rem 1.5rem",
            background: "rgba(139,46,46,0.06)",
            border: "1px solid rgba(139,46,46,0.15)",
            borderLeft: "3px solid rgba(139,46,46,0.4)",
          }}
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
            MANÍA / ANCLAJE DE CORDURA
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(232,224,208,0.8)",
              fontSize: "0.95rem",
              fontStyle: "italic",
            }}
          >
            {metadata.mania}
          </p>
        </div>
      )}

      <MarkdownBlock
        label="DESCRIPCIÓN FÍSICA"
        value={metadata.descripcion_fisica}
      />
      <MarkdownBlock label="HISTORIA Y TRASFONDO" value={metadata.historia} />
      <MarkdownBlock label="NOTAS ADICIONALES" value={metadata.notas} />
    </div>
  );
}
