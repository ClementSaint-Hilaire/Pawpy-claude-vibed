import { useNavigate, useParams } from 'react-router-dom'
import { useAnnonces } from '../../store/annonces'
import { useConversations } from '../../store/conversations'
import { useUserProfile, fullName } from '../../store/userProfile'

const glassStyle =
  'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'
const accentGlassStyle =
  'bg-gradient-to-r from-brand/80 to-brand/80 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]'

function ChevronLeftIcon() {
  return (
    <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
      <path d="M11 5L6 1L1 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChatBubbleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 21" fill="none">
      <path
        d="M21 2H3C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H8L12 20L16 16H21C21.5523 16 22 15.5523 22 15V3C22 2.44772 21.5523 2 21 2Z"
        stroke="#fafbfa"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#F59E0B">
      <path d="M8 1L9.854 5.514L14.781 5.9L11.09 9.074L12.326 13.842L8 11.2L3.674 13.842L4.91 9.074L1.219 5.9L6.146 5.514L8 1Z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PriceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7V17M9 9.5C9 8.12 10.34 7 12 7C13.66 7 15 8.12 15 9.5C15 10.88 13.66 12 12 12C10.34 12 9 13.12 9 14.5C9 15.88 10.34 17 12 17C13.66 17 15 15.88 15 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export default function RechercheAnnonce() {
  const { annonceId } = useParams()
  const navigate = useNavigate()
  const { annonces, acceptAnnonce } = useAnnonces()
  const { startConversation } = useConversations()
  const { profile } = useUserProfile()

  const annonce = annonces.find((a) => a.id === annonceId)

  if (!annonce) {
    navigate('/sitter/recherche')
    return null
  }

  const myName = fullName(profile)

  function handleStartConversation() {
    acceptAnnonce(annonce!.id, myName)
    const convId = startConversation(annonce!.id, annonce!.title, annonce!.userName, myName, profile!.id)
    navigate(`/sitter/messagerie/${convId}`)
  }

  const isSameDay = annonce.startDate === annonce.endDate

  return (
    <div className="flex flex-col h-full bg-bg-primary overflow-y-auto">
      <div className="flex flex-col gap-8 px-4 pt-[62px] pb-[120px]">
        {/* Header */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 ${glassStyle}`}
          >
            <span className="text-text-primary rotate-90">
              <ChevronLeftIcon />
            </span>
          </button>
          <h1 className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] truncate">
            Détail de l'annonce
          </h1>
          <button
            onClick={handleStartConversation}
            className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 ${accentGlassStyle}`}
          >
            <CheckIcon />
          </button>
        </div>

        {/* Owner card */}
        <div className={`flex flex-col items-center gap-8 rounded-2xl p-4 ${glassStyle}`}>
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-32 rounded-full bg-gradient-to-b from-[#4a5568] to-[#2d3748] flex items-center justify-center">
              <span className="text-[48px] font-semibold text-white leading-none">
                {annonce.userName[0]}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[16px] font-medium text-text-primary">{annonce.userName}</span>
              <span className="text-[14px] text-text-secondary tracking-[-0.14px]">{annonce.location}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex w-full">
            <div className="flex-1 flex flex-col gap-2 pr-3 border-r border-stroke">
              <div className="flex items-center gap-2">
                <StarIcon />
                <span className="text-[16px] text-text-primary tracking-[-0.16px]">5,0</span>
              </div>
              <span className="text-[11px] text-text-primary leading-[1.1]">sur 12 avis</span>
            </div>
            <div className="flex flex-col gap-2 px-3 border-r border-stroke">
              <span className="text-[16px] text-text-primary tracking-[-0.16px]">{annonce.price}€</span>
              <span className="text-[11px] text-text-primary leading-[1.1]">Budget</span>
            </div>
            <div className="flex-1 flex flex-col gap-2 pl-3">
              <span className="text-[16px] text-text-primary tracking-[-0.16px]">
                {annonce.petIds.length || '1'}
              </span>
              <span className="text-[11px] text-text-primary leading-[1.1]">Animal(aux)</span>
            </div>
          </div>
        </div>

        {/* Annonce title + description */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            {annonce.title}
          </h2>
          <div className="px-4 py-3 bg-bg-secondary rounded-[9px]">
            <p className="text-[16px] text-text-primary tracking-[-0.16px] leading-[1.2]">
              {annonce.description}
            </p>
          </div>
        </div>

        {/* Date & heure */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Créneau
          </h2>
          <div className="flex flex-col overflow-hidden rounded-[12px]">
            <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary border-b border-stroke">
              <span className="text-text-secondary"><CalendarIcon /></span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] text-text-secondary tracking-[-0.14px]">Date de début</span>
                <span className="text-[16px] text-text-primary tracking-[-0.16px] capitalize">
                  {formatDate(annonce.startDate)}
                </span>
              </div>
            </div>
            {!isSameDay && (
              <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary border-b border-stroke">
                <span className="text-text-secondary"><CalendarIcon /></span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] text-text-secondary tracking-[-0.14px]">Date de fin</span>
                  <span className="text-[16px] text-text-primary tracking-[-0.16px] capitalize">
                    {formatDate(annonce.endDate)}
                  </span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary border-b border-stroke">
              <span className="text-text-secondary"><ClockIcon /></span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] text-text-secondary tracking-[-0.14px]">Heure de début</span>
                <span className="text-[16px] text-text-primary tracking-[-0.16px]">{annonce.startTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary">
              <span className="text-text-secondary"><ClockIcon /></span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] text-text-secondary tracking-[-0.14px]">Heure de fin</span>
                <span className="text-[16px] text-text-primary tracking-[-0.16px]">{annonce.endTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Rémunération
          </h2>
          <div className="flex items-center gap-3 px-4 py-3 bg-bg-secondary rounded-[9px]">
            <span className="text-text-secondary"><PriceIcon /></span>
            <span className="text-[22px] font-semibold text-text-primary tracking-[-0.44px]">
              {annonce.price}€
            </span>
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleStartConversation}
          className={`w-full flex items-center justify-center gap-2 px-4 py-4 rounded-full ${accentGlassStyle}`}
        >
          <span className="text-[16px] font-medium text-bg-primary leading-[1.2]">
            Commencer à discuter
          </span>
          <ChatBubbleIcon />
        </button>
      </div>
    </div>
  )
}
