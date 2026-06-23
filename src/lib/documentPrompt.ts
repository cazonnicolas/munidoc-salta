import type { DocumentModel, DocumentType } from "@/lib/documentModels";

export type AdministrativeFormData = {
  number: string;
  date: string;
  recipient: string;
  subject: string;
};

export type BuildAIPromptOptions = {
  documentType: DocumentType;
  model: DocumentModel;
  template: string;
  requiredFields: string[];
  formData: AdministrativeFormData;
  userPrompt: string;
  formattingRules?: string[];
};

const defaultFormattingRules = [
  "Usar tono formal.",
  "Ser claro, preciso y conciso.",
  "No usar nombres propios ficticios.",
  "No inventar expedientes, fechas, normas ni destinatarios.",
  "Mantener entre corchetes cualquier dato faltante.",
  "Respetar el tipo de documento seleccionado.",
  "Respetar la estructura del modelo.",
  "Usar fórmulas administrativas cuando corresponda.",
  "Entregar únicamente el documento final, listo para exportarse a Word.",
];

export function buildAIPrompt({
  documentType,
  model,
  template,
  requiredFields,
  formData,
  userPrompt,
  formattingRules = defaultFormattingRules,
}: BuildAIPromptOptions) {
  return `Sos un asistente especializado en redacción administrativa municipal de la Municipalidad de Salta. Redactá únicamente el documento solicitado, sin explicaciones externas. Usá lenguaje administrativo formal, claro, preciso y conciso. Respetá el tipo de documento, el modelo seleccionado y los datos completados por el agente. No inventes expedientes, fechas, normas, artículos, nombres, cargos ni destinatarios. Si falta un dato, dejalo entre corchetes. No uses nombres propios ficticios. No uses Markdown. No agregues frases como “aquí tiene” o “claro”. El resultado debe quedar listo para vista previa y exportación a Word.

TIPO DE DOCUMENTO:
${documentType}

MODELO SELECCIONADO:
${model.title}

DATOS DEL DOCUMENTO:
- Número: ${formData.number || "[NÚMERO]"}
- Lugar y fecha: ${formData.date || "SALTA, [FECHA]"}
- Destinatario: ${formData.recipient || "[DESTINATARIO]"}
- Asunto: ${formData.subject || "[ASUNTO]"}

PLANTILLA BASE DEL MODELO:
${template}

CAMPOS REQUERIDOS:
${requiredFields.map((field) => `- ${field}`).join("\n")}

INDICACIONES DEL AGENTE MUNICIPAL:
${userPrompt.trim() || "[SIN INDICACIONES ADICIONALES]"}

REGLAS DE REDACCIÓN Y FORMATO:
${formattingRules.map((rule) => `- ${rule}`).join("\n")}`;
}

export function buildProvisionalDocument({
  model,
  formData,
  userPrompt,
}: {
  model: DocumentModel;
  formData: AdministrativeFormData;
  userPrompt: string;
}) {
  let documentText = model.template;
  const instructions = userPrompt.trim();

  if (instructions) {
    const provisionalBody = buildProvisionalBody(model.type, instructions);
    const signatureMarker = getSignatureMarker(documentText);

    if (signatureMarker) {
      documentText = documentText.replace(
        signatureMarker,
        `${provisionalBody}\n\n${signatureMarker}`,
      );
    } else {
      documentText = `${documentText.trimEnd()}\n\n${provisionalBody}`;
    }
  }

  documentText = addMissingFormFields(documentText, model.type, formData);
  return replaceKnownFields(documentText, formData);
}

export function createInitialFormData(
  model: DocumentModel,
): AdministrativeFormData {
  return {
    number: "[NÚMERO]",
    date: "SALTA, [FECHA]",
    recipient: "[DESTINATARIO]",
    subject: model.title,
  };
}

function replaceKnownFields(
  template: string,
  formData: AdministrativeFormData,
) {
  const replacements: Array<[RegExp, string]> = [
    [/\[NÚMERO\]/gi, formData.number || "[NÚMERO]"],
    [/\[FECHA\]/gi, normalizeDate(formData.date)],
    [/\[DESTINATARIO\]/gi, formData.recipient || "[DESTINATARIO]"],
    [/\[ASUNTO\]/gi, formData.subject || "[ASUNTO]"],
  ];

  return replacements.reduce(
    (result, [pattern, value]) => result.replace(pattern, value),
    template,
  );
}

function normalizeDate(date: string) {
  return (date || "SALTA, [FECHA]").replace(/^SALTA,\s*/i, "");
}

function buildProvisionalBody(type: DocumentType, instructions: string) {
  const prefix: Record<DocumentType, string> = {
    Nota:
      "Por medio de la presente, se solicita tenga a bien considerar lo siguiente:",
    Pase: "A los efectos de dar continuidad al trámite, se deja indicado:",
    Memorándum: "Por medio del presente se comunica lo siguiente:",
    Circular: "A fin de informar a las áreas correspondientes, se establece:",
    Informe: "En relación con la actuación administrativa, se informa:",
    Constancia: "A los efectos correspondientes, se deja constancia de que:",
  };

  return `${prefix[type]} ${instructions}`;
}

function addMissingFormFields(
  documentText: string,
  type: DocumentType,
  formData: AdministrativeFormData,
) {
  const metadata: string[] = [];

  if (
    !documentText.includes("[NÚMERO]") &&
    formData.number.trim() &&
    formData.number !== "[NÚMERO]"
  ) {
    metadata.push(`${type.toUpperCase()} Nº ${formData.number}`);
  }

  if (
    !documentText.includes("[ASUNTO]") &&
    formData.subject.trim() &&
    formData.subject !== "[ASUNTO]"
  ) {
    metadata.push(`Asunto: ${formData.subject}`);
  }

  if (metadata.length > 0) {
    const lines = documentText.split("\n");
    const dateLineIndex = lines.findIndex((line) => /\[FECHA\]/i.test(line));
    const insertionIndex = dateLineIndex >= 0 ? dateLineIndex + 1 : 0;
    lines.splice(insertionIndex, 0, "", ...metadata);
    documentText = lines.join("\n");
  }

  return documentText;
}

function getSignatureMarker(documentText: string) {
  const markers = ["[FIRMA]", "[CARGO]", "[DNI]"];
  return markers.find((marker) => documentText.includes(marker));
}
