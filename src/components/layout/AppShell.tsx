import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import type { SectionId } from "@/lib/navigation";

export function AppShell({
  activeSection,
  onSectionChange,
  children,
}: {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell min-h-screen bg-[#f7faff]/55">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />
      <div className="lg:pl-[240px]">
        <Topbar />
        <main className="app-main mx-auto max-w-[1440px] px-4 pb-10 pt-5 sm:px-6 lg:px-7">
          {children}
        </main>
      </div>
    </div>
  );
}
