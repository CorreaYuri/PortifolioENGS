import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs" // importante para libs node no serverless

const resend = new Resend(process.env.RESEND_API_KEY)

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = String(body?.name ?? "").trim()
    const email = String(body?.email ?? "").trim()
    const message = String(body?.message ?? "").trim()

    if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 })
    }

    const to = process.env.CONTACT_TO_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL

    if (!process.env.RESEND_API_KEY || !to || !from) {
      return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 })
    }

    // Anti-spam básico: limita mensagem gigante
    if (message.length > 3000) {
      return NextResponse.json({ ok: false, error: "message_too_long" }, { status: 400 })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>")

    const subject = `Novo contato do portfólio — ${name}`

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5">
        <h2>Novo contato pelo portfólio</h2>
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>E-mail:</strong> ${safeEmail}</p>
        <p><strong>Mensagem:</strong><br/>${safeMessage}</p>
        <hr/>
        <p style="color:#666;font-size:12px">Enviado via formulário do portfólio.</p>
      </div>
    `

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email, // pra você responder direto
      html,
    })

    if (error) {
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}
