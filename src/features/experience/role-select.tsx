"use client";

import { useSound } from "@/components/sound/use-sound";
import { ROLES_BY_RECENCY, type RoleId } from "@/content/experience";
import { useMessages } from "@/i18n/locale-provider";
import { formatPeriod } from "@/lib/date";

export function RoleSelect({ value, onChange }: { value: RoleId; onChange: (id: RoleId) => void }) {
  const play = useSound();
  const m = useMessages().experience;

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-brand-cyan/70">{`[${m.selectLabel}]:`}</span>
      <select
        value={value}
        onChange={(event) => {
          play("select");
          onChange(event.target.value as RoleId);
        }}
        className="w-full cursor-pointer rounded-control border border-transparent bg-terminal px-3 py-2.5 text-sm text-fg outline-none focus-visible:border-brand-cyan"
      >
        {ROLES_BY_RECENCY.map((role) => (
          <option key={role.id} value={role.id}>
            {`${role.company} · ${role.periodLabel ?? formatPeriod(role.start, role.end)}`}
          </option>
        ))}
      </select>
    </label>
  );
}
