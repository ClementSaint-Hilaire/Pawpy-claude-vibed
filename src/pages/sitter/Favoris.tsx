import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../../store/favorites'
import { useAnnonces, type Annonce } from '../../store/annonces'

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
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

function FavoriteAnnonceCard({ annonce, onRemove }: { annonce: Annonce; onRemove: () => void }) {
  const date = formatDate(annonce.startDate)
  const timeRange = `${annonce.startTime} - ${annonce.endTime}`

  return (
    <div className="bg-bg-secondary rounded-2xl p-4 flex flex-col gap-4">
      {/* User info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-light flex-shrink-0" />
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-base text-text-primary leading-[1.2] tracking-[-0.16px] truncate">
            {annonce.userName} - {annonce.location}
          </p>
          <div className="flex gap-0.5 items-center">
            {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
          </div>
        </div>
        <button
          onClick={onRemove}
          className="flex-shrink-0 p-2 text-rose-500"
        >
          <HeartIcon filled />
        </button>
      </div>

      {/* Title & description */}
      <div className="flex flex-col gap-1">
        <p className="text-[18px] font-semibold text-text-primary leading-[1.2] tracking-[-0.36px] truncate">
          {annonce.title}
        </p>
        <p className="text-sm text-text-secondary leading-[1.2] tracking-[-0.14px] line-clamp-2">
          {annonce.description}
        </p>
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
        <p className="flex-1 text-[18px] font-semibold text-text-primary leading-[1.2] tracking-[-0.36px] text-right truncate">
          {annonce.price}€
        </p>
      </div>
    </div>
  )
}

export default function SitterFavoris() {
  const navigate = useNavigate()
  const { favoriteAnnonceIds, toggleFavoriteAnnonce } = useFavorites()
  const { annonces } = useAnnonces()

  const favorites = annonces.filter(a => favoriteAnnonceIds.includes(a.id))

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-8 px-4 gap-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 ${glassStyle}`}
        >
          <span className="text-text-primary"><BackIcon /></span>
        </button>
        <h1 className="flex-1 text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Favoris
        </h1>
      </div>

      {/* List */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center">
          <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Aucun favori
          </p>
          <p className="text-base text-text-secondary leading-[1.2] tracking-[-0.16px]">
            Ajoutez des annonces à vos favoris depuis la page annonces.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {favorites.map(annonce => (
            <FavoriteAnnonceCard
              key={annonce.id}
              annonce={annonce}
              onRemove={() => toggleFavoriteAnnonce(annonce.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
