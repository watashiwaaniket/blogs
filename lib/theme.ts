export const THEME_STORAGE_KEY = "notes-theme";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

export function getStoredTheme(): ThemePreference {
  if (typeof window === "undefined") return "system";

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "system";
}

export function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getEffectiveTheme(preference: ThemePreference): ThemeMode {
  return preference === "system" ? getSystemTheme() : preference;
}

export function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  const effective = getEffectiveTheme(preference);

  root.setAttribute("data-theme", effective);
  root.style.colorScheme = effective;

  if (preference === "system") {
    root.removeAttribute("data-theme-preference");
  } else {
    root.setAttribute("data-theme-preference", preference);
  }
}
