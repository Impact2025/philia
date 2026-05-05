const partners = [
  "Gemeente Haarlemmermeer",
  "Oranje Fonds",
  "Nyenrode Business Universiteit",
  "WeAreImpact",
];

export default function PartnersSection() {
  return (
    <section className="py-20 px-8 bg-surface-container-lowest border-t border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-12">
        <span className="text-xs uppercase tracking-widest text-outline font-label flex-shrink-0">
          Samenwerking met
        </span>
        <div className="flex flex-wrap items-center gap-8 md:gap-12">
          {partners.map((p) => (
            <span key={p} className="text-sm text-on-surface-variant font-medium">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
