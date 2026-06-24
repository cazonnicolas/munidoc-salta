"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clipboard,
  Download,
  FileStack,
  Info,
  Landmark,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { trackActivity } from "@/lib/activityClient";
import { APP_INFO } from "@/lib/appInfo";
import type { SectionId } from "@/lib/navigation";

const helpCards = [
  {
    title: "¿Cómo usar la Biblioteca?",
    text: "Accedé al manual de práctica administrativa, consultá capítulos por tema y revisá reglas básicas de redacción, documentos, conectores, abreviaturas y ortografía.",
    action: "Ir a Biblioteca",
    section: "biblioteca" as SectionId,
    icon: BookOpen,
    tone: "bg-[#e8f3ff] text-[#0863c8]",
  },
  {
    title: "¿Cómo usar los Modelos?",
    text: "Explorá modelos de notas, pases, memorándums, circulares, informes y constancias. Podés verlos, descargarlos o usarlos como base para generar un nuevo documento.",
    action: "Ir a Modelos",
    section: "modelos" as SectionId,
    icon: FileStack,
    tone: "bg-[#e8f7ef] text-[#16844a]",
  },
  {
    title: "¿Cómo usar el Generador IA?",
    text: "Completá los datos del documento, revisá la vista previa y descargá el archivo en formato Word cuando esté listo.",
    action: "Ir al Generador IA",
    section: "generador" as SectionId,
    icon: Bot,
    tone: "bg-[#f0eaff] text-[#7452d6]",
  },
  {
    title: "Descargas y borradores",
    text: "Generá un borrador administrativo, revisá su contenido y descargalo en formato Word para continuar su edición.",
    action: "Ir al Generador IA",
    section: "generador" as SectionId,
    icon: Download,
    tone: "bg-[#fff1df] text-[#df761a]",
  },
];

const frequentlyAskedQuestions = [
  {
    question: "¿La plataforma reemplaza el control administrativo?",
    answer:
      "No. La plataforma sirve como herramienta de apoyo. Todo documento generado debe ser revisado por el agente o área correspondiente antes de su uso.",
  },
  {
    question: "¿Los documentos generados por IA son definitivos?",
    answer:
      "No. La IA puede cometer errores. Siempre se debe verificar la información, el expediente, el destinatario, la normativa aplicable y el formato antes de imprimir o presentar un documento.",
  },
  {
    question: "¿Puedo descargar los documentos?",
    answer:
      "Sí. La plataforma está pensada para permitir la descarga de documentos en formato Word o PDF, según la funcionalidad disponible.",
  },
  {
    question: "¿Qué documentos se pueden generar?",
    answer:
      "Se podrán generar notas, pases, memorándums, circulares, informes, constancias y otros documentos administrativos que se incorporen a la biblioteca.",
  },
  {
    question: "¿Necesito tener conocimientos técnicos?",
    answer:
      "No. La interfaz está pensada para ser simple, clara y guiada, de modo que cualquier agente municipal pueda utilizarla.",
  },
];

const recommendations = [
  "Verificá siempre los datos del expediente.",
  "Revisá destinatario, asunto y fundamento antes de descargar.",
  "Usá lenguaje claro, formal y respetuoso.",
  "No cargues información sensible innecesaria.",
  "Conservá una copia del documento final en el área correspondiente.",
  "Consultá a tu superior o área competente cuando el trámite lo requiera.",
];

export function AyudaSection({
  onNavigate,
  aboutFocusToken = 0,
}: {
  onNavigate: (section: SectionId) => void;
  aboutFocusToken?: number;
}) {
  const aboutRef = useRef<HTMLElement>(null);
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    if (!aboutFocusToken) return;

    const timeoutId = window.setTimeout(() => {
      aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      aboutRef.current?.focus({ preventScroll: true });
      trackActivity({
        eventType: "view_about_munidoc",
        section: "Ayuda",
        detail: "Acerca de MuniDoc Salta",
      });
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [aboutFocusToken]);

  useEffect(() => {
    if (!copyMessage) return;

    const timeoutId = window.setTimeout(() => setCopyMessage(""), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [copyMessage]);

  useEffect(() => {
    trackActivity({
      eventType: "quick_guide_view",
      section: "Ayuda",
      detail: "Guía rápida de uso",
    });
    trackActivity({
      eventType: "good_practices_view",
      section: "Ayuda",
      detail: "Buenas prácticas de redacción administrativa",
    });
  }, []);

  const handleCopyAppLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopyMessage("Enlace copiado correctamente.");
      trackActivity({
        eventType: "copy_app_link",
        section: "Ayuda",
        detail: "Copiar enlace de MuniDoc",
      });
    } catch {
      setCopyMessage("Copiá el enlace desde la barra del navegador.");
    }
  };

  return (
    <section className="section-stage space-y-6">
      <header className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
        <Card className="decorated-panel flex items-start gap-4 bg-[linear-gradient(135deg,#ffffff,#f3f8ff)] p-6">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-[#cce1f6] bg-gradient-to-br from-white to-[#e8f3ff] text-[#0863c8] shadow-[0_7px_18px_rgba(26,88,158,0.08)]">
            <CircleHelp size={28} strokeWidth={1.8} />
          </span>
          <div>
            <h2 className="text-[24px] font-bold tracking-[-0.025em] text-[#10264c]">
              Ayuda
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#637594]">
              Encontrá respuestas rápidas, recomendaciones de uso y asistencia
              para utilizar MuniDoc Salta.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button className="h-9 gap-2" onClick={handleCopyAppLink}>
                <Clipboard size={15} />
                Copiar enlace de MuniDoc
              </Button>
              {copyMessage && (
                <span className="rounded-lg border border-[#c9dcee] bg-white/80 px-3 py-2 text-[10px] font-semibold text-[#365779]">
                  {copyMessage}
                </span>
              )}
            </div>
          </div>
        </Card>

        <Card className="decorated-panel flex gap-4 border-[#bcd8f5] bg-[linear-gradient(145deg,#eaf5ff,#f8fbff)] p-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0863c8] shadow-sm">
            <ShieldCheck size={23} />
          </span>
          <div>
            <h3 className="text-sm font-bold text-[#075cc5]">
              Uso interno municipal
            </h3>
            <p className="mt-2 text-[11px] leading-5 text-[#526987]">
              Esta plataforma está pensada para acompañar a los agentes
              municipales en la redacción, consulta y práctica de documentos
              administrativos.
            </p>
          </div>
        </Card>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {helpCards.map(({ icon: Icon, ...item }) => (
          <Card
            key={item.title}
            className="group relative flex min-h-[270px] flex-col overflow-hidden p-5 transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-[#1780dc] before:to-transparent hover:-translate-y-1 hover:border-[#abc9ed] hover:shadow-[0_15px_30px_rgba(30,75,130,0.085)]"
          >
            <span
              className={`flex size-11 items-center justify-center rounded-2xl shadow-sm ring-4 ring-white ${item.tone}`}
            >
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <h3 className="mt-4 text-sm font-bold text-[#173055]">
              {item.title}
            </h3>
            <p className="mt-2 text-[11px] leading-5 text-[#5c7190]">
              {item.text}
            </p>
            <Button
              className="mt-auto h-9 w-full"
              onClick={() => onNavigate(item.section)}
            >
              {item.action}
            </Button>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="decorated-panel p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#0863c8]">
              <BookOpen size={19} />
            </span>
            <h3 className="text-base font-bold text-[#173055]">
              Guía rápida de uso
            </h3>
          </div>
          <ol className="mt-4 space-y-3 text-[11px] leading-5 text-[#526987]">
            {[
              "Ingresá a Biblioteca para consultar criterios de redacción administrativa.",
              "Revisá Modelos para identificar el tipo de documento adecuado.",
              "Completá el Generador IA con datos claros y precisos.",
              "Revisá el borrador generado antes de copiarlo o descargarlo.",
              "Descargá el Word únicamente cuando el contenido esté controlado.",
            ].map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#edf5ff] text-[10px] font-bold text-[#0863c8]">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="decorated-panel p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#e8f7ef] text-[#16844a]">
              <CheckCircle2 size={19} />
            </span>
            <h3 className="text-base font-bold text-[#173055]">
              Buenas prácticas de redacción administrativa
            </h3>
          </div>
          <ul className="mt-4 grid gap-3 text-[11px] leading-5 text-[#526987] sm:grid-cols-2">
            {[
              "Usar lenguaje claro, formal y respetuoso.",
              "Evitar frases ambiguas o excesivamente extensas.",
              "Indicar correctamente destinatario, asunto y motivo.",
              "No incorporar datos que no estén respaldados.",
              "Revisar ortografía, fechas, nombres y dependencias.",
              "Mantener coherencia entre el asunto y el cuerpo del documento.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-[#16844a]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(330px,0.8fr)]">
        <Card className="overflow-hidden border-[#cdddea]">
          <div className="decorated-panel border-b border-[#e1e8f1] bg-[linear-gradient(135deg,#f1f7fd,#fbfdff)] px-5 py-5">
            <h3 className="text-base font-bold text-[#173055]">
              Preguntas frecuentes
            </h3>
            <p className="mt-1 text-[10px] text-[#718199]">
              Respuestas breves sobre el alcance y uso de la plataforma.
            </p>
          </div>
          <div className="divide-y divide-[#e5ebf2] px-5">
            {frequentlyAskedQuestions.map((item, index) => (
              <details
                key={item.question}
                className="group py-4.5"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 text-[12px] font-bold text-[#294365]">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#edf5ff] text-[10px] text-[#0863c8]">
                    {index + 1}
                  </span>
                  <span className="flex-1">{item.question}</span>
                  <ChevronDown
                    size={16}
                    className="text-[#718199] transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="ml-10 mt-3 pr-6 text-[11px] leading-5 text-[#607491]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="decorated-panel p-5">
            <h3 className="text-base font-bold text-[#173055]">
              Uso recomendado
            </h3>
            <p className="mt-3 text-[11px] leading-5 text-[#526987]">
              Para obtener mejores resultados, completá los campos principales
              del formulario, seleccioná el tipo de documento y el modelo
              correspondiente, y escribí indicaciones claras sobre el motivo del
              trámite. Luego revisá el borrador generado antes de copiarlo,
              descargarlo o utilizarlo formalmente.
            </p>
          </Card>

          <Card className="decorated-panel p-5">
            <h3 className="text-base font-bold text-[#173055]">
              Revisión administrativa
            </h3>
            <p className="mt-3 text-[11px] leading-5 text-[#526987]">
              Todo documento administrativo debe ser controlado por el agente o
              área responsable antes de su emisión. La plataforma brinda
              asistencia para ordenar la redacción, pero la validez final
              depende de la revisión institucional correspondiente.
            </p>
          </Card>

          <Card className="decorated-panel p-5">
            <h3 className="text-base font-bold text-[#173055]">
              Recomendaciones de uso
            </h3>
            <ul className="mt-4 space-y-3">
              {recommendations.map((recommendation) => (
                <li
                  key={recommendation}
                  className="flex gap-3 text-[11px] leading-5 text-[#526987]"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-[#16884c]"
                  />
                  {recommendation}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="relative overflow-hidden bg-[linear-gradient(145deg,#ffffff,#f5f9ff)] p-5">
            <Landmark
              size={130}
              strokeWidth={0.7}
              className="absolute -bottom-8 -right-5 text-[#dcecff]"
            />
            <div className="relative">
              <h3 className="text-base font-bold text-[#173055]">
                Contacto interno
              </h3>
              <p className="mt-2 text-[11px] leading-5 text-[#607491]">
                Para consultas sobre el uso de la plataforma o sobre la
                documentación administrativa municipal, comunicate con el área
                responsable.
              </p>
              <div className="mt-4 space-y-3">
                <ContactLine
                  icon={Users}
                  label="Área"
                  value="Coordinación General de Recursos Humanos"
                />
                <ContactLine
                  icon={MapPin}
                  label="Lugar"
                  value="Centro Cívico Municipal"
                />
                <ContactLine
                  icon={Building2}
                  label="Modalidad"
                  value="Asistencia interna"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <section
        ref={aboutRef}
        tabIndex={-1}
        className="scroll-mt-28 outline-none focus-visible:ring-2 focus-visible:ring-[#0871dc]/25"
      >
        <Card className="decorated-panel border-[#bcd8f5] bg-[linear-gradient(135deg,#ffffff,#f4f9ff)] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <span className="flex size-13 shrink-0 items-center justify-center rounded-2xl border border-[#cce1f6] bg-[#eaf4ff] text-[#0863c8] shadow-sm">
            <Info size={26} strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold tracking-[-0.02em] text-[#10264c]">
                Acerca de {APP_INFO.name}
              </h3>
              <span className="rounded-lg border border-[#c7dcf0] bg-white/80 px-3 py-1 text-[10px] font-semibold text-[#075cc5]">
                {APP_INFO.prototypeStatus}
              </span>
            </div>
            <div className="mt-4 space-y-4 text-sm leading-7 text-[#405775]">
              <p>
                MuniDoc Salta es un prototipo digital de uso interno de la
                Municipalidad de Salta, lanzado el 23 de junio de 2026, en el
                marco de la gestión del Intendente Dr. Emiliano Durán.
              </p>
              <p>
                La plataforma fue creada con el objetivo de acompañar a los
                agentes municipales en la consulta, redacción y elaboración de
                documentos administrativos, promoviendo una comunicación escrita
                más clara, ordenada, formal y coherente con las prácticas
                propias de la Administración Pública Municipal.
              </p>
              <p>
                El prototipo integra una biblioteca teórica de práctica
                administrativa, un banco de modelos documentales, un generador
                de borradores asistido por inteligencia artificial y un panel
                privado de actividad que permite observar el uso general de la
                herramienta. Su finalidad es fortalecer los procesos internos,
                facilitar el acceso a criterios de redacción administrativa y
                brindar una herramienta de apoyo para la elaboración de notas,
                pases, memorándum, circulares, informes y constancias.
              </p>
              <p>
                MuniDoc Salta no reemplaza la revisión, intervención ni
                responsabilidad de las áreas competentes. Los textos generados
                por la plataforma deben ser revisados, adecuados y validados por
                el agente o dependencia correspondiente antes de su firma,
                impresión, remisión o presentación formal.
              </p>
              <p>
                El desarrollo, control, actualización y seguimiento del
                prototipo se encuentra a cargo del Lic. Cazón Nicolás,
                Licenciado en Recursos Humanos, en el ámbito de la Coordinación
                General de Recursos Humanos de la Municipalidad de Salta.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <InfoChip label="Lanzamiento" value={APP_INFO.launchDate} />
              <InfoChip label="Estado" value={APP_INFO.prototypeStatus} />
              <InfoChip label="Uso" value={APP_INFO.useType} />
              <InfoChip label="Gestión" value="Intendente Dr. Emiliano Durán" />
              <InfoChip label="Responsable" value={APP_INFO.developerName} />
              <InfoChip label="Área" value={APP_INFO.responsibleArea} />
              <InfoChip label="Versión" value="Prototipo 2026" />
              <InfoChip label="Municipio" value={APP_INFO.municipality} />
            </div>
          </div>
        </div>
        </Card>
      </section>

      <div className="flex gap-4 rounded-2xl border border-[#f0c98b] bg-[linear-gradient(135deg,#fff8e9,#fffdf8)] p-5 shadow-[0_8px_20px_rgba(137,94,25,0.045)]">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#d88913]">
          <AlertTriangle size={21} />
        </span>
        <div>
          <h3 className="text-sm font-bold text-[#9b5f0a]">Importante</h3>
          <p className="mt-2 text-[11px] leading-5 text-[#7b623e]">
            La IA puede cometer errores. Verificá siempre la información antes
            de utilizar, imprimir, descargar o presentar cualquier documento
            administrativo.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactLine({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#edf5ff] text-[#0863c8]">
        <Icon size={15} />
      </span>
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8090a7]">
          {label}
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#344d6e]">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#d8e5f2] bg-white/85 p-3 shadow-[0_4px_12px_rgba(31,75,125,0.035)]">
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#7890aa]">
        {label}
      </p>
      <p className="mt-1 text-[11px] font-bold leading-5 text-[#2f4a6c]">
        {value}
      </p>
    </div>
  );
}
