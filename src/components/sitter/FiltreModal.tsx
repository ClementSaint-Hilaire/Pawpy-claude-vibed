import { useState } from 'react'

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
      <path d="M5 12L10 17L19 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

interface FilterTag {
  label: string
}

function TagChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary rounded-xl shrink-0">
      <span className="text-[14px] text-text-primary tracking-[-0.14px] leading-[1.2]">{label}</span>
      <button onClick={onRemove} className="shrink-0 text-text-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

function SliderField({ label, value, min, max, unit, onChange }: {
  label: string
  value: number
  min: number
  max: number
  unit: string
  onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-base text-text-primary tracking-[-0.16px] leading-[1.2]">{label}</p>
      <div className="flex items-center gap-4 w-full">
        <span className="text-base text-text-primary tracking-[-0.16px] leading-[1.2] shrink-0">{min}{unit}</span>
        <div className="flex-1 relative flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="w-full h-[4px] rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #365d48 0%, #365d48 ${pct}%, #e8e6e3 ${pct}%, #e8e6e3 100%)`,
            }}
          />
        </div>
        <span className="text-base text-text-primary tracking-[-0.16px] leading-[1.2] shrink-0 w-14 text-right">{value}{unit}</span>
      </div>
    </div>
  )
}

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-end p-[2px] rounded-full w-[50px] h-[28px] shrink-0 transition-colors duration-200"
      style={{ backgroundColor: active ? '#34c759' : '#d5d7d5' }}
    >
      <div
        className="w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200"
        style={{ transform: active ? 'translateX(0)' : 'translateX(-22px)' }}
      />
    </button>
  )
}

const CERTIFICATIONS_SUGGERÉES = ['Pawpy P1', 'Pawpy P2', 'ACACED']
const COMPETENCES_SUGGERÉES = ['Premiers secours', 'Dressage de base', 'Chiots']
const TYPES_CHIENS_SUGGERÉS = ['Labrador', 'Golden retriever', 'Border Collie', 'Berger Allemand']

interface FiltreState {
  certifications: string[]
  prixMin: number
  distance: number
  duree: number
  missionMaintenant: boolean
  competences: string[]
  typesChien: string[]
}

interface FiltreModalProps {
  onClose: () => void
  onApply: (filtres: FiltreState) => void
}

export default function FiltreModal({ onClose, onApply }: FiltreModalProps) {
  const [certifications, setCertifications] = useState<string[]>(['Pawpy P1', 'Pawpy P2', 'ACACED'])
  const [prixMin, setPrixMin] = useState(250)
  const [distance, setDistance] = useState(100)
  const [duree, setDuree] = useState(200)
  const [missionMaintenant, setMissionMaintenant] = useState(true)
  const [competences, setCompetences] = useState<string[]>(['Premiers secours', 'Dressage de base', 'Chiots'])
  const [typesChien, setTypesChien] = useState<string[]>(['Labrador', 'Golden retriever'])

  function removeTag(list: string[], setter: (v: string[]) => void, label: string) {
    setter(list.filter(t => t !== label))
  }

  function addSuggestion(list: string[], setter: (v: string[]) => void, label: string) {
    if (!list.includes(label)) setter([...list, label])
  }

  function handleApply() {
    onApply({ certifications, prixMin, distance, duree, missionMaintenant, competences, typesChien })
    onClose()
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 rounded-[40px]" onClick={onClose} />

      {/* Sheet */}
      <div className="relative bg-bg-primary rounded-t-[43px] flex flex-col h-[92dvh] shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4)]">
        {/* Header */}
        <div className="flex items-center gap-6 px-4 pt-4 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center justify-center p-3 rounded-full bg-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] shrink-0"
          >
            <XIcon />
          </button>
          <p className="flex-1 text-center text-[22px] font-semibold text-text-primary tracking-[-0.44px] leading-[1.2]">
            Filtrer
          </p>
          <button
            onClick={handleApply}
            className="flex items-center justify-center p-3 rounded-full shrink-0 bg-gradient-to-r from-[rgba(4,52,26,0.8)] to-[rgba(4,52,26,0.8)] shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]"
          >
            <CheckIcon />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 flex flex-col gap-8">

          {/* Certification requise */}
          <div className="flex flex-col gap-2 w-full">
            <p className="text-base text-text-primary tracking-[-0.16px] leading-[1.2]">Certification requise</p>
            <div className="flex items-center gap-2 h-12 pl-4 pr-3 py-3 bg-bg-secondary rounded-[9px] w-full">
              <span className="flex-1 text-base text-text-tertiary tracking-[-0.16px] leading-[1.2] truncate">
                Rechercher une certification
              </span>
              <span className="text-text-tertiary shrink-0"><SearchIcon /></span>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {CERTIFICATIONS_SUGGERÉES.map(c => (
                certifications.includes(c)
                  ? <TagChip key={c} label={c} onRemove={() => removeTag(certifications, setCertifications, c)} />
                  : <button key={c} onClick={() => addSuggestion(certifications, setCertifications, c)}
                      className="flex items-center px-4 py-3 bg-bg-secondary/50 border border-stroke rounded-xl shrink-0">
                      <span className="text-[14px] text-text-secondary tracking-[-0.14px] leading-[1.2]">{c}</span>
                    </button>
              ))}
            </div>
          </div>

          {/* Prix minimum */}
          <SliderField label="Prix minimum" value={prixMin} min={0} max={500} unit="€" onChange={setPrixMin} />

          {/* Distance */}
          <SliderField label="Distance (km)" value={distance} min={0} max={200} unit=" km" onChange={setDistance} />

          {/* Durée */}
          <SliderField label="Durée (min)" value={duree} min={0} max={480} unit=" min" onChange={setDuree} />

          {/* Mission */}
          <div className="flex flex-col gap-2 w-full">
            <p className="text-base text-text-primary tracking-[-0.16px] leading-[1.2]">Mission</p>
            <div className="flex flex-col bg-bg-secondary rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 h-12 pl-4 pr-3 py-3 border-b border-stroke">
                <span className="flex-1 text-base text-text-primary tracking-[-0.16px] leading-[1.2]">Maintenant</span>
                <Toggle active={missionMaintenant} onToggle={() => setMissionMaintenant(v => !v)} />
              </div>
              <div className="flex items-center gap-2 h-12 pl-4 pr-3 py-3">
                <span className="flex-1 text-base text-text-primary tracking-[-0.16px] leading-[1.2]">Période</span>
                <span className="text-base text-text-secondary tracking-[-0.16px] leading-[1.2]">Lundi – Vendredi</span>
              </div>
            </div>
          </div>

          {/* Compétences clés */}
          <div className="flex flex-col gap-2 w-full">
            <p className="text-base text-text-primary tracking-[-0.16px] leading-[1.2]">Compétences clés</p>
            <div className="flex items-center gap-2 h-12 pl-4 pr-3 py-3 bg-bg-secondary rounded-[9px] w-full">
              <span className="flex-1 text-base text-text-tertiary tracking-[-0.16px] leading-[1.2] truncate">
                Rechercher une compétence
              </span>
              <span className="text-text-tertiary shrink-0"><SearchIcon /></span>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {COMPETENCES_SUGGERÉES.map(c => (
                competences.includes(c)
                  ? <TagChip key={c} label={c} onRemove={() => removeTag(competences, setCompetences, c)} />
                  : <button key={c} onClick={() => addSuggestion(competences, setCompetences, c)}
                      className="flex items-center px-4 py-3 bg-bg-secondary/50 border border-stroke rounded-xl shrink-0">
                      <span className="text-[14px] text-text-secondary tracking-[-0.14px] leading-[1.2]">{c}</span>
                    </button>
              ))}
            </div>
          </div>

          {/* Type de chien */}
          <div className="flex flex-col gap-2 w-full">
            <p className="text-base text-text-primary tracking-[-0.16px] leading-[1.2]">Type de chien</p>
            <div className="flex items-center gap-2 h-12 pl-4 pr-3 py-3 bg-bg-secondary rounded-[9px] w-full">
              <span className="flex-1 text-base text-text-tertiary tracking-[-0.16px] leading-[1.2] truncate">
                Rechercher un type de chien
              </span>
              <span className="text-text-tertiary shrink-0"><SearchIcon /></span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TYPES_CHIENS_SUGGERÉS.map(c => (
                typesChien.includes(c)
                  ? <TagChip key={c} label={c} onRemove={() => removeTag(typesChien, setTypesChien, c)} />
                  : <button key={c} onClick={() => addSuggestion(typesChien, setTypesChien, c)}
                      className="flex items-center px-4 py-3 bg-bg-secondary/50 border border-stroke rounded-xl shrink-0">
                      <span className="text-[14px] text-text-secondary tracking-[-0.14px] leading-[1.2]">{c}</span>
                    </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: white;
          box-shadow: 0px 12px 26px rgba(166,166,166,0.1), 0px 48px 48px rgba(166,166,166,0.09), 0px 4px 20px rgba(0,0,0,0.15);
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: white;
          border: none;
          box-shadow: 0px 12px 26px rgba(166,166,166,0.1), 0px 48px 48px rgba(166,166,166,0.09), 0px 4px 20px rgba(0,0,0,0.15);
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
