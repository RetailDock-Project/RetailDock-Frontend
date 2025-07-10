/**
 * Returns a full image src URL for use in an <img> tag.
 * @param base64 - The base64 image string.
 * @param type - The image MIME type (default is "png").
 * @returns A valid image src URL or empty string if invalid.
 */
export function getBase64ImageSrc(
  base64: string,
  type: "png" | "jpeg" | "webp" = "png"
): string {
  if (!base64 || typeof base64 !== "string") return "";
  return `data:image/${type};base64,${base64}`;
}
