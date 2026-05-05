import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import ContactCTA from "@/components/home/ContactCTA";
import { Users, PawPrint, Anchor, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Onze platforms — Stichting Philia",
  description:
    "Vrijwilligersmatch.nl, Pootgelukkig.nl en Samenvaren.nl. Drie platforms, één missie: mensen verbinden op basis van wie ze zijn.",
};

const platforms = [
  {
    id: "vrijwilligersmatch",
    icon: Users,
    name: "Vrijwilligersmatch.nl",
    url: "https://vrijwilligersmatch.nl",
    tagline: "Vrijwilligers matchen op motivatie",
    color: "purple",
    description:
      "Vrijwilligerswerk begint met de juiste motivatie — niet met de juiste vaardigheden. Vrijwilligersmatch.nl matcht vrijwilligers en organisaties op basis van wie iemand is en wat hem of haar drijft.",
    longDescription:
      "De meeste matching-platforms kijken naar wat je kunt. Vrijwilligersmatch.nl kijkt naar waarom je iets wilt. Want de diepste verbindingen — en de meest duurzame vrijwilligersrelaties — ontstaan als de motivatie klopt.",
    features: [
      "AI-matching op persoonlijkheid en drijfveren",
      "Retentie-tracking voor organisaties",
      "Persoonlijk matchingprofiel voor vrijwilligers",
      "Pilot in Heemstede (2025)",
    ],
    stats: { label: "Hogere retentie", value: "90%" },
    status: "Actief in pilot",
  },
  {
    id: "pootgelukkig",
    icon: PawPrint,
    name: "Pootgelukkig.nl",
    url: "https://pootgelukkig.nl",
    tagline: "Dierenliefhebbers verbinden",
    color: "amber",
    description:
      "Huisdieren verbinden mensen op een unieke manier. Pootgelukkig.nl brengt dierenliefhebbers samen voor uitlaathulp, oppas en gezelschap.",
    longDescription:
      "Een hond is de perfecte reden om een gesprek te beginnen. Pootgelukkig.nl maakt gebruik van die magie om mensen te verbinden — niet alleen de dieren, maar ook hun baasjes.",
    features: [
      "Uitlaathulp en hondenoppas matching",
      "Buurt-gebaseerde verbindingen",
      "Veilige profielverificatie",
      "Geschikt voor ouderen en mensen met beperking",
    ],
    stats: { label: "Deelnemers bereikt", value: "263+" },
    status: "Actief platform",
  },
  {
    id: "samenvaren",
    icon: Anchor,
    name: "Samenvaren.nl",
    url: "https://samenvaren.nl",
    tagline: "Verbinden via het water",
    color: "blue",
    description:
      "Het water heeft iets dat mensen openbreekt. Samenvaren.nl verbindt mensen via gedeelde beleving op het water — van een rustige toertocht tot een avontuurlijke dagtrip.",
    longDescription:
      "Op het water verdwijnen sociale barrières. Samen varen creëert gesprekken die op het land nooit zouden ontstaan. Samenvaren.nl faciliteert die ontmoetingen — voor iedereen.",
    features: [
      "Toertochten voor alle niveaus",
      "Matching op ervaringsniveau en locatie",
      "Inclusieve vaartochten met aangepaste boten",
      "Evenementen en dagtrips",
    ],
    stats: { label: "Tevredenheid deelnemers", value: "95%" },
    status: "Actief platform",
  },
];

const colorConfig = {
  purple: {
    bg: "bg-purple-50",
    icon: "bg-purple-100 text-purple-600",
    badge: "bg-purple-100 text-purple-600",
    button: "bg-purple-600 hover:bg-purple-700 text-white",
    check: "text-purple-600",
    border: "border-purple-200",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "bg-amber-100 text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    button: "bg-amber-500 hover:bg-amber-600 text-white",
    check: "text-amber-600",
    border: "border-amber-200",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-100 text-blue-600",
    badge: "bg-blue-100 text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    check: "text-blue-600",
    border: "border-blue-200",
  },
};

export default function PlatformsPage() {
  return (
    <>
      <main className="pt-[72px]">
        {/* Hero */}
        <section className="py-20 bg-purple-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-purple-600 text-sm font-semibold uppercase tracking-wider">
              Onze initiatieven
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-dark">
              Drie platforms, één missie
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Elk platform richt zich op een andere vorm van verbinding. Maar de kern is
              altijd hetzelfde: mensen bij elkaar brengen op basis van wie ze zijn.
            </p>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              const colors = colorConfig[platform.color as keyof typeof colorConfig];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={platform.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                    !isEven ? "lg:flex lg:flex-row-reverse" : ""
                  }`}
                  id={platform.id}
                >
                  {/* Visual */}
                  <div className={`${colors.bg} rounded-3xl p-12 flex items-center justify-center min-h-64`}>
                    <div className="text-center">
                      <div className={`w-20 h-20 ${colors.icon} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                        <Icon size={36} />
                      </div>
                      <div className={`inline-block px-4 py-1.5 ${colors.badge} text-sm font-medium rounded-full mb-3`}>
                        {platform.status}
                      </div>
                      <div className="mt-4">
                        <p className="text-4xl font-bold text-dark">{platform.stats.value}</p>
                        <p className="text-gray-500 text-sm mt-1">{platform.stats.label}</p>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-gray-400 text-sm font-medium">{platform.tagline}</span>
                      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-dark">
                        {platform.name}
                      </h2>
                    </div>

                    <p className="text-gray-500 text-base leading-relaxed">
                      {platform.description}
                    </p>
                    <p className="text-gray-500 text-base leading-relaxed">
                      {platform.longDescription}
                    </p>

                    <ul className="space-y-3">
                      {platform.features.map((feature) => (
                        <li key={feature} className="flex items-start space-x-3">
                          <CheckCircle className={`${colors.check} flex-shrink-0 mt-0.5`} size={18} />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-2 px-6 py-3 ${colors.button} rounded-xl font-semibold transition-colors`}
                    >
                      <span>Bezoek {platform.name}</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
