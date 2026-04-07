import { useEffect, useRef, useState } from 'react'
import { usePets } from '../../store/pets'

/* ─── Icons ─────────────────────────────────────────────────── */

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2.5 2.5 0 013.536 3.536L12.536 16.5H9v-3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function SmallXIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3L21 9.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="11" fill="#0088ff"/>
      <path d="M6 11L9.5 14.5L16 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PlusCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="11" fill="#34c759"/>
      <path d="M11 6V16M6 11H16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── Types ──────────────────────────────────────────────────── */

interface Props {
  onClose: () => void
  onConfirm: (data: WalkFormData) => void
}

export interface WalkFormData {
  title: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  price: string
  selectedPetIds: string[]
  requiredSkills: string[]
  itinerary: string[]
  accessories: string[]
  notes: string
}

const TOTAL_STEPS = 6

const NOTES_SUGGESTIONS = [
  'Médicaments à administrer (nom, fréquence, consignes)',
  'Allergies connues',
  'Peurs de votre chien en balade',
  'Récompenses',
  'Problèmes de santé particuliers',
  'Restrictions importantes pendant la promenade',
  'Toute information utile pour assurer sa sécurité et son bien-être',
  'Vétérinaire habituel (nom et téléphone)',
]

/* ─── Component ──────────────────────────────────────────────── */

export default function NouvellePromenadeModal({ onClose, onConfirm }: Props) {
  const { pets } = usePets()
  const today = new Date().toISOString().split('T')[0]
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(1)

  // Step 1
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState(today)
  const [startTime, setStartTime] = useState('08:00')
  const [endDate, setEndDate] = useState(today)
  const [endTime, setEndTime] = useState('18:00')
  const [price, setPrice] = useState('25.00')

  // Step 2
  const [selectedPetIds, setSelectedPetIds] = useState<string[]>(
    pets.length > 0 ? [pets[0].id] : []
  )

  // Step 3
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState<string[]>([])

  // Step 4
  const [itinerary, setItinerary] = useState<string[]>(['', ''])

  // Step 5
  const [accessoryInput, setAccessoryInput] = useState('')
  const [accessories, setAccessories] = useState<string[]>([])

  // Step 6
  const [notes, setNotes] = useState('')

  const skillInputRef = useRef<HTMLInputElement>(null)
  const accessoryInputRef = useRef<HTMLInputElement>(null)

  const skipPetStep = pets.length <= 1

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  function goNext() {
    if (step === TOTAL_STEPS) {
      submit()
      return
    }
    let next = step + 1
    if (next === 2 && skipPetStep) next = 3
    setStep(next)
  }

  function goBack() {
    let prev = step - 1
    if (prev === 2 && skipPetStep) prev = 1
    if (prev < 1) handleClose()
    else setStep(prev)
  }

  function submit() {
    setVisible(false)
    setTimeout(() => onConfirm({
      title,
      startDate, startTime, endDate, endTime,
      price,
      selectedPetIds,
      requiredSkills: skills,
      itinerary: itinerary.filter(Boolean),
      accessories,
      notes,
    }), 300)
  }

  function togglePet(id: string) {
    setSelectedPetIds(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  function addSkill() {
    const trimmed = skillInput.trim()
    if (trimmed && !skills.includes(trimmed)) setSkills(prev => [...prev, trimmed])
    setSkillInput('')
    skillInputRef.current?.focus()
  }

  function addAccessory() {
    const trimmed = accessoryInput.trim()
    if (trimmed && !accessories.includes(trimmed)) setAccessories(prev => [...prev, trimmed])
    setAccessoryInput('')
    accessoryInputRef.current?.focus()
  }

  function updateItinerary(idx: number, val: string) {
    setItinerary(prev => prev.map((s, i) => i === idx ? val : s))
  }

  function addStop() {
    setItinerary(prev => [...prev, ''])
  }

  /* ─── Progress bar ─── */
  function ProgressBar() {
    return (
      <div className="flex gap-1 w-full shrink-0">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex-1 h-[10px] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-colors duration-300 ${
                i + 1 === step ? 'bg-brand' : 'bg-[#DCDDDC]'
              }`}
            />
          </div>
        ))}
      </div>
    )
  }

  /* ─── Header ─── */
  function Header() {
    const isFirst = step === 1
    const isLast = step === TOTAL_STEPS

    return (
      <div className="flex items-center gap-6 shrink-0">
        <button
          onClick={isFirst ? handleClose : goBack}
          className="flex items-center justify-center p-3 rounded-full bg-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] text-text-primary shrink-0"
        >
          {isFirst ? <XIcon /> : <ChevronLeftIcon />}
        </button>
        <p className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] text-center" style={{ fontFeatureSettings: "'case' 1" }}>
          Nouvelle promenade
        </p>
        <button
          onClick={goNext}
          className={`flex items-center justify-center p-3 rounded-full shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)] text-white shrink-0 transition-opacity ${
            isLast ? 'opacity-0 pointer-events-none' : 'bg-brand/80'
          }`}
        >
          <ArrowRightIcon />
        </button>
      </div>
    )
  }

  /* ─── Step 1: Titre + Date/Heure ─── */
  function Step1() {
    return (
      <div className="flex flex-col gap-8 flex-1">
        {/* Titre */}
        <div className="flex flex-col gap-4">
          <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]" style={{ fontFeatureSettings: "'case' 1" }}>
            Titre de la balade
          </p>
          <div className="flex items-center gap-2 h-[48px] bg-bg-secondary rounded-[9px] px-4">
            <input
              type="text"
              placeholder="Petite balade pour mon toutou"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="flex-1 bg-transparent text-base text-text-primary placeholder:text-text-tertiary outline-none leading-[1.2] tracking-[-0.16px]"
              style={{ fontFeatureSettings: "'case' 1" }}
            />
            <span className="text-text-secondary shrink-0"><PenIcon /></span>
          </div>
        </div>

        {/* Date et heure */}
        <div className="flex flex-col gap-4">
          <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]" style={{ fontFeatureSettings: "'case' 1" }}>
            Date et heure
          </p>
          <div className="flex flex-col border-t border-stroke/60">
            {/* Début de mission */}
            <div className="flex items-center justify-between gap-4 h-[70px] border-b border-stroke/60">
              <p className="text-base text-text-primary leading-[1.2] tracking-[-0.16px]" style={{ fontFeatureSettings: "'case' 1" }}>
                Début de mission
              </p>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="bg-bg-secondary rounded-[6px] px-3 h-[34px] flex items-center">
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="bg-transparent text-base text-text-primary outline-none text-center tracking-[-0.16px] cursor-pointer"
                    style={{ colorScheme: 'light', fontFeatureSettings: "'case' 1" }}
                  />
                </div>
                <div className="bg-bg-secondary rounded-[6px] px-3 h-[34px] flex items-center">
                  <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="bg-transparent text-base text-text-primary outline-none text-center w-[52px] tracking-[-0.16px] cursor-pointer"
                    style={{ colorScheme: 'light', fontFeatureSettings: "'case' 1" }}
                  />
                </div>
              </div>
            </div>

            {/* Fin de mission */}
            <div className="flex items-center justify-between gap-4 h-[70px] border-b border-stroke/60">
              <p className="text-base text-text-primary leading-[1.2] tracking-[-0.16px]" style={{ fontFeatureSettings: "'case' 1" }}>
                Fin de mission
              </p>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="bg-bg-secondary rounded-[6px] px-3 h-[34px] flex items-center">
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="bg-transparent text-base text-text-primary outline-none text-center tracking-[-0.16px] cursor-pointer"
                    style={{ colorScheme: 'light', fontFeatureSettings: "'case' 1" }}
                  />
                </div>
                <div className="bg-bg-secondary rounded-[6px] px-3 h-[34px] flex items-center">
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="bg-transparent text-base text-text-primary outline-none text-center w-[52px] tracking-[-0.16px] cursor-pointer"
                    style={{ colorScheme: 'light', fontFeatureSettings: "'case' 1" }}
                  />
                </div>
              </div>
            </div>

            {/* Tarif */}
            <div className="flex items-center justify-between gap-4 h-[70px]">
              <p className="text-base text-text-primary leading-[1.2] tracking-[-0.16px]" style={{ fontFeatureSettings: "'case' 1" }}>
                Fixer votre tarif
              </p>
              <div className="bg-bg-secondary rounded-[6px] px-3 h-[34px] flex items-center gap-1 shrink-0">
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  step="0.5"
                  min="0"
                  className="bg-transparent text-base text-text-primary outline-none text-center w-[52px] tracking-[-0.16px]"
                  style={{ fontFeatureSettings: "'case' 1" }}
                />
                <span className="text-base text-text-primary" style={{ fontFeatureSettings: "'case' 1" }}>€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ─── Step 2: Pour qui ? ─── */
  function Step2() {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]" style={{ fontFeatureSettings: "'case' 1" }}>
          Pour qui est cette balade ?
        </p>
        <div className="flex gap-4 flex-wrap">
          {pets.map(pet => {
            const selected = selectedPetIds.includes(pet.id)
            return (
              <button
                key={pet.id}
                onClick={() => togglePet(pet.id)}
                className="flex flex-col items-center gap-1"
              >
                <div className="relative flex items-end justify-end pr-[2px]">
                  <div className="w-[64px] h-[64px] rounded-full bg-brand-light flex items-center justify-center text-brand font-semibold text-lg overflow-hidden">
                    {pet.photo
                      ? <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                      : pet.name[0].toUpperCase()
                    }
                  </div>
                  <div className="absolute bottom-0 right-0 translate-x-[2px]">
                    {selected ? <CheckCircleIcon /> : <PlusCircleIcon />}
                  </div>
                </div>
                <span className="text-xs text-text-secondary leading-[1.2] max-w-[64px] truncate" style={{ fontFeatureSettings: "'case' 1" }}>
                  {pet.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  /* ─── Step 3: Compétences ─── */
  function Step3() {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]" style={{ fontFeatureSettings: "'case' 1" }}>
          Compétences nécessaires
        </p>
        {/* Search input */}
        <div className="flex items-center gap-2 h-[48px] bg-bg-secondary rounded-[9px] px-4">
          <input
            ref={skillInputRef}
            type="text"
            placeholder="Ajouter une compétence"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSkill()}
            className="flex-1 bg-transparent text-base text-text-primary placeholder:text-text-tertiary outline-none leading-[1.2] tracking-[-0.16px]"
            style={{ fontFeatureSettings: "'case' 1" }}
          />
          <button onClick={addSkill} className="text-text-secondary shrink-0">
            <SearchIcon />
          </button>
        </div>
        {/* Tags */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <div key={skill} className="flex items-center gap-2 bg-bg-secondary rounded-[12px] px-4 py-3">
                <span className="text-sm text-text-primary leading-[1.2] tracking-[-0.14px]" style={{ fontFeatureSettings: "'case' 1" }}>
                  {skill}
                </span>
                <button onClick={() => setSkills(prev => prev.filter(s => s !== skill))} className="text-text-secondary">
                  <SmallXIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  /* ─── Step 4: Itinéraire ─── */
  function Step4() {
    return (
      <div className="flex flex-col flex-1 min-h-0 p-2">
        {/* Map + card container */}
        <div className="flex flex-col flex-1 min-h-0 relative overflow-hidden rounded-[16px] justify-end">
          {/* Map image */}
          <img
            src="https://www.figma.com/api/mcp/asset/06874ff7-511b-4c29-bf0f-0bc9cd3b2f0f"
            alt="Carte"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Itinerary card */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-[24px] shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] p-4 m-2">
            {/* Grabber */}
            <div className="w-9 h-[5px] bg-bg-tertiary rounded-full mx-auto absolute top-[6px] left-1/2 -translate-x-1/2" />

            <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] mb-2" style={{ fontFeatureSettings: "'case' 1" }}>
              Itinéraire
            </p>

            <div className="flex flex-col relative">
              {/* Pickup address */}
              <div className="flex items-center gap-4 h-[63px] border-b border-stroke/50">
                <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center shrink-0">
                  <HomeIcon />
                </div>
                <input
                  type="text"
                  placeholder="Adresse de prise en charge"
                  value={itinerary[0] ?? ''}
                  onChange={e => updateItinerary(0, e.target.value)}
                  className="flex-1 bg-transparent text-base text-text-primary placeholder:text-text-tertiary outline-none leading-[1.2] tracking-[-0.16px]"
                  style={{ fontFeatureSettings: "'case' 1" }}
                />
              </div>

              {/* Stops */}
              {itinerary.slice(1).map((stop, i) => (
                <div key={i + 1} className="flex items-center gap-4 h-[63px] border-b border-stroke/50">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0 shadow-[0px_0px_4px_0px_rgba(214,213,212,0.4)]">
                    <span className="text-text-secondary"><PinIcon /></span>
                  </div>
                  <input
                    type="text"
                    placeholder="Arrêt"
                    value={stop}
                    onChange={e => updateItinerary(i + 1, e.target.value)}
                    className="flex-1 bg-transparent text-base text-text-primary placeholder:text-text-tertiary outline-none leading-[1.2] tracking-[-0.16px]"
                    style={{ fontFeatureSettings: "'case' 1" }}
                  />
                </div>
              ))}

              {/* Add stop */}
              <button
                onClick={addStop}
                className="flex items-center gap-4 h-[63px]"
              >
                <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shrink-0 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]">
                  <span className="text-text-secondary"><PlusIcon /></span>
                </div>
                <span className="text-base text-text-primary leading-[1.2] tracking-[-0.16px]" style={{ fontFeatureSettings: "'case' 1" }}>
                  Ajouter un arrêt
                </span>
              </button>

              {/* Connecting line between home and first stop */}
              {itinerary.length > 1 && (
                <div className="absolute left-[15px] top-[63px] w-[2px] bg-stroke/40" style={{ height: `${(itinerary.length - 1) * 63}px` }} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ─── Step 5: Accessoires ─── */
  function Step5() {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]" style={{ fontFeatureSettings: "'case' 1" }}>
          Accessoires de balade
        </p>
        <div className="flex flex-col gap-2">
          {/* Search input */}
          <div className="flex items-center gap-2 h-[48px] bg-bg-secondary rounded-[9px] px-4">
            <input
              ref={accessoryInputRef}
              type="text"
              placeholder="Ajouter un accessoire de balade"
              value={accessoryInput}
              onChange={e => setAccessoryInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addAccessory()}
              className="flex-1 bg-transparent text-base text-text-primary placeholder:text-text-tertiary outline-none leading-[1.2] tracking-[-0.16px]"
              style={{ fontFeatureSettings: "'case' 1" }}
            />
            <button onClick={addAccessory} className="text-text-secondary shrink-0">
              <SearchIcon />
            </button>
          </div>
          <p className="text-[11px] text-text-secondary leading-[1.1]" style={{ fontFeatureSettings: "'case' 1" }}>
            Sélectionnez les accessoires nécessaires pour la balade
          </p>
        </div>
        {/* Tags */}
        {accessories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {accessories.map(acc => (
              <div key={acc} className="flex items-center gap-2 bg-bg-secondary rounded-[12px] px-4 py-3">
                <span className="text-sm text-text-primary leading-[1.2] tracking-[-0.14px]" style={{ fontFeatureSettings: "'case' 1" }}>
                  {acc}
                </span>
                <button onClick={() => setAccessories(prev => prev.filter(a => a !== acc))} className="text-text-secondary">
                  <SmallXIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  /* ─── Step 6: Informations complémentaires ─── */
  function Step6() {
    return (
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]" style={{ fontFeatureSettings: "'case' 1" }}>
          Informations complémentaires
        </p>
        {/* Textarea */}
        <div className="bg-bg-secondary rounded-[9px] flex gap-2 items-start px-4 py-4 h-[152px]">
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Entrer le texte ici"
            className="flex-1 bg-transparent text-base text-text-primary placeholder:text-text-tertiary outline-none resize-none leading-[1.2] tracking-[-0.16px] h-full"
            style={{ fontFeatureSettings: "'case' 1" }}
          />
          <span className="text-text-secondary shrink-0"><PenIcon /></span>
        </div>
        {/* Suggestions */}
        <ul className="list-disc pl-4 flex flex-col gap-0.5">
          {NOTES_SUGGESTIONS.map(s => (
            <li key={s} className="text-[11px] text-text-secondary leading-[1.1]" style={{ fontFeatureSettings: "'case' 1" }}>
              {s}
            </li>
          ))}
        </ul>
        {/* Confirm button */}
        <button
          onClick={submit}
          className="flex items-center justify-center gap-2 bg-brand text-white rounded-full px-4 py-4 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)] mt-auto"
        >
          <span className="text-base font-semibold leading-[1.2]" style={{ fontFeatureSettings: "'case' 1" }}>
            Je confirme
          </span>
          <CheckIcon />
        </button>
      </div>
    )
  }

  /* ─── Render ─────────────────────────────────────────────────── */

  const isStep4 = step === 4

  return (
    <div className="absolute inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className="relative w-full bg-bg-primary rounded-tl-[38px] rounded-tr-[38px] shadow-[0px_15px_75px_0px_rgba(0,0,0,0.18)] flex flex-col h-[92dvh] overflow-hidden transition-transform duration-300 ease-out"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Header + progress (not shown inside map for step 4) */}
        <div className={`flex flex-col gap-3 px-4 pt-4 shrink-0 ${isStep4 ? 'pb-0' : 'pb-2'}`}>
          {Header()}
          {ProgressBar()}
        </div>

        {/* Content */}
        <div className={`overflow-y-auto flex flex-col gap-4 flex-1 ${isStep4 ? '' : 'px-4 pb-8'}`}>
          {step === 1 && Step1()}
          {step === 2 && Step2()}
          {step === 3 && Step3()}
          {step === 4 && Step4()}
          {step === 5 && Step5()}
          {step === 6 && Step6()}
        </div>
      </div>
    </div>
  )
}
