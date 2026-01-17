export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl text-center text-blue-500 mb-10 max-[600px]:text-2xl">
      {children}
    </h2>
  )
}
