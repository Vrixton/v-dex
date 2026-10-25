import type { ReactNode } from "react";

const MARKED = /(\*\*[^*]+\*\*|__[^_]+__|\(\([^)]+\)\))/g;

export function highlight(text: string, petColor: string): ReactNode[] {
  return text.split(MARKED).map((part, index) => {
    const named = /^__([^_]+)__$/.exec(part);
    if (named?.[1]) {
      return (
        <strong key={index} style={{ color: petColor }}>
          {named[1]}
        </strong>
      );
    }

    const keyword = /^\*\*([^*]+)\*\*$/.exec(part);
    if (keyword?.[1]) {
      return (
        <strong key={index} className="text-brand-cyan">
          {keyword[1]}
        </strong>
      );
    }

    const aside = /^\(\(([^)]+)\)\)$/.exec(part);
    if (aside?.[1]) {
      return (
        <span key={index} className="text-sm text-fg/50">
          ({aside[1]})
        </span>
      );
    }
    return part;
  });
}
