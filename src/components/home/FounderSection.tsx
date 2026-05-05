import Image from "next/image";

export default function FounderSection() {
  return (
    <section className="py-16 md:py-24 px-8 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <span className="text-xs uppercase tracking-widest font-label mb-10 block" style={{ color: "#6B4CA0" }}>
          De oprichter
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Portret */}
          <div className="relative">
            <div className="aspect-[4/5] bg-[#F3EFFE] overflow-hidden flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Stichting Philia"
                width={100}
                height={100}
                className="object-contain opacity-15"
              />
              <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest font-label" style={{ color: "#6B4CA0", opacity: 0.5 }}>
                Portret volgt
              </span>
            </div>
            {/* Decoratief paars blok */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 hidden md:block" style={{ backgroundColor: "#6B4CA0" }} />
          </div>

          {/* Quote + handtekening */}
          <div className="flex flex-col gap-8">
            <p className="font-serif text-2xl md:text-[28px] leading-relaxed italic" style={{ color: "#6B4CA0" }}>
              &ldquo;Ik wist niet dat het mij zo zou raken. Maar eenzaamheid laat je niet
              los als je het van dichtbij ziet. In het vliegtuig terug beloofde ik iets
              te doen.&rdquo;
            </p>

            <div className="border-t pt-8" style={{ borderColor: "#E8DFFD" }}>
              <span
                className="font-signature block mb-1"
                style={{ fontSize: "2.8rem", lineHeight: 1.1, color: "#6B4CA0" }}
              >
                Vincent van Münster
              </span>
              <span className="text-xs uppercase tracking-widest font-label" style={{ color: "#777777" }}>
                Oprichter &amp; Bestuurder — Stichting Philia
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { label: "Opgericht", value: "2014" },
                { label: "Actief sinds", value: "2009" },
                { label: "Platforms", value: "3" },
                { label: "Bereikt", value: "263+" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-serif text-2xl font-bold" style={{ color: "#6B4CA0" }}>{s.value}</span>
                  <span className="text-xs uppercase tracking-widest font-label" style={{ color: "#777777" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
