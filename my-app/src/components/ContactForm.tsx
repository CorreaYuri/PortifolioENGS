"use client"

import { useMemo, useState } from "react"

type FormState = { name: string; email: string; message: string }

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
    <form onSubmit={onSubmit} className="w-full max-w-xl mx-auto xl:mx-0 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-white text-sm md:text-base" htmlFor="name">Nome</label>
        <input
          id="name"
          name="name"
          className="p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-400"
          value={data.name}
          onChange={(e) => setData((s) => ({ ...s, name: e.target.value }))}
          autoComplete="name"
          required
          minLength={2}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm md:text-base" htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          className="p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-400"
          value={data.email}
          onChange={(e) => setData((s) => ({ ...s, email: e.target.value }))}
          autoComplete="email"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white text-sm md:text-base" htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          name="message"
          className="p-3 rounded-lg bg-slate-800 h-32 text-white outline-none focus:ring-2 focus:ring-blue-400"
          value={data.message}
          onChange={(e) => setData((s) => ({ ...s, message: e.target.value }))}
          required
          minLength={10}
        />
      </div>

      <button
        type="submit"
        disabled={!canSend || status === "sending"}
        className="bg-blue-500 p-3 rounded-lg text-white btn-animado disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Enviando..." : "Enviar"}
      </button>

      {status === "ok" && <p className="text-green-400 text-sm">Mensagem enviada com sucesso ✅</p>}
      {status === "error" && <p className="text-red-400 text-sm">Erro ao enviar. Tente novamente.</p>}
    </form>
  )
}
