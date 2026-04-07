import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OwnerBottomTabBar from '../../components/owner/BottomTabBar'
import NouvellePromenadeModal, { type WalkFormData } from '../../components/owner/NouvellePromenadeModal'
import { useAnnonces, type Annonce } from '../../store/annonces'
import { useUserProfile, fullName } from '../../store/userProfile'
import { useFavorites } from '../../store/favorites'

interface WalkCard {
  id: string
  sitterName: string | null
  ownerName: string
  date: string
  timeRange: string
  price: string
  location: string
  type: 'Live' | 'Programmée'
}

function categorizeWalk(a: Annonce): 'upcoming' | 'ongoing' | 'done' {
  const now = new Date()
  const start = new Date(`${a.startDate}T${a.startTime}`)
  const end = new Date(`${a.endDate}T${a.endTime || '23:59'}`)
  if (end < now) return 'done'
  if (start <= now) return 'ongoing'
  return 'upcoming'
}

function toWalkCard(a: Annonce, type: 'Live' | 'Programmée'): WalkCard {
  return {
    id: a.id,
    sitterName: a.acceptedBy || null,
    ownerName: a.userName,
    date: new Date(a.startDate + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    timeRange: `${a.startTime} → ${a.endTime}`,
    price: `${a.price}€`,
    location: a.location,
    type,
  }
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={`transition-transform ${open ? 'rotate-90' : ''}`}
    >
      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function Avatar({ className }: { className?: string }) {
  return (
    <div className={`bg-brand-light rounded-full flex-shrink-0 ${className ?? ''}`} />
  )
}

const SWIPE_REVEAL = 80

function TrashIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H21M8 6V4H16V6M19 6L18 20H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function WalkCardItem({ card, onClick, onDelete }: { card: WalkCard; onClick?: () => void; onDelete?: () => void }) {
  const isLive = card.type === 'Live'
  const displayName = card.sitterName ?? card.ownerName
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  // refs to track gesture state inside event listeners (no stale closure)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const currentOffset = useRef(0)
  const isOpen = useRef(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    function onTouchStart(e: TouchEvent) {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
      setIsDragging(true)
    }

    function onTouchMove(e: TouchEvent) {
      if (touchStartX.current === null || touchStartY.current === null) return
      const dx = e.touches[0].clientX - touchStartX.current
      const dy = e.touches[0].clientY - touchStartY.current
      // Only intercept clearly horizontal gestures
      if (Math.abs(dx) > Math.abs(dy) + 5) {
        e.preventDefault()
        const base = isOpen.current ? SWIPE_REVEAL : 0
        const next = Math.max(0, Math.min(SWIPE_REVEAL, base + dx))
        currentOffset.current = next
        setOffset(next)
      }
    }

    function onTouchEnd() {
      setIsDragging(false)
      if (currentOffset.current > SWIPE_REVEAL / 2) {
        currentOffset.current = SWIPE_REVEAL
        isOpen.current = true
        setOffset(SWIPE_REVEAL)
      } else {
        currentOffset.current = 0
        isOpen.current = false
        setOffset(0)
      }
      touchStartX.current = null
      touchStartY.current = null
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  function handleDelete() {
    currentOffset.current = 0
    isOpen.current = false
    setOffset(0)
    if (window.confirm('Supprimer cette promenade ?')) {
      onDelete?.()
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Delete button revealed on swipe */}
      <button
        onClick={handleDelete}
        className="absolute left-0 top-0 bottom-0 w-[80px] flex items-center justify-center bg-[#ff383c] text-white rounded-2xl"
      >
        <TrashIcon />
      </button>

      {/* Card */}
      <div
        ref={cardRef}
        className="bg-bg-secondary rounded-2xl p-3 flex flex-col gap-6 flex-shrink-0 w-full cursor-pointer relative"
        style={{ transform: `translateX(${offset}px)`, transition: isDragging ? 'none' : 'transform 0.2s ease' }}
        onClick={() => { if (!isOpen.current) onClick?.() }}
      >
      {/* Top row: avatars + name + badge */}
      <div className="flex gap-2 items-start">
        {/* Overlapping avatars */}
        <div className="flex items-end pr-4 flex-shrink-0">
          <Avatar className="size-[54px] border-2 border-bg-secondary -mr-4" />
          <Avatar className="size-8 border border-white rounded-full -mr-4" />
        </div>

        {/* Names */}
        <div className="flex-1 flex flex-col gap-1 justify-center min-w-0">
          <p className="text-base font-semibold text-text-primary leading-[1.2] truncate" style={{ fontFeatureSettings: "'case' 1" }}>
            {displayName}
          </p>
          <p className="text-sm text-text-secondary leading-[1.2] tracking-[-0.14px] truncate" style={{ fontFeatureSettings: "'case' 1" }}>
            {card.ownerName !== displayName ? card.ownerName : card.location}
          </p>
        </div>

        {/* Badge */}
        {isLive ? (
          <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] flex-shrink-0">
            <div className="relative flex items-center justify-center size-2.5">
              <div className="absolute size-full rounded-full bg-[#ff383c] opacity-30 animate-ping" />
              <div className="size-1.5 rounded-full bg-[#ff383c]" />
            </div>
            <span className="text-sm text-text-primary tracking-[-0.14px]" style={{ fontFeatureSettings: "'case' 1" }}>live</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-[#b1d3f1] rounded-full px-2 py-1 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] flex-shrink-0">
            <div className="size-1 rounded-full bg-[#4a90c4]" />
            <span className="text-sm text-text-primary tracking-[-0.14px]" style={{ fontFeatureSettings: "'case' 1" }}>Programmée</span>
          </div>
        )}
      </div>

      {/* Bottom: date, time/price, address */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <p className="text-[28px] font-semibold text-text-primary leading-[1.2] tracking-[-0.56px]" style={{ fontFeatureSettings: "'case' 1" }}>
            {card.date}
          </p>
          <div className="flex items-center justify-between text-base font-semibold text-text-secondary tracking-[-0.16px]" style={{ fontFeatureSettings: "'case' 1" }}>
            <span className="leading-[1.2]">{card.timeRange}</span>
            <span className="leading-[1.2]">{card.price}</span>
          </div>
        </div>
        <p className="text-sm text-text-primary leading-[1.2] tracking-[-0.14px]" style={{ fontFeatureSettings: "'case' 1" }}>
          {card.location}
        </p>
      </div>
      </div>
    </div>
  )
}

interface SectionProps {
  title: string
  defaultOpen?: boolean
  cards: WalkCard[]
  onCardClick?: () => void
  onCardDelete?: (id: string) => void
  emptyAction?: () => void
}

function Section({ title, defaultOpen = false, cards, onCardClick, onCardDelete, emptyAction }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="flex flex-col gap-4 w-full">
      <button
        className="flex items-center justify-between w-full"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]" style={{ fontFeatureSettings: "'case' 1" }}>
          {title}
        </span>
        <div className="text-text-primary">
          <ChevronIcon open={open} />
        </div>
      </button>
      {open && (
        cards.length === 0 ? (
          emptyAction ? (
            <button
              onClick={emptyAction}
              className="bg-bg-secondary rounded-2xl p-4 flex flex-col gap-1 text-left w-full"
            >
              <p className="text-base font-semibold text-text-primary leading-[1.2]">
                Créer une annonce
              </p>
              <p className="text-sm text-text-secondary leading-[1.2] tracking-[-0.14px]">
                Publiez une annonce pour trouver un promeneur disponible →
              </p>
            </button>
          ) : (
            <p className="text-sm text-text-secondary leading-[1.2] tracking-[-0.14px]">
              Aucune promenade pour le moment.
            </p>
          )
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {cards.map((card) => (
              <WalkCardItem key={card.id} card={card} onClick={onCardClick} onDelete={() => onCardDelete?.(card.id)} />
            ))}
          </div>
        )
      )}
    </div>
  )
}

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

export default function OwnerHome() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [showPremium, setShowPremium] = useState(true)
  const { annonces, addAnnonce, deleteAnnonce } = useAnnonces()
  const { profile } = useUserProfile()
  const myName = fullName(profile)
  const myLocation = profile.postal || ''
  const { favoriteSitterIds } = useFavorites()
  const hasFavorites = favoriteSitterIds.length > 0

  const myWalks = annonces.filter(a => a.userName === myName)
  const ongoingWalks = myWalks.filter(a => categorizeWalk(a) === 'ongoing').map(a => toWalkCard(a, 'Live'))
  const upcomingWalks = myWalks.filter(a => categorizeWalk(a) === 'upcoming').map(a => toWalkCard(a, 'Programmée'))
  const doneWalks = myWalks.filter(a => categorizeWalk(a) === 'done').map(a => toWalkCard(a, 'Programmée'))

  function handleConfirm(data: WalkFormData) {
    addAnnonce({
      userName: myName,
      location: myLocation,
      title: data.title || 'Nouvelle promenade',
      description: data.notes || '',
      startDate: data.startDate,
      startTime: data.startTime,
      endDate: data.endDate,
      endTime: data.endTime,
      price: data.price,
      petIds: data.selectedPetIds,
      requiredSkills: data.requiredSkills,
      itinerary: data.itinerary,
      accessories: data.accessories,
    })
    setShowModal(false)
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2">
        <h1 className="flex-1 text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]" style={{ fontFeatureSettings: "'case' 1" }}>
          Pawpy
        </h1>
        <button
          onClick={() => navigate('/owner/favoris')}
          className={`relative flex items-center justify-center p-3 rounded-full flex-shrink-0 ${glassStyle} text-text-primary`}
        >
          <HeartIcon />
          {hasFavorites && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Premium banner */}
      {showPremium && (
        <div className="bg-[#fce9f9] rounded-2xl px-3 py-4 flex gap-4 items-start">
          <div className="size-[66px] flex-shrink-0 flex items-center justify-center">
            <span className="text-4xl">🎁</span>
          </div>
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <p className="text-base font-semibold text-text-primary leading-[1.2]" style={{ fontFeatureSettings: "'case' 1" }}>
              Essayez Pawpy Premium gratuitement
            </p>
            <p className="text-[11px] text-[#656a67] leading-[1.1]" style={{ fontFeatureSettings: "'case' 1" }}>
              1 mois offerts pour profiter du boost de votre profil à 0€ et plus encore
            </p>
          </div>
          <button
            onClick={() => setShowPremium(false)}
            className="text-text-secondary flex-shrink-0 p-1"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {/* Promenades en cours */}
      <Section
        title="Mes promenades en cours"
        defaultOpen={true}
        cards={ongoingWalks}
        onCardClick={() => navigate('/owner/map')}
        onCardDelete={deleteAnnonce}
        emptyAction={() => setShowModal(true)}
      />

      {/* Promenades à venir */}
      <div className="pt-8">
        <Section
          title="Mes promenades à venir"
          defaultOpen={true}
          cards={upcomingWalks}
          onCardDelete={deleteAnnonce}
          emptyAction={() => setShowModal(true)}
        />
      </div>

      {/* Promenades terminées */}
      {doneWalks.length > 0 && (
        <Section
          title="Promenades terminées"
          defaultOpen={false}
          cards={doneWalks}
          onCardDelete={deleteAnnonce}
        />
      )}

      {/* Bouton création promenade flottant */}
      <button
        onClick={() => setShowModal(true)}
        className="absolute bottom-[103px] right-4 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r bg-brand/95 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)] text-white"
      >
        <span className="text-base font-semibold leading-[1.2]" style={{ fontFeatureSettings: "'case' 1" }}>Créer une promenade</span>
        <PlusIcon />
      </button>

      <OwnerBottomTabBar activeTab="home" />

      {showModal && (
        <NouvellePromenadeModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}
