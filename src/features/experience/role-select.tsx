"use client";

import { useSound } from "@/components/sound/use-sound";
import { ROLES_BY_RECENCY } from "@/content/experience";
import { formatPeriod } from "@/lib/date";

export function RoleSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (slug: string) => void;
}) {
  const play = useSound();

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-brand-cyan/70">[SELECT_LOG]:</span>
      <select
        value={value}
        onChange={(event) => {
          play("select");
          onChange(event.target.value);
        }}
        className="w-full cursor-pointer rounded-control border border-transparent bg-terminal px-3 py-2.5 text-sm text-fg outline-none focus-visible:border-brand-cyan"
      >
        {ROLES_BY_RECENCY.map((role) => (
          <option key={role.slug} value={role.slug}>
            {`${role.company} · ${role.periodLabel ?? formatPeriod(role.start, role.end)}`}
          </option>
        ))}
      </select>
    </label>
  );
}
