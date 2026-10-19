import { PixelPet } from "@vrixton/pixel-pet";

import { format } from "@/i18n/format";
import type { Messages } from "@/i18n/messages/en";

const PET_NAME = "Bit";

export function PetLayer({ messages }: { messages: Messages["device"]["pet"] }) {
  const values = { name: PET_NAME };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-(--bezel-bottom-h) z-[6] h-44">
      <PixelPet
        petName={PET_NAME}
        spriteSrc="/pets/robot-sprite.png"
        color="#197788"
        label={format(messages.label, values)}
        messages={{
          happy: format(messages.happy, values),
          angry: format(messages.overwhelmed, values),
          curious: format(messages.curious, values),
        }}
      />
    </div>
  );
}
