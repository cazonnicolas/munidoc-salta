import {
  AlignmentType,
  Document,
  Footer,
  Header,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

export type AdministrativeWordExportOptions = {
  documentTitle: string;
  documentType: string;
  template: string;
  fileName: string;
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
  logoUrl = "/logo-salta.png",
}: AdministrativeWordExportOptions) {
  const logo = await loadLogo(logoUrl);
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
          default: createHeader(logo),
        },
        footers: {
          default: createFooter(),
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: `${documentType.toUpperCase()} · ${documentTitle}`,
                bold: true,
                font: FONT_FAMILY,
                size: FONT_SIZE,
                color: "000000",
              }),
            ],
          }),
          ...createTemplateParagraphs(template),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(document);
  saveAs(blob, ensureDocxExtension(fileName));
}

function createHeader(logo?: ArrayBuffer) {
  const children: Paragraph[] = [];

  if (logo) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 0 },
        children: [
          new ImageRun({
            type: "png",
            data: logo,
            transformation: {
              width: 145,
              height: 62,
            },
            altText: {
              title: "Municipalidad de Salta",
              description: "Logo institucional de la Municipalidad de Salta",
              name: "Logo Municipalidad de Salta",
            },
          }),
        ],
      }),
    );
  }

  return new Header({ children });
}

function createFooter() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [
          new TextRun({
            text: "Municipalidad de Salta",
            bold: true,
            font: FONT_FAMILY,
            size: 17,
            color: "7890A9",
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: "Documento generado desde MuniDoc Salta",
            font: FONT_FAMILY,
            size: 16,
            color: "8A9DB1",
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

async function loadLogo(logoUrl: string) {
  try {
    const response = await fetch(logoUrl);
    if (!response.ok) return undefined;
    return await response.arrayBuffer();
  } catch (error) {
    console.warn("No se pudo cargar el logo para el documento Word.", error);
    return undefined;
  }
}

function ensureDocxExtension(fileName: string) {
  return fileName.toLowerCase().endsWith(".docx")
    ? fileName
    : `${fileName}.docx`;
}
