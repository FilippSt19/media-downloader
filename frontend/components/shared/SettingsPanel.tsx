"use client";

import { useEffect, useState } from "react";
import {
  Accessibility,
  Check,
  Contrast,
  Eye,
  Info,
  Moon,
  Settings,
  Sun,
  X,
  Zap,
} from "lucide-react";

type SettingsPanelProps = {
  compact?: boolean;
};

const preferenceKey = "media-studio-preferences";

type Preferences = {
  theme: "dark" | "light";
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  rememberFormat: boolean;
};

const defaultPreferences: Preferences = {
  theme: "dark",
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  rememberFormat: true,
};

function loadPreferences(): Preferences {
  if (typeof window === "undefined") {
    return defaultPreferences;
  }

  const stored = window.localStorage.getItem(preferenceKey);

  if (!stored) {
    return defaultPreferences;
  }

  try {
    return {
      ...defaultPreferences,
      ...JSON.parse(stored),
    };
  } catch {
    window.localStorage.removeItem(preferenceKey);
    return defaultPreferences;
  }
}

function applyPreferences(preferences: Preferences) {
  const root = document.documentElement;
  root.classList.toggle("settings-light", preferences.theme === "light");
  root.classList.toggle("settings-high-contrast", preferences.highContrast);
  root.classList.toggle("settings-large-text", preferences.largeText);
  root.classList.toggle("settings-reduced-motion", preferences.reducedMotion);
}

export default function SettingsPanel({ compact = false }: SettingsPanelProps) {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPreferences(loadPreferences());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    applyPreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const updatePreference = <Key extends keyof Preferences>(
    key: Key,
    value: Preferences[Key],
  ) => {
    const nextPreferences = { ...preferences, [key]: value };
    setPreferences(nextPreferences);
    window.localStorage.setItem(preferenceKey, JSON.stringify(nextPreferences));
    applyPreferences(nextPreferences);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open settings"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={`${compact ? "h-10 w-10" : "h-11 w-11"} flex items-center justify-center rounded-xl text-zinc-400 transition hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/70`}
      >
        <Settings className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <button
            type="button"
            aria-label="Close settings"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm"
          />

          <aside className="settings-drawer absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#111316] shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">Workspace</p>
                <h2 id="settings-title" className="mt-1 text-xl font-semibold text-white">Settings</h2>
              </div>
              <button
                type="button"
                aria-label="Close settings"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/70"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <section aria-labelledby="appearance-heading">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <Moon className="h-4 w-4 text-blue-400" />
                  <h3 id="appearance-heading">Appearance</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" aria-pressed={preferences.theme === "dark"} onClick={() => updatePreference("theme", "dark")} className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm transition ${preferences.theme === "dark" ? "border-blue-400/50 bg-blue-400/10 text-white" : "border-white/[0.07] text-zinc-500"}`}>
                    <Moon className="h-4 w-4" /> Dark
                    {preferences.theme === "dark" && <Check className="ml-auto h-4 w-4 text-blue-300" />}
                  </button>
                  <button type="button" aria-pressed={preferences.theme === "light"} onClick={() => updatePreference("theme", "light")} className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm transition ${preferences.theme === "light" ? "border-amber-400/60 bg-amber-400/10 text-zinc-900" : "border-white/[0.07] text-zinc-500"}`}>
                    <Sun className="h-4 w-4" /> Light
                    {preferences.theme === "light" && <Check className="ml-auto h-4 w-4 text-amber-500" />}
                  </button>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Choose the theme that feels right for your workspace.</p>
              </section>

              <section aria-labelledby="accessibility-heading" className="mt-8">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <Accessibility className="h-4 w-4 text-purple-300" />
                  <h3 id="accessibility-heading">Accessibility</h3>
                </div>
                <div className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.07] bg-white/[0.02]">
                  <SettingToggle icon={Eye} label="Larger text" description="Increase text size across the app." checked={preferences.largeText} onChange={(value) => updatePreference("largeText", value)} />
                  <SettingToggle icon={Contrast} label="High contrast" description="Make controls and text easier to distinguish." checked={preferences.highContrast} onChange={(value) => updatePreference("highContrast", value)} />
                  <SettingToggle icon={Zap} label="Reduce motion" description="Minimize animations and transitions." checked={preferences.reducedMotion} onChange={(value) => updatePreference("reducedMotion", value)} />
                </div>
              </section>

              <section aria-labelledby="preferences-heading" className="mt-8">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <Settings className="h-4 w-4 text-pink-300" />
                  <h3 id="preferences-heading">Preferences</h3>
                </div>
                <SettingToggle label="Remember last format" description="Keep your preferred format for the next task." checked={preferences.rememberFormat} onChange={(value) => updatePreference("rememberFormat", value)} />
              </section>

              <section aria-labelledby="about-heading" className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Info className="h-4 w-4 text-emerald-300" />
                  <h3 id="about-heading">About Media Studio</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">A focused workspace for downloading, converting and improving your media.</p>
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span>Version</span>
                  <span className="font-mono text-zinc-400">1.0.0</span>
                </div>
              </section>
            </div>

            <div className="border-t border-white/[0.07] px-6 py-4 text-xs text-zinc-500">
              Your settings are saved on this device.
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

type SettingToggleProps = {
  icon?: typeof Eye;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function SettingToggle({ icon: Icon, label, description, checked, onChange }: SettingToggleProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 px-4 py-3">
      {Icon && <Icon className="h-4 w-4 shrink-0 text-zinc-400" />}
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-zinc-200">{label}</span>
        <span className="mt-0.5 block text-xs leading-5 text-zinc-500">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span aria-hidden="true" className="relative h-6 w-11 shrink-0 rounded-full bg-zinc-700 transition peer-checked:bg-blue-500 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400/70 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5" />
    </label>
  );
}