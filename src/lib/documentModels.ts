export type DocumentType =
  | "Nota"
  | "Pase"
  | "Memorándum"
  | "Circular"
  | "Informe"
  | "Constancia";

export type DocumentModel = {
  id: string;
  title: string;
  type: DocumentType;
  category: string;
  scope: "Interno" | "Externo";
  editable: boolean;
  description: string;
  useCase: string;
  tags: string[];
  fields: string[];
  structure: string[];
  template: string;
  previewLines: string[];
};

export const documentModels: DocumentModel[] = [
  {
    id: "nota-licencia-examen",
    title: "Nota de solicitud de licencia para rendir examen",
    type: "Nota",
    category: "Solicitud",
    scope: "Interno",
    editable: true,
    description:
      "Modelo de nota mediante la cual un agente solicita autorización para usufructuar licencia para rendir examen.",
    useCase:
      "Usar cuando un agente municipal necesita solicitar licencia por examen, indicando artículo del Convenio Colectivo de Trabajo, fechas, carrera, materia e institución educativa.",
    tags: ["licencia", "examen", "solicitud", "agente municipal"],
    fields: [
      "Lugar y fecha",
      "Destinatario",
      "Artículo del Convenio Colectivo de Trabajo",
      "Fechas de licencia",
      "Carrera",
      "Materia",
      "Institución educativa",
      "Firma",
      "DNI",
    ],
    structure: [
      "Lugar y fecha",
      "Destinatario",
      "Saludo formal",
      "Solicitud concreta",
      "Fundamento",
      "Cierre formal",
      "Firma y DNI",
      "Destinatario al pie",
    ],
    template: `SALTA, [FECHA]

Sr./Sra. [DESTINATARIO]:

Me dirijo a Ud. a fin de solicitarle autorización para usufructuar la licencia para rendir examen, prevista en el artículo [ARTÍCULO] del Convenio Colectivo de Trabajo, desde el [FECHA DE INICIO] hasta el [FECHA DE FINALIZACIÓN] del año en curso.

El motivo de la misma es presentarme a rendir el examen final de la materia [MATERIA], correspondiente a la carrera de [CARRERA] de [INSTITUCIÓN EDUCATIVA].

Sin otro particular, me despido de Ud. muy atentamente.

[FIRMA]
[DNI]

Señor/a
[DESTINATARIO]
Su Despacho`,
    previewLines: [
      "SALTA, [FECHA]",
      "Sr./Sra. [DESTINATARIO]:",
      "Me dirijo a Ud. a fin de solicitarle autorización...",
      "Sin otro particular, me despido de Ud. muy atentamente.",
      "[FIRMA] — [DNI]",
    ],
  },
  {
    id: "nota-service-vehiculo",
    title: "Nota de solicitud de autorización de service de vehículo oficial",
    type: "Nota",
    category: "Solicitud",
    scope: "Interno",
    editable: true,
    description:
      "Modelo de nota para solicitar autorización de service o mantenimiento de un vehículo oficial asignado a una dependencia municipal.",
    useCase:
      "Usar cuando una dependencia necesita solicitar reparación, mantenimiento o service de un vehículo oficial.",
    tags: ["vehículo oficial", "service", "mantenimiento", "solicitud"],
    fields: [
      "Secretaría",
      "Coordinación",
      "Lugar y fecha",
      "Destinatario",
      "Marca y dominio del vehículo",
      "Dependencia asignada",
      "Motivo del service",
      "Fundamento",
      "Firma",
      "DNI",
    ],
    structure: [
      "Encabezado institucional",
      "Lugar y fecha",
      "Destinatario",
      "Solicitud",
      "Fundamento",
      "Cierre formal",
      "Firma",
      "Destinatario al pie",
    ],
    template: `[SECRETARÍA]
[COORDINACIÓN]

SALTA, [FECHA]

Sr./Sra. [DESTINATARIO]:

Me dirijo a Ud. a fin de solicitarle se autorice el service de la camioneta marca [MARCA Y DOMINIO], asignada a esta [DEPENDENCIA], teniendo en cuenta que el mismo resulta necesario para el buen funcionamiento de dicho vehículo oficial.

Cabe aclarar que el último service que se realizó a dicha unidad fue durante el año [AÑO], como así también que la misma debe estar en buen estado para realizar los procedimientos diarios correspondientes.

Sin otro particular, me despido de Ud. muy atentamente.

[FIRMA]
[DNI]

Señor/a
[DESTINATARIO]
Su Despacho`,
    previewLines: [
      "[SECRETARÍA]",
      "[COORDINACIÓN]",
      "Solicitud de service de vehículo oficial",
      "Cabe aclarar que el último service...",
      "Sin otro particular...",
    ],
  },
  {
    id: "nota-elevacion-protocolo",
    title: "Nota de elevación de protocolo o convenio",
    type: "Nota",
    category: "Comunicación / Elevación",
    scope: "Interno",
    editable: true,
    description:
      "Modelo de nota para elevar un protocolo, convenio o documentación adjunta a otra autoridad o dependencia, solicitando la elaboración del acto administrativo correspondiente.",
    useCase:
      "Usar cuando se remite documentación vinculada a convenios, protocolos, acuerdos o actuaciones que requieren aprobación mediante acto administrativo.",
    tags: ["elevación", "protocolo", "convenio", "acto administrativo"],
    fields: [
      "Secretaría",
      "Coordinación",
      "Lugar y fecha",
      "Destinatario",
      "Documento adjunto",
      "Institución u organismo",
      "Decreto o antecedente",
      "Firma",
      "DNI",
    ],
    structure: [
      "Encabezado institucional",
      "Lugar y fecha",
      "Destinatario",
      "Referencia al documento adjunto",
      "Solicitud de acto administrativo",
      "Fundamento o antecedente",
      "Cierre formal",
      "Firma",
    ],
    template: `[SECRETARÍA]
[COORDINACIÓN]

SALTA, [FECHA]

Señor/a
[DESTINATARIO]
Municipalidad de la Ciudad de Salta
Su Despacho

Me dirijo a Ud. con relación a [DOCUMENTO O PROTOCOLO], que se adjunta, a los efectos de que se elabore el correspondiente proyecto de acto administrativo mediante el cual se apruebe el mismo.

Cabe señalar que dicho instrumento se celebra en virtud de [ANTECEDENTE O CONVENIO MARCO], aprobado mediante [DECRETO / RESOLUCIÓN / NORMA].

Sin otro particular, saludo a Ud. atentamente.

[FIRMA]
[DNI]`,
    previewLines: [
      "Me dirijo a Ud. con relación a [DOCUMENTO O PROTOCOLO]...",
      "A los efectos de que se elabore el correspondiente proyecto...",
      "Cabe señalar que dicho instrumento...",
      "Sin otro particular...",
    ],
  },
  {
    id: "pase-conocimiento-prosecucion",
    title: "Pase para conocimiento y prosecución del trámite",
    type: "Pase",
    category: "Trámite interno",
    scope: "Interno",
    editable: true,
    description:
      "Modelo de pase breve mediante el cual se remiten actuaciones a otra dependencia para su conocimiento y prosecución del trámite correspondiente.",
    useCase:
      "Usar cuando un expediente debe girarse a otra dependencia para continuar el trámite.",
    tags: ["pase", "expediente", "prosecución", "trámite interno"],
    fields: [
      "Secretaría",
      "Coordinación",
      "Dirección General",
      "Expediente",
      "Asunto",
      "Dependencia destinataria",
      "Folio o antecedente",
      "Fecha",
      "Firma",
    ],
    structure: [
      "Encabezado institucional",
      "Referencia de expediente",
      "Asunto",
      "Lugar y fecha",
      "Fórmula de pase",
      "Dependencia destinataria",
      "Cierre o firma",
    ],
    template: `[SECRETARÍA]
[COORDINACIÓN]
[DIRECCIÓN GENERAL]

Ref.: Expte. Nº [EXPEDIENTE]
Asunto: [ASUNTO]

[DEPENDENCIA], [FECHA]

ATENTO a lo informado a fs. [FOLIO / ANTECEDENTE], gírese a [DEPENDENCIA DESTINATARIA], para su conocimiento y prosecución del trámite correspondiente.

[FIRMA]`,
    previewLines: [
      "Ref.: Expte. Nº [EXPEDIENTE]",
      "Asunto: [ASUNTO]",
      "ATENTO a lo informado a fs. [FOLIO]...",
      "Gírese a [DEPENDENCIA DESTINATARIA]...",
      "Para su conocimiento y prosecución del trámite correspondiente.",
    ],
  },
  {
    id: "pase-remision-intervencion",
    title: "Pase para conocimiento e intervención",
    type: "Pase",
    category: "Trámite interno",
    scope: "Interno",
    editable: true,
    description:
      "Modelo de pase para remitir obrados a otra dependencia a fin de que tome conocimiento e intervención.",
    useCase:
      "Usar cuando una actuación debe remitirse a un área superior, área legal, secretaría u otra dependencia competente.",
    tags: ["pase", "intervención", "obrados", "dependencia"],
    fields: [
      "Secretaría",
      "Coordinación",
      "Dirección General",
      "Expediente",
      "Asunto",
      "Dependencia destinataria",
      "Folio o dictamen",
      "Fecha",
      "Firma",
    ],
    structure: [
      "Encabezado institucional",
      "Referencia",
      "Asunto",
      "Fecha",
      "Fórmula de remisión",
      "Motivo",
      "Cierre",
    ],
    template: `[SECRETARÍA]
[COORDINACIÓN]
[DIRECCIÓN GENERAL]

Ref.: Expte. Nº [EXPEDIENTE]
Asunto: [ASUNTO]

SALTA, [FECHA]

PASEN los presentes obrados a [DEPENDENCIA DESTINATARIA], para su conocimiento e intervención, atento a lo dictaminado/informado a fs. [FOLIO / ANTECEDENTE] por [ÁREA INTERVINIENTE].

Atentamente.

[FIRMA]`,
    previewLines: [
      "PASEN los presentes obrados a [DEPENDENCIA DESTINATARIA]...",
      "Para su conocimiento e intervención...",
      "Atento a lo dictaminado/informado a fs. [FOLIO]...",
      "Atentamente.",
    ],
  },
  {
    id: "memorandum-suspension-licencia",
    title: "Memorándum de suspensión de licencia anual reglamentaria",
    type: "Memorándum",
    category: "Comunicación interna",
    scope: "Interno",
    editable: true,
    description:
      "Modelo de memorándum mediante el cual se comunica la suspensión de una licencia anual reglamentaria por razones laborales.",
    useCase:
      "Usar cuando una autoridad comunica internamente la suspensión o modificación de una licencia por razones de servicio.",
    tags: ["memorándum", "licencia anual", "notificación", "servicio"],
    fields: [
      "Secretaría",
      "Coordinación",
      "Número de memorándum",
      "Para",
      "De",
      "Fecha",
      "Objeto o asunto",
      "Fecha de presentación",
      "Período remanente",
      "Firma",
    ],
    structure: [
      "Encabezado institucional",
      "MEMORÁNDUM Nº",
      "PARA",
      "DE",
      "Lugar y fecha",
      "Objeto/asunto",
      "Comunicación principal",
      "Indicación sobre remanente",
      "Notificación",
      "Firma",
    ],
    template: `[SECRETARÍA]
[COORDINACIÓN]
[DEPENDENCIA]

MEMORÁNDUM Nº [NÚMERO]

PARA: [DESTINATARIO]
DE: [EMISOR]

SALTA, [FECHA]

OBJETO/ASUNTO: [ASUNTO]

Comunico a Ud. que por razones laborales se suspende la licencia anual reglamentaria que se encuentra usufructuando, por lo cual deberá presentarse a su lugar de trabajo el [FECHA DE PRESENTACIÓN].

Asimismo, se le hace saber que el remanente de dicha licencia deberá usufructuarse dentro de los plazos previstos por la normativa vigente en la materia, a partir de [PERÍODO / FECHA].

Queda Ud. debidamente notificado/a.

[FIRMA]`,
    previewLines: [
      "MEMORÁNDUM Nº [NÚMERO]",
      "PARA: [DESTINATARIO]",
      "DE: [EMISOR]",
      "Comunico a Ud. que por razones laborales...",
      "Queda Ud. debidamente notificado/a.",
    ],
  },
  {
    id: "circular-renuncia-jubilacion",
    title: "Circular sobre renuncia por jubilación y requisitos legales",
    type: "Circular",
    category: "Comunicación interna",
    scope: "Interno",
    editable: true,
    description:
      "Modelo de circular para comunicar pautas internas vinculadas a expedientes de renuncia por jubilación y requisitos legales.",
    useCase:
      "Usar cuando una dependencia debe comunicar a varias áreas un procedimiento, requisito, pauta o directiva interna.",
    tags: ["circular", "jubilación", "renuncia", "requisitos legales"],
    fields: [
      "Secretaría",
      "Coordinación",
      "Número de circular",
      "Tema",
      "Motivo",
      "Normativa o decreto",
      "Procedimiento",
      "Área emisora",
      "Fecha",
      "Firma",
    ],
    structure: [
      "Encabezado institucional",
      "CIRCULAR Nº",
      "Tema",
      "Visto / motivo",
      "Desarrollo",
      "Procedimiento por puntos",
      "Alcance obligatorio",
      "Notificación a áreas",
      "Firma",
    ],
    template: `[SECRETARÍA]
[COORDINACIÓN]

SALTA, [FECHA]

CIRCULAR Nº [NÚMERO]

TEMA: [TEMA]

VISTO la tramitación de expedientes vinculados a [MOTIVO / TRÁMITE], ingresados a esta dependencia, y advirtiendo que en algunos autos no se verifica el cumplimiento de lo dispuesto mediante [NORMATIVA / DECRETO].

Por ello, es preciso establecer las pautas bajo las cuales deberán someterse tales diligencias, por lo que debe observarse el siguiente procedimiento:

I. [PRIMERA PAUTA O REQUISITO]
II. [SEGUNDA PAUTA O REQUISITO]
III. [TERCERA PAUTA O REQUISITO]

La presente Circular se emite en el marco de las facultades propias de [ÁREA EMISORA], por lo que su cumplimiento es de carácter obligatorio.

Para la observancia de lo dispuesto precedentemente, deberá notificarse la presente circular a las áreas correspondientes.

[FIRMA]`,
    previewLines: [
      "CIRCULAR Nº [NÚMERO]",
      "TEMA: [TEMA]",
      "VISTO la tramitación de expedientes...",
      "Por ello, es preciso establecer las pautas...",
      "I. [PRIMERA PAUTA]",
      "La presente Circular se emite...",
    ],
  },
  {
    id: "informe-base",
    title: "Informe administrativo base",
    type: "Informe",
    category: "Informe",
    scope: "Interno",
    editable: true,
    description:
      "Modelo base para exponer hechos, antecedentes, análisis o conclusiones sobre una actuación administrativa.",
    useCase:
      "Usar cuando un área necesita dejar constancia técnica o administrativa de una situación, trámite, antecedente o conclusión.",
    tags: ["informe", "antecedentes", "análisis", "conclusión"],
    fields: [
      "Área emisora",
      "Destinatario",
      "Expediente",
      "Asunto",
      "Antecedentes",
      "Desarrollo",
      "Conclusión",
      "Fecha",
      "Firma",
    ],
    structure: [
      "Encabezado institucional",
      "Referencia",
      "Asunto",
      "Destinatario",
      "Antecedentes",
      "Desarrollo",
      "Conclusión",
      "Firma",
    ],
    template: `[ÁREA EMISORA]

Ref.: Expte. Nº [EXPEDIENTE]
Asunto: [ASUNTO]

SALTA, [FECHA]

A: [DESTINATARIO]

Por medio del presente informe, se deja constancia de los antecedentes vinculados a [TEMA O ACTUACIÓN].

ANTECEDENTES:
[DETALLE DE ANTECEDENTES]

DESARROLLO:
[ANÁLISIS O INFORMACIÓN RELEVANTE]

CONCLUSIÓN:
Por lo expuesto, se eleva el presente para su conocimiento y consideración.

[FIRMA]`,
    previewLines: [
      "Ref.: Expte. Nº [EXPEDIENTE]",
      "Asunto: [ASUNTO]",
      "ANTECEDENTES:",
      "DESARROLLO:",
      "CONCLUSIÓN:",
    ],
  },
  {
    id: "constancia-base",
    title: "Constancia administrativa base",
    type: "Constancia",
    category: "Constancia",
    scope: "Externo",
    editable: true,
    description:
      "Modelo base para acreditar formalmente una situación, hecho, presentación o información solicitada.",
    useCase:
      "Usar cuando corresponde dejar constancia formal de una situación administrativa verificable.",
    tags: ["constancia", "acreditación", "interesado", "presentación"],
    fields: [
      "Área emisora",
      "Interesado",
      "DNI o identificación",
      "Hecho o situación",
      "Fecha",
      "Autoridad firmante",
    ],
    structure: [
      "Encabezado institucional",
      "Título CONSTANCIA",
      "Fórmula “A quien corresponda”",
      "Hecho constatado",
      "Finalidad",
      "Fecha",
      "Firma",
    ],
    template: `[ÁREA EMISORA]

SALTA, [FECHA]

CONSTANCIA

A quien corresponda:

Se deja constancia que [INTERESADO/A], DNI Nº [DNI], [HECHO O SITUACIÓN QUE SE ACREDITA].

La presente se expide a solicitud de la parte interesada y para ser presentada ante quien corresponda.

[FIRMA]
[CARGO]`,
    previewLines: [
      "CONSTANCIA",
      "A quien corresponda:",
      "Se deja constancia que [INTERESADO/A]...",
      "La presente se expide a solicitud...",
      "[FIRMA] — [CARGO]",
    ],
  },
];
