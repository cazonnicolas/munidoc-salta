export const OFFICIAL_DOCUMENT_TEMPLATE = {
  cityPrefix: "SALTA",
  municipalityTitle: "MUNICIPALIDAD DE SALTA",
  executiveTitle: "DEPARTAMENTO EJECUTIVO",
  motto: "“General Martín Miguel de Güemes, Héroe de la Nación Argentina”",
  footerText: "Documento creado por MuniDoc",
  escudoPath: "/escudo-departamento-ejecutivo.jpg",
  logoPath: "/logo-salta.png",
};

export function formatOfficialDate(placeAndDate?: string): string {
  const value = placeAndDate?.trim().replace(/\s+/g, " ") ?? "";

  if (!value || /^\[?(lugar y )?fecha\]?$/i.test(value)) {
    return `${OFFICIAL_DOCUMENT_TEMPLATE.cityPrefix}, [FECHA]`;
  }

  if (new RegExp(`^${OFFICIAL_DOCUMENT_TEMPLATE.cityPrefix}\\b`, "i").test(value)) {
    return value.replace(/^salta\b/i, OFFICIAL_DOCUMENT_TEMPLATE.cityPrefix);
  }

  return `${OFFICIAL_DOCUMENT_TEMPLATE.cityPrefix}, ${value}`;
}

export function sanitizeGeneratedDocumentText(text: string) {
  const normalizedLines = text.replace(/\r\n/g, "\n").split("\n");
  const cleanedLines = normalizedLines.filter((line, index, lines) => {
    const trimmed = line.trim();
    const compact = trimmed
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const isEdgeLine = index < 8 || index > lines.length - 8;

    if (!trimmed) return true;

    if (
      isEdgeLine &&
      (compact === "municipalidad de salta" ||
        compact === "departamento ejecutivo" ||
        compact.includes("general martin miguel de guemes") ||
        compact === "documento creado por munidoc" ||
        compact === "documento generado por ia" ||
        compact === "documento generado desde munidoc salta")
    ) {
      return false;
    }

    if (index < 6 && /^salta\s*,\s*.+/i.test(trimmed)) {
      return false;
    }

    return true;
  });

  return cleanedLines.join("\n").replace(/\n{4,}/g, "\n\n\n").trim();
}
