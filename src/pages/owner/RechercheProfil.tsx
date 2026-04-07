import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSitterProfiles } from '../../store/sitterProfiles'
import { useConversations } from '../../store/conversations'
import { useUserProfile, fullName } from '../../store/userProfile'
import { useFavorites } from '../../store/favorites'

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

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={filled ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="0.8">
      <path d="M8 1L9.854 5.514L14.781 5.9L11.09 9.074L12.326 13.842L8 11.2L3.674 13.842L4.91 9.074L1.219 5.9L6.146 5.514L8 1Z" />
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

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
      <path d="M12 21C12 21 3 14.5 3 8.5C3 6.01472 5.01472 4 7.5 4C9.02501 4 10.3789 4.76604 11.1924 5.93431L12 7L12.8076 5.93431C13.6211 4.76604 14.975 4 16.5 4C18.9853 4 21 6.01472 21 8.5C21 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
      <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]
const DAY_NAMES = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

function Calendar() {
  const now = new Date()
  const [offset, setOffset] = useState(0)
  const date = new Date(now.getFullYear(), now.getMonth() + offset, 1)
  const year = date.getFullYear()
  const month = date.getMonth()
  const today = offset === 0 ? now.getDate() : -1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7 // Mon = 0

  const cells: (number | null)[] = Array(firstWeekday).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))

  const isAvailable = (day: number) => {
    const dow = new Date(year, month, day).getDay()
    return dow >= 1 && dow <= 5
  }

  return (
    <div className={`${glassStyle} rounded-[27px] p-4 w-full`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          {MONTH_NAMES[month]} {year}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOffset(o => o - 1)}
            className="flex items-center justify-center w-8 h-8 rounded-[4px]"
          >
            <span className="text-text-primary rotate-90"><ChevronLeftIcon /></span>
          </button>
          <button
            onClick={() => setOffset(o => o + 1)}
            className="flex items-center justify-center w-8 h-8 rounded-[4px]"
          >
            <span className="text-text-primary -rotate-90"><ChevronLeftIcon /></span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-3">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[16px] font-normal text-text-tertiary tracking-[-0.16px]">
            {d}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7">
            {week.map((day, di) => {
              if (!day) return <div key={di} className="size-11" />
              const avail = isAvailable(day)
              const isToday = day === today
              return (
                <div key={di} className="flex items-center justify-center size-11">
                  <div
                    className={`flex items-center justify-center size-11 rounded-full text-[22px] font-semibold leading-[1.2] tracking-[-0.44px] ${
                      isToday
                        ? 'bg-brand text-brand-light'
                        : avail
                        ? 'text-brand'
                        : 'text-text-primary'
                    }`}
                  >
                    {day}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">Heure de début</span>
        <div className="flex items-center gap-2 bg-[rgba(118,118,128,0.12)] px-3 py-1.5 rounded-full">
          <span className="text-[17px] text-text-primary leading-[22px] tracking-[-0.43px]">9:00</span>
          <span className="text-text-primary rotate-180"><ChevronRightIcon /></span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">Heure de fin</span>
        <div className="flex items-center gap-2 bg-[rgba(118,118,128,0.12)] px-3 py-1.5 rounded-full">
          <span className="text-[17px] text-text-primary leading-[22px] tracking-[-0.43px]">18:00</span>
          <span className="text-text-primary rotate-180"><ChevronRightIcon /></span>
        </div>
      </div>

      <p className="text-[14px] text-text-secondary mt-3 leading-[1.2] tracking-[-0.14px]">
        Les jours en vert correspondent aux disponibilités du pet promeneur.
      </p>
    </div>
  )
}

function InfoField({ label, glareDelay }: { label: string; glareDelay?: number }) {
  return (
    <div className="relative overflow-hidden flex items-center gap-2 px-4 py-3 bg-bg-secondary rounded-[9px]">
      <span className="flex-1 text-[16px] text-text-primary tracking-[-0.16px]">{label}</span>
      {glareDelay !== undefined && (
        <span
          className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{ animation: `badge-glare 3.5s ease-in-out ${glareDelay}s infinite` }}
        />
      )}
    </div>
  )
}

export default function RechercheProfil() {
  const { sitterId } = useParams()
  const navigate = useNavigate()
  const { sitterProfiles } = useSitterProfiles()
  const { startConversation } = useConversations()
  const { profile } = useUserProfile()
  const { isFavoriteSitter, toggleFavoriteSitter } = useFavorites()

  const sitter = sitterProfiles.find((s) => s.id === sitterId)

  if (!sitter) {
    navigate('/owner/recherche')
    return null
  }

  const ownerName = fullName(profile)
  const sitterFullName = `${sitter.firstName} ${sitter.lastName}`
  const isFav = isFavoriteSitter(sitter.id)

  function handleStartConversation() {
    const convId = startConversation(
      `contact-${sitter!.id}`,
      'Prise de contact',
      ownerName,
      sitterFullName,
      sitter!.id,
    )
    navigate(`/owner/messagerie/${convId}`)
  }

  const certifications = sitter.badges.filter((b) => !b.startsWith('Pawpy'))
  const pawpyLevel = sitter.badges.find((b) => b.startsWith('Pawpy'))

  const skills: string[] = []
  if (sitter.badges.includes('ACACED')) {
    skills.push('Premiers secours canins', 'Gestion des chiens anxieux')
  }
  if (pawpyLevel) {
    skills.push('Dressage de base', 'Travail avec chiots')
  }
  if (skills.length === 0) {
    skills.push('Promenades en laisse', 'Balades en groupe')
  }

  const ratingStars = Math.round(sitter.rating)

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
          <h1 className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Recherche
          </h1>
          <button
            onClick={() => toggleFavoriteSitter(sitter.id)}
            className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 ${glassStyle} ${isFav ? 'text-rose-500' : 'text-text-primary'}`}
          >
            <HeartIcon filled={isFav} />
          </button>
        </div>

        {/* Profile card */}
        <div className={`flex flex-col items-center gap-8 rounded-2xl p-4 overflow-hidden ${glassStyle}`}>
          {/* Avatar + badge */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-end pr-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-b from-[#2d6a4f] to-[#1b4332] flex items-center justify-center -mr-8 flex-shrink-0">
                <span className="text-[48px] font-semibold text-white leading-none">
                  {sitter.firstName[0]}
                </span>
              </div>
              {pawpyLevel && (
                <div className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 z-10 ${glassStyle}`}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="10" stroke="#04341a" strokeWidth="1.5" />
                    <path d="M7 11L10 14L15 8" stroke="#04341a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[16px] font-medium text-text-primary">{sitterFullName}</span>
              <span className="text-[14px] text-text-secondary tracking-[-0.14px]">Actif</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex w-full">
            <div className="flex-1 flex flex-col gap-2 pr-3 border-r border-stroke">
              <div className="flex items-center gap-2">
                <StarIcon filled />
                <span className="text-[16px] text-text-primary tracking-[-0.16px]">
                  {sitter.rating.toFixed(1).replace('.', ',')}
                </span>
              </div>
              <span className="text-[11px] text-text-primary leading-[1.1]">sur 300 avis</span>
            </div>
            <div className="flex flex-col gap-2 px-3 border-r border-stroke">
              <span className="text-[16px] text-text-primary tracking-[-0.16px]">350</span>
              <span className="text-[11px] text-text-primary leading-[1.1]">Promenades réalisé</span>
            </div>
            <div className="flex-1 flex flex-col gap-2 pl-3">
              <span className="text-[16px] text-text-primary tracking-[-0.16px]">3 ans</span>
              <span className="text-[11px] text-text-primary leading-[1.1]">D'expérience</span>
            </div>
          </div>
        </div>

        {/* Profil */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Profil
          </h2>
          <div className="px-4 py-3 bg-bg-secondary rounded-[9px]">
            <p className="text-[16px] text-text-primary tracking-[-0.16px] leading-[1.2]">
              {sitter.description}
            </p>
          </div>
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
              Certifications
            </h2>
            <div className="flex flex-col">
              {certifications.map((cert, ci) => (
                <InfoField key={cert} label={cert} glareDelay={ci * 1.2} />
              ))}
            </div>
          </div>
        )}

        {/* Catégories de chiens acceptées */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Catégories de chiens acceptées
          </h2>
          <InfoField label="Non catégorisés" />
        </div>

        {/* Compétences clés */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Compétences clés
          </h2>
          <div className="flex flex-col overflow-hidden rounded-[12px]">
            {skills.map((skill, i) => (
              <div
                key={skill}
                className={`flex items-center gap-2 px-4 py-3 bg-bg-secondary ${
                  i < skills.length - 1 ? 'border-b border-stroke' : ''
                }`}
              >
                <span className="flex-1 text-[16px] text-text-primary tracking-[-0.16px]">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avis */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Avis
          </h2>
          <div className="flex gap-4 overflow-x-auto -mx-4 px-4 pb-2">
            {[
              "Merci pour votre professionnalisme et votre attention. Notre compagnon a été parfaitement choyé, et vos nouvelles régulières nous ont apporté une vraie sérénité.",
              "Merci pour votre soin et votre fiabilité. Notre compagnon est rentré serein et bien choyé, et vos comptes rendus détaillés nous ont vraiment rassurés.",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-bg-secondary rounded-[9px] p-2 flex-shrink-0 w-[320px] flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#4a5568] to-[#2d3748] flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-semibold text-white">E</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-[5px]">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <StarIcon key={si} filled={si < ratingStars} />
                      ))}
                    </div>
                    <span className="text-[14px] text-text-primary tracking-[-0.14px] leading-[1.2]">
                      Élizabeth Quilomaitre
                    </span>
                  </div>
                </div>
                <p className="text-[14px] text-text-secondary tracking-[-0.14px] leading-[1.2]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disponibilités */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Disponibilités
          </h2>
          <Calendar />
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
