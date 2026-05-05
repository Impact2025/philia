"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const ITEMS = [
  { year: "2009", title: "De reis die alles veranderde", desc: "Een vakantie als vrijwilliger met mensen met een beperking. Achter gelukkige gezichten: diepe eenzaamheid thuis.", key: true },
  { year: "2009", title: "OogvoorLiefde.nl", desc: "De grootste datingsite voor mensen met een beperking in Nederland. Duizenden mensen vinden elkaar.", key: false },
  { year: "2013", title: "DatingAssistent.nl", desc: "Persoonlijke begeleiding voor mensen die de stap naar online contact te groot vinden. Televisieprogramma's, landelijke evenementen.", key: false },
  { year: "2014", title: "Stichting Philia opgericht", desc: "De stichting wordt opgericht. Naam: het oud-Griekse woord voor vriendschap.", key: true },
  { year: "2015", title: "Pilot Oog voor Vriendschap", desc: "Met Gemeente Haarlemmermeer en het Oranje Fonds. Eerste bewijs dat de aanpak werkt.", key: false },
  { year: "2020", title: "Corona & verbinding", desc: "50+ online evenementen. 263 deelnemers bereikt. Mensen leren zelf events organiseren.", key: false },
  { year: "2025", title: "Vrijwilligersmatch v1.0", desc: "AI matching op motivatie. Het meest ambitieuze platform tot nu toe. Klaar voor pilot Heemstede.", key: true },
  { year: "2026", title: "Philia als paraplu", desc: "Alle projecten onder één stichting. Eén missie, één bestuur dat borgt dat de impact doorgaat — ongeacht wie er aan het roer staat.", key: true },
];

const GAP = 24;

export default function TimelineSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardW, setCardW] = useState(0);
  const [cardCount, setCardCount] = useState(3);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!viewRef.current) return;
      const vw = viewRef.current.offsetWidth;
      const count = vw < 600 ? 1 : vw < 960 ? 2 : 3;
      setCardCount(count);
      setCardW((vw - GAP * (count - 1)) / count);
    };
    update();
    const ro = new ResizeObserver(update);
    if (viewRef.current) ro.observe(viewRef.current);
    return () => ro.disconnect();
  }, []);

  const maxIndex = Math.max(0, ITEMS.length - cardCount);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(i, maxIndex)));
  }, [maxIndex]);

  const next = useCallback(() => {
    goTo(index >= maxIndex ? 0 : index + 1);
  }, [index, maxIndex, goTo]);

  const prev = useCallback(() => {
    goTo(index <= 0 ? maxIndex : index - 1);
  }, [index, maxIndex, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  const offset = cardW > 0 ? index * (cardW + GAP) : 0;

  return (
    <div
      className="tl-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="tl-slider-viewport" ref={viewRef}>
        <div
          className="tl-slider-track"
          style={{ transform: `translateX(-${offset}px)`, gap: `${GAP}px` }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className={`tl-card${item.key ? " tl-card-key" : ""}`}
              style={{ flex: `0 0 ${cardW > 0 ? cardW : 300}px` }}
            >
              <span className="tl-card-year">{item.year}</span>
              <h4 className="tl-card-title">{item.title}</h4>
              <p className="tl-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="tl-slider-footer">
        <button className="tl-nav-btn" onClick={prev} aria-label="Vorige">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="tl-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`tl-dot${i === index ? " tl-dot-active" : ""}`}
              aria-label={`Positie ${i + 1}`}
            />
          ))}
        </div>
        <button className="tl-nav-btn" onClick={next} aria-label="Volgende">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
