export type SectionId =
  | "inicio"
  | "biblioteca"
  | "modelos"
  | "generador"
  | "ayuda";

export const sectionLabels: Record<SectionId, string> = {
  inicio: "Inicio",
  biblioteca: "Biblioteca",
  modelos: "Modelos",
  generador: "Generador IA",
  ayuda: "Ayuda",
};
