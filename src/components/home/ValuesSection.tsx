const values = [
  { title: "Gelijkwaardigheid", body: "Iedereen verdient dezelfde kans op verbinding — groot en klein, sterk en kwetsbaar." },
  { title: "Geluksmomenten", body: "Eén gesprek kan iemands week veranderen. Alles wat we bouwen is gericht op die momenten." },
  { title: "Verbinding door motivatie", body: "We matchen mensen op basis van wie ze zijn — niet op wat ze kunnen of hebben." },
  { title: "Veiligheid als basis", body: "Vertrouwen is de voorwaarde voor echte verbinding. Technisch, menselijk en organisatorisch." },
  { title: "Doen wat werkt", body: "Geen denktank maar een doe-organisatie. We bouwen, testen, leren en verbeteren." },
];

export default function ValuesSection() {
  return (
    <section className="py-16 md:py-20 px-8 bg-surface-container-lowest">
      <div className="max-w-[1440px] mx-auto">
        <h3 className="text-xs uppercase tracking-widest text-accent font-label mb-16">
          Kernwaarden
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/20">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-surface-container-lowest p-10 flex flex-col gap-4 hover:bg-[#F5F0FF] transition-colors"
            >
              <h4 className="font-serif text-xl text-primary">{v.title}</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
          <div className="bg-surface-container-lowest p-10 hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
