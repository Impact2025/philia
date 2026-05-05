import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey === "your-openrouter-key-here") {
    return new Response(
      JSON.stringify({ error: "OpenRouter API key not configured" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const systemPrompt = `Je bent Phil, de vriendelijke digitale assistent van Stichting Philia. Je helpt bezoekers met vragen over de stichting, onze platforms en onze missie.

Over Stichting Philia:
- Opgericht in 2014 door Vincent van Münster
- Missie: mensen verbinden die anders langs elkaar heen leven
- Platforms: Vrijwilligersmatch.nl, Pootgelukkig.nl, Samenvaren.nl
- Al meer dan 10 jaar actief, meer dan 263 deelnemers bereikt

Richtlijnen:
- Antwoord altijd in het Nederlands
- Wees warm, behulpzaam en beknopt
- Als je iets niet weet, verwijs naar contact@stichtingphilia.nl
- Moedig mensen aan om de platforms te ontdekken
- Maximum 3-4 zinnen per antwoord`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
      "X-Title": "Stichting Philia - Phil Chat",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-haiku",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: true,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "AI service unavailable" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") {
                controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(
                    new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`)
                  );
                }
              } catch {
                // Skip malformed lines
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
