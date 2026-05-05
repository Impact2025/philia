const stats = [
  { value: "10+", label: "Jaar actief" },
  { value: "3", label: "Platforms" },
  { value: "263+", label: "Deelnemers bereikt" },
  { value: "90%", label: "Meer zelfvertrouwen" },
  { value: "95%", label: "Positief welzijnseffect" },
];

export default function ImpactSection() {
  return (
    <section className="py-16 md:py-20 px-8 bg-accent">
      <div className="max-w-[1440px] mx-auto">
        <h3 className="text-xs uppercase tracking-widest text-white/60 font-label mb-20">
          Meetbare impact
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="font-serif text-5xl md:text-6xl text-white mb-3">{s.value}</span>
              <span className="text-xs uppercase tracking-widest text-white/60 font-label leading-relaxed">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
