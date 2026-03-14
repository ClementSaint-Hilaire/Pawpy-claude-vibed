interface PageDotsProps {
  total: number
  current: number // 1-based
}

export default function PageDots({ total, current }: PageDotsProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-4">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-opacity ${
            i + 1 === current ? 'bg-text-primary opacity-100' : 'bg-text-primary opacity-30'
          }`}
        />
      ))}
    </div>
  )
}
