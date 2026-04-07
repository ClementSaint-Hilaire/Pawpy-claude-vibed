import { useEffect, useRef, useState } from 'react'
import { usePets } from '../../store/pets'

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 19V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface ModalFieldProps {
  value: string
  placeholder: string
  onChange: (v: string) => void
  rounded?: 'top' | 'bottom' | 'both' | 'none'
  borderBottom?: boolean
}

function ModalField({ value, placeholder, onChange, rounded = 'none', borderBottom = false }: ModalFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const radiusClass = {
    top: 'rounded-t-xl',
    bottom: 'rounded-b-xl',
    both: 'rounded-xl',
    none: '',
  }[rounded]

  return (
    <div
      className={`flex items-center gap-2 h-12 px-4 bg-bg-secondary ${radiusClass} ${borderBottom ? 'border-b border-stroke/50' : ''}`}
    >
      {editing ? (
        <input
          ref={inputRef}
          className="flex-1 text-base leading-[1.2] tracking-[-0.16px] text-text-primary bg-transparent outline-none"
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={e => e.key === 'Enter' && setEditing(false)}
        />
      ) : (
        <button
          className="flex items-center gap-2 w-full text-left"
          onClick={() => setEditing(true)}
        >
          <span className={`flex-1 text-base leading-[1.2] tracking-[-0.16px] truncate ${value ? 'text-text-primary' : 'text-text-tertiary'}`}>
            {value || placeholder}
          </span>
          <span className="text-text-secondary flex-shrink-0">
            <EditIcon />
          </span>
        </button>
      )}
    </div>
  )
}

interface Props {
  onClose: () => void
}

export default function NouvelAnimalModal({ onClose }: Props) {
  const { addPet } = usePets()
  const [visible, setVisible] = useState(false)

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [breed, setBreed] = useState('')
  const [description, setDescription] = useState('')
  const [editing, setEditing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  useEffect(() => {
    if (editing) textareaRef.current?.focus()
  }, [editing])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  function handleConfirm() {
    if (!name.trim()) return
    addPet({ name: name.trim(), age, breed, description })
    setVisible(false)
    setTimeout(onClose, 300)
  }

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
        {/* Header */}
        <div className="flex items-center gap-6 px-4 py-4 shrink-0">
          <button
            onClick={handleClose}
            className="flex items-center justify-center p-3 rounded-full bg-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] text-text-primary shrink-0"
          >
            <XIcon />
          </button>
          <p className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] text-center">
            Nouvel animal
          </p>
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center p-3 rounded-full bg-brand/80 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)] text-white shrink-0"
          >
            <CheckIcon />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex flex-col gap-8 px-4 pb-8">
          {/* Photo */}
          <div className="flex items-end justify-center pr-8">
            <div className="w-32 h-32 rounded-full bg-brand-light flex-shrink-0 -mr-8" />
            <button className="flex items-center justify-center p-3 rounded-full bg-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] -mr-8 flex-shrink-0 text-text-primary">
              <EditIcon />
            </button>
          </div>

          {/* Ses informations */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
              Ses informations
            </h2>
            <div className="flex flex-col w-full rounded-xl overflow-hidden">
              <ModalField value={name} placeholder="Nom" onChange={setName} rounded="top" borderBottom />
              <ModalField value={age} placeholder="Âge" onChange={setAge} borderBottom />
              <ModalField value={breed} placeholder="Race" onChange={setBreed} rounded="bottom" />
            </div>
          </div>

          {/* Informations Complémentaires */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
              Informations Complémentaires
            </h2>
            <div className="flex items-start gap-2 bg-bg-secondary rounded-xl px-4 py-4 min-h-[152px]">
              {editing ? (
                <textarea
                  ref={textareaRef}
                  className="flex-1 text-sm text-text-primary leading-[1.4] bg-transparent outline-none resize-none min-h-[120px]"
                  value={description}
                  placeholder="Entrer le texte ici."
                  onChange={e => setDescription(e.target.value)}
                  onBlur={() => setEditing(false)}
                />
              ) : (
                <button className="flex items-start gap-2 w-full text-left" onClick={() => setEditing(true)}>
                  <p className={`flex-1 text-sm leading-[1.4] ${description ? 'text-text-primary' : 'text-text-tertiary'}`}>
                    {description || 'Entrer le texte ici.'}
                  </p>
                  <span className="text-text-secondary flex-shrink-0 mt-0.5">
                    <EditIcon />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
