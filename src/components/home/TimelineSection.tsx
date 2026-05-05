const milestones = [
  { year: "2009", title: "De reis die alles veranderde", description: "Een vakantie als vrijwilliger met mensen met een beperking. Achter gelukkige gezichten: diepe eenzaamheid." },
  { year: "2009", title: "OogvoorLiefde.nl", description: "De grootste datingsite voor mensen met een beperking in Nederland. Duizenden mensen vinden elkaar." },
  { year: "2013", title: "DatingAssistent.nl", description: "Persoonlijke begeleiding voor mensen die de stap naar online contact te groot vinden. Tv-programma's, landelijke evenementen." },
  { year: "2014", title: "Stichting Philia", description: "De stichting wordt opgericht. Naam: het oud-Griekse woord voor vriendschap." },
  { year: "2015", title: "Pilot Oog voor Vriendschap", description: "Met Gemeente Haarlemmermeer en het Oranje Fonds. Eerste bewijs dat de aanpak werkt." },
  { year: "2020", title: "Corona & verbinding", description: "50+ online evenementen. 263 deelnemers bereikt. Mensen leren zelf events organiseren." },
  { year: "2025", title: "Vrijwilligersmatch v1.0", description: "AI-matching op motivatie. Het meest ambitieuze platform tot nu toe. Klaar voor pilot Heemstede." },
  { year: "2026", title: "Philia als paraplu", description: "Alle platforms onder één bestuur. Eén missie, drie platforms, één bestuur." },
];

export default function TimelineSection() {
  return (
    <section className="py-16 md:py-20 px-8 bg-[#F3EFFE]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <span className="text-xs uppercase tracking-widest text-[#6B4CA0] font-label">
            Van 2009 tot nu
          </span>
          <span className="font-signature text-2xl text-[#6B4CA0]">Vincent van Münster</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#6B4CA0]/15">
          {milestones.map((m) => (
            <div
              key={`${m.year}-${m.title}`}
              className="bg-[#F3EFFE] hover:bg-white transition-colors p-8 flex flex-col gap-3"
            >
              <span
                className="inline-block text-white text-xs font-label font-bold tracking-widest px-3 py-1 w-fit"
                style={{ backgroundColor: "#6B4CA0" }}
              >
                {m.year}
              </span>
              <h4 className="font-serif text-lg leading-snug" style={{ color: "#1a1c1c" }}>
                {m.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "#474747" }}>
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
