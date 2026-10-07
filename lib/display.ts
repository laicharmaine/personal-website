/** Strip "[DRAFT]" / "DRAFT:" prefixes for display; each page shows one DraftNote instead. */
export function clean(text: string): string {
  return text.replace(/^\s*(\[DRAFT\]|DRAFT:)\s*/i, "");
}
