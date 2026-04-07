import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OwnerBottomTabBar from '../../components/owner/BottomTabBar'
import { useSitterProfiles, type SitterProfile } from '../../store/sitterProfiles'
import { useConversations } from '../../store/conversations'
import { useUserProfile, fullName } from '../../store/userProfile'
import { useFavorites } from '../../store/favorites'

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'
const accentGlassStyle = 'bg-gradient-to-r from-brand/80 to-brand/80 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]'

const BG_GRADIENTS = [
  'bg-gradient-to-b from-[#4a5568] to-[#2d3748]',
  'bg-gradient-to-b from-[#2d6a4f] to-[#1b4332]',
  'bg-gradient-to-b from-[#5c4033] to-[#3e2723]',
  'bg-gradient-to-b from-[#1a237e] to-[#283593]',
  'bg-gradient-to-b from-[#4a148c] to-[#6a1b9a]',
]

function FilterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H21M6 12H18M10 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L9.854 5.514L14.781 5.9L11.09 9.074L12.326 13.842L8 11.2L3.674 13.842L4.91 9.074L1.219 5.9L6.146 5.514L8 1Z" fill="#F59E0B"/>
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

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
      <path d="M12 21C12 21 3 14.5 3 8.5C3 6.01472 5.01472 4 7.5 4C9.02501 4 10.3789 4.76604 11.1924 5.93431L12 7L12.8076 5.93431C13.6211 4.76604 14.975 4 16.5 4C18.9853 4 21 6.01472 21 8.5C21 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

interface SwipeCardProps {
  sitter: SitterProfile
  index: number
  isTop: boolean
  dragX: number
  isDragging: boolean
  isFavorited: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: () => void
  onTap: (sitterId: string) => void
  onToggleFavorite: (sitterId: string) => void
}

function SwipeCard({ sitter, index, isTop, dragX, isDragging, isFavorited, onPointerDown, onPointerMove, onPointerUp, onTap, onToggleFavorite }: SwipeCardProps) {
  const bgGradient = BG_GRADIENTS[index % BG_GRADIENTS.length]
  const rotate = isTop ? dragX * 0.06 : 0
  const scale = isTop ? 1 : index === 1 ? 0.95 : 0.9
  const translateY = isTop ? 0 : index === 1 ? 12 : 24

  const showLike = isTop && dragX > 20
  const showNope = isTop && dragX < -20
  const likeOpacity = Math.min(dragX / 80, 1)
  const nopeOpacity = Math.min(-dragX / 80, 1)

  return (
    <div
      className="absolute w-full"
      style={{
        zIndex: isTop ? 10 : index === 1 ? 5 : 1,
        transform: `translateX(${isTop ? dragX : 0}px) rotate(${rotate}deg) scale(${scale}) translateY(${translateY}px)`,
        transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        cursor: isTop ? 'grab' : 'default',
        touchAction: 'none',
      }}
      onPointerDown={isTop ? onPointerDown : undefined}
      onPointerMove={isTop ? onPointerMove : undefined}
      onPointerUp={isTop ? onPointerUp : undefined}
      onPointerCancel={isTop ? onPointerUp : undefined}
      onClick={isTop ? () => onTap(sitter.id) : undefined}
    >
      <div className="relative w-full h-[480px] rounded-2xl overflow-hidden shadow-[0px_8px_30px_0px_rgba(1,10,5,0.2),0px_0px_4px_0px_rgba(1,10,5,0.15)] select-none">
        {/* Background */}
        <div className={`absolute inset-0 ${bgGradient}`} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[57%] to-black/70 to-[78%]" />

        {/* LIKE label */}
        {showLike && (
          <div
            className="absolute top-8 left-6 border-4 border-emerald-400 rounded-lg px-3 py-1 rotate-[-12deg]"
            style={{ opacity: likeOpacity }}
          >
            <span className="text-emerald-400 text-2xl font-black tracking-wider">LIKE</span>
          </div>
        )}

        {/* NOPE label */}
        {showNope && (
          <div
            className="absolute top-8 right-6 border-4 border-red-400 rounded-lg px-3 py-1 rotate-[12deg]"
            style={{ opacity: nopeOpacity }}
          >
            <span className="text-red-400 text-2xl font-black tracking-wider">NOPE</span>
          </div>
        )}

        {/* Top row */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-white text-sm leading-[1.2] tracking-[-0.14px]">{sitter.rating.toFixed(1)}</span>
            <StarIcon />
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {sitter.badges.map((badge, bi) => (
              <div key={badge} className="relative overflow-hidden flex items-center gap-1 bg-bg-primary px-2 py-1 rounded-full">
                <span className="text-text-primary"><CheckIcon /></span>
                <span className="text-[11px] text-text-primary leading-[1.1] whitespace-nowrap">{badge}</span>
                <span
                  className="pointer-events-none absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  style={{ animation: `badge-glare 3.5s ease-in-out ${bi * 1.2}s infinite` }}
                />
              </div>
            ))}
            {isTop && (
              <button
                className={`flex items-center justify-center w-9 h-9 rounded-full ${glassStyle} ${isFavorited ? 'text-rose-500' : 'text-text-secondary'}`}
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); onToggleFavorite(sitter.id) }}
              >
                <HeartIcon filled={isFavorited} />
              </button>
            )}
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
          <h2 className="text-[22px] font-semibold text-[#f0efeb] leading-[1.2] tracking-[-0.44px] truncate">
            {sitter.firstName} {sitter.lastName}
          </h2>
          <p className="text-base text-[#f5f5f7]/95 leading-[1.2] tracking-[-0.16px] line-clamp-2">
            {sitter.description || `${sitter.postal}`}
          </p>
        </div>
      </div>
    </div>
  )
}

const SWIPE_THRESHOLD = 80
const EXIT_X = 650

export default function OwnerRecherche() {
  const navigate = useNavigate()
  const { sitterProfiles } = useSitterProfiles()
  const { startConversation } = useConversations()
  const { profile } = useUserProfile()
  const ownerName = fullName(profile)
  const { isFavoriteSitter, toggleFavoriteSitter } = useFavorites()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const startXRef = useRef(0)
  const maxDragRef = useRef(0)
  const pendingConvIdRef = useRef<string | null>(null)

  const remaining = sitterProfiles.slice(currentIndex)

  function handleSwipeRight() {
    const sitter = sitterProfiles[currentIndex]
    const convId = startConversation(
      `contact-${sitter.id}`,
      'Prise de contact',
      ownerName,
      `${sitter.firstName} ${sitter.lastName}`,
      sitter.id,
    )
    pendingConvIdRef.current = convId
    setIsAnimating(true)
    setDragX(EXIT_X)
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setDragX(0)
      setIsAnimating(false)
      if (pendingConvIdRef.current) {
        navigate(`/owner/messagerie/${pendingConvIdRef.current}`)
        pendingConvIdRef.current = null
      }
    }, 350)
  }

  function handleSwipeLeft() {
    setIsAnimating(true)
    setDragX(-EXIT_X)
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setDragX(0)
      setIsAnimating(false)
    }, 350)
  }

  function onPointerDown(e: React.PointerEvent) {
    if (isAnimating) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setIsDragging(true)
    startXRef.current = e.clientX
    maxDragRef.current = 0
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging) return
    const dx = e.clientX - startXRef.current
    maxDragRef.current = Math.max(maxDragRef.current, Math.abs(dx))
    setDragX(dx)
  }

  function onPointerUp() {
    if (!isDragging) return
    setIsDragging(false)
    if (dragX > SWIPE_THRESHOLD) {
      handleSwipeRight()
    } else if (dragX < -SWIPE_THRESHOLD) {
      handleSwipeLeft()
    } else {
      setDragX(0)
    }
  }

  function handleTap(sitterId: string) {
    if (maxDragRef.current > 8 || isAnimating) return
    navigate(`/owner/recherche/${sitterId}`)
  }

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

      {/* Card stack + actions */}
      <div className="flex flex-col items-center gap-6 px-4">
        {remaining.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[480px] gap-4 text-center">
            <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
              Plus de profils
            </p>
            <p className="text-base text-text-secondary leading-[1.2] tracking-[-0.16px]">
              Revenez plus tard pour découvrir de nouveaux promeneurs.
            </p>
            <button
              onClick={() => setCurrentIndex(0)}
              className={`px-6 py-3 rounded-full text-sm font-medium text-text-primary ${glassStyle}`}
            >
              Recommencer
            </button>
          </div>
        ) : (
          <div className="relative w-full" style={{ height: 480 + 24 }}>
            {remaining.slice(0, 3).map((sitter, i) => (
              <SwipeCard
                key={sitter.id}
                sitter={sitter}
                index={i}
                isTop={i === 0}
                dragX={i === 0 ? dragX : 0}
                isDragging={isDragging && i === 0}
                isFavorited={isFavoriteSitter(sitter.id)}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onTap={handleTap}
                onToggleFavorite={toggleFavoriteSitter}
              />
            ))}
          </div>
        )}

        {/* Action buttons */}
        {remaining.length > 0 && (
          <div className="flex items-center gap-16">
            <button
              onClick={() => !isAnimating && handleSwipeLeft()}
              className={`flex items-center justify-center w-12 h-12 rounded-full ${glassStyle}`}
            >
              <span className="text-text-primary"><CloseIcon /></span>
            </button>
            <button
              onClick={() => !isAnimating && handleSwipeRight()}
              className={`flex items-center justify-center w-12 h-12 rounded-full ${accentGlassStyle}`}
            >
              <ChatIcon />
            </button>
          </div>
        )}
      </div>

      <OwnerBottomTabBar activeTab="promeneurs" />
    </div>
  )
}
