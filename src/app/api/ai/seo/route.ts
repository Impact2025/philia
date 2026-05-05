import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, excerpt } = await request.json();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OpenRouter API key niet geconfigureerd" }, { status: 503 });
  }

  const plainText = content
    ? content.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 1500)
    : "";

  const prompt = `Je bent een senior SEO-specialist voor Stichting Philia, een Nederlandse non-profit die verbinding creëert voor mensen die eenzaam zijn. Analyseer de onderstaande blogpost en geef een uitgebreide SEO-optimalisatie terug.

ARTIKEL:
Titel: ${title}
Samenvatting: ${excerpt || "(geen)"}
Inhoud: ${plainText || "(geen inhoud)"}

Geef een JSON-object terug met EXACT deze velden:
{
  "metaTitle": "SEO-paginatitel, max 60 tekens, eindigend op ' | Stichting Philia'",
  "metaDescription": "Overtuigende meta-beschrijving, max 160 tekens, bevat focuszoekterm",
  "excerpt": "Pakkende intro voor het artikel, max 200 tekens",
  "focusKeyword": "De primaire zoekterm waarop dit artikel moet scoren (1-3 woorden)",
  "suggestedTags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "slugSuggestion": "seo-vriendelijke-url-slug-zonder-spaties",
  "readabilityScore": 7,
  "contentTips": [
    "Concrete tip 1 om de inhoud of SEO te verbeteren",
    "Concrete tip 2",
    "Concrete tip 3"
  ]
}

Regels:
- readabilityScore: integer van 1 tot 10 (10 = perfect leesbaar voor breed publiek)
- suggestedTags: altijd exact 5 tags in het Nederlands
- slugSuggestion: lowercase, koppeltekens, geen accenten, geen 'stichting' of 'philia'
- contentTips: maximaal 3 tips, specifiek en actionabel, in het Nederlands
- Antwoord ALLEEN met het JSON-object, geen andere tekst of markdown.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:9850",
      "X-Title": "Stichting Philia Admin",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-haiku",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ error: `OpenRouter fout: ${error}` }, { status: 500 });
  }

  const data = await response.json();
  const text = data.choices[0]?.message?.content || "";

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Geen JSON gevonden in antwoord");
    const seoData = JSON.parse(jsonMatch[0]);
    return NextResponse.json(seoData);
  } catch {
    return NextResponse.json({ error: "AI antwoord kon niet worden verwerkt" }, { status: 500 });
  }
}
