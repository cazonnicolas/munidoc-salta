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

const STRICT_INSTRUCTIONS = `Sos un asistente especializado en redacción administrativa municipal de la Municipalidad de Salta. Redactá únicamente el documento solicitado, sin explicaciones externas. Usá lenguaje administrativo formal, claro, preciso y conciso. Respetá el tipo de documento, el modelo seleccionado y los datos completados por el agente. No inventes expedientes, fechas, normas, artículos, nombres, cargos ni destinatarios. Si falta un dato, dejalo entre corchetes. No uses nombres propios ficticios. No uses Markdown. No agregues frases como “aquí tiene” o “claro”. El resultado debe quedar listo para vista previa y exportación a Word.`;

export async function POST(request: Request) {
  let body: GenerateDocumentRequest;

  try {
    body = (await request.json()) as GenerateDocumentRequest;
  } catch {
    return Response.json(
      { error: "La solicitud enviada no es válida." },
      { status: 400 },
    );
  }

  if (!body.userPrompt?.trim()) {
    return Response.json(
      {
        error:
          "Escribí primero las indicaciones para generar el borrador.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "No se encontró la API Key de Gemini. Revisá el archivo .env.local.",
      },
      { status: 500 },
    );
  }

  const technicalPrompt = body.technicalPrompt?.trim();

  if (!technicalPrompt) {
    return Response.json(
      { error: "No se pudo construir el prompt técnico del documento." },
      { status: 400 },
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash",
      input: `${STRICT_INSTRUCTIONS}

INSTRUCCIONES Y DATOS DEL DOCUMENTO:
${technicalPrompt}`,
    });
    const generatedText = interaction.output_text?.trim() ?? "";

    if (!generatedText) {
      return Response.json(
        {
          error:
            "La IA no devolvió contenido. Intentá nuevamente con indicaciones más claras.",
        },
        { status: 502 },
      );
    }

    return Response.json({ generatedText });
  } catch {
    return Response.json(
      {
        error:
          "No se pudo generar el documento. Revisá la conexión o la configuración de Gemini.",
      },
      { status: 502 },
    );
  }
}
