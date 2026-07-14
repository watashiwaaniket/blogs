export const siteConfig = {
  /**
   * Background image for the notes canvas.
   * Drop your image in `public/` and set the path here, e.g. "/background.jpg".
   * Set to `null` to use the gradient fallback only.
   */
  backgroundImage: "/background.jpg" as string | null,

  /** White scrim over the photo (0–1). Raises readability behind the notes card. */
  backgroundScrimOpacity: 0.15,
} as const;
