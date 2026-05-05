"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Vul alle verplichte velden in");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed");
      setSent(true);
      toast.success("Bericht verzonden! We nemen snel contact op.");
    } catch {
      toast.error("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="pt-[72px]">
        {/* Header */}
        <section className="py-20 bg-purple-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-purple-600 text-sm font-semibold uppercase tracking-wider">
              Neem contact op
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-dark">
              Laten we praten
            </h1>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              Of je nu wilt samenwerken, meer wilt weten of gewoon een vraag hebt — we
              horen graag van je.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Contact info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-dark mb-6">
                    Contactgegevens
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="text-purple-600" size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark">E-mail</p>
                        <a
                          href="mailto:info@stichtingphilia.nl"
                          className="text-purple-600 text-sm hover:text-purple-700"
                        >
                          info@stichtingphilia.nl
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-purple-600" size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark">Locatie</p>
                        <p className="text-gray-500 text-sm">Heemstede, Nederland</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-dark mb-3 text-base">
                    Samenwerken?
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Organisaties, gemeenten, fondsen en sociaal ondernemers die onze
                    missie delen, werken we graag mee samen. Vertel ons over jouw
                    initiatief.
                  </p>
                </div>

                <div className="bg-white border border-border rounded-2xl p-6">
                  <h3 className="font-semibold text-dark mb-3 text-base">
                    WeAreImpact
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    Voor commercieel advies, begeleiding en productontwikkeling voor
                    sociale impact.
                  </p>
                  <a
                    href="https://weareimpact.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 text-sm font-medium hover:text-purple-700"
                  >
                    Bezoek WeAreImpact.nl →
                  </a>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                {sent ? (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Send className="text-green-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-2">
                      Bericht ontvangen!
                    </h3>
                    <p className="text-gray-500">
                      We nemen zo snel mogelijk contact met je op.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-6 text-purple-600 font-medium hover:text-purple-700"
                    >
                      Nieuw bericht sturen
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-2">
                          Naam <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Jan de Vries"
                          className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-2">
                          E-mailadres <span className="text-purple-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="jan@voorbeeld.nl"
                          className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Onderwerp
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        placeholder="Waarover wil je contact?"
                        className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Bericht <span className="text-purple-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Vertel ons meer..."
                        className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-purple-400 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-60 transition-colors"
                    >
                      {isLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Send size={18} />
                      )}
                      <span>{isLoading ? "Verzenden..." : "Stuur bericht"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
