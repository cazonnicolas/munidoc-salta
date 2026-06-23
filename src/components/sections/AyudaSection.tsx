import {
  AlertTriangle,
  BookOpen,
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Download,
  FileStack,
  Landmark,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
}: {
  onNavigate: (section: SectionId) => void;
}) {
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
