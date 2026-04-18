"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.session) {
      setError("Credenciales incorrectas.");
      setLoading(false);
    } else {
      localStorage.setItem("dark-age-admin", data.session.access_token);
      window.location.href = "/admin";
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "rgba(20,15,8,0.8)",
    border: "1px solid rgba(107,90,46,0.2)",
    color: "#e8d5a0",
    fontFamily: "var(--font-mono)",
    fontSize: "0.8rem",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#050403",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          filter: "brightness(0.2) saturate(0.4)",
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
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.95) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "420px",
          padding: "0 2rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(139,46,46,0.7)",
              letterSpacing: "0.4em",
              marginBottom: "0.75rem",
            }}
          >
            ACCESO RESTRINGIDO
          </p>
          <h1
            style={{
              fontFamily: "var(--font-title)",
              fontSize: "2.5rem",
              color: "#e8d5a0",
              letterSpacing: "0.05em",
            }}
          >
            La Logia
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "rgba(138,127,110,0.6)",
              fontStyle: "italic",
              marginTop: "0.5rem",
            }}
          >
            Solo los iniciados pueden continuar.
          </p>
        </div>

        <div
          style={{
            background: "rgba(10,8,5,0.9)",
            border: "1px solid rgba(107,90,46,0.2)",
            borderTop: "2px solid rgba(139,46,46,0.5)",
            padding: "2rem",
          }}
        >
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "rgba(107,90,46,0.6)",
                letterSpacing: "0.2em",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              IDENTIFICADOR
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "rgba(107,90,46,0.6)",
                letterSpacing: "0.2em",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              CONTRASEÑA
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={inputStyle}
            />
          </div>

          {error && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "rgba(139,46,46,0.8)",
                letterSpacing: "0.15em",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.85rem",
              background: loading
                ? "rgba(107,90,46,0.2)"
                : "rgba(139,46,46,0.7)",
              border: "1px solid rgba(139,46,46,0.4)",
              color: loading
                ? "rgba(200,169,110,0.4)"
                : "rgba(232,213,160,0.9)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
          >
            {loading ? "VERIFICANDO..." : "ACCEDER"}
          </button>
        </div>
      </div>
    </main>
  );
}
