const FRAME_W = 16;
const FRAME_H = 20;
const SCALE = 1.4;

export function TeamSprites({ size }: { size: number }) {
  const shown = Math.min(size, 8);

  return (
    <span aria-hidden="true" className="flex items-end gap-0.5">
      {Array.from({ length: shown }, (_, index) => (
        <span
          key={index}
          className="block bg-[url('/team-sheet.webp')] bg-no-repeat"
          style={{
            width: FRAME_W * SCALE,
            height: FRAME_H * SCALE,
            backgroundSize: `${FRAME_W * 2 * SCALE}px ${FRAME_H * SCALE}px`,
            backgroundPosition: index === 0 ? "0 0" : `${-FRAME_W * SCALE}px 0`,
            imageRendering: "pixelated",
          }}
        />
      ))}
    </span>
  );
}
