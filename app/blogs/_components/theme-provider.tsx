"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  applyTheme,
  getStoredTheme,
  getSystemTheme,
  type ThemeMode,
  type ThemePreference,
} from "@/lib/theme";

type ThemeContextValue = {
  preference: ThemePreference;
  effectiveTheme: ThemeMode;
  isDark: boolean;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readEffectiveTheme(): ThemeMode {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [effectiveTheme, setEffectiveTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = getStoredTheme();
    setPreference(stored);
    setEffectiveTheme(readEffectiveTheme());
    applyTheme(stored);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (getStoredTheme() === "system") {
        applyTheme("system");
        setEffectiveTheme(readEffectiveTheme());
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    localStorage.setItem("notes-theme", mode);
    setPreference(mode);
    applyTheme(mode);
    setEffectiveTheme(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = readEffectiveTheme();
    setTheme(current === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = useMemo(
    () => ({
      preference,
      effectiveTheme,
      isDark: effectiveTheme === "dark",
      setTheme,
      toggleTheme,
    }),
    [preference, effectiveTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
