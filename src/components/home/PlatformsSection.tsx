const platforms = [
  {
    tag: "Dieren & mensen",
    name: "Pootgelukkig.nl",
    description: "Dierenliefhebbers vinden elkaar voor uitlaathulp, oppas en gezelschap — verbinding via de viervoeter die niemand hoeft te missen.",
    stat: "Actief",
    href: "https://pootgelukkig.nl",
  },
  {
    tag: "Water & beleving",
    name: "Samenvaren.nl",
    description: "Het water breekt mensen open. Gedeelde beleving op het water creëert vriendschappen die anders nooit waren ontstaan.",
    stat: "Actief",
    href: "https://samenvaren.nl",
  },
];

export default function PlatformsSection() {
  return (
    <section className="py-16 md:py-20 px-8 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <span className="text-xs uppercase tracking-widest text-accent font-label">
            Onze platforms
          </span>
          <span className="text-xs text-secondary font-label">2 platforms, 1 missie</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-accent/10">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-8 flex flex-col gap-4 hover:bg-[#F3EFFE] transition-colors border-t-2 border-transparent hover:border-accent"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-accent font-label bg-accent/10 px-2 py-1">
                  {p.tag}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-secondary font-label">
                  {p.stat}
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-primary leading-tight">
                {p.name}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
                {p.description}
              </p>
              <div className="flex items-center gap-2 text-accent text-sm font-medium mt-2">
                Bezoek platform
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
