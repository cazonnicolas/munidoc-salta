"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bot,
  Check,
  ChevronDown,
  Clipboard,
  ClipboardCheck,
  Code2,
  Download,
  FileText,
  Info,
  Lightbulb,
  List,
  LoaderCircle,
  MessageCircleQuestion,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InstitutionalLogo } from "@/components/ui/InstitutionalLogo";
import { trackActivity } from "@/lib/activityClient";
import {
  documentModels as defaultDocumentModels,
  type DocumentModel,
  type DocumentType,
} from "@/lib/documentModels";
import {
  buildAIPrompt,
  buildProvisionalDocument,
  createInitialFormData,
  type AdministrativeFormData,
} from "@/lib/documentPrompt";
import {
  BORRADOR_WORD_FILE_NAME,
  exportAdministrativeDocumentToWord,
} from "@/lib/wordExport";

const documentTypes: DocumentType[] = [
  "Nota",
  "Pase",
  "Memorándum",
  "Circular",
  "Informe",
  "Constancia",
];

const generationMessages = [
  "Preparando borrador administrativo...",
  "Aplicando estructura del modelo seleccionado...",
  "Redactando en lenguaje administrativo formal...",
  "Organizando el contenido para su revisión...",
];

type QuickExample = {
  type: DocumentType;
  number: string;
  date: string;
  recipient: string;
  subject: string;
  prompt: string;
};

const quickExamples: QuickExample[] = [
  {
    type: "Nota",
    number: "001",
    date: "SALTA, 23 DE JUNIO DE 2026",
    recipient: "DIRECCIÓN DE COMPRAS",
    subject: "Solicitud de adquisición de insumos de oficina",
    prompt: `Necesito generar una NOTA administrativa formal emitida desde la Coordinación General de Recursos Humanos, dirigida a la Dirección de Compras.

El motivo de la nota es solicitar la adquisición de insumos de oficina para el normal funcionamiento de la Coordinación General de Recursos Humanos. Se requiere incluir resmas de papel, carpetas, folios, biromes, tóner para impresora y demás elementos necesarios para el desarrollo de las tareas administrativas diarias.

La nota debe fundamentar que el stock actual resulta insuficiente y que dichos insumos son necesarios para garantizar la continuidad de las actividades internas, la atención de trámites y la correcta gestión documental del área.

Debe redactarse con lenguaje administrativo formal, claro, preciso y respetuoso. Incluir introducción, pedido principal, fundamento y cierre formal. No inventar expedientes, nombres propios, cargos personales ni normativa. Si falta algún dato importante, dejarlo entre corchetes.`,
  },
  {
    type: "Pase",
    number: "002",
    date: "SALTA, 23 DE JUNIO DE 2026",
    recipient: "DIRECCIÓN GENERAL DE PERSONAL",
    subject: "Remisión de actuaciones para intervención",
    prompt: `Necesito generar un PASE administrativo emitido desde la Coordinación General de Recursos Humanos, dirigido a la Dirección General de Personal.

El motivo del pase es remitir las actuaciones vinculadas a [EXPEDIENTE] para su conocimiento e intervención, a efectos de que se analice la documentación incorporada y se continúe con el trámite administrativo correspondiente.

El texto debe ser breve, formal y claro. Debe mencionar el expediente, el motivo de la remisión y la dependencia destinataria. Utilizar fórmulas administrativas como “PASEN los presentes obrados” o “gírese a la dependencia correspondiente”, según corresponda.

No inventar expedientes, folios, nombres propios, fechas adicionales ni normativa. Si falta algún dato importante, dejarlo entre corchetes.`,
  },
  {
    type: "Memorándum",
    number: "003",
    date: "SALTA, 23 DE JUNIO DE 2026",
    recipient: "PERSONAL DE LA COORDINACIÓN GENERAL DE RECURSOS HUMANOS",
    subject: "Recordatorio sobre cumplimiento del horario laboral",
    prompt: `Necesito generar un MEMORÁNDUM interno emitido desde la Coordinación General de Recursos Humanos, dirigido al personal de la dependencia.

El motivo del memorándum es recordar la importancia del cumplimiento del horario laboral establecido, tanto en el ingreso como en la permanencia y egreso del lugar de trabajo. También debe indicarse que cualquier situación particular que impida cumplir con el horario deberá ser informada por la vía correspondiente y con la debida anticipación.

El texto debe tener tono formal, claro y directo, propio de una comunicación interna administrativa. Debe transmitir la instrucción de manera respetuosa, resaltando que el cumplimiento horario contribuye a una mejor organización del servicio, atención de trámites y funcionamiento general del área.

No inventar nombres propios, expedientes, normativa ni sanciones. Si falta algún dato importante, dejarlo entre corchetes.`,
  },
  {
    type: "Circular",
    number: "004",
    date: "SALTA, 23 DE JUNIO DE 2026",
    recipient: "TODAS LAS DEPENDENCIAS MUNICIPALES",
    subject: "Pautas para la presentación de documentación administrativa",
    prompt: `Necesito generar una CIRCULAR interna emitida desde la Coordinación General de Recursos Humanos, dirigida a todas las dependencias municipales.

El motivo de la circular es informar pautas generales para la correcta presentación de documentación administrativa ante esta Coordinación. Debe indicarse que toda documentación remitida deberá contener asunto claro, referencia de expediente si corresponde, identificación del área emisora, documentación respaldatoria adjunta y firma de la autoridad o responsable interviniente.

La circular debe organizar las indicaciones en puntos numerados, utilizando redacción formal, impersonal y clara. Debe explicar que estas pautas tienen como finalidad mejorar el orden administrativo, la trazabilidad de las actuaciones, la correcta recepción de trámites y la agilización de los circuitos internos.

No inventar expedientes, nombres propios, normativa ni fechas adicionales. Si falta algún dato importante, dejarlo entre corchetes para completar luego.`,
  },
  {
    type: "Informe",
    number: "005",
    date: "SALTA, 23 DE JUNIO DE 2026",
    recipient: "SECRETARÍA DE GOBIERNO",
    subject:
      "Informe sobre actividades desarrolladas por la Coordinación General de Recursos Humanos",
    prompt: `Necesito generar un INFORME administrativo emitido desde la Coordinación General de Recursos Humanos, dirigido a la Secretaría de Gobierno.

El motivo del informe es detallar las actividades desarrolladas por la Coordinación General de Recursos Humanos durante el período [INDICAR PERÍODO], vinculadas a la gestión de documentación administrativa, atención de agentes municipales, capacitaciones internas, seguimiento de trámites y organización de registros del área.

El informe debe estar estructurado con una introducción, desarrollo de las actividades realizadas y una conclusión final. Debe utilizar lenguaje administrativo formal, claro y objetivo. También debe dejar constancia de que la información se eleva para conocimiento y consideración de la autoridad correspondiente.

No inventar datos estadísticos, expedientes, nombres propios ni normativa. Si falta información específica, dejarla entre corchetes.`,
  },
  {
    type: "Constancia",
    number: "006",
    date: "SALTA, 23 DE JUNIO DE 2026",
    recipient: "A QUIEN CORRESPONDA",
    subject: "Constancia de participación en capacitación interna",
    prompt: `Necesito generar una CONSTANCIA administrativa emitida desde la Coordinación General de Recursos Humanos, dirigida a quien corresponda.

El motivo de la constancia es acreditar que el/la agente [NOMBRE DEL AGENTE], DNI Nº [DNI], participó de la capacitación interna denominada “[NOMBRE DE LA CAPACITACIÓN]”, realizada en el ámbito de la Municipalidad de Salta, en fecha [FECHA DE REALIZACIÓN].

La constancia debe redactarse en tono formal, claro y directo. Debe indicar que se expide a solicitud de la parte interesada y para ser presentada ante quien corresponda. Mantener campos entre corchetes cuando falten datos concretos.

No inventar nombres, DNI, fechas, cargos ni información no suministrada.`,
  },
];

const getDraftRequiredFields = (fields: string[]) =>
  fields.filter((field) => !/\b(firma|cargo)\b/i.test(field));

export function GeneradorIASection({
  selectedModelId,
  documentModels = defaultDocumentModels,
}: {
  selectedModelId?: string;
  documentModels?: DocumentModel[];
}) {
  const initialModel =
    documentModels.find((model) => model.id === selectedModelId) ??
    documentModels.find((model) => model.type === "Nota") ??
    documentModels[0];

  const [selectedType, setSelectedType] = useState<DocumentType>(
    initialModel?.type ?? "Nota",
  );
  const [activeModelId, setActiveModelId] = useState(initialModel?.id ?? "");
  const [formData, setFormData] = useState<AdministrativeFormData>(() =>
    initialModel
      ? createInitialFormData(initialModel)
      : {
          number: "[NÚMERO]",
          date: "SALTA, [FECHA]",
          recipient: "[DESTINATARIO]",
          subject: "[ASUNTO]",
        },
  );
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedDocumentText, setGeneratedDocumentText] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showTechnicalPrompt, setShowTechnicalPrompt] = useState(false);

  useEffect(() => {
    if (!successMessage) return;

    const timeoutId = window.setTimeout(() => setSuccessMessage(""), 4500);
    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  useEffect(() => {
    trackActivity({
      eventType: "checklist_view",
      section: "Generador IA",
      detail: "Antes de utilizar el borrador",
    });
  }, []);

  const modelsForType = useMemo(
    () => documentModels.filter((model) => model.type === selectedType),
    [documentModels, selectedType],
  );

  const selectedModel =
    documentModels.find((model) => model.id === activeModelId) ??
    modelsForType[0] ??
    initialModel;

  const provisionalDocument = useMemo(
    () =>
      selectedModel
        ? buildProvisionalDocument({
            model: selectedModel,
            formData,
            userPrompt,
          })
        : "",
    [formData, selectedModel, userPrompt],
  );

  const technicalPrompt = useMemo(
    () =>
      selectedModel
        ? buildAIPrompt({
            documentType: selectedModel.type,
            model: selectedModel,
            template: selectedModel.template,
            requiredFields: getDraftRequiredFields(selectedModel.fields),
            formData,
            userPrompt,
          })
        : "",
    [formData, selectedModel, userPrompt],
  );

  const selectModel = (model: DocumentModel) => {
    setSelectedType(model.type);
    setActiveModelId(model.id);
    setFormData(createInitialFormData(model));
    setUserPrompt("");
    setGeneratedDocumentText("");
    setAiError("");
    setSuccessMessage("");
  };

  const handleTypeChange = (type: DocumentType) => {
    const firstModel = documentModels.find((model) => model.type === type);
    if (firstModel) selectModel(firstModel);
  };

  const handleModelChange = (modelId: string) => {
    const model = documentModels.find((item) => item.id === modelId);
    if (model) selectModel(model);
  };

  const handleFormDataChange = (data: AdministrativeFormData) => {
    setFormData(data);
    setGeneratedDocumentText("");
    setAiError("");
    setSuccessMessage("");
  };

  const handleUserPromptChange = (prompt: string) => {
    setUserPrompt(prompt);
    setGeneratedDocumentText("");
    setAiError("");
    setSuccessMessage("");
  };

  const handleQuickExample = (example: QuickExample) => {
    const firstModel = documentModels.find(
      (model) => model.type === example.type,
    );
    if (!firstModel) return;

    setSelectedType(example.type);
    setActiveModelId(firstModel.id);
    setFormData({
      number: example.number,
      date: example.date,
      recipient: example.recipient,
      subject: example.subject,
    });
    setUserPrompt(example.prompt);
    setGeneratedDocumentText("");
    setAiError("");
    setSuccessMessage("");
    trackActivity({
      eventType: "quick_example_click",
      section: "Generador IA",
      detail: example.subject,
      documentType: example.type,
      modelId: firstModel.id,
    });
  };

  const handleGenerateDraft = async () => {
    if (!userPrompt.trim()) {
      setAiError(
        "Escribí primero las indicaciones para generar el borrador.",
      );
      setSuccessMessage("");
      return;
    }

    setIsGeneratingAI(true);
    setAiError("");
    setSuccessMessage("");
    trackActivity({
      eventType: "draft_generate_start",
      section: "Generador IA",
      detail: selectedModel.title,
      documentType: selectedModel.type,
      modelId: selectedModel.id,
    });
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 60_000);

    try {
      const response = await fetch("/api/generate-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType: selectedModel.type,
          selectedModel,
          template: selectedModel.template,
          fields: getDraftRequiredFields(selectedModel.fields),
          formData,
          userPrompt,
          technicalPrompt,
        }),
        signal: controller.signal,
      });
      const result = (await response.json()) as {
        success?: boolean;
        generatedText?: string;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "No se pudo generar el documento.",
        );
      }

      if (!result.generatedText?.trim()) {
        throw new Error(
          "La IA no devolvió contenido. Intentá nuevamente con indicaciones más claras.",
        );
      }

      setGeneratedDocumentText(result.generatedText.trim());
      setSuccessMessage(
        "Borrador generado correctamente. Revisá el contenido antes de descargarlo o utilizarlo.",
      );
      trackActivity({
        eventType: "draft_generate_success",
        section: "Generador IA",
        detail: selectedModel.title,
        documentType: selectedModel.type,
        modelId: selectedModel.id,
      });
      trackActivity({
        eventType: "generator_draft_success",
        section: "Generador IA",
        detail: selectedModel.title,
        documentType: selectedModel.type,
        modelId: selectedModel.id,
      });
    } catch (error) {
      trackActivity({
        eventType: "draft_generate_error",
        section: "Generador IA",
        detail: selectedModel.title,
        documentType: selectedModel.type,
        modelId: selectedModel.id,
      });
      console.error("No se pudo generar el borrador con IA.", error);
      if (error instanceof DOMException && error.name === "AbortError") {
        setAiError(
          "La generación demoró más de lo esperado. Intentá nuevamente con indicaciones más breves.",
        );
      } else {
        setAiError(
          "No se pudo generar el borrador en este momento. Revisá los datos ingresados e intentá nuevamente.",
        );
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsGeneratingAI(false);
    }
  };

  const displayedDocument =
    generatedDocumentText.trim() || provisionalDocument;

  if (!selectedModel) {
    return (
      <Card className="p-6 text-sm text-[#526987]">
        No hay modelos de documentos disponibles.
      </Card>
    );
  }

  return (
    <section className="section-stage space-y-6">
      <header className="decorated-panel flex flex-col gap-5 rounded-2xl border border-[#ccdeed] bg-[linear-gradient(125deg,#ffffff,#f2f8ff)] px-6 py-6 shadow-[0_12px_30px_rgba(30,72,120,0.055)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f6f1ff] to-[#e9e1ff] text-[#7552da] shadow-[0_8px_18px_rgba(104,77,190,0.1)] ring-1 ring-[#ddd2ff]">
            <Sparkles size={27} strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-[10px] font-semibold text-[#687b98]">
              Inicio <span className="px-1 text-[#a0aec0]">&gt;</span>{" "}
              <span className="text-[#075cc5]">Generador IA</span>
            </p>
            <h2 className="mt-2 text-[24px] font-bold tracking-[-0.025em] text-[#10264c]">
              Generador IA
            </h2>
            <p className="mt-1 text-sm text-[#637594]">
              Explicá lo que necesitás y prepará un documento administrativo
              municipal.
            </p>
          </div>
        </div>

        <div className="flex max-w-[370px] gap-3 rounded-2xl border border-[#c9dcee] bg-white/68 p-4 shadow-[0_7px_20px_rgba(30,72,120,0.04)] backdrop-blur">
          <Info className="mt-0.5 shrink-0 text-[#0865cd]" size={20} />
          <div>
            <h3 className="text-xs font-bold text-[#075cc5]">
              Formato institucional listo para imprimir
            </h3>
            <p className="mt-1 text-[11px] leading-5 text-[#586d8b]">
              La vista previa y el Word usan los datos e indicaciones cargados.
            </p>
          </div>
        </div>
      </header>

      <div className="grid items-stretch gap-5 xl:grid-cols-[240px_300px_minmax(340px,1fr)] 2xl:grid-cols-[300px_350px_minmax(430px,1fr)]">
        <AssistantPanel
          model={selectedModel}
          onExampleClick={handleQuickExample}
        />
        <DocumentForm
          selectedType={selectedType}
          selectedModel={selectedModel}
          modelsForType={modelsForType}
          formData={formData}
          userPrompt={userPrompt}
          onTypeChange={handleTypeChange}
          onModelChange={handleModelChange}
          onFormDataChange={handleFormDataChange}
          onUserPromptChange={handleUserPromptChange}
        />
        <DocumentPreview
          model={selectedModel}
          displayedDocument={displayedDocument}
          generatedDocumentText={generatedDocumentText}
          isGeneratingAI={isGeneratingAI}
          aiError={aiError}
          successMessage={successMessage}
          onGenerateAI={handleGenerateDraft}
          onShowTechnicalPrompt={() => setShowTechnicalPrompt(true)}
        />
      </div>

      {showTechnicalPrompt && (
        <TechnicalPromptModal
          prompt={technicalPrompt}
          onClose={() => setShowTechnicalPrompt(false)}
        />
      )}
    </section>
  );
}

function AssistantPanel({
  model,
  onExampleClick,
}: {
  model: DocumentModel;
  onExampleClick: (example: QuickExample) => void;
}) {
  return (
    <Card className="flex min-h-[960px] flex-col overflow-hidden border-[#d9d3ef] bg-[linear-gradient(180deg,#ffffff,#fbf9ff)] p-5">
      <div className="-mx-5 -mt-5 mb-1 flex items-start gap-3 border-b border-[#e4eaf2] bg-[linear-gradient(135deg,#f8f5ff,#ffffff)] px-5 pb-4 pt-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#eee9ff] text-[#7452d6] shadow-sm">
          <Sparkles size={18} />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#173055]">Asistente IA</h3>
          <p className="mt-1 text-[10px] text-[#71819a]">
            Tu asistente para documentos administrativos.
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap text-[9px] font-semibold text-[#16844a]">
          <span className="size-2 rounded-full bg-[#1caf61]" />
          Preparado
        </span>
      </div>

      <div className="mt-4 space-y-4">
        <div className="ml-7 rounded-2xl rounded-tr-sm border border-[#d5e5f6] bg-[linear-gradient(135deg,#edf5ff,#f8fbff)] p-4 shadow-[0_5px_16px_rgba(31,83,140,0.035)]">
          <p className="text-[11px] leading-5 text-[#304867]">
            Quiero preparar: <strong>{model.title.toUpperCase()}</strong>.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#ddd4ff] bg-[#f4f0ff] text-[#7553d8]">
            <Bot size={16} />
          </span>
          <div className="rounded-2xl rounded-tl-sm border border-[#dce4ee] bg-white p-4 shadow-[0_5px_16px_rgba(31,68,111,0.035)]">
            <p className="text-[11px] leading-5 text-[#304867]">
              Perfecto. Escribí en el campo “Indicaciones para la IA” qué
              necesitás generar. Podés explicarlo con tus palabras:
              destinatario, motivo, expediente, fechas y cualquier dato
              importante. Con esa información se redactará el documento en
              lenguaje administrativo formal.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[10px] font-bold text-[#536985]">
          Ejemplos rápidos
        </p>
        <div className="space-y-2">
          {quickExamples.map((example) => (
            <button
              key={example.type}
              type="button"
              onClick={() => onExampleClick(example)}
              className="flex min-h-9 w-full items-start gap-2 rounded-xl border border-[#d5e1ee] bg-white px-3 py-2.5 text-left text-[10px] font-semibold leading-4 text-[#075cc5] shadow-[0_3px_10px_rgba(31,68,111,0.025)] transition-all hover:-translate-y-0.5 hover:border-[#a8c8e8] hover:bg-[#f3f8ff]"
            >
              <MessageCircleQuestion size={14} className="mt-0.5 shrink-0" />
              Ejemplo de {example.type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-5">
        <div className="flex items-center gap-2 rounded-2xl border border-[#cddbea] bg-white p-2 shadow-[0_5px_16px_rgba(31,68,111,0.035)]">
          <input
            aria-label="Consulta para el asistente"
            placeholder="Escribí una consulta..."
            className="min-w-0 flex-1 bg-transparent px-2 text-[11px] text-[#24405f] outline-none placeholder:text-[#8a99ae]"
          />
          <button
            type="button"
            aria-label="Enviar consulta"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f2ff] text-[#0863c8]"
          >
            <Send size={17} />
          </button>
        </div>
        <p className="mt-3 text-center text-[9px] leading-4 text-[#7b8ba2]">
          La IA redactará el documento usando los datos cargados en el
          formulario.
        </p>
      </div>
    </Card>
  );
}

function DocumentForm({
  selectedType,
  selectedModel,
  modelsForType,
  formData,
  userPrompt,
  onTypeChange,
  onModelChange,
  onFormDataChange,
  onUserPromptChange,
}: {
  selectedType: DocumentType;
  selectedModel: DocumentModel;
  modelsForType: DocumentModel[];
  formData: AdministrativeFormData;
  userPrompt: string;
  onTypeChange: (type: DocumentType) => void;
  onModelChange: (modelId: string) => void;
  onFormDataChange: (data: AdministrativeFormData) => void;
  onUserPromptChange: (prompt: string) => void;
}) {
  const updateField = (
    field: keyof AdministrativeFormData,
    value: string,
  ) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <Card className="min-h-[960px] overflow-hidden border-[#cfdeec] bg-[linear-gradient(180deg,#ffffff,#fbfdff)] p-5">
      <div className="-mx-5 -mt-5 border-b border-[#e4eaf2] bg-[linear-gradient(135deg,#f3f8ff,#ffffff)] px-5 pb-4 pt-5">
        <h3 className="text-sm font-bold text-[#173055]">
          Preparación del documento
        </h3>
        <p className="mt-1 text-[10px] text-[#71819a]">
          Completá los datos y explicá en lenguaje simple qué necesitás.
        </p>
      </div>

      <form className="mt-4 space-y-4">
        <div>
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.05em] text-[#075cc5]">
            A. Datos del documento
          </h4>
          <div className="space-y-3">
            <FormSelect
              label="Tipo de documento"
              value={selectedType}
              onChange={(value) => onTypeChange(value as DocumentType)}
            >
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))}
            </FormSelect>

            <FormSelect
              label="Modelo específico"
              value={selectedModel.id}
              onChange={onModelChange}
            >
              {modelsForType.map((model, index) => (
                <option key={model.id} value={model.id}>
                  MODELO {index + 1}
                </option>
              ))}
            </FormSelect>
            <p className="-mt-1 text-[9px] leading-4 text-[#71819a]">
              Modelo seleccionado:{" "}
              <strong className="font-semibold text-[#526987]">
                {selectedModel.title.toUpperCase()}
              </strong>
            </p>

            <FormInput
              label="Número"
              value={formData.number}
              onChange={(value) => updateField("number", value)}
            />
            <FormInput
              label="Lugar y fecha"
              value={formData.date}
              onChange={(value) => updateField("date", value)}
            />
            <FormInput
              label="Destinatario"
              value={formData.recipient}
              onChange={(value) => updateField("recipient", value)}
            />
            <FormInput
              label="Asunto"
              value={formData.subject}
              onChange={(value) => updateField("subject", value)}
            />
          </div>
        </div>

        <div className="border-t border-[#dce5ef] pt-4">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#7552d6]">
            B. Indicaciones para la IA
          </h4>
          <p className="mt-2 text-[9px] leading-4 text-[#667a97]">
            Escribí con tus palabras qué documento necesitás generar, a quién va
            dirigido, cuál es el motivo, qué datos debe incluir y cualquier
            información importante para redactarlo correctamente.
          </p>
          <textarea
            aria-label="Indicaciones para la IA"
            value={userPrompt}
            onChange={(event) => onUserPromptChange(event.target.value)}
            placeholder="Ejemplo: Necesito una nota dirigida a la Dirección de Compras solicitando la adquisición de insumos de limpieza para las oficinas, porque el stock actual es insuficiente para el normal funcionamiento del área."
            rows={7}
            className="mt-2 w-full resize-none rounded-xl border border-[#cfc5ef] bg-white px-3 py-3 text-[10px] leading-4 text-[#2d4565] shadow-[inset_0_1px_2px_rgba(55,45,100,0.025)] outline-none focus:border-[#8d72db] focus:ring-2 focus:ring-[#7552d6]/10"
          />

          <div className="mt-3 rounded-2xl border border-[#dfd8f4] bg-[linear-gradient(145deg,#faf8ff,#ffffff)] p-4">
            <h5 className="text-[10px] font-bold text-[#6245bc]">
              ¿Qué conviene incluir?
            </h5>
            <ul className="mt-2 space-y-1.5">
              {[
                "Tipo de pedido o trámite.",
                "Destinatario o dependencia.",
                "Motivo principal.",
                "Expediente, folio o antecedente si corresponde.",
                "Fechas importantes.",
                "Normativa o artículo si corresponde.",
                "Tono deseado: formal, breve, urgente o informativo.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[9px] leading-4 text-[#5e708c]"
                >
                  <Check
                    size={12}
                    className="mt-0.5 shrink-0 text-[#7552d6]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-[#c9dfee] bg-[linear-gradient(145deg,#f2f8ff,#fbfdff)] p-4 shadow-[0_6px_18px_rgba(31,88,151,0.035)]">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-[#075cc5]" />
            <h4 className="text-[11px] font-bold text-[#173055]">
              Campos requeridos para este modelo
            </h4>
          </div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {getDraftRequiredFields(selectedModel.fields).map((field) => (
              <li
                key={field}
                className="flex items-start gap-2 text-[10px] leading-4 text-[#526987]"
              >
                <Check
                  size={13}
                  className="mt-0.5 shrink-0 text-[#16844a]"
                />
                {field}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </Card>
  );
}

function DocumentPreview({
  model,
  displayedDocument,
  generatedDocumentText,
  isGeneratingAI,
  aiError,
  successMessage,
  onGenerateAI,
  onShowTechnicalPrompt,
}: {
  model: DocumentModel;
  displayedDocument: string;
  generatedDocumentText: string;
  isGeneratingAI: boolean;
  aiError: string;
  successMessage: string;
  onGenerateAI: () => Promise<void>;
  onShowTechnicalPrompt: () => void;
}) {
  const [isExporting, setIsExporting] = useState(false);
  const [generationMessageIndex, setGenerationMessageIndex] = useState(0);
  const [actionMessage, setActionMessage] = useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!isGeneratingAI) return;

    const intervalId = window.setInterval(() => {
      setGenerationMessageIndex((current) =>
        current === generationMessages.length - 1 ? 0 : current + 1,
      );
    }, 2300);

    return () => window.clearInterval(intervalId);
  }, [isGeneratingAI]);

  useEffect(() => {
    if (!actionMessage) return;

    const timeoutId = window.setTimeout(() => setActionMessage(null), 4200);
    return () => window.clearTimeout(timeoutId);
  }, [actionMessage]);

  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      await exportAdministrativeDocumentToWord({
        documentTitle: model.title,
        documentType: model.type,
        template: displayedDocument,
        fileName: BORRADOR_WORD_FILE_NAME,
        logoUrl: "/logo-salta.png",
      });
      trackActivity({
        eventType: "word_download",
        section: "Generador IA",
        detail: model.title,
        documentType: model.type,
        modelId: model.id,
      });
      setActionMessage({
        tone: "success",
        text: "Documento Word descargado correctamente.",
      });
    } catch (error) {
      console.error("No se pudo generar el documento Word.", error);
      setActionMessage({
        tone: "error",
        text: "No se pudo completar la descarga en este momento. Intentá nuevamente.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(displayedDocument);
      } else {
        copyTextFallback(displayedDocument);
      }
      trackActivity({
        eventType: "copy_text",
        section: "Generador IA",
        detail: model.title,
        documentType: model.type,
        modelId: model.id,
      });
      setActionMessage({
        tone: "success",
        text: "Texto copiado correctamente.",
      });
    } catch (error) {
      console.error("No se pudo copiar el texto.", error);
      try {
        copyTextFallback(displayedDocument);
        trackActivity({
          eventType: "copy_text",
          section: "Generador IA",
          detail: model.title,
          documentType: model.type,
          modelId: model.id,
        });
        setActionMessage({
          tone: "success",
          text: "Texto copiado correctamente.",
        });
      } catch (fallbackError) {
        console.error("No se pudo copiar el texto con fallback.", fallbackError);
        setActionMessage({
          tone: "error",
          text: "No se pudo copiar el texto en este momento. Intentá nuevamente.",
        });
      }
    }
  };

  return (
    <Card className="min-h-[960px] overflow-hidden border-[#c6d7e6] bg-[linear-gradient(180deg,#fafdff,#f3f7fb)] p-5 shadow-[0_14px_36px_rgba(27,63,105,0.055)]">
      <div className="-mx-5 -mt-5 mb-1 flex flex-wrap items-start justify-between gap-3 border-b border-[#dce6ef] bg-[linear-gradient(135deg,#eef6ff,#ffffff)] px-5 pb-4 pt-5">
        <div>
          <h3 className="text-sm font-bold text-[#173055]">
            Vista previa del documento
          </h3>
          <p className="mt-1 text-[10px] text-[#71819a]">{model.title}</p>
        </div>
        <Button className="gap-2" onClick={onShowTechnicalPrompt}>
          <Code2 size={14} />
          Ver prompt técnico
        </Button>
      </div>

      <div className="relative rounded-2xl border border-[#d8e3ed] bg-[#edf2f7]/70 p-3 shadow-[inset_0_1px_3px_rgba(28,61,99,0.035)]">
        <FormatToolbar />
        <WordSheet model={model} finalDocument={displayedDocument} />
        {isGeneratingAI && (
          <div className="absolute inset-3 z-10 flex items-center justify-center rounded-xl bg-[#eef5fc]/88 p-6 text-center backdrop-blur-[2px]">
            <div className="max-w-[310px] rounded-2xl border border-[#bdd5ec] bg-white/95 px-6 py-5 shadow-[0_16px_38px_rgba(27,69,116,0.14)]">
              <LoaderCircle
                className="mx-auto animate-spin text-[#0864ca]"
                size={26}
              />
              <p className="mt-3 text-xs font-bold text-[#173055]">
                {generationMessages[generationMessageIndex]}
              </p>
              <p className="mt-1.5 text-[10px] leading-4 text-[#607491]">
                Estamos redactando el documento con los datos cargados.
              </p>
            </div>
          </div>
        )}
      </div>

      {successMessage && (
        <div className="mt-3 rounded-lg border border-[#bfe2ce] bg-[#effaf3] px-3 py-2 text-[10px] font-semibold text-[#16844a]">
          {successMessage}
        </div>
      )}

      {aiError && (
        <div
          role="alert"
          className="mt-3 rounded-lg border border-[#f0c5bd] bg-[#fff3f0] px-3 py-2 text-[10px] font-semibold leading-4 text-[#bd4a37]"
        >
          {aiError}
        </div>
      )}

      {actionMessage && (
        <div
          role="status"
          className={`mt-3 rounded-lg border px-3 py-2 text-[10px] font-semibold leading-4 ${
            actionMessage.tone === "success"
              ? "border-[#bfe2ce] bg-[#effaf3] text-[#16844a]"
              : "border-[#f0c5bd] bg-[#fff3f0] text-[#bd4a37]"
          }`}
        >
          {actionMessage.text}
        </div>
      )}

      <div className="mt-4 flex gap-3 rounded-2xl border border-[#c7dced] bg-[linear-gradient(135deg,#f3f8ff,#ffffff)] p-4">
        <Info className="mt-0.5 shrink-0 text-[#0863c8]" size={18} />
        <p className="text-[10px] leading-5 text-[#526987]">
          El borrador generado por inteligencia artificial debe ser revisado,
          corregido y validado por el área correspondiente antes de su
          impresión, firma, remisión o presentación formal. MuniDoc Salta
          brinda asistencia en la redacción, pero no reemplaza el criterio
          administrativo ni la intervención de las dependencias competentes.
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-[#d4e3f1] bg-white/90 p-4">
        <div className="flex items-center gap-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#0863c8]">
            <ClipboardCheck size={18} />
          </span>
          <h4 className="text-xs font-bold text-[#173055]">
            Antes de utilizar el borrador
          </h4>
        </div>
        <ul className="mt-3 grid gap-2 text-[10px] leading-5 text-[#526987] sm:grid-cols-2">
          {[
            "Verificar destinatario, asunto y fecha.",
            "Revisar que el contenido responda al trámite solicitado.",
            "Corregir datos incompletos o campos entre corchetes.",
            "Controlar nombres, cargos, expedientes y dependencias.",
            "Validar el texto con el área correspondiente antes de firmar o remitir.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 shrink-0 text-[#16884c]" size={14} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 rounded-xl border border-[#d4e1ef] bg-white/80 px-3 py-2 text-[10px] leading-5 text-[#607491]">
        Antes de descargar, verificá que el borrador respete los datos,
        destinatario, asunto y contenido correspondiente.
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
        <Button
          variant="primary"
          className="h-10 gap-1.5 whitespace-nowrap px-2 text-[10px] sm:col-span-2 2xl:col-span-1"
          onClick={onGenerateAI}
          disabled={isGeneratingAI}
        >
          {isGeneratingAI ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}
          {isGeneratingAI ? "Generando..." : "Generar borrador"}
        </Button>
        <Button
          className="h-10 gap-1.5 whitespace-nowrap px-2 text-[10px]"
          onClick={handleExport}
          disabled={isExporting}
        >
          <Download size={16} />
          {isExporting ? "Generando..." : "Descargar Word"}
        </Button>
        <Button
          className="h-10 gap-1.5 whitespace-nowrap px-2 text-[10px]"
          onClick={handleCopy}
        >
          <Clipboard size={16} />
          Copiar texto
        </Button>
      </div>

      {isGeneratingAI && (
        <p
          role="status"
          className="mt-2 text-center text-[10px] font-medium text-[#607491]"
        >
          {generationMessages[generationMessageIndex]} No cierres esta ventana.
        </p>
      )}

      <div className="mt-4 flex gap-3 rounded-lg border border-[#d4e1ef] bg-[#f8fbff] p-3">
        <Lightbulb className="shrink-0 text-[#dcaa22]" size={17} />
        <p className="text-[9px] leading-4 text-[#607491]">
          {generatedDocumentText
            ? "Revisá el texto generado antes de copiarlo o descargarlo."
            : "Esta vista es provisoria. Tocá “Generar borrador” para obtener una redacción administrativa formal."}
        </p>
      </div>
    </Card>
  );
}

function WordSheet({
  model,
  finalDocument,
}: {
  model: DocumentModel;
  finalDocument: string;
}) {
  return (
    <div className="munidoc-word-sheet document-paper relative mx-auto min-h-[690px] max-w-[520px] overflow-hidden border border-[#becbd8] bg-white px-8 pb-24 pt-8 shadow-[0_18px_42px_rgba(20,48,82,0.16),0_2px_5px_rgba(20,48,82,0.08)] sm:px-10">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0b68c8] via-[#77b2e8] to-transparent opacity-75" />
      <div className="pointer-events-none absolute right-6 top-5 grid grid-cols-3 gap-1.5 opacity-[0.12]">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className="size-1 rounded-full bg-[#1d68b7]" />
        ))}
      </div>
      <div className="flex items-start">
        <InstitutionalLogo className="w-[132px]" />
      </div>

      <div className="mt-9 border-b border-[#dce5ef] pb-3">
        <p className="text-[8px] font-bold uppercase tracking-[0.08em] text-[#075cc5]">
          {model.type}
        </p>
        <h4 className="mt-1 text-[9px] font-bold leading-4 text-black">
          {model.title.toUpperCase()}
        </h4>
      </div>

      <pre className="mt-6 whitespace-pre-wrap font-['Arial_Narrow',Arial,sans-serif] text-[9px] leading-[1.72] text-black">
        {finalDocument}
      </pre>

      <div className="absolute inset-x-8 bottom-6 border-t border-[#8db6df]/70 pt-2 text-center text-[7px] leading-3 text-[#7890a9] sm:inset-x-10">
        <p className="font-semibold text-[#607c9a]">Municipalidad de Salta</p>
        <p>Documento generado desde MuniDoc Salta</p>
      </div>
    </div>
  );
}

function TechnicalPromptModal({
  prompt,
  onClose,
}: {
  prompt: string;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="technical-prompt-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#071a35]/55 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-[#c9d9ea] bg-white shadow-[0_24px_70px_rgba(5,30,65,0.28)]">
        <header className="flex items-start gap-3 border-b border-[#dbe5ef] px-5 py-4">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#f1eaff] text-[#7452d6]">
            <Code2 size={20} />
          </span>
          <div className="flex-1">
            <h3
              id="technical-prompt-title"
              className="text-base font-bold text-[#10264c]"
            >
              Prompt técnico para la IA
            </h3>
            <p className="mt-1 text-[10px] text-[#71819a]">
              Vista de las instrucciones que se enviarán a Gemini.
            </p>
          </div>
          <button
            type="button"
            aria-label="Cerrar prompt técnico"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-lg text-[#657894] hover:bg-[#edf4fb]"
          >
            <X size={19} />
          </button>
        </header>
        <div className="max-h-[65vh] overflow-y-auto p-5">
          <pre className="whitespace-pre-wrap rounded-xl border border-[#d7e1ee] bg-[#f7f9fc] p-4 font-mono text-[10px] leading-5 text-[#304867]">
            {prompt}
          </pre>
        </div>
        <footer className="flex justify-end border-t border-[#dbe5ef] px-5 py-4">
          <Button className="h-10 px-5" onClick={onClose}>
            Cerrar
          </Button>
        </footer>
      </div>
    </div>
  );
}

function copyTextFallback(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!copied) throw new Error("No se pudo copiar el documento.");
}

function FormatToolbar() {
  const alignmentButtons = [
    { label: "Alinear a la izquierda", icon: AlignLeft },
    { label: "Centrar", icon: AlignCenter },
    { label: "Alinear a la derecha", icon: AlignRight },
    { label: "Justificar", icon: AlignJustify },
  ];

  return (
    <div className="my-3 flex flex-wrap items-center gap-2">
      <ToolbarSelect ariaLabel="Fuente" value="Arial Narrow" width="w-[130px]" />
      <ToolbarSelect ariaLabel="Tamaño" value="12" width="w-[64px]" />
      <div className="flex overflow-hidden rounded-lg border border-[#d2ddea]">
        {alignmentButtons.map(({ label, icon: Icon }, index) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className={`flex size-8 items-center justify-center text-[#536985] hover:bg-[#edf4fc] ${
              index === 0 ? "bg-[#e6eef8]" : ""
            }`}
          >
            <Icon size={15} />
          </button>
        ))}
      </div>
      <button
        type="button"
        aria-label="Lista"
        className="flex h-8 items-center gap-2 rounded-lg border border-[#d2ddea] px-2 text-[#536985]"
      >
        <List size={15} />
        <ChevronDown size={12} />
      </button>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold text-[#253b5a]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-9 w-full rounded-xl border border-[#cfdbea] bg-white px-3 text-[10px] text-[#2d4565] shadow-[inset_0_1px_2px_rgba(31,68,111,0.02)] outline-none focus:border-[#78a9df] focus:ring-2 focus:ring-[#0c62c7]/10"
      />
    </label>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold text-[#253b5a]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-9 w-full rounded-xl border border-[#cfdbea] bg-white px-3 text-[10px] text-[#2d4565] shadow-[inset_0_1px_2px_rgba(31,68,111,0.02)] outline-none focus:border-[#78a9df]"
      >
        {children}
      </select>
    </label>
  );
}

function ToolbarSelect({
  ariaLabel,
  value,
  width,
}: {
  ariaLabel: string;
  value: string;
  width: string;
}) {
  return (
    <select
      aria-label={ariaLabel}
      defaultValue={value}
      className={`h-8 rounded-lg border border-[#d2ddea] bg-white px-2 text-[9px] text-[#425a79] ${width}`}
    >
      <option>{value}</option>
    </select>
  );
}

