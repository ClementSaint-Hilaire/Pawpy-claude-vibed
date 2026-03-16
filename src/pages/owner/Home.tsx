import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OwnerBottomTabBar from '../../components/owner/BottomTabBar'
import NouvellePromenadeModal, { type WalkFormData } from '../../components/owner/NouvellePromenadeModal'
import { useAnnonces } from '../../store/annonces'
import { useUserProfile, fullName } from '../../store/userProfile'

interface WalkCard {
  id: string
  name: string
  description: string
  date: string
  timeRange: string
  price: string
}

const UPCOMING_WALKS: WalkCard[] = []

const ONGOING_WALKS: WalkCard[] = [
  {
    id: '1',
    name: 'Elisabeth Quilomaitre',
    description: 'Retraitée de 76 ans. Vivant dans le VIIIe arrondissement de Paris.',
    date: '28 Oct. 2025',
    timeRange: '8h00 → 18h00',
    price: '50€',
  },
]

const DONE_WALKS: WalkCard[] = []

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="6"
      viewBox="0 0 12 6"
      fill="none"
      className={`transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11 3H17V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 3L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 5H4C3.44772 5 3 5.44772 3 6V16C3 16.5523 3.44772 17 4 17H14C14.5523 17 15 16.5523 15 16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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

function WalkCardItem({ card, onClick }: { card: WalkCard; onClick?: () => void }) {
  return (
    <div className="bg-bg-secondary rounded-lg p-3 flex flex-col gap-6 flex-shrink-0 w-[337px] cursor-pointer" onClick={onClick}>
      <div className="flex gap-4 items-start">
        <div className="w-[54px] h-[54px] rounded-full bg-brand-light flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-start gap-2">
            <p className="flex-1 text-base text-text-primary leading-[1.2] tracking-[-0.16px] truncate">{card.name}</p>
            <span className="text-text-secondary flex-shrink-0"><ExternalLinkIcon /></span>
          </div>
          <p className="text-sm text-text-secondary leading-[1.2] tracking-[-0.14px]">{card.description}</p>
        </div>
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
  onCardClick?: () => void
}

function Section({ title, defaultOpen = false, cards, onCardClick }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        className="flex items-center gap-2 w-full"
        onClick={() => setOpen(!open)}
      >
        <span className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] text-left">
          {title}
        </span>
        <div className="p-2 text-text-primary">
          <ChevronIcon open={open} />
        </div>
      </button>
      {open && (
        cards.length === 0 ? (
          <p className="text-base text-text-secondary leading-[1.2] tracking-[-0.16px]">
            Aucune promenade pour le moment.
          </p>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
            {cards.map((card) => (
              <WalkCardItem key={card.id} card={card} onClick={onCardClick} />
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default function OwnerHome() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const { addAnnonce } = useAnnonces()
  const { profile } = useUserProfile()
  const myName = fullName(profile)
  const myLocation = profile.postal || ''

  function handleConfirm(data: WalkFormData) {
    addAnnonce({
      userName: myName,
      location: myLocation,
      title: data.offerName || 'Nouvelle promenade',
      description: data.notes || '',
      startDate: data.startDate,
      startTime: data.startTime,
      endDate: data.endDate,
      endTime: data.endTime,
      price: data.price,
      petIds: data.selectedPetIds,
    })
    setShowModal(false)
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-8">
        <h1 className="flex-1 text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Pawpy
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center p-3 rounded-full flex-shrink-0 bg-gradient-to-r from-brand/80 to-brand/80 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)] text-white"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Premium banner */}
      <div className="bg-bg-secondary rounded-lg p-3 flex items-center gap-6">
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-base font-medium text-text-primary leading-[1.2]">
            Essayez Pawpy Premium gratuitement
          </p>
          <p className="text-base font-normal text-text-secondary leading-[1.2] tracking-[-0.16px]">
            1 mois offerts pour profiter du boost de votre profil à 0€ et plus encore
          </p>
        </div>
        <div className="w-[66px] h-[64px] bg-brand-light rounded-lg flex-shrink-0 flex items-center justify-center">
          <span className="text-2xl">🎁</span>
        </div>
      </div>

      {/* Walk sections */}
      <Section title="Promenades à venir" defaultOpen={false} cards={UPCOMING_WALKS} />
      <Section title="Promenade en cours" defaultOpen={true} cards={ONGOING_WALKS} onCardClick={() => navigate('/owner/map')} />
      <Section title="Promenades terminées" defaultOpen={false} cards={DONE_WALKS} />

      <OwnerBottomTabBar activeTab="home" />

      {showModal && (
        <NouvellePromenadeModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
          userName={myName}
        />
      )}
    </div>
  )
}
