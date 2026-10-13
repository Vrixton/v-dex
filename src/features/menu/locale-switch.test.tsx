import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Locale } from "@/i18n/locale";
import { LOCALE_NOTICE_KEY } from "@/i18n/locale-notice";
import { LocaleProvider } from "@/i18n/locale-provider";

import { LocaleSwitch } from "./locale-switch";

/**
 * Se sustituyen las piezas que aquí no existen: el sonido usa la Web Audio
 * API y la preferencia de movimiento una media query. Lo que se prueba es el
 * comportamiento del control.
 *
 * Los temporizadores son falsos y nunca se avanza hasta la navegación: en
 * jsdom no hay nada a donde navegar, y lo interesante pasa antes.
 */
const { toastMock, pathnameMock } = vi.hoisted(() => ({
  toastMock: vi.fn(),
  pathnameMock: vi.fn(() => "/projects"),
}));

vi.mock("next/navigation", () => ({ usePathname: pathnameMock }));
vi.mock("@/components/sound/use-sound", () => ({ useSound: () => () => {} }));
vi.mock("@/components/toast/toast-context", () => ({ useToast: () => toastMock }));
vi.mock("@/hooks/use-reduced-motion", () => ({ useReducedMotion: () => false }));

function renderWith(locale: Locale) {
  return render(
    <LocaleProvider locale={locale}>
      <LocaleSwitch />
    </LocaleProvider>,
  );
}

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  toastMock.mockClear();
  pathnameMock.mockReturnValue("/projects");
  window.sessionStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("LocaleSwitch", () => {
  it("ofrece los dos idiomas, cada uno con su nombre", () => {
    renderWith("en");

    expect(screen.getByRole("link", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Español" })).toBeInTheDocument();
  });

  it("apunta a la misma página en el otro idioma", () => {
    renderWith("en");

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es/projects");
  });

  it("desde el español vuelve a la URL sin prefijo", () => {
    pathnameMock.mockReturnValue("/es/projects/farmatodo");
    renderWith("es");

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/projects/farmatodo",
    );
  });

  it("marca el idioma activo", () => {
    renderWith("es");

    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "English" })).not.toHaveAttribute("aria-current");
  });

  it("anuncia el reinicio al elegir otro idioma", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWith("en");

    await user.click(screen.getByRole("link", { name: "Español" }));

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({ label: "SYSTEM", value: "RESET" }),
    );
  });

  it("deja la marca para que la página nueva anuncie el idioma", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWith("en");

    await user.click(screen.getByRole("link", { name: "Español" }));

    expect(window.sessionStorage.getItem(LOCALE_NOTICE_KEY)).toBe("es");
  });

  it("no reinicia al elegir el idioma que ya está puesto", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWith("en");

    await user.click(screen.getByRole("link", { name: "English" }));

    expect(toastMock).not.toHaveBeenCalled();
    expect(window.sessionStorage.getItem(LOCALE_NOTICE_KEY)).toBeNull();
  });

  it("declara el idioma de cada enlace", () => {
    renderWith("en");

    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("hreflang", "es");
  });

  it("anuncia el grupo como selector de idioma", () => {
    renderWith("en");

    expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
  });
});
