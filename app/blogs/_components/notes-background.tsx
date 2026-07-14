import { siteConfig } from "@/lib/site-config";

type NotesBackgroundProps = {
  children: React.ReactNode;
};

export function NotesBackground({ children }: NotesBackgroundProps) {
  const { backgroundImage, backgroundImageFallback, backgroundScrimOpacity } =
    siteConfig;

  return (
    <div className="notes-canvas relative isolate min-h-dvh w-full">
      <div
        aria-hidden
        className="notes-background-layer pointer-events-none fixed inset-0 -z-20"
      />

      {backgroundImage && (
        <picture className="notes-background-picture pointer-events-none fixed inset-0 -z-[19] block h-full w-full">
          <source srcSet={backgroundImage} type="image/webp" />
          <img
            src={backgroundImageFallback}
            alt=""
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </picture>
      )}

      <div
        aria-hidden
        className="notes-background-scrim pointer-events-none fixed inset-0 -z-10"
        style={{ opacity: backgroundScrimOpacity }}
      />
      <div className="relative z-0 min-h-dvh w-full">{children}</div>
    </div>
  );
}
