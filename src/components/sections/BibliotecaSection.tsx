"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CircleCheck,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Lightbulb,
  RotateCcw,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { trackActivity } from "@/lib/activityClient";
import { libraryChapters, type LibraryChapter } from "@/lib/data";

const categories = [
  "Todos",
  "Redacción",
  "Documentos",
  "Comunicación interna",
  "Ortografía",
  "Recursos",
];

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function filterChapters(category: string, level: string, search: string) {
  const normalizedSearch = normalizeText(search.trim());

  return libraryChapters.filter((chapter) => {
    const matchesCategory =
      category === "Todos" || chapter.category === category;
    const matchesLevel = level === "Todos" || chapter.level === level;
    const searchableText = normalizeText(
      `${chapter.title} ${chapter.summary} ${chapter.category}`,
    );

    return (
      matchesCategory &&
      matchesLevel &&
      (!normalizedSearch || searchableText.includes(normalizedSearch))
    );
  });
}

export function BibliotecaSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedLevel, setSelectedLevel] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadMessage, setDownloadMessage] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState(
    libraryChapters[0]?.id ?? "",
  );

  const filteredChapters = filterChapters(
    selectedCategory,
    selectedLevel,
    searchTerm,
  );
  const chapter =
    filteredChapters.find((item) => item.id === selectedChapterId) ??
    filteredChapters[0];
  const selectedIndex = chapter
    ? filteredChapters.findIndex((item) => item.id === chapter.id)
    : -1;
  const progress =
    selectedIndex >= 0
      ? ((selectedIndex + 1) / filteredChapters.length) * 100
      : 0;

  const updateFilters = ({
    category = selectedCategory,
    level = selectedLevel,
    search = searchTerm,
  }: {
    category?: string;
    level?: string;
    search?: string;
  }) => {
    const nextChapters = filterChapters(category, level, search);
    setSelectedChapterId(nextChapters[0]?.id ?? "");
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters({ category });
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    updateFilters({ level });
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    updateFilters({ search });
  };

  const clearFilters = () => {
    setSelectedCategory("Todos");
    setSelectedLevel("Todos");
    setSearchTerm("");
    setSelectedChapterId(libraryChapters[0]?.id ?? "");
  };

  const navigateChapter = (direction: -1 | 1) => {
    const nextChapter = filteredChapters[selectedIndex + direction];
    if (nextChapter) {
      setSelectedChapterId(nextChapter.id);
      trackActivity({
        eventType: "manual_chapter_view",
        section: "Biblioteca",
        detail: nextChapter.title,
      });
    }
  };

  const selectChapter = (nextChapter: LibraryChapter) => {
    setSelectedChapterId(nextChapter.id);
    trackActivity({
      eventType: "manual_chapter_view",
      section: "Biblioteca",
      detail: nextChapter.title,
    });
  };

  const handleManualDownload = (format: "PDF" | "Word") => {
    trackActivity({
      eventType: format === "PDF" ? "manual_download_pdf" : "manual_download_word",
      section: "Biblioteca",
      detail: `Manual completo ${format}`,
    });
    setDownloadMessage(
      format === "PDF"
        ? "Próximamente se habilitará la descarga del manual completo en PDF."
        : "Próximamente se habilitará la descarga del manual completo en Word.",
    );
  };

  return (
    <section className="section-stage space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-2xl border border-[#c9e0f7] bg-gradient-to-br from-white to-[#e7f2ff] text-[#0864c9] shadow-[0_7px_18px_rgba(26,88,158,0.08)]">
            <BookOpen size={24} strokeWidth={1.8} />
          </span>
          <div>
            <h2 className="text-[24px] font-bold tracking-[-0.025em] text-[#10264c]">
              Biblioteca
            </h2>
            <p className="mt-1 text-sm text-[#637594]">
              Manual de práctica administrativa y normativa de aplicación.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            className="h-10 gap-2"
            onClick={() => handleManualDownload("PDF")}
          >
            <Download size={15} />
            Descargar manual completo PDF
          </Button>
          <Button
            className="h-10 gap-2"
            onClick={() => handleManualDownload("Word")}
          >
            <FileText size={15} />
            Descargar manual completo Word
          </Button>
        </div>
      </div>

      {downloadMessage && (
        <div
          role="status"
          className="flex items-center justify-between gap-4 rounded-2xl border border-[#bcd8f5] bg-[#edf6ff] px-5 py-3 text-sm text-[#365779] shadow-[0_7px_20px_rgba(31,88,151,0.04)]"
        >
          <span>{downloadMessage}</span>
          <button
            type="button"
            onClick={() => setDownloadMessage("")}
            className="shrink-0 text-xs font-semibold text-[#075cc5]"
          >
            Cerrar
          </button>
        </div>
      )}

      <Card className="decorated-panel border-[#cbddeb] bg-white/90 p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_230px_180px_auto]">
          <label className="flex h-11 items-center gap-3 rounded-xl border border-[#c8d8e8] bg-[#fbfdff] px-4 text-[#6b7e9c] shadow-[inset_0_1px_2px_rgba(31,68,111,0.025)] focus-within:border-[#82b2e4]">
            <Search size={18} />
            <input
              value={searchTerm}
              onChange={(event) => handleSearchChange(event.target.value)}
              aria-label="Buscar en la biblioteca"
              placeholder="Buscar en la biblioteca..."
              className="min-w-0 flex-1 bg-transparent text-sm text-[#1c365c] outline-none placeholder:text-[#72829b]"
            />
          </label>
          <select
            value={selectedCategory}
            onChange={(event) => handleCategoryChange(event.target.value)}
            aria-label="Filtrar por categoría"
            className="h-11 rounded-xl border border-[#c8d8e8] bg-[#fbfdff] px-4 text-xs font-medium text-[#455d7d] outline-none focus:border-[#82b2e4]"
          >
            <option value="Todos">Todas las categorías</option>
            {categories.slice(1).map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedLevel}
            onChange={(event) => handleLevelChange(event.target.value)}
            aria-label="Filtrar por nivel"
            className="h-11 rounded-xl border border-[#c8d8e8] bg-[#fbfdff] px-4 text-xs font-medium text-[#455d7d] outline-none focus:border-[#82b2e4]"
          >
            <option value="Todos">Nivel: Todos</option>
            <option value="Básico">Nivel: Básico</option>
            <option value="Intermedio">Nivel: Intermedio</option>
          </select>
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex h-11 items-center justify-center gap-2 px-2 text-xs font-semibold text-[#617694] hover:text-[#075cc5]"
          >
            <RotateCcw size={15} />
            Limpiar filtros
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-[#e5ebf3] pt-4">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full border px-3.5 py-2 text-[11px] font-semibold transition-all ${
                category === selectedCategory
                  ? "border-[#0863c8] bg-gradient-to-b from-[#1476d5] to-[#0758b8] text-white shadow-[0_5px_12px_rgba(8,91,190,0.16)]"
                  : "border-[#d3dfed] bg-white text-[#506784] shadow-sm hover:-translate-y-0.5 hover:border-[#8eb5e3] hover:text-[#075cc5]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid items-start gap-5 xl:grid-cols-[310px_minmax(0,1fr)]">
        <Card className="overflow-hidden border-[#cadbea] xl:sticky xl:top-[115px]">
          <div className="relative overflow-hidden border-b border-[#dce7f1] bg-[linear-gradient(135deg,#edf6ff,#f9fcff)] px-5 py-5">
            <div className="absolute -right-7 -top-8 size-24 rounded-full border border-[#80b5e7]/15" />
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-[#0864c9]" />
              <h3 className="relative text-sm font-bold text-[#173055]">
                Índice del manual
              </h3>
            </div>
            <p className="mt-1 text-[10px] text-[#7586a0]">
              {filteredChapters.length} capítulos encontrados
            </p>
          </div>

          <nav className="max-h-[690px] overflow-y-auto bg-white/80 p-2.5">
            {filteredChapters.length ? (
              filteredChapters.map((item) => (
                <ChapterButton
                  key={item.id}
                  chapter={item}
                  selected={item.id === chapter?.id}
                  onClick={() => selectChapter(item)}
                />
              ))
            ) : (
              <p className="px-4 py-8 text-center text-sm leading-6 text-[#667b98]">
                No hay contenidos disponibles para esta categoría.
              </p>
            )}
          </nav>
        </Card>

        {chapter ? (
          <Card className="editorial-panel overflow-hidden border-[#cbddea]">
            <article>
              <header className="decorated-panel border-b border-[#dfe7f0] bg-[linear-gradient(120deg,#f0f7ff,#ffffff_68%)] px-6 py-7 lg:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0870d6]">
                      Capítulo {chapter.number}
                    </p>
                    <h3 className="mt-2 max-w-[760px] text-2xl font-bold leading-8 text-[#10264c]">
                      {chapter.number}. {chapter.title}
                    </h3>
                  </div>
                  <Badge tone="green" className="w-fit">
                    Actualizado
                  </Badge>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#5c7190]">
                  <Badge tone="blue">{chapter.category}</Badge>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={15} className="text-[#0870d6]" />
                    {chapter.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CircleCheck size={15} className="text-[#0870d6]" />
                    Nivel: {chapter.level}
                  </span>
                  <span>Actualizado: {chapter.updatedAt}</span>
                </div>
              </header>

              <div className="grid gap-8 p-6 lg:p-8 2xl:grid-cols-[minmax(0,1fr)_280px]">
                <div>
                  <p className="text-lg leading-8 text-[#354d6e]">
                    {chapter.summary}
                  </p>

                  <div className="mt-7 rounded-2xl border border-[#a9cdf4] bg-[linear-gradient(135deg,#edf6ff,#f8fbff)] p-5 shadow-[0_8px_22px_rgba(31,88,151,0.045)]">
                    <div className="flex gap-3">
                      <Lightbulb
                        className="mt-1 shrink-0 text-[#0870d6]"
                        size={23}
                      />
                      <p className="text-base leading-7 text-[#27486e]">
                        <strong className="text-[#0b5eb9]">Objetivo:</strong>{" "}
                        {chapter.objective}
                      </p>
                    </div>
                  </div>

                  <section className="mt-8">
                    <h4 className="text-xl font-bold text-[#173055]">
                      Contenido del capítulo
                    </h4>
                    <div className="mt-4 space-y-4">
                      {chapter.sections.map((section, index) => (
                        <div
                          key={`${chapter.id}-${section.title}`}
                          className="rounded-2xl border border-[#dbe5ef] bg-white/88 p-5 shadow-[0_6px_20px_rgba(31,68,111,0.035)]"
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e8f3ff] text-xs font-bold text-[#0863c8]">
                              {index + 1}
                            </span>
                            <div>
                              <h5 className="text-base font-bold text-[#173055]">
                                {section.title}
                              </h5>
                              <p className="mt-2 whitespace-pre-line text-base leading-7 text-[#526987]">
                                {section.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mt-8">
                    <h4 className="text-xl font-bold text-[#173055]">
                      Puntos clave
                    </h4>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {chapter.keyPoints.map((point) => (
                        <div
                          key={point}
                          className="flex gap-3 rounded-xl border border-[#d8e3ef] bg-white/90 p-4 shadow-[0_5px_16px_rgba(31,68,111,0.03)]"
                        >
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e6f6ec] text-[#179050]">
                            <Check size={15} strokeWidth={2.4} />
                          </span>
                          <p className="text-base leading-7 text-[#526987]">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mt-8">
                    <div className="rounded-2xl border border-[#b9d7f3] bg-[linear-gradient(135deg,#edf6ff,#fbfdff)] p-5 shadow-[0_8px_22px_rgba(31,88,151,0.045)]">
                      <h4 className="flex items-center gap-2 text-xl font-bold text-[#173055]">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-white text-[#0870d6] shadow-sm">
                          <FileCheck2 size={19} />
                        </span>
                        Ejemplos
                      </h4>
                      <div className="mt-4 space-y-3">
                        {chapter.examples.map((example) => (
                          <div
                            key={example}
                            className="flex gap-3 rounded-xl border border-white/90 bg-white/80 p-4"
                          >
                            <Check
                              size={17}
                              className="mt-1 shrink-0 text-[#16884c]"
                            />
                            <p className="text-base leading-7 text-[#425a79]">
                              {example}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>

                <aside>
                  <div className="rounded-2xl border border-[#c6d9ed] bg-[linear-gradient(145deg,#f2f8ff,#fbfdff)] p-5 shadow-[0_8px_22px_rgba(31,88,151,0.04)]">
                    <h4 className="flex items-center gap-2 text-lg font-bold text-[#173055]">
                      <CircleCheck size={20} className="text-[#0870d6]" />
                      Reglas básicas
                    </h4>
                    <ul className="mt-4 space-y-4">
                      {chapter.rules.map((rule) => (
                        <li
                          key={rule}
                          className="flex gap-2 text-base leading-6 text-[#425a79]"
                        >
                          <Check
                            size={16}
                            className="mt-1 shrink-0 text-[#16884c]"
                            strokeWidth={2.3}
                          />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#dbe5ef] bg-white/90 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#72839c]">
                      Progreso del resultado
                    </p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e5edf6]">
                      <div
                        className="h-full rounded-full bg-[#0870d6] transition-[width]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-[#617694]">
                      {selectedIndex + 1} de {filteredChapters.length}
                    </p>
                  </div>
                </aside>
              </div>

              <footer className="flex flex-col gap-3 border-t border-[#dfe7f0] bg-[#fbfdff] px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
                <Button
                  className="gap-2"
                  disabled={selectedIndex <= 0}
                  onClick={() => navigateChapter(-1)}
                >
                  <ArrowLeft size={15} />
                  Anterior
                </Button>
                <span className="text-center text-sm text-[#74849d]">
                  {selectedIndex + 1} de {filteredChapters.length} capítulos
                </span>
                <Button
                  variant="primary"
                  className="gap-2"
                  disabled={selectedIndex === filteredChapters.length - 1}
                  onClick={() => navigateChapter(1)}
                >
                  Siguiente
                  <ArrowRight size={15} />
                </Button>
              </footer>
            </article>
          </Card>
        ) : (
          <Card className="flex min-h-[420px] items-center justify-center p-8 text-center">
            <div>
              <Search className="mx-auto text-[#8aa8c9]" size={36} />
              <h3 className="mt-4 text-lg font-bold text-[#173055]">
                Sin resultados
              </h3>
              <p className="mt-2 text-sm text-[#667b98]">
                No hay contenidos disponibles para esta categoría.
              </p>
              <Button className="mt-5" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}

function ChapterButton({
  chapter,
  selected,
  onClick,
}: {
  chapter: LibraryChapter;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-current={selected ? "page" : undefined}
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-all ${
        selected
          ? "bg-[linear-gradient(135deg,#e4f1ff,#f1f7ff)] text-[#075cc5] shadow-[inset_3px_0_0_#0870d6,0_4px_12px_rgba(31,88,151,0.04)]"
          : "text-[#3f5778] hover:bg-[#f4f8fc] hover:translate-x-0.5"
      }`}
    >
      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
          selected
            ? "bg-[#0863c8] text-white"
            : "bg-[#edf2f8] text-[#526987]"
        }`}
      >
        {chapter.number}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold leading-4">
          {chapter.title}
        </span>
        <span className="mt-1 block text-[9px] text-[#788aa3]">
          {chapter.readTime}
        </span>
      </span>
    </button>
  );
}
