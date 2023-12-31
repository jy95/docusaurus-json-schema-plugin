export function encodeStringForJSONPointer(text: string): string {
  return text.replace(/~/g, "~0").replace(/\//g, "~1").replace(/%/g, "%25")
}
