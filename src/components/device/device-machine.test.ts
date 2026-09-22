import { describe, expect, it } from "vitest";

import {
  buttonTone,
  confirmingHref,
  deviceReducer,
  initialDeviceState,
  isBusy,
  isContentVisible,
  isLoading,
  shutterPosition,
  type DeviceEvent,
  type DeviceState,
} from "./device-machine";

/** Aplica una secuencia de eventos partiendo de un estado. */
function run(events: DeviceEvent[], from: DeviceState = initialDeviceState): DeviceState {
  return events.reduce(deviceReducer, from);
}

const OPEN_MENU: DeviceEvent[] = [
  { type: "REQUEST_MENU_TOGGLE" },
  { type: "CLOSE_FINISHED" },
  { type: "CONTENT_READY" },
  { type: "OPEN_FINISHED" },
];

describe("deviceReducer", () => {
  it("empieza abierto, con el menú cerrado y sin acción pendiente", () => {
    expect(initialDeviceState).toEqual({
      phase: "open",
      intent: null,
      isMenuOpen: false,
      isSlow: false,
    });
  });

  it("completa el ciclo de abrir el menú", () => {
    const closing = run([{ type: "REQUEST_MENU_TOGGLE" }]);
    expect(closing.phase).toBe("closing");
    expect(closing.isMenuOpen).toBe(false);

    const closed = run([{ type: "CLOSE_FINISHED" }], closing);
    expect(closed.phase).toBe("closed");
    // El menú aparece con el dispositivo cerrado, nunca a la vista
    expect(closed.isMenuOpen).toBe(true);

    const opening = run([{ type: "CONTENT_READY" }], closed);
    expect(opening.phase).toBe("opening");

    const open = run([{ type: "OPEN_FINISHED" }], opening);
    expect(open.phase).toBe("open");
    expect(open.intent).toBeNull();
    expect(open.isMenuOpen).toBe(true);
  });

  it("navegar pasa primero por la confirmación", () => {
    const menuOpen = run(OPEN_MENU);

    const confirming = run([{ type: "REQUEST_NAVIGATION", href: "/projects" }], menuOpen);
    expect(confirming.phase).toBe("confirming");
    expect(confirmingHref(confirming)).toBe("/projects");
    // Durante el parpadeo el dispositivo sigue abierto
    expect(shutterPosition(confirming.phase)).toBe("open");

    const closing = run([{ type: "CONFIRM_FINISHED" }], confirming);
    expect(closing.phase).toBe("closing");
    expect(closing.intent).toEqual({ type: "navigate", href: "/projects" });
  });

  it("cierra el menú al entrar en una vista", () => {
    const closed = run(
      [
        ...OPEN_MENU,
        { type: "REQUEST_NAVIGATION", href: "/contact" },
        { type: "CONFIRM_FINISHED" },
        { type: "CLOSE_FINISHED" },
      ],
      initialDeviceState,
    );

    expect(closed.isMenuOpen).toBe(false);
    expect(closed.intent).toEqual({ type: "navigate", href: "/contact" });
    expect(run([{ type: "CONTENT_READY" }], closed).intent).toBeNull();
  });

  it("ignora nuevas peticiones mientras el dispositivo está ocupado", () => {
    const closing = run([{ type: "REQUEST_MENU_TOGGLE" }]);

    const spammed = run(
      [
        { type: "REQUEST_MENU_TOGGLE" },
        { type: "REQUEST_MENU_TOGGLE" },
        { type: "REQUEST_NAVIGATION", href: "/projects" },
      ],
      closing,
    );

    expect(spammed).toEqual(closing);
  });

  it("no se abre hasta que el contenido está listo", () => {
    const closed = run([{ type: "REQUEST_MENU_TOGGLE" }, { type: "CLOSE_FINISHED" }]);

    // Si la vista tarda, el dispositivo se queda cerrado mostrando el loader
    expect(run([{ type: "OPEN_FINISHED" }], closed)).toEqual(closed);
    expect(run([{ type: "CONTENT_READY" }], closed).phase).toBe("opening");
  });

  it("alterna el menú de vuelta en el segundo ciclo", () => {
    const menuOpen = run(OPEN_MENU);
    const menuClosed = run([{ type: "REQUEST_MENU_TOGGLE" }, { type: "CLOSE_FINISHED" }], menuOpen);

    expect(menuClosed.isMenuOpen).toBe(false);
  });

  it("avisa de la espera solo con el dispositivo cerrado, y lo limpia al abrirse", () => {
    const closing = run([{ type: "REQUEST_MENU_TOGGLE" }]);
    // Cerrando todavía no: esa parte del ciclo dura lo que dura
    expect(run([{ type: "SLOW_THRESHOLD_REACHED" }], closing)).toEqual(closing);

    const closed = run([{ type: "CLOSE_FINISHED" }], closing);
    const slow = run([{ type: "SLOW_THRESHOLD_REACHED" }], closed);
    expect(slow.isSlow).toBe(true);
    expect(buttonTone(slow)).toBe("amber");

    const open = run([{ type: "CONTENT_READY" }, { type: "OPEN_FINISHED" }], slow);
    expect(open.isSlow).toBe(false);
  });

  it("no marca como lento un dispositivo en reposo", () => {
    expect(run([{ type: "SLOW_THRESHOLD_REACHED" }])).toEqual(initialDeviceState);
  });

  it("ignora eventos de animación fuera de su fase", () => {
    expect(run([{ type: "CONFIRM_FINISHED" }])).toEqual(initialDeviceState);
    expect(run([{ type: "CLOSE_FINISHED" }])).toEqual(initialDeviceState);
    expect(run([{ type: "CONTENT_READY" }])).toEqual(initialDeviceState);
    expect(run([{ type: "OPEN_FINISHED" }])).toEqual(initialDeviceState);
  });
});

describe("selectores", () => {
  it("marca como ocupada cualquier fase que no sea open", () => {
    expect(isBusy("open")).toBe(false);
    expect(isBusy("confirming")).toBe(true);
    expect(isBusy("closing")).toBe(true);
    expect(isBusy("closed")).toBe(true);
    expect(isBusy("opening")).toBe(true);
  });

  it("mantiene los paneles cerrados durante la espera de contenido", () => {
    expect(shutterPosition("open")).toBe("open");
    expect(shutterPosition("confirming")).toBe("open");
    expect(shutterPosition("closing")).toBe("closed");
    expect(shutterPosition("closed")).toBe("closed");
    expect(shutterPosition("opening")).toBe("open");
  });

  it("mantiene el contenido visible hasta que las láminas lo tapan", () => {
    expect(isContentVisible("open")).toBe(true);
    // Si se ocultara aquí, el parpadeo del ítem no se vería
    expect(isContentVisible("confirming")).toBe(true);
    expect(isContentVisible("closing")).toBe(true);
    expect(isContentVisible("closed")).toBe(false);
    expect(isContentVisible("opening")).toBe(false);
  });

  it("muestra el loader solo durante el ciclo de cierre y apertura", () => {
    expect(isLoading("open")).toBe(false);
    expect(isLoading("confirming")).toBe(false);
    expect(isLoading("closing")).toBe(true);
    expect(isLoading("closed")).toBe(true);
    expect(isLoading("opening")).toBe(true);
  });

  it("elige el color del botón según el estado", () => {
    expect(buttonTone(initialDeviceState)).toBe("cyan");
    expect(buttonTone({ ...initialDeviceState, isMenuOpen: true })).toBe("red");
    // Ámbar mientras el dispositivo trabaja
    expect(buttonTone({ ...initialDeviceState, phase: "closed" })).toBe("amber");
    expect(buttonTone({ ...initialDeviceState, isMenuOpen: true, isSlow: true })).toBe("amber");
  });

  it("solo expone el href en parpadeo durante la confirmación", () => {
    expect(confirmingHref(initialDeviceState)).toBeNull();
    const confirming = run([{ type: "REQUEST_NAVIGATION", href: "/experience" }]);
    expect(confirmingHref(confirming)).toBe("/experience");
    expect(confirmingHref(run([{ type: "CONFIRM_FINISHED" }], confirming))).toBeNull();
  });
});
