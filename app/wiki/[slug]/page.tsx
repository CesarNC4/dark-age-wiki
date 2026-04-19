import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleRow from "@/app/components/ArticleRow";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: section } = await supabase
    .from("sections")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!section) notFound();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("section_id", section.id)
    .order("order_index");

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("section_id", section.id)
    .eq("published", true)
    .order("title");

  // Agrupar artículos por categoría
  const articlesByCategory = (categories || []).map((cat) => ({
    category: cat,
    articles: (articles || []).filter((a) => a.category === cat.slug),
  }));

  // Artículos sin categoría asignada
  const uncategorized = (articles || []).filter(
    (a) => !categories?.some((c) => c.slug === a.category),
  );

  const totalArticles = articles?.length || 0;

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
          filter: "brightness(0.3) saturate(0.5)",
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
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.9) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            backgroundColor: "rgba(139,46,46,0.85)",
            padding: "0.3rem 2rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            color: "rgba(232,213,160,0.7)",
            textAlign: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          LOGIA CENTRAL · CONOCIMIENTO RESTRINGIDO · AUTORIZACIÓN NIVEL OMEGA
        </div>

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "1.5rem 2rem 0",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "rgba(107,90,46,0.6)",
                letterSpacing: "0.2em",
                cursor: "pointer",
              }}
            >
              ← ARCHIVO CENTRAL
            </span>
          </Link>
        </div>

        <header
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "2rem 2rem 2.5rem",
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
                fontSize: "0.75rem",
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
              fontSize: "0.75rem",
              color: "rgba(139,46,46,0.6)",
              letterSpacing: "0.4em",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
            }}
          >
            Tratado
          </p>

          <h1
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: "700",
              color: "#e8d5a0",
              letterSpacing: "0.05em",
              lineHeight: "1",
              marginBottom: "1rem",
              textShadow:
                "0 0 40px rgba(200,169,110,0.15), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            {section.name}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "rgba(138,127,110,0.8)",
              fontStyle: "italic",
              lineHeight: "1.7",
            }}
          >
            {section.description}
          </p>

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
                width: "60px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(180,160,120,0.7))",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "rgba(180,160,120,0.7)",
                letterSpacing: "0.3em",
              }}
            >
              ◇ ◇ ◇
            </span>
            <div
              style={{
                width: "60px",
                height: "1px",
                background:
                  "linear-gradient(to left, transparent, rgba(180,160,120,0.7))",
              }}
            />
          </div>
        </header>

        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 2rem 4rem",
          }}
        >
          {totalArticles === 0 ? (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                border: "1px solid rgba(107,90,46,0.15)",
                background: "rgba(10,8,5,0.6)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(138,127,110,0.5)",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                }}
              >
                Este tratado aún no contiene entradas registradas.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "rgba(107,90,46,0.3)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  marginTop: "0.75rem",
                }}
              >
                — LA LOGIA —
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
              }}
            >
              {articlesByCategory.map(({ category, articles: catArticles }) => {
                if (catArticles.length === 0) return null;
                return (
                  <div key={category.id}>
                    {/* Header de categoría */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1rem",
                        paddingBottom: "0.75rem",
                        borderBottom: "1px solid rgba(139,46,46,0.2)",
                      }}
                    >
                      <h2
                        style={{
                          fontFamily: "var(--font-title)",
                          color: "#c8a96e",
                          fontSize: "1.2rem",
                          fontWeight: "700",
                        }}
                      >
                        {category.name}
                      </h2>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          color: "rgba(180,160,120,0.7)",
                          letterSpacing: "0.15em",
                        }}
                      >
                        {catArticles.length} ENTRADA
                        {catArticles.length !== 1 ? "S" : ""}
                      </span>
                    </div>

                    {/* Artículos de esta categoría */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {catArticles.map((article) => (
                        <Link
                          key={article.id}
                          href={`/wiki/${slug}/${article.slug}`}
                          style={{ textDecoration: "none" }}
                        >
                          <ArticleRow article={article} />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Artículos sin categoría */}
              {uncategorized.length > 0 && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                      paddingBottom: "0.75rem",
                      borderBottom: "1px solid rgba(139,46,46,0.2)",
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--font-title)",
                        color: "#c8a96e",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                      }}
                    >
                      General
                    </h2>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {uncategorized.map((article) => (
                      <Link
                        key={article.id}
                        href={`/wiki/${slug}/${article.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <ArticleRow article={article} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

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
              fontSize: "0.75rem",
              color: "rgba(180,160,120,0.7)",
              letterSpacing: "0.2em",
            }}
          >
            LA LOGIA · ARCHIVO CENTRAL · NUEVO MUNDO
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
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
