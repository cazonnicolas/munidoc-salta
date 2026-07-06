import { GoogleGenAI } from "@google/genai";

type GenerationMode = "free" | "model";

type GenerateDocumentRequest = {
  generationMode?: GenerationMode;
  documentType?: string;
  selectedModelId?: string | null;
  modelTitle?: string | null;
  modelContent?: string | null;
  number?: string;
  placeAndDate?: string;
  recipient?: string;
  subject?: string;
  userInstructions?: string;
  userPrompt?: string;
};

const STRICT_INSTRUCTIONS = `Redactá únicamente el documento administrativo solicitado para la Municipalidad de Salta. Usá lenguaje formal, claro, preciso y conciso. No inventes expedientes, fechas, normas, artículos, nombres, cargos ni destinatarios; si falta información, dejala entre corchetes. No uses Markdown, nombres ficticios, explicaciones externas ni frases como "claro" o "aquí tiene". Entregá texto listo para revisar y exportar a Word.`;

const OFFICIAL_FORMAT_INSTRUCTION = `No incluyas encabezado institucional, logos, fecha al inicio ni pie de página. El sistema agregará automáticamente el encabezado oficial, la fecha y el pie institucional. Empezá directamente con el bloque administrativo del documento, por ejemplo destinatario, asunto, cuerpo, cierre y firma si corresponde.`;

const MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash"] as const;

const normalizeText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const getSafeErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message.trim()) {
    return error.message
      .replace(/AIza[\w-]+/g, "[API_KEY]")
      .replace(/([?&]key=)[^&\s]+/gi, "$1[API_KEY]")
      .slice(0, 350);
  }

  return "Gemini rechazó la solicitud. Revisá la API Key o el modelo configurado.";
};

function buildFreePrompt(body: GenerateDocumentRequest, userInstructions: string) {
  const documentType = normalizeText(body.documentType) || "AUTO";
  const documentTypeLabel =
    documentType === "AUTO" ? "Detectar automáticamente" : documentType;

  return `${STRICT_INSTRUCTIONS}

${OFFICIAL_FORMAT_INSTRUCTION}

Sos un asistente especializado en redacción administrativa municipal para MuniDoc Salta.

El usuario está redactando un documento desde cero. No utilices ningún modelo preexistente cargado en la plataforma. No copies estructuras cargadas anteriormente. Interpretá exclusivamente las indicaciones del usuario y, si se proporcionan, los datos opcionales del formulario.

Objetivo:
Generar un borrador administrativo formal, claro, ordenado y adecuado para el ámbito municipal.

Instrucciones:
1. Detectá el tipo de documento más adecuado según el pedido del usuario: NOTA, PASE, MEMORÁNDUM, CIRCULAR, INFORME o CONSTANCIA.
2. Si el usuario indicó un tipo de documento, respetalo.
3. Si el usuario no indicó tipo, inferilo por el contenido.
4. Si faltan datos importantes, no los inventes: dejalos entre corchetes.
5. Si el usuario incluyó destinatario, fecha, área, cargo, motivo o datos concretos dentro del prompt, utilizalos.
6. No inventes expedientes, DNI, nombres, cargos, fechas, normativa ni artículos legales.
7. Redactá con lenguaje administrativo formal, claro, respetuoso y natural.
8. No menciones que fue generado por IA.
9. No expliques el proceso. Devolvé solo el documento final.
10. Evitá copiar cualquier modelo preexistente. Este documento debe redactarse desde cero.

Datos opcionales:
- Tipo indicado por el usuario: ${documentTypeLabel}
- Número: ${normalizeText(body.number) || "[NÚMERO]"}
- Lugar y fecha: ${normalizeText(body.placeAndDate) || "[LUGAR Y FECHA]"}
- Destinatario: ${normalizeText(body.recipient) || "[DESTINATARIO]"}
- Asunto: ${normalizeText(body.subject) || "Generar asunto formal según el pedido"}

Indicaciones libres del usuario:
${userInstructions}`;
}

function buildModelPrompt(body: GenerateDocumentRequest, userInstructions: string) {
  return `${STRICT_INSTRUCTIONS}

${OFFICIAL_FORMAT_INSTRUCTION}

Sos un asistente especializado en redacción administrativa municipal de la Municipalidad de Salta.

El usuario eligió usar un modelo existente. Respetá el tipo documental, el título y la estructura base del modelo seleccionado. Adaptá el contenido con las indicaciones del agente municipal, sin inventar datos concretos faltantes.

Tipo de documento:
${normalizeText(body.documentType) || "[TIPO DE DOCUMENTO]"}

Modelo seleccionado:
${normalizeText(body.modelTitle) || "[MODELO]"}

Datos del documento:
- Número: ${normalizeText(body.number) || "[NÚMERO]"}
- Lugar y fecha: ${normalizeText(body.placeAndDate) || "SALTA, [FECHA]"}
- Destinatario: ${normalizeText(body.recipient) || "[DESTINATARIO]"}
- Asunto: ${normalizeText(body.subject) || "[ASUNTO]"}

Contenido o estructura base del modelo:
${normalizeText(body.modelContent) || "[SIN MODELO BASE]"}

Indicaciones del agente municipal:
${userInstructions || "[SIN INDICACIONES ADICIONALES]"}`;
}

export async function POST(request: Request) {
  let body: GenerateDocumentRequest;

  try {
    body = (await request.json()) as GenerateDocumentRequest;
  } catch {
    return Response.json(
      { success: false, error: "La solicitud enviada no es válida." },
      { status: 400 },
    );
  }

  const generationMode: GenerationMode =
    body.generationMode === "model" ? "model" : "free";
  const userInstructions =
    normalizeText(body.userInstructions) || normalizeText(body.userPrompt);

  if (!userInstructions) {
    return Response.json(
      {
        success: false,
        error:
          generationMode === "free"
            ? "Escribí primero qué documento necesitás generar."
            : "Escribí primero las indicaciones para generar el borrador.",
      },
      { status: 400 },
    );
  }

  if (generationMode === "model" && !normalizeText(body.modelContent)) {
    return Response.json(
      {
        success: false,
        error: "No se encontró el contenido del modelo seleccionado.",
      },
      { status: 400 },
    );
  }

  const apiKey =
    process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        success: false,
        error:
          "No se encontró la API Key de Gemini. Revisá el archivo .env.local.",
      },
      { status: 500 },
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt =
      generationMode === "free"
        ? buildFreePrompt(body, userInstructions)
        : buildModelPrompt(body, userInstructions);
    let generatedText = "";
    let lastError: unknown;

    for (const model of MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            maxOutputTokens: 1400,
            temperature: generationMode === "free" ? 0.25 : 0.2,
            topP: 0.8,
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        });
        generatedText = response.text?.trim() ?? "";
        if (generatedText) break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!generatedText) {
      return Response.json(
        {
          success: false,
          error:
            lastError
              ? getSafeErrorMessage(lastError)
              : "La IA no devolvió contenido. Intentá nuevamente con indicaciones más claras.",
        },
        { status: 502 },
      );
    }

    return Response.json({ success: true, generatedText });
  } catch (error) {
    console.error("No se pudo generar el documento con Gemini.", error);
    return Response.json(
      {
        success: false,
        error: getSafeErrorMessage(error),
      },
      { status: 502 },
    );
  }
}
