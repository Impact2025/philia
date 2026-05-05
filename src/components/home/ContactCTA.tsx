import Image from "next/image";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-32 md:py-48 px-8 bg-[#F3EFFE]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        <div className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Stichting Philia"
            width={120}
            height={120}
            className="object-contain opacity-80"
          />
        </div>
        <div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-accent mb-6">
            Samen meer impact maken?
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-xl">
            Of je nu wilt samenwerken, vrijwilliger wilt worden, of gewoon meer wilt
            weten over onze aanpak — we horen graag van je.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Neem contact op
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <a
              href="mailto:hallo@stichtingphilia.nl"
              className="inline-flex items-center gap-2 text-accent border border-accent/30 px-8 py-4 text-sm font-medium hover:bg-white transition-colors"
            >
              hallo@stichtingphilia.nl
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
