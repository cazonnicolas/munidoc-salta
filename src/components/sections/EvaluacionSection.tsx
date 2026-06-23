import {
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Eye,
  Info,
  Landmark,
  Save,
  Send,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const multipleChoiceOptions = [
  "A. La firma del funcionario interviniente.",
  "B. La fecha y el número de expediente.",
  "C. Un lenguaje técnico y sin abreviaturas.",
  "D. La identificación del emisor, el objeto, el destinatario y la fecha.",
];

export function EvaluacionSection() {
  return (
    <section className="space-y-4 pb-20">
      <EvaluationHeader />

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_285px]">
        <div className="space-y-4">
          <QuestionTabs />
          <MultipleChoiceQuestion />
          <TrueFalseQuestion />
          <PracticeQuestion />
        </div>
        <EvaluationSidebar />
      </div>

      <ActionBar />
    </section>
  );
}

function EvaluationHeader() {
  return (
    <Card className="relative min-h-[230px] overflow-hidden bg-gradient-to-r from-[#f7fbff] to-white p-6">
      <div className="relative z-10 max-w-[650px]">
        <div className="flex items-start gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-[#cfe1f4] bg-[#edf6ff] text-[#6f58d9]">
            <ClipboardCheck size={31} strokeWidth={1.8} />
          </span>
          <div>
            <h2 className="text-[22px] font-bold leading-8 tracking-[-0.025em] text-[#10264c]">
              Evaluación del Taller de Redacción y Gestión de Documentación
              Administrativa
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-[#5c7190]">
              Poné a prueba tus conocimientos sobre normativa, redacción,
              pases, memorándums y circuitos administrativos.
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          <InfoChip icon={CalendarDays}>
            Iniciado: 23/06/2026 10:15
          </InfoChip>
          <InfoChip icon={Clock3}>Intento: 1 de 1 permitido</InfoChip>
          <Badge tone="green" className="px-3 py-2">
            Obligatoria
          </Badge>
        </div>
      </div>

      <div className="absolute inset-y-0 right-0 hidden w-[390px] overflow-hidden text-[#72a9e5] lg:block">
        <Landmark
          className="absolute -bottom-20 right-8 opacity-30"
          size={310}
          strokeWidth={0.7}
        />
        <div className="absolute right-12 top-12 size-40 rounded-full border border-[#a7caef]/40" />
        <div className="absolute right-32 top-20 size-24 rounded-full border border-[#a7caef]/30" />
      </div>
    </Card>
  );
}

function QuestionTabs() {
  const tabs = [
    "Todas (20)",
    "Opción múltiple (12)",
    "Verdadero / Falso (4)",
    "Prácticas (4)",
  ];

  return (
    <Card className="flex gap-6 overflow-x-auto rounded-b-none px-5 pt-1">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          className={`shrink-0 border-b-2 px-2 py-4 text-[11px] font-semibold ${
            index === 0
              ? "border-[#0863c8] text-[#075cc5]"
              : "border-transparent text-[#687b98]"
          }`}
        >
          {tab}
        </button>
      ))}
    </Card>
  );
}

function MultipleChoiceQuestion() {
  return (
    <QuestionCard
      number={1}
      type="Opción múltiple"
      state="Respondida"
      stateTone="green"
    >
      <h3 className="text-[13px] font-bold leading-5 text-[#172d51]">
        ¿Cuál es el elemento esencial que debe contener todo documento
        administrativo?
      </h3>
      <div className="mt-4 space-y-2">
        {multipleChoiceOptions.map((option, index) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-[11px] text-[#344d6e] ${
              index === 3
                ? "border-[#9bc3ef] bg-[#eaf4ff] font-semibold text-[#075cc5]"
                : "border-transparent hover:bg-[#f7fafd]"
            }`}
          >
            <input
              type="radio"
              name="question-1"
              defaultChecked={index === 3}
              className="size-4 accent-[#0863c8]"
            />
            {option}
          </label>
        ))}
      </div>
      <Explanation>
        Todo documento administrativo debe permitir identificar de forma clara
        quién lo emite, qué comunica, a quién va dirigido y cuándo se emite.
      </Explanation>
    </QuestionCard>
  );
}

function TrueFalseQuestion() {
  return (
    <QuestionCard
      number={2}
      type="Verdadero / Falso"
      state="Respondida"
      stateTone="green"
    >
      <h3 className="text-[13px] font-bold leading-5 text-[#172d51]">
        En toda nota interna, es obligatorio colocar el número de expediente al
        que se refiere.
      </h3>
      <div className="mt-4 flex flex-wrap gap-6">
        {["Verdadero", "Falso"].map((option, index) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-[11px] font-medium text-[#344d6e]"
          >
            <input
              type="radio"
              name="question-2"
              defaultChecked={index === 0}
              className="size-4 accent-[#0863c8]"
            />
            {option}
          </label>
        ))}
      </div>
      <Explanation>
        Así se garantiza la trazabilidad y correcta vinculación documental
        dentro del circuito administrativo.
      </Explanation>
    </QuestionCard>
  );
}

function PracticeQuestion() {
  return (
    <QuestionCard
      number={3}
      type="Práctica"
      state="Pendiente"
      stateTone="orange"
    >
      <h3 className="text-[13px] font-bold leading-5 text-[#172d51]">
        Realice un pase remitiendo el Expte. Nº 1234/2024 a la Dirección de
        Compras.
      </h3>
      <p className="mt-3 text-[11px] leading-5 text-[#617694]">
        Redacte el contenido del pase teniendo en cuenta: destinatario, motivo
        del pase, referencias al expediente y cierre formal. Utilice un lenguaje
        claro y administrativo.
      </p>
      <textarea
        aria-label="Respuesta práctica"
        placeholder="Escriba aquí su respuesta..."
        rows={6}
        className="mt-4 w-full resize-none rounded-lg border border-[#cbd9e8] bg-white px-4 py-3 text-[11px] leading-5 text-[#304867] outline-none placeholder:text-[#8a99ae] focus:border-[#75a9df] focus:ring-2 focus:ring-[#0863c8]/10"
      />
    </QuestionCard>
  );
}

function QuestionCard({
  number,
  type,
  state,
  stateTone,
  children,
}: {
  number: number;
  type: string;
  state: string;
  stateTone: "green" | "orange";
  children: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0863c8] text-sm font-bold text-white">
          {number}
        </span>
        <Badge tone="blue">{type}</Badge>
        <Badge tone={stateTone} className="ml-auto gap-1.5 px-3">
          {state}
          {state === "Respondida" && <Check size={12} strokeWidth={2.5} />}
        </Badge>
      </div>
      <div className="mt-4 pl-0 sm:pl-12">{children}</div>
    </Card>
  );
}

function Explanation({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex gap-2 rounded-lg bg-[#f5f9fe] px-3 py-2.5">
      <Info size={14} className="mt-0.5 shrink-0 text-[#0863c8]" />
      <p className="text-[10px] leading-4 text-[#526987]">
        <strong>Explicación:</strong> {children}
      </p>
    </div>
  );
}

function EvaluationSidebar() {
  return (
    <aside className="space-y-4 xl:sticky xl:top-[115px]">
      <Card className="p-5">
        <h3 className="text-sm font-bold text-[#173055]">Tu progreso</h3>
        <div className="mt-4 flex items-center justify-between text-[11px] text-[#617694]">
          <span>Pregunta 8 de 20</span>
          <strong className="text-lg text-[#0863c8]">40%</strong>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5ecf4]">
          <div className="h-full w-[40%] rounded-full bg-[#0870d6]" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <ProgressStat value="7" label="Respondidas" tone="green" />
          <ProgressStat value="1" label="Marcada" tone="orange" />
          <ProgressStat value="12" label="Pendientes" tone="blue" />
        </div>
        <Button className="mt-5 h-9 w-full">Ver índice de preguntas</Button>
      </Card>

      <Card className="p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-[#173055]">
          <Timer size={18} className="text-[#0863c8]" />
          Tiempo restante
        </h3>
        <p className="mt-5 text-center font-mono text-[27px] tracking-[0.08em] text-[#294365]">
          01:12:45
        </p>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#e5ecf4]">
          <div className="h-full w-[28%] rounded-full bg-[#0870d6]" />
        </div>
        <p className="mt-4 text-[10px] leading-4 text-[#718199]">
          La evaluación se enviará automáticamente al finalizar el tiempo.
        </p>
      </Card>

      <Card className="p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-[#173055]">
          <BarChart3 size={18} className="text-[#0863c8]" />
          Estimación de puntaje
        </h3>
        <div className="mt-5 flex items-center gap-3">
          <strong className="text-4xl text-[#20a45d]">72%</strong>
          <Badge tone="green">Aprobado</Badge>
        </div>
        <p className="mt-3 text-[10px] text-[#617694]">
          Puntaje estimado actual
        </p>
        <div className="mt-3 flex items-center justify-between text-[9px] text-[#718199]">
          <span />
          <span>720 / 1000 pts</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e5ecf4]">
          <div className="h-full w-[72%] rounded-full bg-[#0870d6]" />
        </div>
        <p className="mt-4 text-[10px] leading-4 text-[#718199]">
          Se actualiza automáticamente según tus respuestas.
        </p>
      </Card>

      <Card className="p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-[#173055]">
          <CheckCircle2 size={18} className="text-[#0863c8]" />
          Estado de la evaluación
        </h3>
        <div className="mt-5 flex gap-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e7f2ff] text-[#0863c8]">
            <Check size={14} />
          </span>
          <div>
            <p className="text-[12px] font-bold text-[#075cc5]">En progreso</p>
            <p className="mt-1 text-[10px] text-[#718199]">Aún no enviada</p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[#e5ebf2] pt-4 text-[10px] text-[#718199]">
          <span>Guardado automático: 10:28</span>
          <Info size={14} />
        </div>
      </Card>
    </aside>
  );
}

function ActionBar() {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 flex flex-col gap-3 border-t border-[#d7e1ec] bg-white/95 px-4 py-4 shadow-[0_-8px_24px_rgba(30,64,115,0.06)] backdrop-blur sm:mx-0 sm:flex-row sm:items-center">
      <Button className="h-10 sm:mr-auto">Salir de la evaluación</Button>
      <Button className="h-10 gap-2">
        <Save size={16} />
        Guardar borrador
      </Button>
      <Button className="h-10 gap-2">
        <Eye size={16} />
        Revisar respuestas
      </Button>
      <Button variant="primary" className="h-10 gap-2 px-5">
        <Send size={16} />
        Enviar evaluación
      </Button>
    </div>
  );
}

function InfoChip({
  icon: Icon,
  children,
}: {
  icon: typeof Clock3;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-[#d5e3f1] bg-[#edf5ff] px-3 py-2 text-[9px] font-semibold text-[#4d6685]">
      <Icon size={13} className="text-[#0863c8]" />
      {children}
    </span>
  );
}

function ProgressStat({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: "green" | "orange" | "blue";
}) {
  const tones = {
    green: "bg-[#e6f7eb] text-[#16844a]",
    orange: "bg-[#fff1df] text-[#df761a]",
    blue: "bg-[#edf2fa] text-[#304867]",
  };

  return (
    <div>
      <span
        className={`mx-auto flex size-8 items-center justify-center rounded-md text-sm font-bold ${tones[tone]}`}
      >
        {value}
      </span>
      <span className="mt-2 block text-[9px] text-[#526987]">{label}</span>
    </div>
  );
}
