import { useNavigate } from 'react-router-dom'
import { useAnnonces, type Annonce } from '../../store/annonces'
import { useConversations } from '../../store/conversations'

const CURRENT_SITTER_NAME = 'Jean Dupont'

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

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

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 21C12 21 3 14.5 3 8.5C3 6.01472 5.01472 4 7.5 4C9.02501 4 10.3789 4.76604 11.1924 5.93431L12 7L12.8076 5.93431C13.6211 4.76604 14.975 4 16.5 4C18.9853 4 21 6.01472 21 8.5C21 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="#F59E0B">
      <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"/>
    </svg>
  )
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function AnnonceCard({ userName, location, title, description, startDate, startTime, endTime, price, onClick }: Annonce & { onClick?: () => void }) {
  const date = formatDate(startDate)
  const timeRange = `${startTime} - ${endTime}`
  return (
    <div onClick={onClick} className="bg-bg-secondary rounded-[22px] p-3 flex flex-col gap-6 w-full flex-shrink-0 cursor-pointer">
      {/* User info */}
      <div className="flex items-center">
        <div className="flex-1 flex gap-2 items-center">
          <div className="w-10 h-10 rounded-full bg-brand-light flex-shrink-0" />
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-base text-text-primary leading-[1.2] tracking-[-0.16px] truncate">
              {userName} - {location}
            </p>
            <div className="flex gap-1 items-center h-4">
              {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
            </div>
          </div>
        </div>
        <button className="w-10 flex items-center justify-center text-text-secondary">
          <HeartIcon />
        </button>
      </div>

      {/* Ad info */}
      <div className="flex flex-col gap-2">
        <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] truncate">
          {title}
        </p>
        <p className="text-base text-text-secondary leading-[1.2] tracking-[-0.16px] line-clamp-2">
          {description}
        </p>
      </div>

      {/* Image placeholder */}
      <div className="h-[200px] rounded-xl bg-bg-primary overflow-hidden">
        <div className="w-full h-full bg-[#d5d7d5] rounded-xl" />
      </div>

      {/* Date, time, price */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="bg-white rounded-md px-2.5 py-1.5 h-[34px] flex items-center">
            <span className="text-text-primary text-[15px]">{date}</span>
          </div>
          <div className="bg-white rounded-md px-2.5 py-1.5 h-[34px] flex items-center">
            <span className="text-text-primary text-[15px]">{timeRange}</span>
          </div>
        </div>
        <p className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] text-right truncate">
          {price}€
        </p>
      </div>
    </div>
  )
}

export default function SitterRecherche() {
  const navigate = useNavigate()
  const { annonces } = useAnnonces()
  const { startConversation } = useConversations()

  function handleAnnonceClick(annonce: Annonce) {
    const convId = startConversation(annonce.id, annonce.title, annonce.userName, CURRENT_SITTER_NAME)
    navigate(`/sitter/messagerie/${convId}`)
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[95px] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-8 px-4 mb-8">
        <h1 className="flex-1 text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Annonces
        </h1>
        <button className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 ${glassStyle}`}>
          <span className="text-text-primary"><FilterIcon /></span>
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-8 items-center px-4">
        {annonces.length === 0 && (
          <p className="text-base text-text-secondary leading-[1.2] tracking-[-0.16px]">
            Aucune annonce pour le moment.
          </p>
        )}
        {annonces.map((annonce) => (
          <AnnonceCard key={annonce.id} {...annonce} onClick={() => handleAnnonceClick(annonce)} />
        ))}
      </div>

      {/* Special bottom bar */}
      <div className="absolute bottom-0 left-0 w-full h-[95px] flex flex-col items-center justify-start pt-2">
        <div className={`flex gap-3 items-center justify-center rounded-full w-[361px]`}>
          {/* Home pill */}
          <button
            onClick={() => navigate('/sitter/home')}
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
