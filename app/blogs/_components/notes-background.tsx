import { siteConfig } from "@/lib/site-config";

type NotesBackgroundProps = {
  children: React.ReactNode;
};

export function NotesBackground({ children }: NotesBackgroundProps) {
  const { backgroundImage, backgroundScrimOpacity } = siteConfig;

  return (
    <div className="notes-canvas relative isolate min-h-dvh w-full">
      <div
        aria-hidden
        className="notes-background-layer pointer-events-none fixed inset-0 -z-20"
        style={
          backgroundImage
            ? ({
                "--notes-bg-image": `url("${backgroundImage}")`,
              } as React.CSSProperties)
            : undefined
        }
      />
      <div
        aria-hidden
        className="notes-background-scrim pointer-events-none fixed inset-0 -z-10"
        style={{ opacity: backgroundScrimOpacity }}
      />
      <div className="relative z-0 min-h-dvh w-full">{children}</div>
    </div>
  );
}
