"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const SETTINGS_FIELDS = [
  { key: "site_title", label: "Sitetitel", placeholder: "Stichting Philia" },
  { key: "site_description", label: "Sitebeschrijving", placeholder: "Verbinding voor iedereen..." },
  { key: "contact_email", label: "Contact e-mail", placeholder: "info@stichtingphilia.nl" },
  { key: "address", label: "Adres", placeholder: "Heemstede, Nederland" },
  { key: "phone", label: "Telefoonnummer", placeholder: "+31 ..." },
  { key: "linkedin_url", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/..." },
  { key: "openrouter_model", label: "OpenRouter model", placeholder: "anthropic/claude-3-haiku" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSettings(data);
      } catch {
        toast.error("Instellingen konden niet worden geladen");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Instellingen opgeslagen!");
    } catch {
      toast.error("Opslaan mislukt");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="text-purple-400 animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">Instellingen</h1>
        <p className="text-gray-500 text-sm mt-1">
          Beheer de algemene instellingen van de website.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl p-8 space-y-6">
        {SETTINGS_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-dark mb-2">
              {field.label}
            </label>
            <input
              type="text"
              value={settings[field.key] || ""}
              onChange={(e) =>
                setSettings({ ...settings, [field.key]: e.target.value })
              }
              placeholder={field.placeholder}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>
        ))}

        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-60 transition-colors"
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            <span>{isSaving ? "Opslaan..." : "Instellingen opslaan"}</span>
          </button>
        </div>
      </div>

      {/* Environment info */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3 className="font-semibold text-amber-800 text-sm mb-2">
          Omgevingsvariabelen
        </h3>
        <p className="text-amber-700 text-xs leading-relaxed">
          API-sleutels en gevoelige gegevens worden geconfigureerd via{" "}
          <code className="bg-amber-100 px-1 rounded">.env.local</code>. Pas de
          omgevingsvariabelen aan in het serverbestand, niet hier.
        </p>
        <div className="mt-3 space-y-1">
          {["DATABASE_URL", "OPENROUTER_API_KEY", "NEXTAUTH_SECRET", "ADMIN_EMAIL"].map(
            (key) => (
              <div key={key} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                <code className="text-amber-700 text-xs">{key}</code>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
