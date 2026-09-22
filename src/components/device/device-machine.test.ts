import { describe, expect, it } from "vitest";

import {
  deviceReducer,
  initialDeviceState,
  isBusy,
  shutterPosition,
  type DeviceEvent,
  type DeviceState,
} from "./device-machine";

/** Aplica una secuencia de eventos partiendo de un estado. */
function run(events: DeviceEvent[], from: DeviceState = initialDeviceState): DeviceState {
  return events.reduce(deviceReducer, from);
}

describe("deviceReducer", () => {
  it("empieza abierto, con el menú cerrado y sin acción pendiente", () => {
    expect(initialDeviceState).toEqual({ phase: "open", intent: null, isMenuOpen: false });
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
    expect(open).toEqual({ phase: "open", intent: null, isMenuOpen: true });
  });

  it("ignora nuevas peticiones mientras el dispositivo está en movimiento", () => {
    const closing = run([{ type: "REQUEST_MENU_TOGGLE" }]);

    // Doble clic, o clic en una opción del menú antes de tiempo
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

  it("guarda el destino al navegar y lo libera al abrirse", () => {
    const closing = run([{ type: "REQUEST_NAVIGATION", href: "/projects" }]);
    expect(closing.intent).toEqual({ type: "navigate", href: "/projects" });

    const closed = run([{ type: "CLOSE_FINISHED" }], closing);
    // Navegar no toca el estado del menú
    expect(closed.isMenuOpen).toBe(false);
    expect(closed.intent).toEqual({ type: "navigate", href: "/projects" });

    expect(run([{ type: "CONTENT_READY" }], closed).intent).toBeNull();
  });

  it("alterna el menú de vuelta en el segundo ciclo", () => {
    const menuOpen = run([
      { type: "REQUEST_MENU_TOGGLE" },
      { type: "CLOSE_FINISHED" },
      { type: "CONTENT_READY" },
      { type: "OPEN_FINISHED" },
    ]);

    const menuClosed = run([{ type: "REQUEST_MENU_TOGGLE" }, { type: "CLOSE_FINISHED" }], menuOpen);

    expect(menuClosed.isMenuOpen).toBe(false);
  });

  it("ignora eventos de animación fuera de su fase", () => {
    expect(run([{ type: "CLOSE_FINISHED" }])).toEqual(initialDeviceState);
    expect(run([{ type: "CONTENT_READY" }])).toEqual(initialDeviceState);
    expect(run([{ type: "OPEN_FINISHED" }])).toEqual(initialDeviceState);
  });
});

describe("selectores", () => {
  it("marca como ocupada cualquier fase que no sea open", () => {
    expect(isBusy("open")).toBe(false);
    expect(isBusy("closing")).toBe(true);
    expect(isBusy("closed")).toBe(true);
    expect(isBusy("opening")).toBe(true);
  });

  it("mantiene los paneles cerrados durante la espera de contenido", () => {
    expect(shutterPosition("open")).toBe("open");
    expect(shutterPosition("closing")).toBe("closed");
    expect(shutterPosition("closed")).toBe("closed");
    expect(shutterPosition("opening")).toBe("open");
  });
});
