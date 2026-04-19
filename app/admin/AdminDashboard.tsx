"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import FormArcano from "./forms/FormArcano";
import FormPersonaje from "./forms/FormPersonaje";
import FormLugar from "./forms/FormLugar";
import FormMecanica from "./forms/FormMecanica";
import FormHorror from "./forms/FormHorror";
import FormFaccion from "./forms/FormFaccion";
import MarkdownEditor from "./components/MarkdownEditor";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface Section {
  id: string;
  name: string;
  slug: string;
}
interface Category {
  id: string;
  name: string;
  slug: string;
  form_type: string;
  section_id: string;
}
interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  section_id: string;
  category: string;
  metadata: Record<string, string>;
  sections?: { name: string };
}

const FORM_LABELS: Record<string, string> = {
  arcano: "Arcano",
  personaje: "Personaje",
  lugar: "Lugar / Nación",
  mecanica: "Mecánica",
  horror: "Horror",
  faccion: "Facción",
  lore: "Lore General",
};

export default function AdminDashboard({
  sections,
  articles: initialArticles,
  categories: initialCategories,
}: {
  sections: Section[];
  articles: Article[];
  categories: Category[];
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [view, setView] = useState<"list" | "new" | "edit">("list");
  const [editing, setEditing] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [sectionId, setSectionId] = useState(sections[0]?.id || "");
  const [categoryId, setCategoryId] = useState("");
  const [published, setPublished] = useState(false);
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [filterSection, setFilterSection] = useState("all");
  const router = useRouter();

  const filteredCategories = categories.filter(
    (c) => c.section_id === sectionId,
  );
  const currentCategory = categories.find((c) => c.id === categoryId);
  const formType = currentCategory?.form_type || "lore";

  const filteredArticles =
    filterSection === "all"
      ? articles
      : articles.filter((a) => a.section_id === filterSection);

  function openNew() {
    setEditing(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setSectionId(sections[0]?.id || "");
    setCategoryId("");
    setPublished(false);
    setMetadata({});
    setView("new");
  }

  function openEdit(article: Article) {
    setEditing(article);
    setTitle(article.title);
    setSlug(article.slug);
    setExcerpt(article.excerpt || "");
    setContent(article.content || "");
    setSectionId(article.section_id);
    const cat = categories.find((c) => c.slug === article.category);
    setCategoryId(cat?.id || "");
    setPublished(article.published);
    setMetadata(article.metadata || {});
    setView("edit");
  }

  function handleMetadata(key: string, value: string) {
    setMetadata((prev) => ({ ...prev, [key]: value }));
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
    const cat = categories.find((c) => c.id === categoryId);
    const data = {
      title,
      slug,
      excerpt,
      content,
      section_id: sectionId,
      category: cat?.slug || "general",
      metadata,
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

  function handleLogout() {
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
    fontSize: "0.72rem",
    color: "rgba(180,150,100,0.8)",
    letterSpacing: "0.18em",
    display: "block",
    marginBottom: "0.5rem",
  };

  const selectStyle = { ...inputStyle, cursor: "pointer" };

  function renderForm() {
    const props = { metadata, onChange: handleMetadata };
    switch (formType) {
      case "arcano":
        return <FormArcano {...props} />;
      case "personaje":
        return <FormPersonaje {...props} />;
      case "lugar":
        return <FormLugar {...props} />;
      case "mecanica":
        return <FormMecanica {...props} />;
      case "horror":
        return <FormHorror {...props} />;
      case "faccion":
        return <FormFaccion {...props} />;
      default:
        return null;
    }
  }
  console.log("categories:", categories.length, categories);
  console.log("sectionId:", sectionId);
  console.log("filteredCategories:", filteredCategories.length);
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
        {/* Header */}
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

        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem" }}>
          {/* LISTA */}
          {view === "list" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
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
                    FILTRAR:
                  </span>
                  <select
                    value={filterSection}
                    onChange={(e) => setFilterSection(e.target.value)}
                    style={{
                      padding: "0.4rem 0.75rem",
                      background: "rgba(20,15,8,0.8)",
                      border: "1px solid rgba(107,90,46,0.2)",
                      color: "#e8d5a0",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="all">Todas las secciones</option>
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
                </div>
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
                {filteredArticles.length === 0 && (
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
                      No hay artículos en esta sección.
                    </p>
                  </div>
                )}
                {filteredArticles.map((article) => {
                  const cat = categories.find(
                    (c) => c.slug === article.category,
                  );
                  return (
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
                            marginBottom: "0.25rem",
                          }}
                        >
                          {article.title}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                          }}
                        >
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
                          {cat && (
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.55rem",
                                color: "rgba(107,90,46,0.3)",
                                letterSpacing: "0.1em",
                              }}
                            >
                              {cat.name} ·{" "}
                              {FORM_LABELS[cat.form_type] || cat.form_type}
                            </span>
                          )}
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
                  );
                })}
              </div>
            </>
          )}

          {/* FORMULARIO */}
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
                  {currentCategory && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "rgba(139,46,46,0.6)",
                        letterSpacing: "0.2em",
                        marginLeft: "1rem",
                      }}
                    >
                      {FORM_LABELS[formType]}
                    </span>
                  )}
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
                {/* Sección y categoría */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0 1rem",
                  }}
                >
                  <div>
                    <label style={labelStyle}>SECCIÓN</label>
                    <select
                      value={sectionId}
                      onChange={(e) => {
                        setSectionId(e.target.value);
                        setCategoryId("");
                      }}
                      style={selectStyle}
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
                  </div>
                  <div>
                    <label style={labelStyle}>CATEGORÍA</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      style={selectStyle}
                    >
                      <option value="">— Seleccionar categoría —</option>
                      {filteredCategories.map((c) => (
                        <option
                          key={c.id}
                          value={c.id}
                          style={{ background: "#0a0805" }}
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Campos base */}
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

                <label style={labelStyle}>EXTRACTO</label>
                <input
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  style={inputStyle}
                  placeholder="Descripción breve que aparece en los listados"
                />

                {/* Separador */}
                {currentCategory && (
                  <div
                    style={{
                      borderTop: "1px solid rgba(107,90,46,0.2)",
                      margin: "1rem 0 1.5rem",
                      paddingTop: "1.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "rgba(139,46,46,0.5)",
                        letterSpacing: "0.2em",
                        marginBottom: "1.5rem",
                      }}
                    >
                      CAMPOS ESPECÍFICOS —{" "}
                      {FORM_LABELS[formType]?.toUpperCase()}
                    </p>
                    {renderForm()}
                  </div>
                )}

                {/* Contenido libre */}
                <label style={labelStyle}>CONTENIDO ADICIONAL (OPCIONAL)</label>
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  rows={14}
                />

                {/* Publicar */}
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
