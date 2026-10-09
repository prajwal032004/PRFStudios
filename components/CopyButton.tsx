"use client";

import { useState } from "react";
import Icon from "./Icon";

// Copies a block of approved text (e.g. the media boilerplate) to the clipboard.
export default function CopyButton({ text, label = "Copy text" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      setDone(false);
    }
  };
  return (
    <button type="button" onClick={copy} className="btn btn-outline !py-2.5 !text-[15px]" aria-live="polite">
      <Icon name={done ? "check" : "layers"} size={16} />
      {done ? "Copied" : label}
    </button>
  );
}
