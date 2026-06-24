"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AdminAccessModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const setupTimeoutId = window.setTimeout(() => {
      setPassword("");
      setShowPassword(false);
      setError("");
      inputRef.current?.focus();
    }, 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(setupTimeoutId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        setError(
          result.error === "Contraseña incorrecta."
            ? "Contraseña incorrecta. Intentá nuevamente."
            : result.error || "No se pudo validar el acceso.",
        );
        return;
      }

      onSuccess();
    } catch {
      setError("No se pudo conectar con el servicio de acceso.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b1f3a]/45 px-4 backdrop-blur-sm">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-[430px] overflow-hidden rounded-3xl border border-white/70 bg-white p-6 shadow-[0_30px_80px_rgba(8,38,76,0.28)]"
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-[#d7e4f2] bg-white text-[#58718f] transition hover:bg-[#f3f8ff] hover:text-[#075cc5]"
        >
          <X size={16} />
        </button>

        <div className="pointer-events-none absolute -right-14 -top-14 size-44 rounded-full bg-[#dceeff]/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 left-8 size-48 rounded-full bg-[#edf6ff]/80 blur-3xl" />

        <div className="relative">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8f3ff] to-[#d7ebff] text-[#075cc5] shadow-[0_10px_24px_rgba(31,88,151,0.12)] ring-1 ring-[#b9d8f7]">
            <LockKeyhole size={25} strokeWidth={1.8} />
          </span>

          <h2 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-[#10264c]">
            Acceso privado
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#536b89]">
            Ingresá tu contraseña para ver el panel de actividad.
          </p>

          <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.12em] text-[#607894]">
            Contraseña
          </label>
          <div className="mt-2 flex items-center rounded-2xl border border-[#c8daed] bg-[#f8fbff] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] focus-within:border-[#0871dc] focus-within:ring-4 focus-within:ring-[#0871dc]/10">
            <input
              ref={inputRef}
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 min-w-0 flex-1 bg-transparent text-sm text-[#18355f] outline-none placeholder:text-[#91a3b8]"
              placeholder="Ingresá la contraseña"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="flex size-9 items-center justify-center rounded-xl text-[#6c829d] transition hover:bg-white hover:text-[#075cc5]"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {error && (
            <p className="mt-3 rounded-xl border border-[#f2b8b5] bg-[#fff4f3] px-3 py-2 text-xs font-medium text-[#b42318]">
              {error}
            </p>
          )}

          <div className="mt-5 rounded-2xl border border-[#d4e4f4] bg-[linear-gradient(135deg,#f1f8ff,#ffffff)] p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-white text-[#075cc5] shadow-sm">
                <ShieldCheck size={18} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7890aa]">
                  Solo acceso autorizado
                </p>
                <p className="mt-1 text-sm font-semibold text-[#18355f]">
                  Vas a ingresar al Panel de actividad
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading || !password.trim()}>
              {isLoading ? "Verificando..." : "Ingresar"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
