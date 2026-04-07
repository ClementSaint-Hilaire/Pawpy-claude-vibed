import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnnonces, type Annonce } from '../../store/annonces'
import { useFavorites } from '../../store/favorites'
import BottomTabBar from '../../components/sitter/BottomTabBar'
import FiltreModal from '../../components/sitter/FiltreModal'

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

function FilterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17 3.25C15.1858 3.25 13.6725 4.53832 13.325 6.25L4 6.25C3.58579 6.25 3.25 6.58579 3.25 7C3.25 7.41421 3.58579 7.75 4 7.75L13.325 7.75C13.6725 9.46168 15.1858 10.75 17 10.75C19.0711 10.75 20.75 9.07107 20.75 7C20.75 4.92893 19.0711 3.25 17 3.25ZM14.75 7C14.75 5.75736 15.7574 4.75 17 4.75C18.2426 4.75 19.25 5.75736 19.25 7C19.25 8.24264 18.2426 9.25 17 9.25C15.7574 9.25 14.75 8.24264 14.75 7Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.675 16.25C10.3275 14.5383 8.81422 13.25 7 13.25C4.92893 13.25 3.25 14.9289 3.25 17C3.25 19.0711 4.92893 20.75 7 20.75C8.81422 20.75 10.3275 19.4617 10.675 17.75H20C20.4142 17.75 20.75 17.4142 20.75 17C20.75 16.5858 20.4142 16.25 20 16.25H10.675ZM4.75 17C4.75 15.7574 5.75736 14.75 7 14.75C8.24264 14.75 9.25 15.7574 9.25 17C9.25 18.2426 8.24264 19.25 7 19.25C5.75736 19.25 4.75 18.2426 4.75 17Z" fill="currentColor"/>
    </svg>
  )
}


function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
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

function AnnonceCard({ id, userName, location, title, description, startDate, startTime, endTime, price, onClick }: Annonce & { onClick?: () => void }) {
  const { isFavoriteAnnonce, toggleFavoriteAnnonce } = useFavorites()
  const favorited = isFavoriteAnnonce(id)
  const date = formatDate(startDate)
  const timeRange = `${startTime} - ${endTime}`
  return (
    <div onClick={onClick} className="bg-bg-secondary rounded-[22px] p-3 flex flex-col gap-6 w-full flex-shrink-0 cursor-pointer">
      {/* User info */}
      <div className="flex items-center">
        <div className="flex-1 flex gap-2 items-center">
          <div className="aspect-square h-10 rounded-full bg-brand-light flex-shrink-0" />
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-base text-text-primary leading-[1.2] tracking-[-0.16px] truncate">
              {userName} - {location}
            </p>
            <div className="flex gap-[5px] items-center h-4">
              {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
            </div>
          </div>
        </div>
        <button
          className={`w-10 flex items-center justify-center ${favorited ? 'text-rose-500' : 'text-text-secondary'}`}
          onClick={e => { e.stopPropagation(); toggleFavoriteAnnonce(id) }}
        >
          <HeartIcon filled={favorited} />
        </button>
      </div>

      {/* Ad info */}
      <div className="flex flex-col gap-2 h-[128px]">
        <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] truncate">
          {title}
        </p>
        <p className="text-base text-text-secondary leading-[1.2] tracking-[-0.16px] line-clamp-3">
          {description}
        </p>
      </div>

      {/* Image */}
      <div className="h-[200px] rounded-[14px] overflow-hidden">
        <div className="w-full h-full bg-[#d5d7d5] rounded-[5px]" />
      </div>

      {/* Date, time, price */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="bg-white rounded-[6px] px-[11px] py-[6px] h-[34px] flex items-center">
            <span className="text-text-primary text-[17px] leading-[22px] tracking-[-0.43px]">{date}</span>
          </div>
          <div className="bg-white rounded-[6px] px-[11px] py-[6px] h-[34px] flex items-center">
            <span className="text-text-primary text-[17px] leading-[22px] tracking-[-0.43px]">{timeRange}</span>
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
  const [filtreOpen, setFiltreOpen] = useState(false)

  function handleAnnonceClick(annonce: Annonce) {
    navigate(`/sitter/recherche/${annonce.id}`)
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-8 px-4 mb-8">
        <h1 className="flex-1 text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Annonces
        </h1>
        <button
          onClick={() => setFiltreOpen(true)}
          className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 ${glassStyle}`}
        >
          <span className="text-text-primary"><FilterIcon /></span>
        </button>
      </div>

      {filtreOpen && (
        <FiltreModal
          onClose={() => setFiltreOpen(false)}
          onApply={() => setFiltreOpen(false)}
        />
      )}

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

      <BottomTabBar activeTab="annonces" />
    </div>
  )
}
