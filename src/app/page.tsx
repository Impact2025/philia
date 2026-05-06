import { Metadata } from "next";
import NextImage from "next/image";
import TimelineSlider from "@/components/home/TimelineSlider";

export const metadata: Metadata = {
  title: "Stichting Philia | Verbinding voor iedereen",
  description:
    "Stichting Philia bouwt platforms die mensen bij elkaar brengen. Al meer dan 10 jaar creëren we geluksmomenten voor mensen die anders langs elkaar heen leven.",
};

export default function HomePage() {
  return (
    <div className="philia-page">

      <main>
        <section className="hero">
          <div className="hero-left">
            <div className="eyebrow">
              <div className="eyebrow-dot"></div>
              <span className="eyebrow-text">Stichting Philia</span>
            </div>
            <h1>De juiste match verandert alles.</h1>
            <p className="hero-sub">
              Stichting Philia ontwikkelt en borgt platforms die technologie inzetten als
              correctiemechanisme — zodat de verbinding tot stand komt die mens en samenleving
              al lang zoeken, maar zonder slimme matching niet vinden.
            </p>
            <div className="hero-actions">
              <a className="btn-fill" href="/#platforms">Bekijk onze platforms →</a>
              <a className="btn-ghost-text" href="/#contact">Steun de uitrol →</a>
            </div>
          </div>
          <div className="hero-right">
            <NextImage alt="Twee vrouwen lachen samen in het park" src="/hero.png" fill style={{ objectFit: "cover", objectPosition: "center 22%" }} />
          </div>
        </section>

        <section className="problem">
          <div className="wrap">
            <div>
              <span className="label on-dark">Het probleem</span>
              <p className="problem-statement">Goede intenties.<br />Verkeerde aansluiting.</p>
            </div>
            <div>
              <h2>Vraag en aanbod vinden elkaar niet — niet door gebrek aan wil, maar door gebrek aan systeem.</h2>
              <p>
                Duizenden mensen willen iets goeds doen. Duizenden organisaties zoeken naar hulp.
                Ze vinden elkaar niet, omdat de weg erheen als ouderwets en bureaucratisch wordt
                ervaren. Het probleem zit niet in de intentie. Het zit in het systeem.
                Philia borgt de platforms die dat systeem vernieuwen.
              </p>
            </div>
          </div>
        </section>

        <section className="mission" id="over-ons">
          <div className="wrap">
            <div className="mission-panel">
              <span className="mission-tag">Missie</span>
              <h3>De drempel verlagen voor maatschappelijke impact.</h3>
              <p>Philia borgt platforms die technologie inzetten als correctiemechanisme: om de verbinding te leggen die mens en samenleving zoeken, maar zonder het juiste systeem niet vinden.</p>
            </div>
            <div className="mission-panel">
              <span className="mission-tag">Visie</span>
              <h3>Een samenleving waar de juiste match altijd mogelijk is.</h3>
              <p>Wij geloven dat technologie de kracht heeft om menselijke inefficiënties te corrigeren — niet door mensen te vervangen, maar door ze beter te verbinden met wat en wie écht bij hen past.</p>
            </div>
          </div>
        </section>

        <section className="values">
          <div className="wrap">
            <div className="values-header">
              <span className="label">Kernwaarden</span>
              <h2 className="section-title">Waar we voor staan.</h2>
            </div>
            <div className="values-list">
              <div className="value-row">
                <span className="value-n">01</span>
                <span className="value-title">Gelijkwaardigheid</span>
                <span className="value-desc">Iedereen verdient dezelfde kans op verbinding — groot en klein, sterk en kwetsbaar.</span>
              </div>
              <div className="value-row">
                <span className="value-n">02</span>
                <span className="value-title">Geluksmomenten</span>
                <span className="value-desc">Een match die écht klopt heeft meer effect dan tien vluchtige contacten. Alles wat we bouwen is gericht op de kwaliteit van de verbinding.</span>
              </div>
              <div className="value-row">
                <span className="value-n">03</span>
                <span className="value-title">Verbinding door motivatie</span>
                <span className="value-desc">We matchen mensen op basis van wie ze zijn, niet op wat ze kunnen of hebben.</span>
              </div>
              <div className="value-row">
                <span className="value-n">04</span>
                <span className="value-title">Veiligheid als basis</span>
                <span className="value-desc">Vertrouwen is de voorwaarde voor echte verbinding. Technisch, menselijk en organisatorisch.</span>
              </div>
              <div className="value-row">
                <span className="value-n">05</span>
                <span className="value-title">Doen wat werkt</span>
                <span className="value-desc">Geen denktank maar een doe-organisatie. We bouwen, testen, leren en verbeteren.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="philosophy">
          <div className="wrap">
            <span className="label">De filosofie</span>
            <h2>Wij geloven in de kracht van de juiste match.</h2>
            <p className="philo-lead">
              Een vrijwilliger die écht past bij een organisatie geeft meer en blijft langer.
              Een match die klopt is niet alleen prettiger — het is effectiever, duurzamer
              en maatschappelijk waardevoller. Dat is de overtuiging achter alles wat Philia bouwt.
            </p>
            <div className="philo-rule"></div>
            <p className="philo-body">
              Wij doen dat niet met campagnes of goede bedoelingen. Wij borgen systemen die
              de menselijke neiging tot de snelle klik corrigeren met objectieve data.
              De intake vervangt de emotie. De match vervangt het toeval.
            </p>
          </div>
        </section>

        <section className="approach">
          <div className="wrap">
            <div className="approach-header">
              <span className="label">De aanpak</span>
              <h2 className="section-title">Tien jaar bouwen aan echte verbinding.</h2>
            </div>
            <div className="approach-grid">
              <div className="approach-card">
                <span className="approach-n">01</span>
                <div className="approach-bar"></div>
                <h3>Matching die kloppen geeft</h3>
                <p>Onze platforms matchen op motivatie, karakter en levensstijl — niet op uiterlijk of beschikbaarheid. Technologie als correctiemechanisme voor menselijk gedrag.</p>
              </div>
              <div className="approach-card">
                <span className="approach-n">02</span>
                <div className="approach-bar"></div>
                <h3>Systemen die centraliseren</h3>
                <p>Van versnipperde eilandjes naar één centraal platform. Elke organisatie, elke vrijwilliger, elke aanvraag op één plek. Zo maak je schaal.</p>
              </div>
              <div className="approach-card">
                <span className="approach-n">03</span>
                <div className="approach-bar"></div>
                <h3>Impact die blijft</h3>
                <p>Geborgd door een onafhankelijke stichting met een lopende ANBI-aanvraag. Elk platform dat Philia huisvest blijft werken — ongeacht wie er aan het roer staat.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="timeline">
          <div className="wrap">
            <div className="timeline-header">
              <span className="label">Van 2009 tot nu</span>
              <h2 className="section-title">Een organisatie in beweging.</h2>
            </div>
            <TimelineSlider />
          </div>
        </section>

        <section className="impact">
          <div className="wrap">
            <p className="impact-statement">Actief in verbinding maken sinds&nbsp;2009</p>
          </div>
        </section>

        <section className="conviction">
          <div className="wrap">
            <span className="label">De overtuiging</span>
            <h2 className="conviction-title">Echte ontmoetingen. Slimme technologie.</h2>
            <p className="conviction-lead">
              Meer dan tien jaar werken met mensen die echt eenzaam zijn heeft ons één ding geleerd:
              niets vervangt een echte ontmoeting. Maar technologie kan ervoor zorgen dat die
              ontmoetingen vaker plaatsvinden — voor meer mensen, op het juiste moment.
            </p>
            <div className="conviction-split">
              <div className="conviction-side">
                <span className="conviction-tag">De ontmoeting is het doel</span>
                <h3>Technologie neemt de drempel weg.</h3>
                <p>
                  Het echte moment vindt altijd fysiek plaats. Een vrijwilliger die aanbelt.
                  Een match die uitgroeit tot iets blijvends. Dat is waarom de kwaliteit
                  van de match zo belangrijk is — technologie bereidt voor, de mens voltooit.
                </p>
              </div>
              <div className="conviction-rule"></div>
              <div className="conviction-side">
                <span className="conviction-tag">Algoritmen als correctiemechanisme</span>
                <h3>Kijken verder dan het plaatje.</h3>
                <p>
                  Niet het uiterlijk, niet de eerste indruk — maar de compatibiliteit op
                  karakter, motivatie en levensstijl. Slimme matching verhoogt de kans op
                  een duurzame verbinding en voorkomt de mismatch die leidt tot uitval of terugkomst.
                </p>
              </div>
            </div>
            <div className="conviction-footer">
              <p className="conviction-future">
                De komende jaren bouwen we de platforms die beide werelden samenbrengen —{" "}
                <em>voor meer mensen, in meer sectoren, met meer impact.</em>
              </p>
            </div>
          </div>
        </section>


        <section className="founder">
          <div className="wrap">
            <div className="founder-img-wrap">
              <div className="founder-img-bg"></div>
              <NextImage
                src="/images/Vincent van Munster.webp"
                alt="Vincent van Münster, oprichter Stichting Philia"
                className="founder-portrait-img"
                width={480}
                height={640}
              />
            </div>
            <div className="founder-content">
              <span className="label">De oprichter</span>
              <h2>Gebouwd door iemand die het meent.</h2>
              <div className="founder-quote">
                <p>Ik wist niet dat het mij zo zou raken. Maar eenzaamheid laat je niet los als je het van dichtbij ziet. In het vliegtuig terug beloofde ik iets te doen.</p>
                <cite>Vincent van Münster, Oprichter &amp; Bestuurder, Stichting Philia</cite>
              </div>
              <p className="founder-body">
                Vincent van Münster richtte Stichting Philia op vanuit een persoonlijke ervaring
                die hem niet losliet. Die ervaring groeide uit tot een overtuiging: dat technologie
                de kracht heeft om maatschappelijke mismatches te corrigeren. Sindsdien ontwikkelt
                hij de platforms die dat bewijzen, ondersteund door een onafhankelijk bestuur
                dat de stichting stevig verankert.
              </p>
              <div className="founder-tags">
                <span className="tag">Opgericht 2014</span>
                <span className="tag">Actief sinds 2009</span>
                <span className="tag">ANBI-aanvraag loopt</span>
              </div>
            </div>
          </div>
        </section>

        <section className="partners">
          <div className="wrap">
            <span className="partners-label">Impact gemaakt met o.a.</span>
            <div className="partners-logos">
              <NextImage src="/images/partners/Logo Oranje Fonds.png" alt="Oranje Fonds" className="partner-logo" width={160} height={36} />
              <NextImage src="/images/partners/Stichting-Ruigrok.png" alt="Stichting Ruigrok" className="partner-logo" width={160} height={36} />
              <NextImage src="/images/partners/2021Rabo-Foundation.webp" alt="Rabobank Foundation" className="partner-logo" width={160} height={36} />
              <NextImage src="/images/partners/gemeente-utrecht-1-logo.png" alt="Gemeente Utrecht" className="partner-logo" width={160} height={36} />
              <NextImage src="/images/partners/Anton Jurgens fonds.png" alt="Anton Jurgens Fonds" className="partner-logo" width={160} height={36} />
              <NextImage src="/images/partners/delongh logo.png" alt="De Longh" className="partner-logo" width={160} height={36} />
              <NextImage src="/images/partners/Gemeente Haarlemmermeer Subsidie.png" alt="Gemeente Haarlemmermeer" className="partner-logo" width={160} height={36} />
            </div>
          </div>
        </section>

        <section className="stewardship">
          <div className="wrap">
            <span className="label">De structuur</span>
            <div className="stewardship-grid">
              <div className="stewardship-left">
                <h2>Geborgd voor de lange termijn.</h2>
                <p className="stewardship-lead">
                  Stichting Philia is de juridische en bestuurlijke thuis voor de platforms
                  en projecten die volgen. Als stichting met een onafhankelijk bestuur
                  en een lopende ANBI-aanvraag garandeert Philia dat de platforms blijven
                  werken — ongeacht wie er aan het roer staat.
                </p>
                <p className="stewardship-statement">
                  Je investeert niet in een persoon.<br />Je investeert in een structuur die de missie borgt.
                </p>
              </div>
              <div className="stewardship-pillars">
                <div className="stewardship-pillar">
                  <span className="pillar-n">01</span>
                  <div>
                    <span className="pillar-title">ANBI-aanvraag loopt</span>
                    <p>De aanvraag is ingediend. Na toekenning zijn giften fiscaal aftrekbaar. Volledige transparantie in verantwoording.</p>
                  </div>
                </div>
                <div className="stewardship-pillar">
                  <span className="pillar-n">02</span>
                  <div>
                    <span className="pillar-title">Onafhankelijk bestuur</span>
                    <p>De stichting functioneert onafhankelijk van de oprichter. Continuïteit gewaarborgd.</p>
                  </div>
                </div>
                <div className="stewardship-pillar">
                  <span className="pillar-n">03</span>
                  <div>
                    <span className="pillar-title">Meer projecten volgen</span>
                    <p>Pootgelukkig en Samenvaren zijn de eerste. Philia is de paraplu waaronder meer impactvolle projecten een thuis vinden.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="wrap">
            <div className="cta-box">
              <div className="cta-orb"></div>
              <div className="cta-text">
                <span className="label on-dark">Doe mee</span>
                <h2>Maak de uitrol mogelijk.</h2>
                <p>Onze platforms werken — de verbindingen zijn er. Wat ontbreekt is structurele financiering voor verdere groei. Als fonds, gemeente of partner investeer je direct in een bewezen aanpak, geborgd door een stichting met een onafhankelijk bestuur en een lopende ANBI-aanvraag.</p>
              </div>
              <a className="btn-cta" href="/#contact">Neem contact op →</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="philia-footer">
        <div className="footer-grid">
          <div>
            <a className="footer-logo" href="/">
              <NextImage src="/images/logo.png" alt="Stichting Philia" width={30} height={30} />
              <span className="footer-logo-name">Stichting Philia</span>
            </a>
            <p className="footer-desc">Philia borgt platforms die technologie inzetten als correctiemechanisme voor maatschappelijke impact. Actief in verbinding maken sinds 2009.</p>
            <div className="footer-anbi"><div className="anbi-dot"></div>ANBI-aanvraag loopt</div>
            <div className="social-links">
              <a className="social-link" href="https://www.facebook.com/stichtingphilia/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a className="social-link" href="https://x.com/stichtingphilia" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <p className="footer-col-title">Navigatie</p>
            <ul className="philia-footer-links">
              <li><a href="/over-ons">Ons verhaal</a></li>
              <li><a href="/#platforms">Platforms</a></li>
              <li><a href="/#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Platforms</p>
            <ul className="philia-footer-links">
              <li><a href="https://pootgelukkig.nl" target="_blank" rel="noopener noreferrer">Pootgelukkig.nl</a></li>
              <li><a href="https://samenvaren.nl" target="_blank" rel="noopener noreferrer">Samenvaren.nl</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Contact</p>
            <a className="footer-contact-link" href="mailto:hallo@stichtingphilia.nl"><div className="footer-cdot"></div>hallo@stichtingphilia.nl</a>
            <a className="footer-contact-link" href="#"><div className="footer-cdot"></div>Hoofddorp, Nederland</a>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2026 Stichting Philia</p></div>
      </footer>
    </div>
  );
}
