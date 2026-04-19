import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import ViewArcano from "@/app/components/article-views/ViewArcano";
import ViewPersonaje from "@/app/components/article-views/ViewPersonaje";
import ViewLugar from "@/app/components/article-views/ViewLugar";
import ViewMecanica from "@/app/components/article-views/ViewMecanica";
import ViewHorror from "@/app/components/article-views/ViewHorror";
import ViewFaccion from "@/app/components/article-views/ViewFaccion";

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

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", article.category)
    .eq("section_id", section.id)
    .single();

  const formType = category?.form_type || "lore";
  const metadata = article.metadata || {};

  function renderView() {
    switch (formType) {
      case "arcano":
        return <ViewArcano metadata={metadata} />;
      case "personaje":
        return <ViewPersonaje metadata={metadata} />;
      case "lugar":
        return <ViewLugar metadata={metadata} />;
      case "mecanica":
        return <ViewMecanica metadata={metadata} />;
      case "horror":
        return <ViewHorror metadata={metadata} />;
      case "faccion":
        return <ViewFaccion metadata={metadata} />;
      default:
        return null;
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#050403",
      }}
    >
      {/* Fondo más tenue para que el contenido respire */}
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
          filter: "brightness(0.18) saturate(0.35)",
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
            "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.95) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Barra superior */}
        <div
          style={{
            backgroundColor: "rgba(139,46,46,0.8)",
            padding: "0.3rem 2rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            color: "rgba(232,213,160,0.6)",
            textAlign: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          LOGIA CENTRAL · CONOCIMIENTO RESTRINGIDO · AUTORIZACIÓN NIVEL OMEGA
        </div>

        {/* Breadcrumb */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "1.25rem 2rem 0",
            display: "flex",
            gap: "0.6rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "rgba(107,90,46,0.5)",
                letterSpacing: "0.15em",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
            >
              ARCHIVO
            </span>
          </Link>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "rgba(107,90,46,0.25)",
            }}
          >
            ›
          </span>
          <Link href={`/wiki/${slug}`} style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "rgba(107,90,46,0.5)",
                letterSpacing: "0.15em",
                cursor: "pointer",
              }}
            >
              {section.name.toUpperCase()}
            </span>
          </Link>
          {category && (
            <>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  color: "rgba(107,90,46,0.25)",
                }}
              >
                ›
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  color: "rgba(107,90,46,0.4)",
                  letterSpacing: "0.15em",
                }}
              >
                {category.name.toUpperCase()}
              </span>
            </>
          )}
        </div>

        {/* Header del artículo */}
        <header
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "2rem 2rem 1.5rem",
          }}
        >
          {/* Línea decorativa */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(107,90,46,0.3))",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5rem",
                color: "rgba(107,90,46,0.3)",
                letterSpacing: "0.3em",
              }}
            >
              ◆
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(to left, transparent, rgba(107,90,46,0.3))",
              }}
            />
          </div>

          {category && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                color: "rgba(139,46,46,0.55)",
                letterSpacing: "0.35em",
                marginBottom: "0.6rem",
                textTransform: "uppercase",
              }}
            >
              {category.name}
            </p>
          )}

          <h1
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: "700",
              color: "#e8d5a0",
              letterSpacing: "0.02em",
              lineHeight: "1.15",
              marginBottom: article.excerpt ? "0.75rem" : "0",
              textShadow: "0 2px 4px rgba(0,0,0,0.6)",
            }}
          >
            {article.title}
          </h1>

          {article.excerpt && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "rgba(138,127,110,0.75)",
                fontStyle: "italic",
                lineHeight: "1.65",
                maxWidth: "600px",
              }}
            >
              {article.excerpt}
            </p>
          )}

          {/* Metadatos */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginTop: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.52rem",
                color: "rgba(107,90,46,0.35)",
                letterSpacing: "0.12em",
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
          </div>

          {/* Separador */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, rgba(107,90,46,0.25), transparent)",
              marginTop: "1.5rem",
            }}
          />
        </header>

        {/* Contenido */}
        <article
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 2rem 5rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {renderView()}

            {article.content && (
              <div
                style={{
                  marginTop: formType !== "lore" ? "0.5rem" : "0",
                  padding: "1.75rem 2rem",
                  background: "rgba(8,6,3,0.7)",
                  border: "1px solid rgba(107,90,46,0.12)",
                  borderTop: "1px solid rgba(107,90,46,0.2)",
                }}
              >
                {formType !== "lore" && (
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.52rem",
                      color: "rgba(107,90,46,0.4)",
                      letterSpacing: "0.2em",
                      marginBottom: "1.25rem",
                    }}
                  >
                    NOTAS ADICIONALES
                  </p>
                )}
                <div
                  className="markdown-content"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "rgba(225,215,198,0.88)",
                    lineHeight: "1.9",
                  }}
                >
                  <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Navegación inferior */}
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(107,90,46,0.15)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href={`/wiki/${slug}`} style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  color: "rgba(107,90,46,0.5)",
                  letterSpacing: "0.18em",
                  cursor: "pointer",
                }}
              >
                ← {section.name.toUpperCase()}
              </span>
            </Link>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.52rem",
                color: "rgba(107,90,46,0.2)",
                letterSpacing: "0.12em",
              }}
            >
              SUB ROSA
            </span>
          </div>
        </article>

        <footer
          style={{
            borderTop: "1px solid rgba(42,37,32,0.5)",
            padding: "1.25rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(5,4,3,0.7)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.52rem",
              color: "rgba(107,90,46,0.35)",
              letterSpacing: "0.18em",
            }}
          >
            LA LOGIA · ARCHIVO CENTRAL · NUEVO MUNDO
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.52rem",
              color: "rgba(139,46,46,0.4)",
              letterSpacing: "0.18em",
            }}
          >
            SUB ROSA · ██████
          </span>
        </footer>
      </div>
    </main>
  );
}
