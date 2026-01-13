/*"use client";
import { motion } from "framer-motion";

const timelineData = [
  {
    title: "Ponto de Partida",
    description:
      "Estava na faculdade, mas sentia que não conseguia sair do zero em projetos pessoais.",
  },
  {
    title: "Primeiros Passos",
    description:
      "HTML, CSS e JS. Criação de projetos simples como TodoList e experimentos com APIs.",
  },
  {
    title: "Consolidação",
    description:
      "Aprendizado em React, Next.js, Prisma e MongoDB. Projetos aplicados como delivery e banco pessoal.",
  },
  {
    title: "Identidade Profissional",
    description:
      "Criação da Luminius System, primeiro portfólio publicado e aplicação de design moderno.",
  },
  {
    title: "Hoje",
    description:
      "Projetos completos rodando, portfólio público e rumo ao fullstack.",
  },
];

export default function Timeline() {
  return (
    <section className="relative max-w-2xl mx-auto px-4 py-10 ">
      {/* Linha vertical */}
     /* <div className="absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-cyan-400"></div>

      <div className="space-y-10">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-14"
          >
            {/* Ponto pulsante }*/
          /*  <motion.span
              className="absolute left-0 top-2 w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-lg"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 
*/