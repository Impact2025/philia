import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const nieuws = await prisma.category.upsert({
    where: { slug: "nieuws" },
    update: {},
    create: { name: "Nieuws", slug: "nieuws" },
  });

  const impact = await prisma.category.upsert({
    where: { slug: "impact" },
    update: {},
    create: { name: "Impact", slug: "impact" },
  });

  const platforms = await prisma.category.upsert({
    where: { slug: "platforms" },
    update: {},
    create: { name: "Platforms", slug: "platforms" },
  });

  // Create sample posts
  await prisma.post.upsert({
    where: { slug: "vrijwilligersmatch-klaar-voor-pilot" },
    update: {},
    create: {
      title: "Vrijwilligersmatch.nl klaar voor pilot in Heemstede",
      slug: "vrijwilligersmatch-klaar-voor-pilot",
      excerpt:
        "Na jaren van ontwikkeling is ons meest ambitieuze platform eindelijk klaar. Vrijwilligersmatch.nl matcht vrijwilligers op motivatie — niet op vaardigheden.",
      content: `<h2>Een nieuw tijdperk voor vrijwilligerswerk</h2>
<p>Na jaren van onderzoek, ontwikkeling en testen lanceren we met trots Vrijwilligersmatch.nl — een platform dat vrijwilligerswerk fundamenteel anders aanpakt.</p>
<p>De meeste platforms voor vrijwilligerswerk matchen op basis van vaardigheden: wat kan jij, en wat heeft de organisatie nodig? Maar uit ons onderzoek blijkt dat retentie en tevredenheid veel meer afhangen van motivatie. <em>Waarom</em> iemand vrijwilligerswerk doet, bepaalt of hij of zij ook over een jaar nog actief is.</p>
<h2>Hoe het werkt</h2>
<p>Vrijwilligersmatch.nl gebruikt een slim matching-algoritme dat vrijwilligers en organisaties koppelt op basis van drijfveren, waarden en persoonlijkheid. Het resultaat: hogere retentie, betere matches en minder uitval.</p>
<p>De pilot start in Heemstede en omgeving. We werken samen met lokale organisaties die op zoek zijn naar gemotiveerde vrijwilligers — van zorginstellingen tot buurtverenigingen.</p>
<h2>Doe mee</h2>
<p>Ben jij een organisatie in de regio Heemstede die op zoek is naar vrijwilligers? Of wil je zelf als vrijwilliger aan de slag? Meld je aan via vrijwilligersmatch.nl en maak deel uit van de pilot.</p>`,
      status: "published",
      publishedAt: new Date("2025-03-15"),
      categoryId: platforms.id,
      tags: "vrijwilligers,matching,pilot,heemstede",
      metaTitle: "Vrijwilligersmatch.nl klaar voor pilot in Heemstede | Stichting Philia",
      metaDescription:
        "Stichting Philia lanceert Vrijwilligersmatch.nl: een platform dat vrijwilligers matcht op motivatie. Pilot start in Heemstede.",
    },
  });

  await prisma.post.upsert({
    where: { slug: "263-deelnemers-oog-voor-vriendschap" },
    update: {},
    create: {
      title: "263 deelnemers bereikt met Oog voor Vriendschap 2.0",
      slug: "263-deelnemers-oog-voor-vriendschap",
      excerpt:
        "Tijdens de coronaperiode organiseerden we meer dan 50 online evenementen. 263 mensen die anders thuis hadden gezeten, vonden verbinding.",
      content: `<h2>Verbinding in tijden van isolatie</h2>
<p>De coronapandemie bracht voor iedereen uitdagingen, maar voor mensen met een beperking was de isolatie extra hard. Dagactiviteiten vielen weg, contacten verdwenen en eenzaamheid nam toe.</p>
<p>Stichting Philia reageerde met een simpele vraag: hoe kunnen we verbinding creëren als fysieke ontmoeting niet mogelijk is? Het antwoord was Oog voor Vriendschap 2.0 — een serie online evenementen die mensen samenbrachten via hun scherm.</p>
<h2>Meer dan 50 evenementen</h2>
<p>Tussen 2020 en 2022 organiseerden we 52 online evenementen. Kookworkshops, muziekmiddagen, spelletjesavonden, filmclubs — voor elk wat wils. In totaal bereikten we 263 unieke deelnemers.</p>
<p>Maar het echte succes was iets anders: deelnemers leerden zelf events te organiseren. We trainden 18 "event-hosts" die voortaan zelf bijeenkomsten leidden. Zo creëerden we een zelfstandige gemeenschap.</p>
<h2>Wat we leerden</h2>
<p>Online verbinding is geen vervanging voor fysiek contact, maar het heeft zijn eigen kracht. Mensen die thuis niet gemakkelijk kunnen komen, kunnen online wél aanwezig zijn. De drempel is lager. De bereikbaarheid groter.</p>
<p>Deze inzichten nemen we mee in alles wat we nu bouwen.</p>`,
      status: "published",
      publishedAt: new Date("2025-01-20"),
      categoryId: impact.id,
      tags: "impact,corona,evenementen,vriendschap",
      metaTitle: "263 deelnemers bereikt met Oog voor Vriendschap 2.0 | Stichting Philia",
      metaDescription:
        "Tijdens corona organiseerde Stichting Philia meer dan 50 online evenementen voor mensen met een beperking. 263 mensen vonden verbinding.",
    },
  });

  await prisma.post.upsert({
    where: { slug: "philia-als-paraplu-2026" },
    update: {},
    create: {
      title: "Philia als paraplu: één missie, drie platforms, één bestuur",
      slug: "philia-als-paraplu-2026",
      excerpt:
        "In 2026 brengen we alle platforms onder één dak. Vrijwilligersmatch.nl, Pootgelukkig.nl en Samenvaren.nl worden één geïntegreerd ecosysteem.",
      content: `<h2>Een nieuwe fase voor Stichting Philia</h2>
<p>Na meer dan tien jaar bouwen, experimenteren en leren, is het tijd voor de volgende stap. In 2026 bundelen we onze krachten: alle platforms worden ondergebracht onder de paraplu van Stichting Philia.</p>
<p>Wat betekent dit in de praktijk? Vrijwilligersmatch.nl, Pootgelukkig.nl en Samenvaren.nl blijven onafhankelijke platforms met hun eigen identiteit en gemeenschap. Maar ze delen nu één bestuur, één technologische infrastructuur en één visie.</p>
<h2>Waarom deze stap?</h2>
<p>Elk platform heeft bewezen dat het werkt. De uitdaging nu is schaalgrootte. Door samen te werken kunnen we efficiënter opereren, kennis delen en sneller groeien.</p>
<p>Maar er is ook een dieper doel: de platforms versterken elkaar. Iemand die via Pootgelukkig.nl een wandelmaatje heeft gevonden, kan via Vrijwilligersmatch.nl een zinvol dagdeel invullen. Verbinding op meerdere niveaus, voor dezelfde persoon.</p>
<h2>Wat je kunt verwachten</h2>
<p>De komende maanden werken we aan een gedeelde gebruikersomgeving. Één profiel, toegang tot alle platforms. Meer verbinding, met minder moeite. Precies zoals het hoort.</p>`,
      status: "published",
      publishedAt: new Date("2026-01-10"),
      categoryId: nieuws.id,
      tags: "organisatie,strategie,platforms,groei",
      metaTitle: "Philia als paraplu: één missie, drie platforms | Stichting Philia",
      metaDescription:
        "In 2026 brengt Stichting Philia alle platforms samen onder één bestuur. Lees over de nieuwe structuur en wat dit betekent.",
    },
  });

  console.log("Seed completed successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
