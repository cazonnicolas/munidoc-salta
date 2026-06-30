"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AdminAccessModal } from "@/components/modals/AdminAccessModal";
import { ActivityPanelSection } from "@/components/sections/ActivityPanelSection";
import { AyudaSection } from "@/components/sections/AyudaSection";
import { BibliotecaSection } from "@/components/sections/BibliotecaSection";
import { GeneradorIASection } from "@/components/sections/GeneradorIASection";
import { HomeSection } from "@/components/sections/HomeSection";
import { ModelosSection } from "@/components/sections/ModelosSection";
import { trackActivity } from "@/lib/activityClient";
import { sectionLabels, type SectionId } from "@/lib/navigation";

export function MuniDocApp() {
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");
  const [selectedModelId, setSelectedModelId] = useState<string>();
  const [showAdminAccessModal, setShowAdminAccessModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [aboutFocusToken, setAboutFocusToken] = useState(0);

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const response = await fetch("/api/admin/activity", {
          cache: "no-store",
        });
        setIsAdminAuthenticated(response.ok);
      } catch {
        setIsAdminAuthenticated(false);
      }
    };

    void checkExistingSession();
  }, []);

  useEffect(() => {
    trackActivity({
      eventType: "section_view",
      section: sectionLabels[activeSection],
      detail: "Ingreso a sección",
    });
  }, [activeSection]);

  const handleSectionChange = (section: SectionId) => {
    if (section === "generador") {
      setSelectedModelId(undefined);
    }
    setActiveSection(section);
  };

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setActiveSection("actividad");
      return;
    }

    setShowAdminAccessModal(true);
  };

  const handleUseModel = (modelId: string) => {
    setSelectedModelId(modelId);
    setActiveSection("generador");
  };

  const handleCreateNote = () => {
    setSelectedModelId(undefined);
    setActiveSection("generador");
  };

  const handleShowAbout = () => {
    setAboutFocusToken((current) => current + 1);
    setActiveSection("ayuda");
  };

  return (
    <>
      <AppShell
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onAdminClick={handleAdminClick}
      >
        {activeSection === "inicio" && (
          <HomeSection
            onNavigate={handleSectionChange}
            onCreateNote={handleCreateNote}
            onShowAbout={handleShowAbout}
          />
        )}
        {activeSection === "biblioteca" && <BibliotecaSection />}
        {activeSection === "modelos" && (
          <ModelosSection
            onNavigate={handleSectionChange}
            onUseModel={handleUseModel}
          />
        )}
        {activeSection === "generador" && (
          <GeneradorIASection selectedModelId={selectedModelId} />
        )}
        {activeSection === "ayuda" && (
          <AyudaSection
            onNavigate={handleSectionChange}
            aboutFocusToken={aboutFocusToken}
          />
        )}
        {activeSection === "actividad" && (
          <ActivityPanelSection
            onLoggedOut={() => {
              setIsAdminAuthenticated(false);
              setActiveSection("inicio");
            }}
          />
        )}
      </AppShell>
      <AdminAccessModal
        isOpen={showAdminAccessModal}
        onClose={() => setShowAdminAccessModal(false)}
        onSuccess={() => {
          setIsAdminAuthenticated(true);
          setShowAdminAccessModal(false);
          setActiveSection("actividad");
        }}
      />
    </>
  );
}
