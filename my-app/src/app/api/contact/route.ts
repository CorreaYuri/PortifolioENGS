import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export async function POST(req: Request) {
  try {
    const key = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL ?? "fratello.yuri@gmail.com"
    const from = process.env.CONTACT_FROM_EMAIL

    if (!key || !to || !from) {
      return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 })
    }

    const body = await req.json()
    const name = String(body?.name ?? "").trim()
    const email = String(body?.email ?? "").trim()
    const message = String(body?.message ?? "").trim()

    if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>")
    const resend = new Resend(key)

    const result = await resend.emails.send({
      from,
      to,
      subject: `Novo contato do portfólio - ${name}`,
      replyTo: email,
      html: `
        <div>
          <p><b>Nome:</b> ${safeName}</p>
          <p><b>Email:</b> ${safeEmail}</p>
          <p><b>Mensagem:</b><br/>${safeMessage}</p>
        </div>
      `,
    })

    if (result.error) {
      return NextResponse.json({ ok: false, error: "email_failed", detail: result.error }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    console.error("[CONTACT] server_error", e)
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}
