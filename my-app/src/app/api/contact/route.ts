import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const key = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL

    console.log("[CONTACT] env", { hasKey: !!key, to, from })

    if (!key || !to || !from) {
      return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 })
    }

    const body = await req.json()
    console.log("[CONTACT] body", body)

    const name = String(body?.name ?? "").trim()
    const email = String(body?.email ?? "").trim()
    const message = String(body?.message ?? "").trim()

    if (name.length < 2 || !isValidEmail(email) || message.length < 10) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 })
    }

    const resend = new Resend(key)

    const result = await resend.emails.send({
      from,
      to,
      subject: `Novo contato do portfólio — ${name}`,
      replyTo: email,
      html: `
        <div>
          <p><b>Nome:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Mensagem:</b><br/>${message.replaceAll("\n", "<br/>")}</p>
        </div>
      `,
    })

    console.log("[CONTACT] resend result", result)

    if (result.error) {
      return NextResponse.json({ ok: false, error: "email_failed", detail: result.error }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error("[CONTACT] server_error", e)
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}
