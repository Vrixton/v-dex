import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Locale } from "@/i18n/locale";
import { LOCALE_NOTICE_KEY } from "@/i18n/locale-notice";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getMessages } from "@/i18n/messages";

import { LocaleSwitch } from "./locale-switch";

const { toastMock, pathnameMock } = vi.hoisted(() => ({
  toastMock: vi.fn(),
  pathnameMock: vi.fn(() => "/projects"),
}));

vi.mock("next/navigation", () => ({ usePathname: pathnameMock }));
vi.mock("@/components/sound/use-sound", () => ({ useSound: () => () => {} }));
vi.mock("@/components/toast/toast-context", () => ({ useToast: () => toastMock }));
vi.mock("@/hooks/use-reduced-motion", () => ({ useReducedMotion: () => false }));

const system = getMessages("en").device.system;
const locale = getMessages("en").device.locale;

function renderWith(active: Locale) {
  return render(
    <LocaleProvider locale={active} messages={getMessages(active)}>
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
  it("offers both languages, each under its own name", () => {
    renderWith("en");

    expect(screen.getByRole("link", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Español" })).toBeInTheDocument();
  });

  it("points at the same page in the other language", () => {
    renderWith("en");

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es/projects");
  });

  it("drops the prefix on the way back from Spanish", () => {
    pathnameMock.mockReturnValue("/es/projects/farmatodo");
    renderWith("es");

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/projects/farmatodo",
    );
  });

  it("marks the active language", () => {
    renderWith("es");

    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "English" })).not.toHaveAttribute("aria-current");
  });

  it("announces the reset when another language is picked", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWith("en");

    await user.click(screen.getByRole("link", { name: "Español" }));

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({ label: system.label, value: system.reset }),
    );
  });

  it("leaves the flag so the next page announces the language", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWith("en");

    await user.click(screen.getByRole("link", { name: "Español" }));

    expect(window.sessionStorage.getItem(LOCALE_NOTICE_KEY)).toBe("es");
  });

  it("does not reset when the active language is picked again", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWith("en");

    await user.click(screen.getByRole("link", { name: "English" }));

    expect(toastMock).not.toHaveBeenCalled();
    expect(window.sessionStorage.getItem(LOCALE_NOTICE_KEY)).toBeNull();
  });

  it("declares the language of every link", () => {
    renderWith("en");

    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("hreflang", "es");
  });

  it("names the group as a language picker", () => {
    renderWith("en");

    expect(screen.getByRole("group", { name: locale.group })).toBeInTheDocument();
  });

  it("names the group in the active language", () => {
    renderWith("es");

    expect(
      screen.getByRole("group", { name: getMessages("es").device.locale.group }),
    ).toBeInTheDocument();
  });
});
