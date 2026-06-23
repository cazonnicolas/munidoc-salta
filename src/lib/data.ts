export type IconName =
  | "book"
  | "files"
  | "sparkles"
  | "download"
  | "help"
  | "history";

export type LibrarySection = {
  title: string;
  content: string;
};

export type LibraryChapter = {
  id: string;
  number: number;
  title: string;
  category: string;
  readTime: string;
  level: "Básico" | "Intermedio";
  updatedAt: string;
  summary: string;
  objective: string;
  sections: LibrarySection[];
  keyPoints: string[];
  rules: string[];
  examples: string[];
};

export const libraryChapters: LibraryChapter[] = [
  {
    id: "introduccion-documentos-administrativos",
    number: 1,
    title: "Introducción a los documentos administrativos",
    category: "Documentos",
    readTime: "5 min de lectura",
    level: "Básico",
    updatedAt: "23/06/2026",
    summary:
      "El lenguaje administrativo es un uso especializado y formal del lenguaje empleado por la Administración Pública para comunicarse con los ciudadanos. El desafío es redactar con tono formal, vocabulario administrativo adecuado y, al mismo tiempo, de manera clara, precisa y entendible.",
    objective:
      "Comprender qué son los documentos administrativos, cuál es su función dentro de la administración pública municipal y por qué requieren claridad, formalidad y correcta organización.",
    sections: [
      {
        title: "Qué es el lenguaje administrativo",
        content:
          "Es un lenguaje técnico, formal, objetivo y escrito, utilizado por la Administración Pública para comunicarse con los ciudadanos y entre sus propias áreas.",
      },
      {
        title: "Comunicación clara",
        content:
          "Si la comunicación institucional es clara y cercana, las personas perciben a un Estado más cercano. Por eso se promueve una comunicación simple, comprensible y formal.",
      },
      {
        title: "Lenguaje administrativo y lenguaje cotidiano",
        content:
          "El lenguaje cotidiano suele apoyarse en el contexto y en expresiones informales. El administrativo debe dejar constancia precisa de quién comunica, qué se solicita o informa, a quién se dirige y en qué momento.",
      },
      {
        title: "Trazabilidad y comprensión",
        content:
          "La trazabilidad permite reconstruir el recorrido de una actuación, identificar intervenciones y verificar decisiones. Un documento comprensible facilita la respuesta del área destinataria y evita demoras, interpretaciones contradictorias o pedidos de aclaración.",
      },
    ],
    keyPoints: [
      "El lenguaje administrativo debe ser formal, claro y objetivo.",
      "La comunicación pública debe ser comprensible para el ciudadano.",
      "La claridad mejora la imagen institucional.",
      "El documento administrativo debe ser preciso y ordenado.",
    ],
    rules: [
      "Evitar tecnicismos innecesarios.",
      "Redactar con tono formal.",
      "Organizar la información antes de escribir.",
      "Usar vocabulario administrativo adecuado.",
    ],
    examples: [
      "Ejemplo 1: Una nota dirigida a una dependencia debe indicar claramente qué se solicita, por qué se solicita y a quién corresponde intervenir.",
      "Ejemplo 2: Un pase debe mencionar el expediente, el motivo del giro y la dependencia destinataria.",
    ],
  },
  {
    id: "notas",
    number: 2,
    title: "Notas",
    category: "Documentos",
    readTime: "10 min de lectura",
    level: "Básico",
    updatedAt: "23/06/2026",
    summary:
      "La nota es una comunicación escrita emitida por un organismo público, referida a asuntos internos o externos del servicio. También puede ser elaborada por un ciudadano o grupo de personas ante la Administración Pública.",
    objective:
      "Aprender la función, estructura y fórmulas habituales para redactar una nota administrativa.",
    sections: [
      {
        title: "Definición",
        content:
          "La nota administrativa es una comunicación escrita que puede servir para solicitar, informar, comunicar, reclamar o agradecer.",
      },
      {
        title: "Antes de redactar",
        content:
          "Previo a redactar, es preciso tener en claro qué se desea transmitir, qué se quiere solicitar, qué información se dará a conocer y cuáles son los fundamentos.",
      },
      {
        title: "Persona gramatical",
        content:
          "En el ámbito público, por lo general, para redactar una nota se utiliza la primera persona del singular o plural: Me dirijo a Ud. / Nos dirigimos a Ud.",
      },
      {
        title: "Tipos de nota",
        content:
          "Puede utilizarse para solicitudes, informes, comunicaciones, reclamos o agradecimientos. La nota interna circula entre dependencias municipales; la externa se dirige a personas, organismos o instituciones ajenas al circuito interno.",
      },
      {
        title: "Estructura habitual",
        content:
          "Debe identificar lugar y fecha, destinatario, asunto o referencia, presentación del pedido, fundamento, cierre y firma. El destinatario y el asunto orientan la lectura; el pedido expresa la acción requerida y el fundamento explica su necesidad.",
      },
      {
        title: "Fórmulas iniciales",
        content: "Tengo el agrado de dirigirme a Ud. / Me dirijo a Ud.",
      },
      {
        title: "Finalidad",
        content:
          "A fin de / a efectos de / con el objeto de / con la finalidad de.",
      },
      {
        title: "Petición",
        content:
          "Quiera tener a bien / requerirle / peticionarle / tenga a bien.",
      },
      {
        title: "Acción solicitada",
        content:
          "Disponer / autorizar / aprobar / tomar los recaudos necesarios.",
      },
      {
        title: "Desarrollo",
        content:
          "En tal sentido / Motiva la presente / Lo requerido se fundamenta / Al respecto / A tal fin.",
      },
      {
        title: "Refuerzo",
        content:
          "Cabe señalar / Cabe destacar / Es dable hacer notar / Resulta oficioso recalcar.",
      },
      {
        title: "Cierre",
        content: "Por lo expuesto / Por otra parte / Para finalizar.",
      },
      {
        title: "Despedida",
        content:
          "Sin otro particular, saludo a Ud. atentamente / con distinguida consideración / con mi mayor respeto.",
      },
    ],
    keyPoints: [
      "La nota debe tener una finalidad clara.",
      "Debe identificar destinatario, asunto, fundamento y cierre.",
      "Debe ser formal y respetuosa.",
      "Puede iniciar un expediente administrativo.",
    ],
    rules: [
      "Usar lenguaje claro y formal.",
      "Evitar repeticiones.",
      "Fundamentar correctamente el pedido.",
      "Si existe expediente o asunto de referencia, mencionarlo al inicio.",
    ],
    examples: [
      "Ejemplo 1: Nota solicitando autorización para adquirir insumos necesarios para el funcionamiento de una oficina.",
      "Ejemplo 2: Nota solicitando licencia para rendir examen, indicando fechas, carrera, materia e institución educativa.",
    ],
  },
  {
    id: "pases",
    number: 3,
    title: "Pases",
    category: "Documentos",
    readTime: "8 min de lectura",
    level: "Básico",
    updatedAt: "23/06/2026",
    summary:
      "El pase es una diligencia breve y formal mediante la cual se remite un expediente a otra unidad administrativa. Funciona como el vehículo para que un expediente se mueva o pase a otra área o dependencia.",
    objective:
      "Comprender cuándo corresponde realizar un pase y cómo redactarlo de manera breve, formal y clara.",
    sections: [
      {
        title: "Definición",
        content:
          "El pase permite remitir actuaciones o expedientes a otra dependencia para conocimiento, intervención o prosecución del trámite.",
      },
      {
        title: "Referencia y antecedentes",
        content:
          "Debe citarse el expediente, folio o antecedente que permita vincular el pase con las actuaciones. Esa referencia evita que el giro quede aislado del trámite al que pertenece.",
      },
      {
        title: "Motivos del giro",
        content:
          "Para conocimiento significa poner las actuaciones en noticia del área; para intervención requiere una actuación o informe; para prosecución solicita continuar el circuito administrativo. El pase debe ser breve porque acompaña un expediente que ya contiene los antecedentes.",
      },
    ],
    keyPoints: [
      "El pase debe ser breve.",
      "Debe indicar expediente y asunto.",
      "Debe señalar claramente a qué área se remite.",
      "Debe expresar el motivo del giro.",
    ],
    rules: [
      "No extender innecesariamente el texto.",
      "Citar expediente y asunto.",
      "Utilizar fórmulas administrativas formales.",
      "Indicar si es para conocimiento, intervención o prosecución.",
    ],
    examples: [
      "Ejemplo 1: PASEN los presentes obrados a [DEPENDENCIA] para su conocimiento e intervención.",
      "Ejemplo 2: ATENTO a lo informado, gírese a [DEPENDENCIA] para la prosecución del trámite correspondiente.",
    ],
  },
  {
    id: "memorandum",
    number: 4,
    title: "Memorándum",
    category: "Comunicación interna",
    readTime: "8 min de lectura",
    level: "Básico",
    updatedAt: "23/06/2026",
    summary:
      "El memorándum es una comunicación escrita de uso interno que se cursa a un funcionario de igual o menor jerarquía, comunicando una situación especial o exponiendo elementos de juicio referentes a un asunto en trámite.",
    objective:
      "Identificar la función del memorándum y su uso dentro de la comunicación interna municipal.",
    sections: [
      {
        title: "Definición",
        content:
          "Es una comunicación interna que sirve como ayuda memoria o comunicación formal dentro de la Administración Pública.",
      },
      {
        title: "Uso",
        content:
          "Se utiliza para impartir instrucciones, notificar decisiones internas, recordar obligaciones o informar situaciones vinculadas con la organización del trabajo.",
      },
      {
        title: "Diferencia con la nota",
        content:
          "El memorándum es esencialmente interno, directo y operativo. La nota admite comunicaciones internas o externas y suele desarrollar con mayor amplitud un pedido y su fundamento.",
      },
      {
        title: "Estructura",
        content:
          "La identificación PARA / DE / ASUNTO permite reconocer rápidamente destinatario, emisor y tema. Luego se desarrolla la instrucción o comunicación con lenguaje claro y se incorpora fecha, numeración y firma según corresponda.",
      },
      {
        title: "Redacción",
        content:
          "La redacción de un memorándum puede hacerse en modo imperativo.",
      },
      {
        title: "Firma",
        content:
          "Son firmados por la máxima autoridad, secretario, subsecretario o director general, según corresponda.",
      },
    ],
    keyPoints: [
      "Es de uso interno.",
      "Se dirige de persona a persona o de autoridad a destinatario interno.",
      "Puede comunicar instrucciones o decisiones.",
      "Debe estar numerado por el organismo que lo emite.",
    ],
    rules: [
      "Mantener tono formal.",
      "Ser claro y directo.",
      "Identificar PARA, DE y asunto.",
      "Evitar extenderse innecesariamente.",
    ],
    examples: [
      "Ejemplo 1: Memorándum informando la suspensión de una licencia anual reglamentaria por razones de servicio.",
      "Ejemplo 2: Memorándum comunicando pautas internas de trabajo a una dependencia municipal.",
    ],
  },
  {
    id: "circulares",
    number: 5,
    title: "Circulares",
    category: "Comunicación interna",
    readTime: "8 min de lectura",
    level: "Básico",
    updatedAt: "23/06/2026",
    summary:
      "La circular es un documento administrativo confeccionado en varios ejemplares de un mismo tenor y dirigido a múltiples destinatarios. Comunica directivas, normas, avisos o información.",
    objective:
      "Aprender cuándo corresponde utilizar una circular y qué estructura debe respetar.",
    sections: [
      {
        title: "Definición",
        content:
          "La circular comunica una directiva, norma, aviso o información a varios destinatarios.",
      },
      {
        title: "Alcance",
        content:
          "Se emplea cuando una misma información debe llegar de forma uniforme a varias dependencias o destinatarios. A diferencia del memorándum, su alcance es colectivo y no individual.",
      },
      {
        title: "Redacción",
        content:
          "Se redacta de manera impersonal y con instrucciones inequívocas. Cuando contiene requisitos o pasos, conviene utilizar puntos o numeración para facilitar su aplicación.",
      },
      {
        title: "Numeración",
        content: "Se numera en el organismo que la emite.",
      },
    ],
    keyPoints: [
      "Está dirigida a múltiples destinatarios.",
      "Comunica pautas, avisos o instrucciones.",
      "Debe tener tema claro.",
      "Su cumplimiento puede ser obligatorio cuando así se indique.",
    ],
    rules: [
      "Redactar en forma impersonal.",
      "Identificar tema y motivo.",
      "Organizar instrucciones en puntos cuando corresponda.",
      "Mantener claridad y formalidad.",
    ],
    examples: [
      "Ejemplo 1: Circular informando requisitos para iniciar expedientes de renuncia por jubilación.",
      "Ejemplo 2: Circular comunicando un nuevo procedimiento interno obligatorio para las dependencias.",
    ],
  },
  {
    id: "redaccion-clara-precisa-concisa",
    number: 6,
    title: "Redacción clara, precisa y concisa",
    category: "Redacción",
    readTime: "10 min de lectura",
    level: "Básico",
    updatedAt: "23/06/2026",
    summary:
      "Redactar bien es expresarse con exactitud, concisión y claridad. En el ámbito público, los documentos deben permitir que quien los reciba comprenda claramente qué se informa o requiere.",
    objective:
      "Fortalecer la capacidad de redactar documentos administrativos claros, precisos, concisos y bien organizados.",
    sections: [
      {
        title: "Qué es redactar",
        content:
          "Redactar es expresar por escrito un pensamiento, idea o conocimiento.",
      },
      {
        title: "Claridad",
        content:
          "La claridad implica estructurar de forma sencilla y directa, usando palabras comunes y evitando tecnicismos innecesarios.",
      },
      {
        title: "Precisión",
        content:
          "La precisión exige transmitir la información de manera exacta, sin rodeos ni términos confusos.",
      },
      {
        title: "Concisión",
        content:
          "La concisión consiste en enfocarse en lo esencial, eliminando repeticiones o detalles irrelevantes.",
      },
      {
        title: "Organización",
        content:
          "Los textos deben organizarse en párrafos breves: una idea principal por párrafo y un orden reconocible entre pedido, antecedentes y fundamento. Las frases demasiado largas mezclan ideas y dificultan identificar la acción requerida.",
      },
      {
        title: "Revisión y simplificación",
        content:
          "Antes de finalizar, conviene eliminar repeticiones, rodeos y expresiones que no aportan información. Simplificar no significa perder formalidad, sino comunicar con menos esfuerzo y mayor exactitud.",
      },
    ],
    keyPoints: [
      "La claridad facilita la comprensión.",
      "La precisión evita confusiones.",
      "La concisión elimina información innecesaria.",
      "Los párrafos deben ser equilibrados.",
    ],
    rules: [
      "Evitar oraciones demasiado extensas.",
      "Evitar estilo telegráfico.",
      "Dividir ideas en párrafos.",
      "Revisar antes de enviar o imprimir.",
    ],
    examples: [
      "Ejemplo 1: En lugar de escribir “por medio de la presente vengo a solicitar si tuviera a bien considerar la posibilidad de”, puede escribirse “solicito tenga a bien autorizar”.",
      "Ejemplo 2: Dividir un texto extenso en dos párrafos ayuda a separar el pedido del fundamento.",
    ],
  },
  {
    id: "ortografia-administrativa",
    number: 7,
    title: "Ortografía administrativa",
    category: "Ortografía",
    readTime: "12 min de lectura",
    level: "Intermedio",
    updatedAt: "23/06/2026",
    summary:
      "La ortografía es el conjunto de reglas y convenciones que rigen la escritura correcta. En la documentación administrativa, la correcta escritura fortalece la claridad, formalidad e imagen institucional.",
    objective:
      "Reconocer reglas básicas de ortografía aplicadas a la redacción administrativa.",
    sections: [
      {
        title: "Uso de mayúsculas",
        content:
          "Se escriben con mayúscula los nombres propios, nombres de organismos y títulos cuando se refieren a una persona concreta sin citar su nombre propio.",
      },
      {
        title: "Uso de minúsculas",
        content:
          "Los días de la semana, meses y estaciones del año se escriben con minúscula.",
      },
      {
        title: "Tratamientos",
        content:
          "Los tratamientos como don, usted, señor, san y santo se escriben con minúscula, excepto cuando se abrevian.",
      },
      {
        title: "Nombres de personas",
        content:
          "Los nombres de las personas se escriben completos y en su orden natural. En listados o tablas puede escribirse primero el apellido en mayúscula para ordenar alfabéticamente.",
      },
      {
        title: "Acentos",
        content:
          "Las mayúsculas llevan tilde si corresponde según las reglas de acentuación.",
      },
      {
        title: "Cantidades",
        content:
          "Las cantidades se escriben primero con letras y luego entre paréntesis con números. En sumas monetarias se escribe primero la palabra Pesos y luego la cantidad.",
      },
      {
        title: "Comillas",
        content:
          "Las comillas sirven para diferenciar un texto que está inserto en otro, especialmente en citas textuales.",
      },
      {
        title: "Revisión final",
        content:
          "Antes de imprimir o enviar deben revisarse tildes, puntuación, fechas, cargos, organismos y nombres de dependencias. En documentos oficiales, un error ortográfico puede afectar la claridad y la imagen institucional.",
      },
    ],
    keyPoints: [
      "Las mayúsculas también llevan tilde.",
      "Los meses y días van en minúscula.",
      "Las cantidades deben expresarse con letras y números.",
      "Las comillas se escriben pegadas al texto que enmarcan.",
    ],
    rules: [
      "Revisar tildes antes de finalizar.",
      "No abusar de mayúsculas.",
      "Escribir correctamente nombres, cargos y organismos.",
      "Usar signos de puntuación para ordenar ideas.",
    ],
    examples: [
      "Ejemplo 1: Las mayúsculas también llevan tilde: ÁREA, DIRECCIÓN, ADMINISTRACIÓN.",
      "Ejemplo 2: La suma puede expresarse como Pesos cien mil ($100.000).",
    ],
  },
  {
    id: "abreviaturas-siglas-simbolos",
    number: 8,
    title: "Abreviaturas, siglas y símbolos",
    category: "Recursos",
    readTime: "8 min de lectura",
    level: "Básico",
    updatedAt: "23/06/2026",
    summary:
      "Las abreviaturas, siglas y símbolos tienen reglas diferentes. Usarlas correctamente evita errores frecuentes en documentos administrativos.",
    objective:
      "Distinguir abreviaturas, siglas y símbolos, aplicando sus reglas básicas de escritura.",
    sections: [
      {
        title: "Abreviaturas",
        content:
          "Siempre se escriben con punto final. Mantienen la tilde si la vocal acentuada se incluye. Generalmente añaden s o es para formar plural.",
      },
      {
        title: "Abreviaturas de una sola letra",
        content:
          "Si la abreviatura es de una sola letra, se duplica para indicar plural, por ejemplo pp. por páginas.",
      },
      {
        title: "Palabras compuestas",
        content:
          "En palabras compuestas también se duplican las letras iniciales, por ejemplo EE. UU. o DD. JJ.",
      },
      {
        title: "Mayúsculas en abreviaturas",
        content:
          "Se escriben con mayúscula inicial cuando corresponden a nombres propios, instituciones, lugares o tratamiento protocolar.",
      },
      {
        title: "Minúsculas",
        content:
          "Las abreviaturas de sustantivos comunes se escriben con minúscula, por ejemplo pág., av., f. o c.",
      },
      {
        title: "Siglas",
        content:
          "Las siglas toman la letra inicial de las palabras principales de una expresión. Se escriben sin puntos, sin acento, sin plural y en mayúsculas.",
      },
      {
        title: "Símbolos",
        content:
          "Los símbolos de unidades de medida, como kg, m o km, se escriben sin punto y sin plural. Confundirlos con abreviaturas genera formas incorrectas como “kgs.”.",
      },
      {
        title: "Errores frecuentes",
        content:
          "Las abreviaturas suelen llevar punto; las siglas se escriben en mayúsculas, sin puntos ni plural gráfico; y los símbolos mantienen una forma internacional invariable.",
      },
    ],
    keyPoints: [
      "Las abreviaturas llevan punto.",
      "Las siglas no llevan punto.",
      "Las siglas no se tildan ni se pluralizan.",
      "Los símbolos no llevan punto ni plural.",
    ],
    rules: [
      "Escribir Sr. con punto.",
      "Escribir Ref. con punto si se usa como abreviatura.",
      "Escribir ONU sin puntos.",
      "Escribir kg, mt y km sin punto.",
    ],
    examples: [
      "Ejemplo 1: “Sr.” lleva punto porque es abreviatura; “DNI” no lleva puntos porque es sigla.",
      "Ejemplo 2: “kg” no lleva punto ni plural, por lo tanto no corresponde escribir “kgs.”.",
    ],
  },
  {
    id: "conectores",
    number: 9,
    title: "Conectores",
    category: "Redacción",
    readTime: "7 min de lectura",
    level: "Básico",
    updatedAt: "23/06/2026",
    summary:
      "Los conectores son palabras o grupos de palabras que permiten establecer relaciones entre ideas, unir enunciados y facilitar la comprensión del texto.",
    objective:
      "Utilizar conectores adecuados para lograr coherencia y cohesión en documentos administrativos.",
    sections: [
      {
        title: "Definición",
        content:
          "Los conectores son estructuras del lenguaje que permiten establecer relaciones entre las ideas.",
      },
      {
        title: "Conectores de adición",
        content: "También, además, asimismo, de igual manera.",
      },
      {
        title: "Conectores de oposición",
        content: "Pero, al contrario, sin embargo, no obstante, aunque.",
      },
      {
        title: "Conectores causales",
        content:
          "Porque, por lo tanto, en consecuencia, toda vez que, entonces.",
      },
      {
        title: "Conectores de consecuencia",
        content:
          "Por lo tanto, en consecuencia, por consiguiente, a tal efecto, por eso.",
      },
      {
        title: "Otros conectores",
        content:
          "En tal sentido, por tal motivo, al respecto, a tal fin, cabe destacar, por lo expuesto, por último, al mismo tiempo, por otra parte, para finalizar, ya que, en primer lugar, es decir, por ende, dado que, dicho de otro modo.",
      },
      {
        title: "Uso en documentos administrativos",
        content:
          "En notas e informes, los conectores relacionan antecedentes, fundamentos y conclusiones. En pases ayudan a vincular lo informado con la acción posterior. Deben elegirse según la relación lógica y variarse para evitar repeticiones.",
      },
    ],
    keyPoints: [
      "Los conectores ordenan ideas.",
      "Mejoran la comprensión del documento.",
      "Evitan saltos bruscos entre párrafos.",
      "Ayudan a fundamentar pedidos o decisiones.",
    ],
    rules: [
      "Elegir el conector según la relación entre ideas.",
      "No repetir siempre el mismo conector.",
      "Usar conectores formales en documentos administrativos.",
      "Revisar que el conector no cambie el sentido del texto.",
    ],
    examples: [
      "Ejemplo 1: “Por lo expuesto, solicito tenga a bien autorizar lo requerido.”",
      "Ejemplo 2: “Asimismo, se informa que la documentación respaldatoria se encuentra adjunta.”",
    ],
  },
  {
    id: "evaluacion-taller",
    number: 10,
    title: "Evaluación del taller",
    category: "Recursos",
    readTime: "8 min de lectura",
    level: "Básico",
    updatedAt: "23/06/2026",
    summary:
      "La evaluación permite comprobar si los contenidos de redacción y gestión documental pueden aplicarse correctamente a situaciones administrativas reales.",
    objective:
      "Reconocer distintas formas de evaluación y utilizar la teoría del manual para resolver consignas prácticas.",
    sections: [
      {
        title: "Finalidad de la evaluación",
        content:
          "Evaluar permite identificar aprendizajes consolidados y aspectos que requieren revisión. El propósito no es memorizar fórmulas, sino comprender cuándo corresponde cada documento y cómo redactarlo.",
      },
      {
        title: "Tipos de consignas",
        content:
          "Pueden utilizarse preguntas de verdadero o falso, opción múltiple, completar expresiones y ejercicios de producción práctica. Cada formato permite revisar conocimientos diferentes.",
      },
      {
        title: "Aplicación práctica",
        content:
          "Las consignas de producción acercan la teoría al trabajo cotidiano: redactar un pase, corregir una nota o seleccionar una fórmula adecuada permite demostrar comprensión y criterio administrativo.",
      },
    ],
    keyPoints: [
      "La evaluación orienta la mejora del aprendizaje.",
      "Debe combinar conceptos y aplicación práctica.",
      "Las consignas deben ser claras y vinculadas con tareas reales.",
      "La revisión de errores también forma parte del aprendizaje.",
    ],
    rules: [
      "Leer la consigna completa antes de responder.",
      "Aplicar las reglas del tipo documental solicitado.",
      "No inventar datos que no fueron proporcionados.",
      "Revisar claridad, ortografía y formalidad.",
    ],
    examples: [
      "Ejemplo 1: Identificar si una sigla está correctamente escrita.",
      "Ejemplo 2: Redactar un pase breve remitiendo un expediente a otra dependencia.",
    ],
  },
];

export const featureCards = [
  {
    number: 1,
    title: "Biblioteca / Manual",
    description:
      "Accedé al manual de práctica administrativa municipal y normativa de aplicación.",
    action: "Explorar biblioteca",
    icon: "book" as IconName,
    color: "blue",
    badge: "Actualizado",
  },
  {
    number: 2,
    title: "Modelos de Notas, Pases, Memorándum y Circulares",
    description: "Explorá y descargá modelos listos para usar.",
    action: "Ver modelos",
    icon: "files" as IconName,
    color: "sky",
    badge: "Nuevo",
  },
  {
    number: 3,
    title: "Generador IA / Borrador administrativo",
    description:
      "Creá borradores administrativos con ayuda de inteligencia artificial.",
    action: "Abrir generador",
    icon: "sparkles" as IconName,
    color: "purple",
    badge: "Nuevo",
  },
  {
    number: 4,
    title: "Descargas Word / PDF",
    description:
      "Descargá recursos, guías rápidas y plantillas en formato Word o PDF.",
    action: "Ver descargas",
    icon: "download" as IconName,
    color: "blue",
    badge: "Actualizado",
  },
  {
    number: 5,
    title: "Ayuda y recomendaciones",
    description:
      "Consultá respuestas, buenas prácticas y canales de asistencia.",
    action: "Ir a Ayuda",
    icon: "help" as IconName,
    color: "teal",
  },
  {
    number: 6,
    title: "Borradores generados",
    description:
      "Retomá los documentos administrativos creados recientemente.",
    action: "Ver documentos recientes",
    icon: "history" as IconName,
    color: "orange",
  },
];

export const recentActivity = [
  {
    icon: "files" as IconName,
    title: 'Descargaste el modelo “Nota Interna”',
    date: "Hoy, 10:15",
    label: "Modelo",
    tone: "green" as const,
  },
  {
    icon: "sparkles" as IconName,
    title: "Generaste un documento con IA",
    date: "Ayer, 16:42",
    label: "IA",
    tone: "purple" as const,
  },
  {
    icon: "files" as IconName,
    title: "Consultaste un modelo de pase",
    date: "21/06/2026",
    label: "Modelo",
    tone: "green" as const,
  },
  {
    icon: "sparkles" as IconName,
    title: "Creaste un borrador administrativo",
    date: "20/06/2026",
    label: "IA",
    tone: "purple" as const,
  },
];

export const quickLinks = [
  {
    icon: "files" as IconName,
    title: "Redactar nueva nota",
    subtitle: "Usá el generador IA",
  },
  {
    icon: "book" as IconName,
    title: "Buscar modelos",
    subtitle: "Explorar todos los modelos",
  },
  {
    icon: "book" as IconName,
    title: "Ver manual completo",
    subtitle: "Abrir biblioteca",
  },
  {
    icon: "download" as IconName,
    title: "Mis descargas",
    subtitle: "Ver archivos descargados",
  },
];
