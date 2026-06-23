export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#dce6f0] bg-[#f7faff]/88 shadow-[0_1px_10px_rgba(35,72,115,0.025)] backdrop-blur-xl lg:h-[95px]">
      <div className="mx-auto flex h-full max-w-[1440px] items-center px-4 py-4 sm:px-6 lg:px-7">
        <div className="flex min-h-12 items-center gap-4">
          <span className="h-9 w-1 rounded-full bg-gradient-to-b from-[#1682df] via-[#0862c7] to-[#76b8ec]" />
          <div>
            <h1 className="text-[25px] font-bold leading-tight tracking-[-0.035em] text-[#0d2148]">
            MuniDoc Salta
            </h1>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-[#7890aa]">
              Gestión documental municipal
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
