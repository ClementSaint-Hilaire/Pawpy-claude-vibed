import { useNavigate } from 'react-router-dom'

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'
const accentGlassStyle = 'bg-gradient-to-r from-brand/80 to-brand/80 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]'

function FilterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H21M6 12H18M10 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <path d="M2 8.5L10 2.5L18 8.5V18.5C18 19.0523 17.5523 19.5 17 19.5H13V14.5H7V19.5H3C2.44772 19.5 2 19.0523 2 18.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
      <path d="M21 2H3C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H8L12 20L16 16H21C21.5523 16 22 15.5523 22 15V3C22 2.44772 21.5523 2 21 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function StarHalfIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L9.854 5.514L14.781 5.9L11.09 9.074L12.326 13.842L8 11.2V1Z" fill="#F59E0B"/>
      <path d="M8 1L6.146 5.514L1.219 5.9L4.91 9.074L3.674 13.842L8 11.2V1Z" fill="#F59E0B" opacity="0.3"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

interface SitterCardProps {
  name: string
  description: string
  rating: number
  badges: string[]
}

function SitterCard({ name, description, rating, badges }: SitterCardProps) {
  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-[0px_8px_30px_0px_rgba(1,10,5,0.2),0px_0px_4px_0px_rgba(1,10,5,0.15)]">
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4a5568] to-[#2d3748]" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[57%] to-black/70 to-[78%]" />

      {/* Top row */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-white text-sm leading-[1.2] tracking-[-0.14px]">{rating}</span>
          <StarHalfIcon />
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          {badges.map((badge) => (
            <div key={badge} className="flex items-center gap-1 bg-bg-primary px-2 py-1 rounded-full">
              <span className="text-text-primary"><CheckIcon /></span>
              <span className="text-[11px] text-text-primary leading-[1.1] whitespace-nowrap">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[22px] font-semibold text-[#f0efeb] leading-[1.2] tracking-[-0.44px] truncate">
            {name}
          </h2>
          <p className="text-base text-[#f5f5f7]/95 leading-[1.2] tracking-[-0.16px] line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

const SITTERS: SitterCardProps[] = [
  {
    name: 'Steve Travail',
    description: '55 ans - VIIe. CEO chez Samsoul basé à la Défense.',
    rating: 4.5,
    badges: ['Pawpy lvl 1', 'ACACED'],
  },
]

export default function OwnerRecherche() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[95px] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-8 px-4 mb-8">
        <h1 className="flex-1 text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Rechercher
        </h1>
        <button className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 ${glassStyle}`}>
          <span className="text-text-primary"><FilterIcon /></span>
        </button>
      </div>

      {/* Sitter card + actions */}
      <div className="flex flex-col items-center gap-6 px-4">
        {SITTERS.map((sitter, i) => (
          <SitterCard key={i} {...sitter} />
        ))}

        {/* Action buttons */}
        <div className="flex items-center gap-16">
          <button className={`flex items-center justify-center w-12 h-12 rounded-full ${glassStyle}`}>
            <span className="text-text-primary"><CloseIcon /></span>
          </button>
          <button
            onClick={() => navigate('/owner/messagerie')}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${accentGlassStyle}`}
          >
            <ChatIcon />
          </button>
        </div>
      </div>

      {/* Custom bottom bar */}
      <div className="absolute bottom-0 left-0 w-full h-[95px] flex flex-col items-center justify-start pt-2">
        <div className={`flex gap-3 items-center justify-center rounded-full w-[361px]`}>
          {/* Home pill */}
          <button
            onClick={() => navigate('/owner/home')}
            className={`flex items-center justify-center w-16 h-16 rounded-full ${glassStyle}`}
          >
            <span className="text-text-primary"><HomeIcon /></span>
          </button>

          {/* Search bar pill */}
          <div className={`flex flex-1 items-center gap-2 px-4 py-4 rounded-full ${glassStyle}`}>
            <span className="text-text-primary flex-shrink-0"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Rechercher un profil"
              className="flex-1 bg-transparent outline-none text-base text-text-primary placeholder:text-text-tertiary leading-[1.2] tracking-[-0.16px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
