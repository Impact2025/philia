export default function StorySection() {
  return (
    <section className="py-16 md:py-24 px-8 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <div>
            <span className="text-xs uppercase tracking-widest text-accent font-label mb-8 block">
              Ons verhaal
            </span>
            <p className="text-lg leading-[1.85] text-on-surface">
              In 2009 stapte Vincent van Münster als vrijwilliger mee op vakantie met
              mensen met een beperking. Wat hij ontdekte veranderde zijn leven: de
              deelnemers waren gelukkiger dan hij ooit was geweest — maar thuis waren
              ze diep eenzaam. Die eenzaamheid liet hem niet los.
            </p>
          </div>
          <div>
            <blockquote className="border-l-2 border-accent pl-8">
              <p className="font-serif text-2xl md:text-3xl italic leading-snug text-accent mb-6">
                &ldquo;Ik wist niet dat het mij zo zou raken. Maar eenzaamheid laat je
                niet los als je het van dichtbij ziet.&rdquo;
              </p>
              <cite className="text-sm text-secondary font-label not-italic">
                Vincent van Münster, oprichter Stichting Philia
              </cite>
            </blockquote>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start mt-16">
          <div className="hidden md:block" />
          <p className="text-lg leading-[1.85] text-on-surface">
            In 2014 richtte hij Stichting Philia op — het oud-Griekse woord voor
            vriendschap. Niet als eindpunt, maar als startschot voor platforms die
            de infrastructuur bouwen die echte verbinding mogelijk maakt.
          </p>
        </div>
      </div>
    </section>
  );
}
