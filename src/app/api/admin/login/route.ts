import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
} from "@/lib/adminAuth";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

async function registerAdminLoginEvent(eventType: "admin_login_success" | "admin_login_error", request: NextRequest) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    console.warn("Supabase no configurado: evento no persistido");
    return;
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const device = /ipad|tablet|kindle/i.test(userAgent)
    ? "Tablet"
    : /mobile|android|iphone|ipod/i.test(userAgent)
      ? "Móvil"
      : "Escritorio";

  try {
    await supabase.from("activity_events").insert({
      event_type: eventType,
      section: "Panel de actividad",
      detail: eventType === "admin_login_success" ? "Acceso privado correcto" : "Intento fallido de acceso privado",
      device,
      user_agent: userAgent.slice(0, 180),
    });
  } catch {
    console.error("No se pudo registrar actividad de acceso privado.");
  }
}

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { success: false, error: "No se encontró ADMIN_PASSWORD. Revisá el archivo .env.local." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { password?: string };

    if (body.password !== adminPassword) {
      await registerAdminLoginEvent("admin_login_error", request);
      return NextResponse.json({ success: false, error: "Contraseña incorrecta." }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: ADMIN_SESSION_MAX_AGE,
      path: "/",
    });

    await registerAdminLoginEvent("admin_login_success", request);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "No se pudo validar el acceso." }, { status: 400 });
  }
}
