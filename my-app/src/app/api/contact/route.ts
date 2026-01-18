import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const resend = getResend()
    const to = process.env.CONTACT_TO_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL

    if (!resend || !to || !from) {
      // Não derruba build e retorna erro claro em runtime
      return NextResponse.json(
        { ok: false, error: "server_misconfigured" },
        { status: 500 }
      )
    }

    const body = await req.json()
    const name = String(body?.name ?? "").trim()
    const email = String(body?.email ?? "").trim()
    const message = String(body?.message ?? "").trim()

    if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 })
    }

    const subject = `Novo contato do portfólio — ${name}`

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5">
          <h2>Novo contato pelo portfólio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong><br/>${message.replaceAll("\n", "<br/>")}</p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}
