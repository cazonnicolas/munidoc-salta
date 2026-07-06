import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import {
  formatOfficialDate,
  OFFICIAL_DOCUMENT_TEMPLATE,
  sanitizeGeneratedDocumentText,
} from "@/lib/officialDocumentTemplate";

export type AdministrativeWordExportOptions = {
  documentTitle: string;
  documentType: string;
  template: string;
  fileName: string;
  placeAndDate?: string;
  logoUrl?: string;
};

export const cmToTwip = (cm: number) => Math.round(cm * 567);

const FONT_FAMILY = "Arial Narrow";
const FONT_SIZE = 24;
export const BORRADOR_WORD_FILE_NAME = "BORRADOR-MuniDoc.docx";

export async function exportAdministrativeDocumentToWord({
  documentTitle,
  documentType,
  template,
  fileName,
  placeAndDate,
  logoUrl = OFFICIAL_DOCUMENT_TEMPLATE.logoPath,
}: AdministrativeWordExportOptions) {
  const [escudo, logo] = await Promise.all([
    loadImage(OFFICIAL_DOCUMENT_TEMPLATE.escudoPath),
    loadImage(logoUrl),
  ]);
  const officialDate = formatOfficialDate(placeAndDate);
  const cleanTemplate = sanitizeGeneratedDocumentText(template);
  const document = new Document({
    creator: "MuniDoc Salta",
    title: documentTitle,
    subject: documentType,
    description: "Documento administrativo municipal",
    sections: [
      {
        properties: {
          page: {
            size: {
              width: cmToTwip(21),
              height: cmToTwip(29.7),
            },
            margin: {
              top: cmToTwip(5),
              bottom: cmToTwip(2),
              left: cmToTwip(4),
              right: cmToTwip(2),
              header: cmToTwip(1),
              footer: cmToTwip(1),
            },
          },
        },
        headers: {
          default: createHeader({ escudo, logo }),
        },
        footers: {
          default: createFooter(),
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 260, after: 320 },
            children: [
              new TextRun({
                text: officialDate,
                bold: true,
                font: FONT_FAMILY,
                size: FONT_SIZE,
                color: "000000",
              }),
            ],
          }),
          ...createTemplateParagraphs(cleanTemplate),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(document);
  saveAs(blob, ensureDocxExtension(fileName));
}

function createHeader({
  escudo,
  logo,
}: {
  escudo?: ArrayBuffer;
  logo?: ArrayBuffer;
}) {
  const emptyBorders = {
    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  };

  return new Header({
    children: [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: emptyBorders,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 13, type: WidthType.PERCENTAGE },
                borders: emptyBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 0 },
                    children: [
                      ...(escudo
                        ? [
                            new ImageRun({
                              type: "jpg",
                              data: escudo,
                              transformation: {
                                width: 62,
                                height: 78,
                              },
                              altText: {
                                title: "Departamento Ejecutivo",
                                description:
                                  "Escudo institucional del Departamento Ejecutivo",
                                name: "Escudo Departamento Ejecutivo",
                              },
                            }),
                          ]
                        : []),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 31, type: WidthType.PERCENTAGE },
                borders: emptyBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 10 },
                    children: [
                      new TextRun({
                        text: OFFICIAL_DOCUMENT_TEMPLATE.municipalityTitle,
                        bold: true,
                        font: FONT_FAMILY,
                        size: 17,
                        color: "2E4057",
                      }),
                    ],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 0 },
                    children: [
                      new TextRun({
                        text: OFFICIAL_DOCUMENT_TEMPLATE.executiveTitle,
                        bold: true,
                        font: FONT_FAMILY,
                        size: 17,
                        color: "2E4057",
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 56, type: WidthType.PERCENTAGE },
                borders: emptyBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { after: 35 },
                    children: [
                      new TextRun({
                        text: OFFICIAL_DOCUMENT_TEMPLATE.motto,
                        italics: true,
                        font: FONT_FAMILY,
                        size: 14,
                        color: "7C8794",
                      }),
                    ],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      ...(logo
                        ? [
                            new ImageRun({
                              type: "png",
                              data: logo,
                              transformation: {
                                width: 142,
                                height: 60,
                              },
                              altText: {
                                title: "Salta Municipalidad",
                                description:
                                  "Logo institucional de la Municipalidad de Salta",
                                name: "Logo Salta Municipalidad",
                              },
                            }),
                          ]
                        : [
                            new TextRun({
                              text: OFFICIAL_DOCUMENT_TEMPLATE.municipalityTitle,
                              bold: true,
                              font: FONT_FAMILY,
                              size: 17,
                              color: "2E4057",
                            }),
                          ]),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createFooter() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [
          new TextRun({
            text: OFFICIAL_DOCUMENT_TEMPLATE.footerText,
            font: FONT_FAMILY,
            size: 17,
            color: "7A7A7A",
          }),
        ],
      }),
    ],
  });
}

function createTemplateParagraphs(template: string) {
  return template.replace(/\r\n/g, "\n").split("\n").map(createTemplateParagraph);
}

function createTemplateParagraph(line: string) {
  const text = line.trimEnd();
  const isBlank = text.trim().length === 0;
  const isHeading =
    !isBlank &&
    (text === text.toUpperCase() ||
      /^(Ref\.|Asunto:|PARA:|DE:|OBJETO\/ASUNTO:|TEMA:)/i.test(text));
  const shouldJustify =
    text.length > 80 &&
    !text.startsWith("[") &&
    !/^(SALTA|Sr\.\/Sra\.|Señor\/a|A quien corresponda:)/i.test(text);

  return new Paragraph({
    alignment: shouldJustify ? AlignmentType.JUSTIFIED : AlignmentType.LEFT,
    spacing: {
      after: isBlank ? 100 : 80,
      line: 360,
    },
    children: [
      new TextRun({
        text: isBlank ? "" : text,
        bold: isHeading,
        font: FONT_FAMILY,
        size: FONT_SIZE,
      }),
    ],
  });
}

async function loadImage(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return undefined;
    return await response.arrayBuffer();
  } catch (error) {
    console.warn("No se pudo cargar una imagen para el documento Word.", error);
    return undefined;
  }
}

function ensureDocxExtension(fileName: string) {
  return fileName.toLowerCase().endsWith(".docx")
    ? fileName
    : `${fileName}.docx`;
}
