import type { ReactNode } from "react";
import { CrtBackground } from "@/components/background/crt-background";
import { DeviceSound } from "@/components/sound/device-sound";
import { ToastViewport } from "@/components/toast/toast-viewport";
import { BezelBottom } from "./bezel-bottom";
import { BezelTop } from "./bezel-top";
import { Screen } from "./screen";
import { PowerOn } from "./power-on";

export function DeviceShell({ children }: { children: ReactNode }) {
  return (
    <>
      <CrtBackground />
      <DeviceSound />
      <BezelTop />
      <Screen>{children}</Screen>
      <BezelBottom />
      <PowerOn />
      <ToastViewport />
    </>
  );
}
