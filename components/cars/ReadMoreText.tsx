"use client";
import { useState } from "react";

export function ReadMoreText({
  text,
  collapsedLines = 3,
}: {
  text: string;
  collapsedLines?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="text-sm text-neutral-700 leading-relaxed">
      <p
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitLineClamp: collapsedLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
        }
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((s) => !s)}
        className="mt-2 text-xs font-semibold text-brand-yellow-600 hover:text-brand-yellow underline-offset-2 hover:underline"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
