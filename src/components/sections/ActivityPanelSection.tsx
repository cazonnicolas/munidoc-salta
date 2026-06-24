"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Clock3,
  Download,
  FileText,
  LogOut,
  Monitor,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Tablet,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type ActivityMetricsResponse = {
  success: boolean;
  error?: string;
  metrics?: {
    visitsToday: number;
    sessionsWeek: number;
    generatedDrafts: number;
    wordDownloads: number;
    mostVisitedSection: string;
    peakHour: string;
    mostUsedDevice: string;
  };
  dailyActivity?: Array<{ date: string; count: number }>;
  sections?: Array<{ section: string; count: number }>;
  devices?: Array<{ device: string; count: number }>;
  recentEvents?: Array<{
    createdAt: string;
    eventType: string;
    section: string;
    detail: string;
    device: string;
  }>;
};

const eventLabels: Record<string, string> = {
  section_view: "Ingresó a sección",
  model_view: "Visualizó modelo",
  model_use_generator: "Usó modelo en generador",
  quick_example_click: "Cargó ejemplo rápido",
  draft_generate_start: "Inició generación de borrador",
  draft_generate_success: "Generó borrador con IA",
  draft_generate_error: "Error al generar borrador",
  word_download: "Descargó Word",
  copy_text: "Copió texto",
  manual_download_pdf: "Intentó descargar manual PDF",
  manual_download_word: "Intentó descargar manual Word",
  home_card_click: "Click en card de inicio",
  admin_login_success: "Acceso privado correcto",
  admin_login_error: "Intento fallido de acceso privado",
  manual_chapter_view: "Visualizó capítulo del manual",
};

export function ActivityPanelSection({ onLoggedOut }: { onLoggedOut: () => void }) {
  const [data, setData] = useState<ActivityMetricsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadActivity = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/activity", { cache: "no-store" });
      const result = (await response.json()) as ActivityMetricsResponse;

      if (!response.ok || !result.success) {
        setError(result.error || "No se pudieron cargar las métricas.");
        return;
      }

      setData(result);
    } catch {
      setError("No se pudieron cargar las métricas.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadActivity();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    onLoggedOut();
  };

  const metrics = data?.metrics;

  return (
    <section className="section-stage space-y-6">
      <header className="decorated-panel flex flex-col gap-5 rounded-2xl border border-[#c7dcf0] bg-[linear-gradient(125deg,#ffffff,#f1f8ff)] px-6 py-6 shadow-[0_14px_34px_rgba(28,78,132,0.065)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8f3ff] to-[#d7ebff] text-[#075cc5] shadow-[0_8px_18px_rgba(31,88,151,0.1)] ring-1 ring-[#c5dcf7]">
            <ShieldCheck size={25} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-[-0.03em] text-[#10264c]">
                Panel de actividad
              </h1>
              <Badge>Acceso privado</Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#536b89]">
              Monitoreo interno de uso de la plataforma.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Hoy", "7 días", "30 días"].map((filter, index) => (
                <span
                  key={filter}
                  className={`rounded-lg border px-3 py-1.5 text-[11px] font-semibold ${
                    index === 2
                      ? "border-[#0871dc] bg-[#e8f3ff] text-[#075cc5]"
                      : "border-[#d4e2f1] bg-white/70 text-[#617997]"
                  }`}
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleLogout}>
            <LogOut size={14} />
            Cerrar sesión
          </Button>
          <Button variant="primary" onClick={loadActivity} disabled={isLoading}>
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            Actualizar datos
          </Button>
        </div>
      </header>

      {error && (
        <Card className="border-[#f2b8b5] bg-[#fff7f6] p-4 text-sm font-medium text-[#b42318]">
          {error}
        </Card>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Visitas hoy" value={metrics?.visitsToday ?? 0} icon={Activity} tone="blue" />
        <KpiCard title="Sesiones esta semana" value={metrics?.sessionsWeek ?? 0} icon={TrendingUp} tone="green" />
        <KpiCard title="Borradores IA generados" value={metrics?.generatedDrafts ?? 0} icon={FileText} tone="purple" />
        <KpiCard title="Descargas Word" value={metrics?.wordDownloads ?? 0} icon={Download} tone="orange" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <LineChartCard data={data?.dailyActivity ?? []} isLoading={isLoading} />
        <SectionBars sections={data?.sections ?? []} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <DeviceChart devices={data?.devices ?? []} />
        <QuickSummary
          mostVisitedSection={metrics?.mostVisitedSection ?? "Sin datos"}
          peakHour={metrics?.peakHour ?? "Sin datos"}
          mostUsedDevice={metrics?.mostUsedDevice ?? "Sin datos"}
        />
      </section>

      <RecentEvents events={data?.recentEvents ?? []} isLoading={isLoading} />
    </section>
  );
}

function KpiCard({
  title,
  value,
  icon: Icon,
  tone,
}: {
  title: string;
  value: number;
  icon: typeof Activity;
  tone: "blue" | "green" | "purple" | "orange";
}) {
  const tones = {
    blue: "from-[#edf6ff] to-[#ffffff] text-[#075cc5]",
    green: "from-[#ecf8ef] to-[#ffffff] text-[#16844a]",
    purple: "from-[#f4efff] to-[#ffffff] text-[#7452d6]",
    orange: "from-[#fff4e8] to-[#ffffff] text-[#d66b11]",
  };

  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br ${tones[tone]} p-5`}>
      <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full border border-current/10" />
      <div className="flex items-center justify-between gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-current/10">
          <Icon size={21} />
        </span>
        <span className="rounded-full border border-current/10 bg-white/70 px-2.5 py-1 text-[10px] font-semibold">
          Uso interno
        </span>
      </div>
      <p className="mt-5 text-3xl font-bold tracking-[-0.04em] text-[#10264c]">{value}</p>
      <p className="mt-1 text-sm font-semibold text-[#435a78]">{title}</p>
    </Card>
  );
}

function LineChartCard({ data, isLoading }: { data: Array<{ date: string; count: number }>; isLoading: boolean }) {
  const max = Math.max(...data.map((item) => item.count), 1);
  const points = useMemo(() => {
    if (!data.length) return "";
    return data
      .map((item, index) => {
        const x = 18 + index * (264 / Math.max(data.length - 1, 1));
        const y = 132 - (item.count / max) * 96;
        return `${x},${y}`;
      })
      .join(" ");
  }, [data, max]);

  const hasData = data.some((item) => item.count > 0);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-[#18355f]">Actividad de los últimos 7 días</h2>
          <p className="mt-1 text-xs text-[#6a7e9c]">Eventos registrados por día.</p>
        </div>
        <BarChart3 className="text-[#075cc5]" size={22} />
      </div>

      {!hasData && !isLoading ? (
        <div className="mt-5 rounded-2xl border border-dashed border-[#c6d8ea] bg-[#f8fbff] p-6 text-center text-sm text-[#6a7e9c]">
          Aún no hay actividad suficiente para graficar.
        </div>
      ) : (
        <div className="mt-5 overflow-hidden rounded-2xl border border-[#d9e6f3] bg-[linear-gradient(180deg,#fbfdff,#f4f9ff)] p-4">
          <svg viewBox="0 0 300 155" className="h-[220px] w-full">
            <defs>
              <linearGradient id="activityLine" x1="0" x2="1">
                <stop offset="0%" stopColor="#0871dc" />
                <stop offset="100%" stopColor="#74b6ec" />
              </linearGradient>
            </defs>
            <path d="M18 132 H282" stroke="#d9e6f3" strokeWidth="1" />
            <polyline points={points} fill="none" stroke="url(#activityLine)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {data.map((item, index) => {
              const x = 18 + index * (264 / Math.max(data.length - 1, 1));
              const y = 132 - (item.count / max) * 96;
              return (
                <g key={item.date}>
                  <circle cx={x} cy={y} r="4.5" fill="#0871dc" stroke="#fff" strokeWidth="2" />
                  <text x={x} y="150" textAnchor="middle" className="fill-[#6a7e9c] text-[9px]">
                    {item.date}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </Card>
  );
}

function SectionBars({ sections }: { sections: Array<{ section: string; count: number }> }) {
  const max = Math.max(...sections.map((item) => item.count), 1);

  return (
    <Card className="p-5">
      <h2 className="text-base font-bold text-[#18355f]">Apartados más visitados</h2>
      <div className="mt-5 space-y-4">
        {sections.map((item) => (
          <div key={item.section}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#435a78]">{item.section}</span>
              <span className="text-[#7890aa]">{item.count}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#eef4fb]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0871dc] to-[#72b5ec]"
                style={{ width: `${Math.max((item.count / max) * 100, item.count ? 8 : 0)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DeviceChart({ devices }: { devices: Array<{ device: string; count: number }> }) {
  const icons = { Escritorio: Monitor, Móvil: Smartphone, Tablet };
  const max = Math.max(...devices.map((item) => item.count), 1);

  return (
    <Card className="p-5">
      <h2 className="text-base font-bold text-[#18355f]">Dispositivos utilizados</h2>
      <div className="mt-5 grid gap-3">
        {devices.map((item) => {
          const Icon = icons[item.device as keyof typeof icons] ?? Monitor;
          return (
            <div key={item.device} className="rounded-2xl border border-[#dbe7f2] bg-[#fbfdff] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#075cc5]">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-semibold text-[#304665]">{item.device}</span>
                </div>
                <span className="text-sm font-bold text-[#10264c]">{item.count}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eef4fb]">
                <div
                  className="h-full rounded-full bg-[#0871dc]"
                  style={{ width: `${Math.max((item.count / max) * 100, item.count ? 8 : 0)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function QuickSummary({
  mostVisitedSection,
  peakHour,
  mostUsedDevice,
}: {
  mostVisitedSection: string;
  peakHour: string;
  mostUsedDevice: string;
}) {
  const items = [
    { label: "Apartado más visitado", value: mostVisitedSection, icon: BarChart3 },
    { label: "Hora pico", value: peakHour, icon: Clock3 },
    { label: "Dispositivo más usado", value: mostUsedDevice, icon: Monitor },
  ];

  return (
    <Card className="p-5">
      <h2 className="text-base font-bold text-[#18355f]">Resumen rápido</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-1">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-[#d8e5f2] bg-[linear-gradient(135deg,#ffffff,#f6faff)] p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#075cc5]">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7890aa]">{label}</p>
                <p className="mt-1 text-sm font-bold text-[#18355f]">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecentEvents({
  events,
  isLoading,
}: {
  events: NonNullable<ActivityMetricsResponse["recentEvents"]>;
  isLoading: boolean;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-[#dfe8f2] bg-[linear-gradient(135deg,#f4f9ff,#ffffff)] px-5 py-4">
        <h2 className="text-base font-bold text-[#18355f]">Actividad reciente</h2>
        <p className="mt-1 text-xs text-[#6a7e9c]">Últimos eventos registrados en la plataforma.</p>
      </div>

      {!events.length && !isLoading ? (
        <div className="p-8 text-center text-sm leading-6 text-[#6a7e9c]">
          Aún no hay actividad registrada. Los eventos comenzarán a mostrarse cuando los usuarios interactúen con la plataforma.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-[#f8fbff] text-[11px] uppercase tracking-[0.11em] text-[#6a7e9c]">
              <tr>
                <th className="px-5 py-3 font-semibold">Fecha y hora</th>
                <th className="px-5 py-3 font-semibold">Acción</th>
                <th className="px-5 py-3 font-semibold">Apartado</th>
                <th className="px-5 py-3 font-semibold">Detalle</th>
                <th className="px-5 py-3 font-semibold">Dispositivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {events.map((event, index) => (
                <tr key={`${event.createdAt}-${index}`} className="text-[#405775]">
                  <td className="px-5 py-4 text-xs text-[#6a7e9c]">
                    {new Date(event.createdAt).toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#18355f]">
                    {eventLabels[event.eventType] ?? event.eventType}
                  </td>
                  <td className="px-5 py-4">{event.section}</td>
                  <td className="px-5 py-4">{event.detail}</td>
                  <td className="px-5 py-4">{event.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
