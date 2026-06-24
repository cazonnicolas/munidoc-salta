"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Clock3,
  Download,
  FileStack,
  HelpCircle,
  History,
  Info,
  LockKeyhole,
  Megaphone,
  Search,
  Sparkles,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InstitutionalLogo } from "@/components/ui/InstitutionalLogo";
import { trackActivity } from "@/lib/activityClient";
import { APP_INFO } from "@/lib/appInfo";
import {
  featureCards,
  quickLinks,
  recentActivity,
  type IconName,
} from "@/lib/data";
import type { SectionId } from "@/lib/navigation";

const icons: Record<IconName, LucideIcon> = {
  book: BookOpen,
  files: FileStack,
  sparkles: Sparkles,
  download: Download,
  help: HelpCircle,
  history: History,
};

const iconColors: Record<string, string> = {
  blue: "from-[#0b72df] to-[#0755bc]",
  sky: "from-[#3198ee] to-[#1870d2]",
  purple: "from-[#9a78ef] to-[#6645d6]",
  teal: "from-[#38b7b6] to-[#15999a]",
  orange: "from-[#ff913c] to-[#ef6817]",
};

export function HomeSection({
  onNavigate,
  onCreateNote,
  onShowAbout,
}: {
  onNavigate: (section: SectionId) => void;
  onCreateNote: () => void;
  onShowAbout: () => void;
}) {
  const [toast, setToast] = useState<{
    title: string;
    message: string;
    showGeneratorAction?: boolean;
  } | null>(null);

  useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(() => setToast(null), 6500);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const showDownloadsToast = () =>
    setToast({
      title: "Descargas",
      message:
        "Las descargas se generan desde el Generador IA. Ingresá al generador, redactá un borrador y descargalo en Word.",
      showGeneratorAction: true,
    });

  const handleFeatureAction = (number: number) => {
    const feature = featureCards.find((item) => item.number === number);
    trackActivity({
      eventType: "home_card_click",
      section: "Inicio",
      detail: feature?.action ?? feature?.title ?? "Card de inicio",
    });

    if (number === 1) onNavigate("biblioteca");
    if (number === 2) onNavigate("modelos");
    if (number === 3) onCreateNote();
    if (number === 4) showDownloadsToast();
    if (number === 5) onNavigate("ayuda");
    if (number === 6) {
      setToast({
        title: "Borradores generados",
        message:
          "El historial de borradores se incorporará en una próxima versión. Por ahora, descargá cada borrador en Word para conservarlo.",
        showGeneratorAction: true,
      });
    }
  };

  const handleQuickLink = (title: string) => {
    trackActivity({
      eventType: "home_card_click",
      section: "Inicio",
      detail: title,
    });

    if (title === "Redactar nueva nota") onCreateNote();
    if (title === "Buscar modelos") onNavigate("modelos");
    if (title === "Ver manual completo") onNavigate("biblioteca");
    if (title === "Mis descargas") showDownloadsToast();
  };

  const handleShowAbout = () => {
    trackActivity({
      eventType: "help_about_click",
      section: "Inicio",
      detail: "Ver más información",
    });
    onShowAbout();
  };

  return (
    <section className="section-stage space-y-6">
      <section className="decorated-panel relative min-h-[190px] overflow-hidden rounded-2xl border border-[#b8d5f2] bg-[linear-gradient(115deg,#eef7ff_0%,#fbfdff_50%,#eaf5ff_100%)] px-7 py-8 shadow-[0_14px_34px_rgba(28,78,132,0.07)] sm:px-8">
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#1883e2] via-[#0864c9] to-[#65adeb]" />
        <div className="absolute -bottom-20 right-44 size-52 rounded-full border border-[#5d9fde]/10" />
        <div className="absolute -bottom-12 right-52 size-36 rounded-full border border-[#5d9fde]/10" />
        <div className="relative z-10 max-w-[600px]">
          <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#10264c]">
            Bienvenido Agente Municipal
          </h2>
          <p className="mt-3 max-w-[510px] text-sm leading-6 text-[#304665]">
            Tu plataforma para aprender, practicar y optimizar la redacción de
            documentos administrativos municipales.
          </p>
          <p className="mt-3 max-w-[570px] text-[13px] leading-6 text-[#405b7e]">
            Una herramienta digital para fortalecer la redacción administrativa
            municipal, ordenar modelos documentales y acompañar a los agentes
            en la elaboración de borradores formales.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-lg border border-[#c5dcf7] bg-white/65 px-3 py-2 font-medium text-[#075cc5] shadow-sm backdrop-blur">
              <LockKeyhole size={14} />
              Uso interno
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-[#d2e3f6] bg-white/55 px-3 py-2 font-medium text-[#365779] shadow-sm backdrop-blur">
              <Info size={14} />
              {APP_INFO.prototypeStatus} — {APP_INFO.useType}
            </span>
            <span className="inline-flex items-center gap-2 text-[#263b58]">
              <span className="size-2 rounded-full bg-[#1bab64]" />
              Actualizado: 23/06/2026
            </span>
          </div>
        </div>

        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 items-center rounded-2xl border border-white/70 bg-white/45 px-5 py-4 shadow-[0_8px_24px_rgba(35,83,135,0.055)] backdrop-blur-sm xl:flex">
          <InstitutionalLogo className="w-[160px]" />
        </div>
      </section>

      <Card className="decorated-panel border-[#c7dcf0] bg-[linear-gradient(135deg,#ffffff,#f4f9ff)] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#cce1f6] bg-[#eaf4ff] text-[#0863c8] shadow-sm">
              <Info size={22} strokeWidth={1.8} />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#173055]">
                Acerca de {APP_INFO.name}
              </h3>
              <p className="mt-2 max-w-4xl text-[12px] leading-6 text-[#526987]">
                MuniDoc Salta es un prototipo digital de uso interno municipal,
                desarrollado para acompañar la consulta, redacción y generación
                de documentos administrativos. Integra biblioteca teórica,
                modelos documentales, asistencia con inteligencia artificial y
                un panel privado de actividad para seguimiento del uso de la
                plataforma.
              </p>
            </div>
          </div>
          <Button
            className="h-10 shrink-0 gap-2 self-start lg:self-center"
            onClick={handleShowAbout}
          >
            Ver más información
            <ChevronRight size={15} />
          </Button>
        </div>
      </Card>

      <Card className="border-[#c9dcee] bg-white/90 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#173055]">
              Estado del prototipo
            </h3>
            <p className="mt-2 max-w-4xl text-[12px] leading-6 text-[#526987]">
              MuniDoc Salta se encuentra en etapa de prototipo controlado. La
              plataforma puede ser utilizada para consulta, asistencia en
              redacción y generación de borradores administrativos, siempre bajo
              revisión del agente o área correspondiente.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:max-w-[420px] lg:justify-end">
            {[
              "Biblioteca activa",
              "Modelos activos",
              "Generador IA activo",
              "Panel de actividad activo",
              APP_INFO.useType,
            ].map((item) => (
              <span
                key={item}
                className="rounded-lg border border-[#cfe0f1] bg-[#f5f9ff] px-3 py-1.5 text-[10px] font-semibold text-[#075cc5]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <section className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featureCards.map((feature) => {
          const Icon = icons[feature.icon];
          const badgeTone =
            feature.badge === "Actualizado" ? "green" : "blue";

          return (
            <Card
              key={feature.number}
              role="button"
              tabIndex={0}
              aria-label={`${feature.action}: ${feature.title}`}
              onClick={() => handleFeatureAction(feature.number)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleFeatureAction(feature.number);
                }
              }}
              className="group relative flex h-full min-h-[238px] cursor-pointer flex-col overflow-hidden border-[#d2dfec] bg-[linear-gradient(145deg,#ffffff_0%,#ffffff_58%,#f7fbff_100%)] p-6 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-[#1680dd] before:via-[#70afe8] before:to-transparent hover:-translate-y-1 hover:border-[#a9c8e8] hover:shadow-[0_18px_40px_rgba(30,75,130,0.105)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1680dd] focus-visible:ring-offset-2"
            >
              <div className="pointer-events-none absolute -bottom-11 -right-9 size-32 rounded-full border border-[#7bb1e7]/10 bg-[#eaf4ff]/55 transition-transform duration-300 group-hover:scale-110" />
              <div className="pointer-events-none absolute bottom-5 right-5 grid grid-cols-2 gap-1.5 opacity-0 transition-opacity group-hover:opacity-30">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span key={index} className="size-1 rounded-full bg-[#2378cc]" />
                ))}
              </div>
              {feature.badge && (
                <Badge
                  tone={badgeTone}
                  className="absolute right-3 top-3"
                >
                  {feature.badge}
                </Badge>
              )}

              <div className="relative flex items-start gap-5 pr-6">
                <span
                  className={`flex size-[60px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-[0_8px_18px_rgba(26,91,168,0.16)] ring-4 ring-[#edf5ff] ${iconColors[feature.color]}`}
                >
                  <Icon size={31} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="max-w-[270px] text-[15px] font-bold leading-[1.45] tracking-[-0.01em] text-[#10264c]">
                    {feature.number}. {feature.title}
                  </h3>
                  <p className="mt-2.5 max-w-[280px] text-[13px] leading-[1.65] text-[#526987]">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="relative mt-auto flex items-center justify-between border-t border-[#e5edf5] pt-4">
                <span className="inline-flex h-9 items-center justify-center rounded-xl border border-[#c8d9eb] bg-white/90 px-4 text-[11px] font-semibold text-[#075cc5] shadow-[0_4px_12px_rgba(31,75,125,0.045)] transition-colors group-hover:border-[#9fc1e4] group-hover:bg-[#f8fbff]">
                  {feature.action}
                </span>
                <span className="flex size-8 items-center justify-center rounded-full bg-[#edf5ff] text-[#0861c8] transition-all group-hover:translate-x-1 group-hover:bg-[#0861c8] group-hover:text-white">
                  <ChevronRight size={17} />
                </span>
              </div>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.8fr_0.95fr]">
        <Card className="decorated-panel p-5">
          <PanelTitle icon={Clock3} title="Actividad reciente" action="Ver todo" />
          <div className="mt-2 divide-y divide-[#e8edf4]">
            {recentActivity.map((activity) => {
              const Icon = icons[activity.icon];
              return (
                <div
                  key={activity.title}
                  className="flex min-h-[52px] items-center gap-3 py-2"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#edf5ff] text-[#0871d8]">
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-medium text-[#233a5e]">
                      {activity.title}
                    </p>
                    <p className="mt-0.5 text-[9px] text-[#617491]">
                      {activity.date}
                    </p>
                  </div>
                  <Badge tone={activity.tone} className="min-w-[60px] justify-center">
                    {activity.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <PanelTitle icon={Zap} title="Accesos rápidos" />
          <div className="mt-2 divide-y divide-[#e8edf4]">
            {quickLinks.map((link, index) => {
              const Icon =
                index === 1 ? Search : icons[link.icon];
              return (
                <button
                  key={link.title}
                  type="button"
                  onClick={() => handleQuickLink(link.title)}
                  className="group flex min-h-[52px] w-full cursor-pointer items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-[#f5f9fe]"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf5ff] text-[#0865cc]">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold text-[#233a5e]">
                      {link.title}
                    </span>
                    <span className="mt-0.5 block text-[9px] text-[#74839c]">
                      {link.subtitle}
                    </span>
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-[#35547e] transition-transform group-hover:translate-x-1"
                  />
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="decorated-panel border-[#c7dcf4] bg-[linear-gradient(145deg,#eaf4ff,#f5faff)] p-5">
          <PanelTitle
            icon={Megaphone}
            title="Novedades"
            action="Ver todas"
          />
          <div className="mt-3 space-y-2">
            <NewsItem
              badge="Nuevo"
              badgeTone="blue"
              title="Nuevos modelos disponibles"
              text="Incorporamos modelos de Circular Informativa y Memorándum Interno."
              date="23/06/2026"
            />
            <NewsItem
              badge="Actualizado"
              badgeTone="green"
              title="Manual actualizado"
              text="Se actualizó el capítulo de Pases y Notas con nuevos ejemplos y criterios."
              date="22/06/2026"
            />
          </div>
        </Card>
      </section>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm"
        >
          <Card className="decorated-panel border-[#bcd4eb] p-4 shadow-[0_18px_50px_rgba(12,48,91,0.2)]">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#0863c8]">
              <Download size={23} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-[#173055]">
                  {toast.title}
                </h3>
                <p className="mt-1 text-[11px] leading-5 text-[#607491]">
                  {toast.message}
                </p>
                {toast.showGeneratorAction && (
                  <Button
                    variant="primary"
                    className="mt-3 h-8 px-4 text-[10px]"
                    onClick={() => {
                      setToast(null);
                      onCreateNote();
                    }}
                  >
                    Ir al Generador IA
                  </Button>
                )}
              </div>
              <button
                type="button"
                aria-label="Cerrar aviso"
                onClick={() => setToast(null)}
                className="flex size-7 shrink-0 items-center justify-center rounded-lg text-[#607491] transition-colors hover:bg-[#edf5ff] hover:text-[#075cc5]"
              >
                <X size={15} />
              </button>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}

function PanelTitle({
  icon: Icon,
  title,
  action,
}: {
  icon: LucideIcon;
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={17} className="text-[#0870d6]" strokeWidth={1.9} />
      <h3 className="text-sm font-bold text-[#173055]">{title}</h3>
      {action && (
        <button
          type="button"
          className="ml-auto text-[10px] font-semibold text-[#075cc5]"
        >
          {action}
        </button>
      )}
    </div>
  );
}

function NewsItem({
  badge,
  badgeTone,
  title,
  text,
  date,
}: {
  badge: string;
  badgeTone: "blue" | "green";
  title: string;
  text: string;
  date: string;
}) {
  return (
    <article className="rounded-lg border border-white/80 bg-white/90 p-3 shadow-[0_1px_2px_rgba(30,64,115,0.03)]">
      <div className="flex items-center gap-2">
        <Badge tone={badgeTone}>{badge}</Badge>
        <h4 className="text-[11px] font-bold text-[#203757]">{title}</h4>
      </div>
      <p className="mt-2 text-[10px] leading-4 text-[#334a69]">{text}</p>
      <p className="mt-1 text-[9px] text-[#647793]">{date}</p>
    </article>
  );
}

