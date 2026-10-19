import { PixelPet } from "@vrixton/pixel-pet";

export function PetLayer() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-(--bezel-bottom-h) z-[6] h-44">
      <PixelPet petName="V-BOT" spriteSrc="/pets/robot-sprite.png" color="#197788" />
    </div>
  );
}
