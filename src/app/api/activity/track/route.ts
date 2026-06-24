import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

const allowedEvents = new Set([
  "section_view",
  "model_view",
  "model_use_generator",
  "quick_example_click",
  "draft_generate_start",
  "draft_generate_success",
  "draft_generate_error",
  "word_download",
  "copy_text",
  "manual_download_pdf",
  "manual_download_word",
  "home_card_click",
  "admin_login_success",
  "admin_login_error",
  "manual_chapter_view",
]);

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  return value
    .replace(/[<>{}]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength) || null;
}

function detectDevice(userAgent: string) {
  const agent = userAgent.toLowerCase();
  if (/ipad|tablet|kindle/.test(agent)) return "Tablet";
  if (/mobile|android|iphone|ipod/.test(agent)) return "Móvil";
  return "Escritorio";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const eventType = cleanText(body.eventType, 60);

    if (!eventType || !allowedEvents.has(eventType)) {
      return NextResponse.json({ success: false, error: "Evento no permitido." }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      console.warn("Supabase no configurado: evento no persistido");
      return NextResponse.json({ success: true, fallback: true });
    }

    const { error } = await supabase.from("activity_events").insert({
      event_type: eventType,
      section: cleanText(body.section, 60),
      detail: cleanText(body.detail, 120),
      document_type: cleanText(body.documentType, 60),
      model_id: cleanText(body.modelId, 60),
      device: detectDevice(userAgent),
      user_agent: cleanText(userAgent, 180),
    });

    if (error) {
      console.error("No se pudo registrar actividad.");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
