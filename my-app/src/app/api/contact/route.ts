import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const MAX_BODY_BYTES = 10_000
const MAX_MESSAGE_LENGTH = 2_000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const attempts = new Map<string, { count: number; resetAt: number }>()

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function cleanHeaderValue(value: string) {
  return value.replace(/[\r\n]/g, " ").trim()
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function getClientKey(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anonymous"
}

function isRateLimited(key: string) {
  const now = Date.now()
  const current = attempts.get(key)

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  return current.count > RATE_LIMIT_MAX_REQUESTS
}

export async function POST(req: Request) {
  try {
    const key = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL ?? "fratello.yuri@gmail.com"
    const from = process.env.CONTACT_FROM_EMAIL

    if (!key || !to || !from) {
      return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 })
    }

    const contentLength = Number(req.headers.get("content-length") ?? 0)
    if (contentLength > MAX_BODY_BYTES || isRateLimited(getClientKey(req))) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })
    }

    let body: Record<string, unknown> | null
    try {
      body = (await req.json()) as Record<string, unknown>
    } catch {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
    }

    const name = String(body?.name ?? "").trim()
    const email = String(body?.email ?? "").trim()
    const message = String(body?.message ?? "").trim()

    if (
      name.length < 2 ||
      name.length > 120 ||
      email.length > 254 ||
      !isValidEmail(email) ||
      message.length < 10 ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>")
    const resend = new Resend(key)

    const result = await resend.emails.send({
      from,
      to,
      subject: `Novo contato do portfólio - ${cleanHeaderValue(name)}`,
      replyTo: cleanHeaderValue(email),
      html: `
        <div>
          <p><b>Nome:</b> ${safeName}</p>
          <p><b>Email:</b> ${safeEmail}</p>
          <p><b>Mensagem:</b><br/>${safeMessage}</p>
        </div>
      `,
    })

    if (result.error) {
      console.error("[CONTACT] email_failed", result.error)
      return NextResponse.json({ ok: false, error: "email_failed" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    console.error("[CONTACT] server_error", e)
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
  }
}
