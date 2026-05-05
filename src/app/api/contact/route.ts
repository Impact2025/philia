import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Naam, e-mail en bericht zijn verplicht" },
      { status: 400 }
    );
  }

  // In production, integrate with an email service (e.g., Resend, SendGrid)
  // For now, we log and return success
  console.log("Contact form submission:", { name, email, subject, message });

  // Example Resend integration (uncomment and add RESEND_API_KEY to .env.local):
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "noreply@stichtingphilia.nl",
  //   to: "info@stichtingphilia.nl",
  //   subject: `Contactformulier: ${subject || "Nieuw bericht"}`,
  //   html: `<p>Van: ${name} (${email})</p><p>${message}</p>`,
  // });

  return NextResponse.json({ success: true });
}
