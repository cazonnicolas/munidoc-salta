import Image from "next/image";
import {
  BookOpen,
  CircleHelp,
  FileText,
  Home,
  LockKeyhole,
  Sparkles,
  User,
} from "lucide-react";
import type { SectionId } from "@/lib/navigation";
import { InstitutionalLogo } from "@/components/ui/InstitutionalLogo";
import { APP_INFO } from "@/lib/appInfo";

const menuItems = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "biblioteca", label: "Biblioteca", icon: BookOpen },
  { id: "modelos", label: "Modelos", icon: FileText },
  { id: "generador", label: "Generador IA", icon: Sparkles },
  { id: "ayuda", label: "Ayuda", icon: CircleHelp },
] satisfies Array<{
  id: SectionId;
  label: string;
  icon: typeof Home;
}>;

export function Sidebar({
  activeSection,
  onSectionChange,
  onAdminClick,
}: {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  onAdminClick: () => void;
}) {
  return (
    <aside className="relative overflow-hidden border-[#d8e4ef] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_58%,#f6faff_100%)] lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-[240px] lg:flex-col lg:border-r lg:shadow-[8px_0_30px_rgba(30,70,115,0.025)]">
      <div className="pointer-events-none absolute -left-20 bottom-20 size-56 rounded-full bg-[#dceeff]/30 blur-3xl" />
      <div className="pointer-events-none absolute right-3 top-28 grid grid-cols-3 gap-2 opacity-25">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className="size-1 rounded-full bg-[#4689d4]" />
        ))}
      </div>

      <div className="relative flex h-[95px] items-center border-b border-[#e3eaf3]/80 px-7 lg:border-b-0">
        <InstitutionalLogo
          priority
          className="w-[168px]"
        />
      </div>

      <nav className="relative flex gap-1 overflow-x-auto px-4 py-3 lg:block lg:space-y-1.5 lg:overflow-visible lg:py-3">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const active = id === activeSection;

          return (
            <button
              key={id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => onSectionChange(id)}
              className={`group flex h-12 shrink-0 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-all lg:w-full ${
                active
                  ? "bg-gradient-to-r from-[#0871dc] to-[#0754ba] text-white shadow-[0_8px_18px_rgba(2,91,195,0.2)] ring-1 ring-[#2e83df]/20"
                  : "text-[#36547f] hover:bg-white hover:text-[#075cc5] hover:shadow-[0_5px_16px_rgba(31,75,125,0.055)]"
              }`}
            >
              <span
                className={`flex size-8 items-center justify-center rounded-lg transition-colors ${
                  active ? "bg-white/12" : "bg-[#edf5fd] group-hover:bg-[#e5f1ff]"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="relative mt-auto hidden px-4 pb-2 lg:block">
        <button
          type="button"
          onClick={onAdminClick}
          title="Acceso privado"
          className="mb-2.5 w-full cursor-pointer rounded-2xl border border-[#c9d9e8] bg-[linear-gradient(145deg,#ffffff,#eef6ff)] px-3.5 py-2.5 shadow-[0_9px_24px_rgba(30,72,120,0.075)] ring-1 ring-white/80 transition-all hover:-translate-y-0.5 hover:border-[#9fc4ea] hover:shadow-[0_12px_28px_rgba(30,72,120,0.11)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0871dc]/25"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#238be5] to-[#0751ad] text-white shadow-[0_7px_16px_rgba(9,91,184,0.22)] ring-4 ring-[#e7f2ff]">
              <User size={20} strokeWidth={1.9} />
            </span>
            <p className="whitespace-nowrap text-[12px] font-semibold tracking-[-0.01em] text-[#18355f]">
              Agente Municipal
            </p>
          </div>
        </button>

        <div className="mb-1.5 flex items-center gap-2 rounded-xl border border-[#cbdff3] bg-[linear-gradient(135deg,#e8f3ff,#f3f8ff)] px-4 py-2.5 text-[11px] font-semibold text-[#075cc5] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_5px_14px_rgba(31,88,151,0.035)]">
          <span className="flex size-6 items-center justify-center rounded-lg bg-white text-[#075cc5] shadow-sm">
            <LockKeyhole size={13} />
          </span>
          Uso interno
        </div>

        <div className="relative -mx-1 h-[142px] overflow-hidden bg-white">
          <div className="absolute inset-x-4 bottom-0 h-16 rounded-full bg-[#dceeff]/40 blur-2xl" />
          <div className="relative mx-auto h-full w-[158px] overflow-hidden">
            <Image
              src="/yo-robot.png"
              alt="Prototipo institucional MuniDoc Salta"
              fill
              sizes="190px"
              loading="eager"
              className="object-cover object-top brightness-[1.08] contrast-[1.04] saturate-[0.98]"
            />
          </div>
        </div>

        <p className="mt-1 text-center text-[9px] font-medium leading-4 tracking-[0.035em] text-[#7890aa]">
          Prototipo Controlado
          <br />
          Lic. Cazon Nicolas
        </p>

        <div className="mx-auto my-1.5 h-px w-14 bg-gradient-to-r from-transparent via-[#a8bfd8] to-transparent" />

        <p className="px-2 text-center text-[9px] leading-4 text-[#6a7e9c]">
          © 2026 Municipalidad de Salta.
          <br />
          Todos los derechos reservados.
        </p>
        <p className="mt-1 px-2 text-center text-[8px] leading-3 text-[#8a9bb1]">
          {APP_INFO.version} · Lanzamiento 23/06/2026
        </p>
      </div>
    </aside>
  );
}
