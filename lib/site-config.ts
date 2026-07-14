export const siteConfig = {
  /**
   * Background image for the notes canvas (WebP preferred for size).
   * Drop optimized assets in `public/` — keep originals out of git.
   * Set to `null` to use the gradient fallback only.
   */
  backgroundImage: "/background.webp" as string | null,

  /** JPEG fallback for browsers that don't support WebP. */
  backgroundImageFallback: "/background.jpg",

  /** White scrim over the photo (0–1). Raises readability behind the notes card. */
  backgroundScrimOpacity: 0.05,

  socials: [
    {
      label: "Twitter",
      href: "https://x.com/astriknormal",
    },
    {
      label: "GitHub",
      href: "https://github.com/watashiwaaniket",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aniket-dhakane-9b06a125b/",
    },
    {
      label: "Portfolio",
      href: "https://www.aniketdhakane.xyz",
    },
  ],
} as const;
