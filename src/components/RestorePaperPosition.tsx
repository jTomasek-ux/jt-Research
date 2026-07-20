"use client";

import { useEffect } from "react";
import { restorePaperPosition } from "@/components/LangSwitch";

/** After a language switch, jump to the matching heading index. */
export function RestorePaperPosition() {
  useEffect(() => {
    // Wait until headings from MDX are in the DOM.
    const t = window.setTimeout(() => {
      restorePaperPosition();
    }, 50);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
