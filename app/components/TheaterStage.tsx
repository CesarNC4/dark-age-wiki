"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import SectionPlaque from "./SectionPlaque";
import IntroSequence from "./IntroSequence";

interface Section {
  id: string;
  name: string;
  slug: string;
  description: string;
  order_index: number;
}

const FEATURED_SLUGS = ["el-mundo-nuevo", "el-plano-ideatico", "personajes"];
const ARC_NUMBERS: Record<string, string> = {
  "el-mundo-nuevo": "I",
  "el-plano-ideatico": "II",
  personajes: "III",
};

export default function TheaterStage({ sections }: { sections: Section[] }) {
  const [introComplete, setIntroComplete] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  const featured = sections.filter((s) => FEATURED_SLUGS.includes(s.slug));
  const secondary = sections.filter((s) => !FEATURED_SLUGS.includes(s.slug));

  return (
    <div style={{ position: "relative", zIndex: 2, minHeight: "100vh" }}>
      <IntroSequence onComplete={handleIntroComplete} />

      {/* Barra clasificación */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{
          backgroundColor: "rgba(139,46,46,0.85)",
          padding: "0.3rem 2rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          color: "rgba(232,213,160,0.7)",
          textAlign: "center",
          backdropFilter: "blur(4px)",
          borderBottom: "1px solid rgba(139,46,46,0.3)",
        }}
      >
        LOGIA CENTRAL · CONOCIMIENTO RESTRINGIDO · AUTORIZACIÓN NIVEL OMEGA
      </motion.div>

      {/* Hero */}
      <header
        style={{
          padding: "1.5rem 2rem 2rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
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
                "linear-gradient(to right, transparent, rgba(200,169,110,0.5))",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(200,169,110,0.5)",
              letterSpacing: "0.3em",
            }}
          >
            ✦ ✦ ✦
          </span>
          <div
            style={{
              width: "60px",
              height: "1px",
              background:
                "linear-gradient(to left, transparent, rgba(200,169,110,0.5))",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "rgba(200,169,110,0.6)",
            letterSpacing: "0.5em",
            marginBottom: "1.2rem",
            textTransform: "uppercase",
          }}
        >
          Compendio del Nuevo Mundo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.1, 0.8, 0.6, 1] }}
          transition={{
            duration: 2.5,
            delay: 1,
            times: [0, 0.2, 0.3, 0.6, 0.8, 1],
          }}
          style={{
            fontFamily: "var(--font-title)",
            fontSize: "clamp(4rem, 10vw, 8rem)",
            fontWeight: "700",
            color: "#e8d5a0",
            letterSpacing: "0.08em",
            lineHeight: "1",
            marginBottom: "1.2rem",
            textShadow:
              "0 0 60px rgba(200,169,110,0.2), 0 2px 4px rgba(0,0,0,0.8)",
            position: "relative",
          }}
        >
          {/* Capa ideática del título */}
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              color: "rgba(120,100,180,0.18)",
              transform: "translate(3px, 2px)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            Dark Age
          </span>
          Dark Age
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.2 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.05rem",
            color: "rgba(138,127,110,0.8)",
            fontStyle: "italic",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: "1.7",
            textShadow: "0 1px 3px rgba(0,0,0,0.9)",
          }}
        >
          Lo que aquí se expone no fue escrito para ser leído.
          <br />
          Fue registrado para ser recordado cuando ya no quede nadie que
          recuerde.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 2.8 }}
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
                "linear-gradient(to right, transparent, rgba(139,46,46,0.5))",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(139,46,46,0.5)",
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
                "linear-gradient(to left, transparent, rgba(139,46,46,0.5))",
            }}
          />
        </motion.div>
      </header>

      {/* Secciones en arco */}
      <section
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem 2rem" }}
      >
        {/* Etiqueta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(139,46,46,0.7)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Tratados Principales
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(to right, rgba(139,46,46,0.4), transparent)",
            }}
          />
        </motion.div>

        {/* Grid en arco — centro más bajo */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1.25rem",
            alignItems: "end",
          }}
        >
          {featured.map((section, i) => {
            const arcOffset = i === 1 ? "40px" : "0px";
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 3.2 + i * 0.2 }}
                style={{ transform: `translateY(${arcOffset})` }}
              >
                <SectionPlaque
                  id={section.id}
                  name={section.name}
                  slug={section.slug}
                  description={section.description}
                  order_index={section.order_index}
                  featured={true}
                  arcNumber={ARC_NUMBERS[section.slug]}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Panel de archivos secundarios */}
        {secondary.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.8 }}
            style={{ marginTop: "3rem" }}
          >
            {/* Botón expandir */}
            <button
              onClick={() => setArchiveOpen(!archiveOpen)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                borderTop: "1px solid rgba(107,90,46,0.2)",
                borderBottom: archiveOpen
                  ? "none"
                  : "1px solid rgba(107,90,46,0.2)",
                padding: "1rem 0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                transition: "all 0.3s",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "rgba(107,90,46,0.6)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                Archivos Secundarios
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(to right, rgba(107,90,46,0.2), transparent)",
                }}
              />
              <motion.span
                animate={{ rotate: archiveOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "rgba(107,90,46,0.5)",
                }}
              >
                ▾
              </motion.span>
            </button>

            {/* Contenido expandible */}
            <AnimatePresence>
              {archiveOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "0.75rem",
                      padding: "1rem 0",
                      borderBottom: "1px solid rgba(107,90,46,0.2)",
                    }}
                  >
                    {secondary.map((section, i) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.08 }}
                      >
                        <SectionPlaque
                          id={section.id}
                          name={section.name}
                          slug={section.slug}
                          description={section.description}
                          order_index={section.order_index}
                          featured={false}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Pie */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 4 }}
        style={{
          borderTop: "1px solid rgba(42,37,32,0.6)",
          padding: "1.5rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(5,4,3,0.6)",
          marginTop: "2rem",
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
      </motion.footer>
    </div>
  );
}
