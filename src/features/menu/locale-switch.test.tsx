import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LocaleProvider } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/locale";

import { LocaleSwitch } from "./locale-switch";

const { setLocaleMock } = vi.hoisted(() => ({ setLocaleMock: vi.fn() }));

vi.mock("@/i18n/actions", () => ({ setLocale: setLocaleMock }));
vi.mock("@/components/sound/use-sound", () => ({ useSound: () => () => {} }));

function renderWith(locale: Locale) {
  return render(
    <LocaleProvider locale={locale}>
      <LocaleSwitch />
    </LocaleProvider>,
  );
}

beforeEach(() => {
  setLocaleMock.mockClear();
});

describe("LocaleSwitch", () => {
  it("ofrece los dos idiomas, cada uno con su nombre", () => {
    renderWith("en");

    expect(screen.getByRole("button", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Español" })).toBeInTheDocument();
  });

  it("marca como pulsado solo el idioma activo", () => {
    renderWith("es");

    expect(screen.getByRole("button", { name: "Español" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("cambia al idioma que se elige", async () => {
    const user = userEvent.setup();
    renderWith("en");

    await user.click(screen.getByRole("button", { name: "Español" }));

    expect(setLocaleMock).toHaveBeenCalledWith("es");
  });

  it("no hace nada al elegir el idioma que ya está puesto", async () => {
    const user = userEvent.setup();
    renderWith("en");

    await user.click(screen.getByRole("button", { name: "English" }));

    expect(setLocaleMock).not.toHaveBeenCalled();
  });

  it("se puede usar con el teclado", async () => {
    const user = userEvent.setup();
    renderWith("en");

    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Español" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(setLocaleMock).toHaveBeenCalledWith("es");
  });

  it("anuncia el grupo como selector de idioma", () => {
    renderWith("en");

    expect(screen.getByRole("group", { name: "Language" })).toBeInTheDocument();
  });
});
