import { GoogleGenAI } from "@google/genai";

type GenerateDocumentRequest = {
  documentType?: string;
  selectedModel?: unknown;
  template?: string;
  fields?: unknown;
  formData?: unknown;
  userPrompt?: string;
  technicalPrompt?: string;
};

const STRICT_INSTRUCTIONS = `Redactá únicamente el documento administrativo solicitado para la Municipalidad de Salta. Usá lenguaje formal, claro, preciso y conciso. Respetá el tipo, el modelo y los datos suministrados. No inventes expedientes, fechas, normas, artículos, nombres, cargos ni destinatarios; si falta información, dejala entre corchetes. No uses Markdown, nombres ficticios, explicaciones externas ni frases como "claro" o "aquí tiene". Entregá texto listo para revisar y exportar a Word.`;

const MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash"] as const;

const getSafeErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message.trim()) {
    return error.message
      .replace(/AIza[\w-]+/g, "[API_KEY]")
      .replace(/([?&]key=)[^&\s]+/gi, "$1[API_KEY]")
      .slice(0, 350);
  }

  return "Gemini rechazó la solicitud. Revisá la API Key o el modelo configurado.";
};

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

  if (!body.userPrompt?.trim()) {
    return Response.json(
      {
        success: false,
        error:
          "Escribí primero las indicaciones para generar el borrador.",
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

  const technicalPrompt = body.technicalPrompt?.trim();

  if (!technicalPrompt) {
    return Response.json(
      {
        success: false,
        error: "No se pudo construir el prompt técnico del documento.",
      },
      { status: 400 },
    );
  }

  console.log("Generando documento:", body.documentType);
  console.log("Prompt length:", technicalPrompt?.length || 0);
  console.log("Gemini key presente:", Boolean(apiKey));

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `${STRICT_INSTRUCTIONS}

DATOS E INDICACIONES:
${technicalPrompt}`;
    let generatedText = "";
    let lastError: unknown;

    for (const model of MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            maxOutputTokens: 1200,
            temperature: 0.2,
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
    return Response.json(
      {
        success: false,
        error: getSafeErrorMessage(error),
      },
      { status: 502 },
    );
  }
}
