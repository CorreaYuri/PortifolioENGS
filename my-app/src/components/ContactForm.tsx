"use client"

import { useMemo, useState } from "react"

type FormState = { name: string; email: string; message: string }

const inputClass =
  "rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"

export function ContactForm() {
  const [data, setData] = useState<FormState>({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle")

  const canSend = useMemo(() => {
    const okName = data.name.trim().length >= 2
    const okMsg = data.message.trim().length >= 10
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
    return okName && okMsg && okEmail
  }, [data])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSend) return
    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("fail")
      setStatus("ok")
      setData({ name: "", email: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 md:p-6">
      <div className="grid gap-5">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-white/70" htmlFor="name">
            Nome
          </label>
          <input
            id="name"
            name="name"
            className={inputClass}
            value={data.name}
            onChange={(e) => setData((s) => ({ ...s, name: e.target.value }))}
            autoComplete="name"
            placeholder="Seu nome"
            required
            minLength={2}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-white/70" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={inputClass}
            value={data.email}
            onChange={(e) => setData((s) => ({ ...s, email: e.target.value }))}
            autoComplete="email"
            placeholder="voce@email.com"
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-white/70" htmlFor="message">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            className={`${inputClass} min-h-36 resize-y`}
            value={data.message}
            onChange={(e) => setData((s) => ({ ...s, message: e.target.value }))}
            placeholder="Conte rapidamente sobre a oportunidade ou projeto."
            required
            minLength={10}
          />
        </div>

        <button
          type="submit"
          disabled={!canSend || status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {status === "sending" ? "Enviando..." : "Enviar mensagem"}
          <i className="fa-solid fa-paper-plane" aria-hidden />
        </button>

        {status === "ok" && <p className="text-sm text-emerald-300">Mensagem enviada com sucesso.</p>}
        {status === "error" && <p className="text-sm text-red-300">Erro ao enviar. Tente novamente.</p>}
      </div>
    </form>
  )
}
