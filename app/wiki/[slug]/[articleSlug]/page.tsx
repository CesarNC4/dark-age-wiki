import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; articleSlug: string }>;
}) {
  const { slug, articleSlug } = await params;

  const { data: section } = await supabase
    .from("sections")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!section) notFound();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", articleSlug)
    .eq("section_id", section.id)
    .single();

  if (!article) notFound();

  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#050403",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          backgroundImage: "url(/teatro.png)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          filter: "brightness(0.25) saturate(0.4)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.92) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Barra superior */}
        <div
          style={{
            backgroundColor: "rgba(139,46,46,0.85)",
            padding: "0.3rem 2rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            color: "rgba(232,213,160,0.7)",
            textAlign: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          LOGIA CENTRAL · CONOCIMIENTO RESTRINGIDO · AUTORIZACIÓN NIVEL OMEGA
        </div>

        {/* Navegación breadcrumb */}
        <div
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "1.5rem 2rem 0",
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "rgba(107,90,46,0.5)",
                letterSpacing: "0.15em",
                cursor: "pointer",
              }}
            >
              ARCHIVO
            </span>
          </Link>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(107,90,46,0.3)",
            }}
          >
            ·
          </span>
          <Link href={`/wiki/${slug}`} style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "rgba(107,90,46,0.5)",
                letterSpacing: "0.15em",
                cursor: "pointer",
              }}
            >
              {section.name.toUpperCase()}
            </span>
          </Link>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(107,90,46,0.3)",
            }}
          >
            ·
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(200,169,110,0.5)",
              letterSpacing: "0.15em",
            }}
          >
            {article.title.toUpperCase()}
          </span>
        </div>

        {/* Header del artículo */}
        <header
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "2.5rem 2rem 2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(200,169,110,0.4))",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "rgba(139,46,46,0.6)",
                letterSpacing: "0.3em",
              }}
            >
              ◆ ◆ ◆
            </span>
            <div
              style={{
                width: "60px",
                height: "1px",
                background:
                  "linear-gradient(to left, transparent, rgba(200,169,110,0.4))",
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(139,46,46,0.6)",
              letterSpacing: "0.4em",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
            }}
          >
            {section.name}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "700",
              color: "#e8d5a0",
              letterSpacing: "0.03em",
              lineHeight: "1.1",
              marginBottom: "1rem",
              textShadow:
                "0 0 40px rgba(200,169,110,0.15), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            {article.title}
          </h1>

          {article.excerpt && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.05rem",
                color: "rgba(138,127,110,0.8)",
                fontStyle: "italic",
                lineHeight: "1.7",
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              {article.excerpt}
            </p>
          )}

          {/* Metadatos */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "rgba(107,90,46,0.4)",
                letterSpacing: "0.15em",
              }}
            >
              {new Date(article.created_at)
                .toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                .toUpperCase()}
            </span>
            {article.updated_at !== article.created_at && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  color: "rgba(107,90,46,0.3)",
                  letterSpacing: "0.15em",
                }}
              >
                ACT.{" "}
                {new Date(article.updated_at)
                  .toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  .toUpperCase()}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(107,90,46,0.3))",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "rgba(107,90,46,0.3)",
                letterSpacing: "0.3em",
              }}
            >
              ◇
            </span>
            <div
              style={{
                width: "120px",
                height: "1px",
                background:
                  "linear-gradient(to left, transparent, rgba(107,90,46,0.3))",
              }}
            />
          </div>
        </header>

        {/* Contenido del artículo */}
        <article
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "0 2rem 6rem",
          }}
        >
          <div
            style={{
              background: "rgba(10,8,5,0.75)",
              border: "1px solid rgba(107,90,46,0.15)",
              borderTop: "1px solid rgba(139,46,46,0.2)",
              padding: "2.5rem 3rem",
              backdropFilter: "blur(4px)",
            }}
          >
            {article.content ? (
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  color: "rgba(232,224,208,0.9)",
                  lineHeight: "1.9",
                  whiteSpace: "pre-wrap",
                }}
              >
                {article.content}
              </div>
            ) : (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(138,127,110,0.4)",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                Este registro no contiene información adicional.
              </p>
            )}
          </div>

          {/* Navegación inferior */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href={`/wiki/${slug}`} style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "rgba(107,90,46,0.5)",
                  letterSpacing: "0.2em",
                  cursor: "pointer",
                }}
              >
                ← VOLVER A {section.name.toUpperCase()}
              </span>
            </Link>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "rgba(107,90,46,0.25)",
                letterSpacing: "0.15em",
              }}
            >
              ██████
            </span>
          </div>
        </article>

        {/* Pie */}
        <footer
          style={{
            borderTop: "1px solid rgba(42,37,32,0.6)",
            padding: "1.5rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(5,4,3,0.6)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "rgba(107,90,46,0.4)",
              letterSpacing: "0.2em",
            }}
          >
            LA LOGIA · ARCHIVO CENTRAL · NUEVO MUNDO
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "rgba(139,46,46,0.5)",
              letterSpacing: "0.2em",
            }}
          >
            SUB ROSA · ██████
          </span>
        </footer>
      </div>
    </main>
  );
}
