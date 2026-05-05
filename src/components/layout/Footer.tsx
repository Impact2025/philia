import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F3EFFE] w-full py-20 px-8 md:px-24 border-t border-accent/20">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between gap-16">
        <div className="flex flex-col max-w-xs">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <Image
              src="/images/logo.png"
              alt="Stichting Philia logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-serif text-xl font-bold text-accent">Stichting Philia</span>
          </Link>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Mensen verbinden die anders langs elkaar heen leven. Al meer dan 10 jaar
            creëren we geluksmomenten voor iedereen die dat steuntje in de rug nodig heeft.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-accent text-xs uppercase tracking-widest font-label font-semibold mb-2">
              Navigatie
            </span>
            {[
              { href: "/over-ons", label: "Ons verhaal" },
              { href: "/platforms", label: "Platforms" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-on-surface-variant hover:text-accent transition-colors text-sm"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-accent text-xs uppercase tracking-widest font-label font-semibold mb-2">
              Platforms
            </span>
            {[
              { href: "https://vrijwilligersmatch.nl", label: "Vrijwilligersmatch.nl" },
              { href: "https://pootgelukkig.nl", label: "Pootgelukkig.nl" },
              { href: "https://samenvaren.nl", label: "Samenvaren.nl" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-accent transition-colors text-sm"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-accent text-xs uppercase tracking-widest font-label font-semibold mb-2">
              Contact
            </span>
            <a
              href="mailto:hallo@stichtingphilia.nl"
              className="text-on-surface-variant hover:text-accent transition-colors text-sm"
            >
              hallo@stichtingphilia.nl
            </a>
            <span className="text-on-surface-variant text-sm">Hoofddorp, Nederland</span>
            <span className="text-on-surface-variant text-sm">ANBI-aanvraag loopt</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-accent/15">
        <p className="text-on-surface-variant/60 text-sm">
          © {new Date().getFullYear()} Stichting Philia
        </p>
      </div>
    </footer>
  );
}
