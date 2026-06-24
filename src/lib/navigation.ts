export type SectionId =
  | "inicio"
  | "biblioteca"
  | "modelos"
  | "generador"
  | "ayuda"
  | "actividad";

export const sectionLabels: Record<SectionId, string> = {
  inicio: "Inicio",
  biblioteca: "Biblioteca",
  modelos: "Modelos",
  generador: "Generador IA",
  ayuda: "Ayuda",
  actividad: "Panel de actividad",
};
