"use client";

import { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

export default function MarkdownEditor({ value, onChange, rows = 16 }: Props) {
  const [MDEditor, setMDEditor] = useState<any>(null);

  useEffect(() => {
    import("@uiw/react-md-editor").then((mod) => {
      setMDEditor(() => mod.default);
    });
  }, []);

  if (!MDEditor) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          background: "rgba(20,15,8,0.8)",
          border: "1px solid rgba(107,90,46,0.2)",
          color: "#e8d5a0",
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          outline: "none",
          boxSizing: "border-box",
          resize: "vertical",
          marginBottom: "1rem",
        }}
        placeholder="Cargando editor..."
      />
    );
  }

  return (
    <div style={{ marginBottom: "1rem" }} data-color-mode="dark">
      <MDEditor
        value={value}
        onChange={(v: string | undefined) => onChange(v || "")}
        height={rows * 24}
        preview="edit"
        style={{
          background: "rgba(20,15,8,0.8)",
          border: "1px solid rgba(107,90,46,0.2)",
          borderRadius: 0,
        }}
      />
    </div>
  );
}
