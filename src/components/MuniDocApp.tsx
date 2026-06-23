"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AyudaSection } from "@/components/sections/AyudaSection";
import { BibliotecaSection } from "@/components/sections/BibliotecaSection";
import { GeneradorIASection } from "@/components/sections/GeneradorIASection";
import { HomeSection } from "@/components/sections/HomeSection";
import { ModelosSection } from "@/components/sections/ModelosSection";
import { documentModels } from "@/lib/documentModels";
import type { SectionId } from "@/lib/navigation";

export function MuniDocApp() {
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");
  const [selectedModelId, setSelectedModelId] = useState<string>();

  const handleUseModel = (modelId: string) => {
    setSelectedModelId(modelId);
    setActiveSection("generador");
  };

  const handleCreateNote = () => {
    const firstNote = documentModels.find((model) => model.type === "Nota");
    setSelectedModelId(firstNote?.id);
    setActiveSection("generador");
  };

  return (
    <AppShell
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {activeSection === "inicio" && (
        <HomeSection
          onNavigate={setActiveSection}
          onCreateNote={handleCreateNote}
        />
      )}
      {activeSection === "biblioteca" && <BibliotecaSection />}
      {activeSection === "modelos" && (
        <ModelosSection
          onNavigate={setActiveSection}
          onUseModel={handleUseModel}
        />
      )}
      {activeSection === "generador" && (
        <GeneradorIASection selectedModelId={selectedModelId} />
      )}
      {activeSection === "ayuda" && (
        <AyudaSection onNavigate={setActiveSection} />
      )}
    </AppShell>
  );
}
