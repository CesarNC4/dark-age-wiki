"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Section {
  id: string;
  name: string;
  slug: string;
}
interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  section_id: string;
  sections?: { name: string };
}

export default function AdminDashboard({
  sections,
  articles: initialArticles,
}: {
  sections: Section[];
  articles: Article[];
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [view, setView] = useState<"list" | "new" | "edit">("list");
  const [editing, setEditing] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [sectionId, setSectionId] = useState(sections[0]?.id || "");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  function openNew() {
    setEditing(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setSectionId(sections[0]?.id || "");
    setPublished(false);
    setView("new");
  }

  function openEdit(article: Article) {
    setEditing(article);
    setTitle(article.title);
    setSlug(article.slug);
    setExcerpt(article.excerpt || "");
    setContent(article.content || "");
    setSectionId(article.section_id);
    setPublished(article.published);
    setView("edit");
  }

  function generateSlug(t: string) {
    return t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSave() {
    setSaving(true);
    const data = {
      title,
      slug,
      excerpt,
      content,
      section_id: sectionId,
      published,
    };
    if (view === "new") {
      const { data: created, error } = await supabase
        .from("articles")
        .insert(data)
        .select("*, sections(name)")
        .single();
      if (!error && created) setArticles((prev) => [created, ...prev]);
    } else if (editing) {
      const { data: updated, error } = await supabase
        .from("articles")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", editing.id)
        .select("*, sections(name)")
        .single();
      if (!error && updated)
        setArticles((prev) =>
          prev.map((a) => (a.id === editing.id ? updated : a)),
        );
    }
    setSaving(false);
    setView("list");
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este artículo?")) return;
    await supabase.from("articles").delete().eq("id", id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  async function handleLogout() {
    localStorage.removeItem("dark-age-admin");
    window.location.href = "/admin/login";
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
  };

  const labelStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    color: "rgba(107,90,46,0.6)",
    letterSpacing: "0.2em",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#050403",
        position: "relative",
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
          filter: "brightness(0.15) saturate(0.3)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Header admin */}
        <div
          style={{
            backgroundColor: "rgba(20,15,8,0.95)",
            padding: "1rem 2rem",
            borderBottom: "1px solid rgba(107,90,46,0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <h1
              style={{
                fontFamily: "var(--font-title)",
                color: "#e8d5a0",
                fontSize: "1.5rem",
              }}
            >
              Panel de la Logia
            </h1>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "rgba(139,46,46,0.6)",
                letterSpacing: "0.2em",
              }}
            >
              ADMIN
            </span>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <a href="/" style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "rgba(107,90,46,0.5)",
                  letterSpacing: "0.15em",
                }}
              >
                VER WIKI
              </span>
            </a>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "1px solid rgba(139,46,46,0.3)",
                padding: "0.4rem 1rem",
                color: "rgba(139,46,46,0.6)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                cursor: "pointer",
              }}
            >
              SALIR
            </button>
          </div>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
          {view === "list" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "rgba(107,90,46,0.5)",
                    letterSpacing: "0.2em",
                  }}
                >
                  {articles.length} ARTÍCULO{articles.length !== 1 ? "S" : ""}
                </span>
                <button
                  onClick={openNew}
                  style={{
                    background: "rgba(139,46,46,0.6)",
                    border: "1px solid rgba(139,46,46,0.4)",
                    padding: "0.6rem 1.5rem",
                    color: "rgba(232,213,160,0.9)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    cursor: "pointer",
                  }}
                >
                  + NUEVO ARTÍCULO
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {articles.length === 0 && (
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
                        color: "rgba(138,127,110,0.4)",
                        fontStyle: "italic",
                      }}
                    >
                      No hay artículos aún.
                    </p>
                  </div>
                )}
                {articles.map((article) => (
                  <div
                    key={article.id}
                    style={{
                      padding: "1rem 1.5rem",
                      background: "rgba(15,10,5,0.85)",
                      border: "1px solid rgba(107,90,46,0.15)",
                      borderLeft: `2px solid ${article.published ? "rgba(107,90,46,0.5)" : "rgba(139,46,46,0.3)"}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-title)",
                          color: "#e8d5a0",
                          fontSize: "1rem",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {article.title}
                      </h3>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            color: "rgba(107,90,46,0.4)",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {article.sections?.name || "—"}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            color: article.published
                              ? "rgba(107,150,46,0.6)"
                              : "rgba(139,46,46,0.5)",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {article.published ? "PUBLICADO" : "BORRADOR"}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button
                        onClick={() => openEdit(article)}
                        style={{
                          background: "none",
                          border: "1px solid rgba(107,90,46,0.3)",
                          padding: "0.3rem 0.75rem",
                          color: "rgba(200,169,110,0.6)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.1em",
                          cursor: "pointer",
                        }}
                      >
                        EDITAR
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        style={{
                          background: "none",
                          border: "1px solid rgba(139,46,46,0.2)",
                          padding: "0.3rem 0.75rem",
                          color: "rgba(139,46,46,0.5)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.1em",
                          cursor: "pointer",
                        }}
                      >
                        ELIMINAR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {(view === "new" || view === "edit") && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-title)",
                    color: "#e8d5a0",
                    fontSize: "1.5rem",
                  }}
                >
                  {view === "new" ? "Nuevo Artículo" : "Editar Artículo"}
                </h2>
                <button
                  onClick={() => setView("list")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(107,90,46,0.5)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    cursor: "pointer",
                  }}
                >
                  ← CANCELAR
                </button>
              </div>

              <div
                style={{
                  background: "rgba(10,8,5,0.8)",
                  border: "1px solid rgba(107,90,46,0.15)",
                  padding: "2rem",
                }}
              >
                <label style={labelStyle}>TÍTULO</label>
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (view === "new") setSlug(generateSlug(e.target.value));
                  }}
                  style={inputStyle}
                />

                <label style={labelStyle}>SLUG (URL)</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  style={inputStyle}
                />

                <label style={labelStyle}>SECCIÓN</label>
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  {sections.map((s) => (
                    <option
                      key={s.id}
                      value={s.id}
                      style={{ background: "#0a0805" }}
                    >
                      {s.name}
                    </option>
                  ))}
                </select>

                <label style={labelStyle}>EXTRACTO (OPCIONAL)</label>
                <input
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  style={inputStyle}
                />

                <label style={labelStyle}>CONTENIDO</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={16}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    lineHeight: "1.7",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                  <label
                    htmlFor="published"
                    style={{
                      ...labelStyle,
                      marginBottom: 0,
                      cursor: "pointer",
                    }}
                  >
                    PUBLICAR ARTÍCULO
                  </label>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving || !title || !slug}
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    background:
                      saving || !title || !slug
                        ? "rgba(107,90,46,0.2)"
                        : "rgba(139,46,46,0.7)",
                    border: "1px solid rgba(139,46,46,0.4)",
                    color: "rgba(232,213,160,0.9)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.3em",
                    cursor:
                      saving || !title || !slug ? "not-allowed" : "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {saving ? "GUARDANDO..." : "GUARDAR"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
