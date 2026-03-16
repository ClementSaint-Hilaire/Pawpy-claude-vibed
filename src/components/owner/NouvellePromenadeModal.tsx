import { useEffect, useState } from 'react'

interface Pet {
  id: string
  name: string
  color: string
}

const MOCK_PETS: Pet[] = [
  { id: '1', name: 'Luna', color: '#e8d5b7' },
  { id: '2', name: 'Felix', color: '#c8b89a' },
  { id: '3', name: 'Milo', color: '#8c7b6b' },
]

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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

function ChevronRightIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

function PlusCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="11" fill="#34c759"/>
      <path d="M11 6V16M6 11H16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
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

interface Props {
  onClose: () => void
  onConfirm: (data: WalkFormData) => void
}

export interface WalkFormData {
  offerName: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  price: string
  notes: string
  selectedPetIds: string[]
}

export default function NouvellePromenadeModal({ onClose, onConfirm }: Props) {
  const today = new Date().toISOString().split('T')[0]
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const [offerName, setOfferName] = useState('')
  const [startDate, setStartDate] = useState(today)
  const [startTime, setStartTime] = useState('08:00')
  const [endDate, setEndDate] = useState(today)
  const [endTime, setEndTime] = useState('18:00')
  const [price, setPrice] = useState('15.00')
  const [notes, setNotes] = useState('')
  const [selectedPetIds, setSelectedPetIds] = useState<string[]>([MOCK_PETS[0].id])

  function togglePet(id: string) {
    setSelectedPetIds(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  function handleConfirm() {
    setVisible(false)
    setTimeout(() => onConfirm({ offerName, startDate, startTime, endDate, endTime, price, notes, selectedPetIds }), 300)
  }

  return (
    /* Overlay */
    <div className="absolute inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className="relative w-full bg-bg-primary rounded-tl-[38px] rounded-tr-[38px] shadow-[0px_15px_75px_0px_rgba(0,0,0,0.18)] flex flex-col max-h-[92dvh] overflow-hidden transition-transform duration-300 ease-out"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-6 px-4 py-4 shrink-0">
          <button
            onClick={handleClose}
            className="flex items-center justify-center p-3 rounded-full bg-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] text-text-primary shrink-0"
          >
            <XIcon />
          </button>
          <p className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] text-center">
            Nouvelle promenade
          </p>
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center p-3 rounded-full bg-brand/80 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)] text-white shrink-0"
          >
            <CheckIcon />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex flex-col gap-4 px-4 pb-8">
          {/* Owner profile row */}
          <button className="flex items-center gap-4 h-[68px] w-full">
            <div className="w-[54px] h-[54px] rounded-full bg-brand-light shrink-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-brand-light to-brand/20 rounded-full flex items-center justify-center text-brand font-semibold text-lg">
                É
              </div>
            </div>
            <div className="flex-1 flex items-center justify-between min-w-0">
              <p className="text-base font-medium text-text-primary leading-[1.375] truncate">
                Élisabeth Quilomaitre
              </p>
              <div className="flex items-center gap-2 text-text-secondary shrink-0 ml-2">
                <span className="text-sm">Modifier</span>
                <ChevronRightIcon />
              </div>
            </div>
          </button>

          {/* Form fields */}
          <div className="flex flex-col border border-stroke rounded-[12px] overflow-hidden">
            {/* Nom de l'offre */}
            <div className="border-b border-stroke px-4 py-3">
              <div className="flex items-center gap-2 h-[48px] bg-bg-secondary rounded-[9px] px-4">
                <input
                  type="text"
                  placeholder="Nom de l'offre"
                  value={offerName}
                  onChange={e => setOfferName(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary outline-none leading-[1.43]"
                />
                <ChevronRightIcon />
              </div>
            </div>

            {/* Début de mission */}
            <div className="border-b border-stroke flex items-center justify-between h-[66px] px-4 gap-4">
              <p className="text-base font-medium text-text-primary leading-[1.375]">Début de mission</p>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="bg-bg-secondary rounded-[6px] px-3 py-1.5 h-[34px] flex items-center">
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="bg-transparent text-sm text-text-primary outline-none text-center w-[120px] cursor-pointer"
                    style={{ colorScheme: 'light' }}
                  />
                </div>
                <div className="bg-bg-secondary rounded-[6px] px-3 py-1.5 h-[34px] flex items-center">
                  <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="bg-transparent text-sm text-text-primary outline-none text-center w-[52px] cursor-pointer"
                    style={{ colorScheme: 'light' }}
                  />
                </div>
              </div>
            </div>

            {/* Fin de mission */}
            <div className="border-b border-stroke flex items-center justify-between h-[66px] px-4 gap-4">
              <p className="text-base font-medium text-text-primary leading-[1.375]">Fin de mission</p>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="bg-bg-secondary rounded-[6px] px-3 py-1.5 h-[34px] flex items-center">
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="bg-transparent text-sm text-text-primary outline-none text-center w-[120px] cursor-pointer"
                    style={{ colorScheme: 'light' }}
                  />
                </div>
                <div className="bg-bg-secondary rounded-[6px] px-3 py-1.5 h-[34px] flex items-center">
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="bg-transparent text-sm text-text-primary outline-none text-center w-[52px] cursor-pointer"
                    style={{ colorScheme: 'light' }}
                  />
                </div>
              </div>
            </div>

            {/* Fixer votre tarif */}
            <div className="border-b border-stroke flex items-center justify-between h-[66px] px-4 gap-4">
              <p className="text-base font-medium text-text-primary leading-[1.375]">Fixer votre tarif</p>
              <div className="bg-bg-secondary rounded-[6px] px-3 py-1.5 h-[34px] flex items-center gap-1 shrink-0">
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  step="0.5"
                  min="0"
                  className="bg-transparent text-sm text-text-primary outline-none text-center w-[48px]"
                />
                <span className="text-sm text-text-primary">€</span>
              </div>
            </div>

            {/* Informations complémentaires */}
            <div className="border-b border-stroke flex flex-col gap-2 px-4 py-4">
              <p className="text-base font-medium text-text-primary leading-[1.375]">
                Informations complémentaires
              </p>
              <div className="bg-bg-secondary rounded-[12px] border-b border-stroke/50 flex gap-2 items-start px-4 py-4 h-[128px]">
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Entrer le texte ici."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary outline-none resize-none leading-[1.43] h-full"
                />
                <PenIcon />
              </div>
            </div>

            {/* Offre pour */}
            <div className="flex flex-col gap-2 px-4 py-4">
              <p className="text-base font-medium text-text-primary leading-[1.375]">Offre pour</p>
              <div className="flex gap-3 items-start">
                {MOCK_PETS.map((pet) => {
                  const selected = selectedPetIds.includes(pet.id)
                  return (
                    <button
                      key={pet.id}
                      onClick={() => togglePet(pet.id)}
                      className="relative flex items-end justify-end pr-[2px]"
                    >
                      <div
                        className="w-[64px] h-[64px] rounded-full flex items-center justify-center text-text-secondary font-semibold text-lg"
                        style={{ backgroundColor: pet.color }}
                      >
                        {pet.name[0]}
                      </div>
                      <div className="absolute bottom-0 right-0 translate-x-[2px]">
                        {selected ? <CheckCircleIcon /> : <PlusCircleIcon />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
