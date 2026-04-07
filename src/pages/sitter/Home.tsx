import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomTabBar from '../../components/sitter/BottomTabBar'
import PremiumModal from '../../components/sitter/PremiumModal'
import { useAnnonces, type Annonce } from '../../store/annonces'
import { useUserProfile, fullName } from '../../store/userProfile'

interface WalkCard {
  id: string
  name: string
  description: string
  date: string
  timeRange: string
  price: string
}

function categorizeWalk(a: Annonce): 'upcoming' | 'ongoing' | 'done' {
  const now = new Date()
  const start = new Date(`${a.startDate}T${a.startTime}`)
  const end = new Date(`${a.endDate}T${a.endTime || '23:59'}`)
  if (end < now) return 'done'
  if (start <= now) return 'ongoing'
  return 'upcoming'
}

function toWalkCard(a: Annonce): WalkCard {
  return {
    id: a.id,
    name: a.userName,
    description: a.description,
    date: new Date(a.startDate + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    timeRange: `${a.startTime} → ${a.endTime}`,
    price: `${a.price}€`,
  }
}

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

function CertificationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 1.5L13.39 7.26L19.5 7.27L14.55 11.27L16.35 17.24L11 13.75L5.65 17.24L7.45 11.27L2.5 7.27L8.61 7.26L11 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none"
      className={`transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

function LiveBadge() {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0">
      <div className="absolute w-[43px] h-[21px] rounded-full border border-red-400" />
      <div className="bg-bg-primary flex items-center gap-1 px-2 py-1 rounded-full shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] relative z-10">
        <div className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
        <span className="text-sm text-text-primary leading-[1.2] tracking-[-0.14px]">live</span>
      </div>
    </div>
  )
}

function ProgrammeeBadge() {
  return (
    <div className="bg-[#b1d3f1] flex items-center gap-1 px-2 py-1 rounded-full shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] flex-shrink-0">
      <div className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
      <span className="text-sm text-text-primary leading-[1.2] tracking-[-0.14px]">Programmée</span>
    </div>
  )
}

function WalkCardItem({ card, type, onClick }: { card: WalkCard; type: 'ongoing' | 'upcoming'; onClick?: () => void }) {
  return (
    <div className="bg-bg-secondary rounded-2xl p-3 flex flex-col gap-6 w-full cursor-pointer" onClick={onClick}>
      <div className="flex gap-2 items-center">
        {/* Stacked avatars */}
        <div className="flex items-end flex-shrink-0 pr-4">
          <div className="w-[54px] h-[54px] rounded-full bg-brand-light -mr-4 relative z-10 flex-shrink-0" />
          <div className="w-8 h-8 rounded-full bg-brand-light border-2 border-bg-secondary flex-shrink-0 relative z-0" />
        </div>
        {/* Name */}
        <div className="flex-1 flex flex-col justify-center min-w-0 self-stretch">
          <p className="text-base text-text-primary leading-[1.2] tracking-[-0.16px]">{card.name}</p>
          <p className="text-sm text-text-secondary leading-[1.2] tracking-[-0.14px] truncate">{card.description}</p>
        </div>
        {/* Status badge */}
        {type === 'ongoing' ? <LiveBadge /> : <ProgrammeeBadge />}
      </div>
      <div className="flex flex-col">
        <p className="text-[28px] font-semibold text-text-primary leading-[1.2] tracking-[-0.56px]">{card.date}</p>
        <div className="flex items-center justify-between text-base tracking-[-0.16px]">
          <span className="text-text-secondary leading-[1.2]">{card.timeRange}</span>
          <span className="text-text-primary leading-[1.2]">{card.price}</span>
        </div>
      </div>
    </div>
  )
}

interface SectionProps {
  title: string
  defaultOpen?: boolean
  cards: WalkCard[]
  type: 'ongoing' | 'upcoming'
  onCardClick?: () => void
  emptyAction?: () => void
}

function Section({ title, defaultOpen = false, cards, type, onCardClick, emptyAction }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="flex flex-col gap-4 w-full">
      <button className="flex items-center justify-between w-full" onClick={() => setOpen(!open)}>
        <span className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
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
              className="bg-bg-secondary rounded-2xl p-3 flex flex-col gap-1 text-left w-full h-[155px] items-start justify-center"
            >
              <p className="text-base font-semibold text-text-primary leading-[1.2]">
                Aucune promenade pour le moment !
              </p>
              <p className="text-base text-text-primary leading-[1.2] tracking-[-0.16px]">
                Programmez votre promenade dès maintenant en cliquant sur le bouton
              </p>
            </button>
          ) : (
            <div className="bg-bg-secondary rounded-2xl p-3 h-[155px] flex items-center justify-center">
              <p className="text-base text-text-secondary leading-[1.2] tracking-[-0.16px]">
                Aucune promenade pour le moment.
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col gap-2">
            {cards.map((card) => (
              <WalkCardItem key={card.id} card={card} type={type} onClick={onCardClick} />
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default function SitterHome() {
  const navigate = useNavigate()
  const { annonces } = useAnnonces()
  const { profile } = useUserProfile()
  const myName = fullName(profile)
  const [showPremium, setShowPremium] = useState(true)
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const myWalks = annonces.filter(a => a.acceptedBy === myName)
  const upcomingWalks = myWalks.filter(a => categorizeWalk(a) === 'upcoming').map(toWalkCard)
  const ongoingWalks = myWalks.filter(a => categorizeWalk(a) === 'ongoing').map(toWalkCard)

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="flex-1 text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Pawpy
        </h1>
        <button
          onClick={() => navigate('/sitter/profil')}
          className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 ${glassStyle} text-text-primary`}
        >
          <CertificationIcon />
        </button>
      </div>

      {/* Premium banner */}
      {showPremium && (
        <button
          className="bg-[#fce9f9] rounded-2xl px-3 py-4 flex gap-4 items-start text-left w-full"
          onClick={() => setShowPremiumModal(true)}
        >
          <div className="w-[66px] h-[66px] bg-brand-light rounded-lg flex-shrink-0 flex items-center justify-center">
            <span className="text-3xl">🎁</span>
          </div>
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <p className="text-base font-semibold text-text-primary leading-[1.2]">
              Essayez Pawpy Premium gratuitement
            </p>
            <p className="text-[11px] text-[#656a67] leading-[1.1]">
              1 mois offerts pour profiter du boost de votre profil à 0€ et plus encore
            </p>
          </div>
          <div
            className="flex-shrink-0 p-1 text-text-primary"
            onClick={e => { e.stopPropagation(); setShowPremium(false) }}
          >
            <CloseIcon />
          </div>
        </button>
      )}
      {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}

      {/* Walk sections */}
      <Section
        title="Mes promenades en cours"
        defaultOpen={true}
        cards={ongoingWalks}
        type="ongoing"
        onCardClick={() => navigate('/sitter/map')}
        emptyAction={() => navigate('/sitter/recherche')}
      />
      <Section
        title="Mes promenades à venir"
        defaultOpen={false}
        cards={upcomingWalks}
        type="upcoming"
        emptyAction={() => navigate('/sitter/recherche')}
      />

      <BottomTabBar activeTab="home" />
    </div>
  )
}
