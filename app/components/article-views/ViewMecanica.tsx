import MarkdownBlock from "./MarkdownBlock";

interface Props {
  metadata: Record<string, string>;
}

export default function ViewMecanica({ metadata }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <MarkdownBlock
        label="DESCRIPCIÓN GENERAL"
        value={metadata.descripcion}
        accent={true}
      />
      <MarkdownBlock label="CÓMO FUNCIONA" value={metadata.funcionamiento} />
      <MarkdownBlock
        label="CONSECUENCIAS Y EFECTOS"
        value={metadata.consecuencias}
      />
      <MarkdownBlock label="LIMITACIONES" value={metadata.limitaciones} />
      <MarkdownBlock label="NOTAS Y EXCEPCIONES" value={metadata.notas} />
    </div>
  );
}
