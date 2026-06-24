import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

type ActivityEvent = {
  created_at: string;
  event_type: string;
  section: string | null;
  detail: string | null;
  device: string | null;
};

const sectionOrder = ["Inicio", "Biblioteca", "Modelos", "Generador IA", "Ayuda"];
const deviceOrder = ["Escritorio", "Móvil", "Tablet"];

function formatDay(date: Date) {
  return date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
}

function startOfLocalDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function normalizeSection(section?: string | null) {
  const normalized = section?.trim();
  if (!normalized) return "Sin sección";
  if (normalized === "inicio") return "Inicio";
  if (normalized === "biblioteca") return "Biblioteca";
  if (normalized === "modelos") return "Modelos";
  if (normalized === "generador") return "Generador IA";
  if (normalized === "ayuda") return "Ayuda";
  if (normalized === "actividad") return "Panel de actividad";
  return normalized;
}

function countBy<T extends string>(items: ActivityEvent[], getter: (item: ActivityEvent) => T) {
  return items.reduce<Record<T, number>>(
    (acc, item) => {
      const key = getter(item);
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    {} as Record<T, number>,
  );
}

function buildMetrics(events: ActivityEvent[]) {
  const todayStart = startOfLocalDay();
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 6);

  const sectionViews = events.filter((event) => event.event_type === "section_view");
  const todayViews = sectionViews.filter((event) => new Date(event.created_at) >= todayStart);
  const weekViews = sectionViews.filter((event) => new Date(event.created_at) >= weekStart);

  const sectionsMap = countBy(sectionViews, (event) => normalizeSection(event.section));
  const sections = sectionOrder.map((section) => ({ section, count: sectionsMap[section] ?? 0 }));
  const allSectionEntries = Object.entries(sectionsMap).sort((a, b) => b[1] - a[1]);

  const deviceMap = countBy(events, (event) => event.device || "Escritorio");
  const devices = deviceOrder.map((device) => ({ device, count: deviceMap[device] ?? 0 }));
  const mostUsedDevice = Object.entries(deviceMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Escritorio";

  const hourMap = events.reduce<Record<number, number>>((acc, event) => {
    const hour = new Date(event.created_at).getHours();
    acc[hour] = (acc[hour] ?? 0) + 1;
    return acc;
  }, {});
  const peak = Object.entries(hourMap).sort((a, b) => b[1] - a[1])[0]?.[0];
  const peakHour = peak ? `${peak.padStart(2, "0")}:00 - ${String(Number(peak) + 1).padStart(2, "0")}:00` : "Sin datos";

  const dailyActivity = Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + index);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    const count = events.filter((event) => {
      const createdAt = new Date(event.created_at);
      return createdAt >= day && createdAt < nextDay;
    }).length;
    return { date: formatDay(day), count };
  });

  return {
    success: true,
    metrics: {
      visitsToday: todayViews.length,
      sessionsWeek: weekViews.length,
      generatedDrafts: events.filter((event) => event.event_type === "draft_generate_success").length,
      wordDownloads: events.filter((event) => event.event_type === "word_download").length,
      mostVisitedSection: allSectionEntries[0]?.[0] ?? "Sin datos",
      peakHour,
      mostUsedDevice,
    },
    dailyActivity,
    sections,
    devices,
    recentEvents: events.slice(0, 12).map((event) => ({
      createdAt: event.created_at,
      eventType: event.event_type,
      section: normalizeSection(event.section),
      detail: event.detail ?? "Sin detalle",
      device: event.device ?? "Escritorio",
    })),
  };
}

function demoResponse() {
  const now = new Date();
  const events: ActivityEvent[] = [
    ["section_view", "Inicio", "Ingreso a sección", "Escritorio", 0],
    ["home_card_click", "Inicio", "Ver modelos", "Escritorio", 1],
    ["section_view", "Modelos", "Ingreso a sección", "Escritorio", 2],
    ["model_use_generator", "Modelos", "Usar en generador", "Escritorio", 3],
    ["section_view", "Generador IA", "Ingreso a sección", "Escritorio", 4],
    ["draft_generate_success", "Generador IA", "Generó borrador con IA", "Escritorio", 5],
    ["word_download", "Generador IA", "Descargó Word", "Escritorio", 6],
    ["section_view", "Biblioteca", "Ingreso a sección", "Móvil", 26],
    ["manual_chapter_view", "Biblioteca", "Capítulo del manual", "Móvil", 28],
    ["section_view", "Ayuda", "Ingreso a sección", "Tablet", 48],
  ].map(([eventType, section, detail, device, hoursAgo]) => ({
    event_type: String(eventType),
    section: String(section),
    detail: String(detail),
    device: String(device),
    created_at: new Date(now.getTime() - Number(hoursAgo) * 60 * 60 * 1000).toISOString(),
  }));

  return buildMetrics(events);
}

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ success: false, error: "Acceso no autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(demoResponse());
  }

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data, error } = await supabase
    .from("activity_events")
    .select("created_at,event_type,section,detail,device")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    console.error("No se pudieron consultar métricas de actividad.");
    return NextResponse.json(demoResponse());
  }

  return NextResponse.json(buildMetrics((data ?? []) as ActivityEvent[]));
}
