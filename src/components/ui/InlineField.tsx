import { useState, useRef, useEffect } from 'react'

function EditIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 19V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface InlineFieldProps {
  value: string
  placeholder: string
  onSave: (v: string) => void
  isPlaceholder?: boolean
}

export function InlineField({ value, placeholder, onSave, isPlaceholder }: InlineFieldProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  function commit() {
    setEditing(false)
    if (draft.trim()) onSave(draft.trim())
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 h-12 px-4 w-full">
        <input
          ref={inputRef}
          className="flex-1 text-base leading-[1.2] tracking-[-0.16px] text-text-primary bg-transparent outline-none"
          value={draft}
          placeholder={placeholder}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => e.key === 'Enter' && commit()}
        />
      </div>
    )
  }

  return (
    <button
      className="flex items-center gap-2 h-12 px-4 w-full text-left"
      onClick={() => { setDraft(value); setEditing(true) }}
    >
      <span className={`flex-1 text-base leading-[1.2] tracking-[-0.16px] truncate ${isPlaceholder ? 'text-text-tertiary' : 'text-text-primary'}`}>
        {value || placeholder}
      </span>
      <span className="text-text-secondary flex-shrink-0">
        <EditIcon />
      </span>
    </button>
  )
}

interface InlineTextareaProps {
  value: string
  placeholder: string
  onSave: (v: string) => void
}

export function InlineTextarea({ value, placeholder, onSave }: InlineTextareaProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing) ref.current?.focus()
  }, [editing])

  function commit() {
    setEditing(false)
    onSave(draft)
  }

  if (editing) {
    return (
      <div className="flex items-start gap-2 bg-bg-secondary rounded-xl px-4 py-4">
        <textarea
          ref={ref}
          className="flex-1 text-sm text-text-primary leading-[1.4] bg-transparent outline-none resize-none min-h-[80px]"
          value={draft}
          placeholder={placeholder}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
        />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2 bg-bg-secondary rounded-xl px-4 py-4">
      <p className={`flex-1 text-sm leading-[1.4] whitespace-pre-wrap ${value ? 'text-text-primary' : 'text-text-tertiary'}`}>
        {value || placeholder}
      </p>
      <button
        className="flex-shrink-0 text-text-secondary mt-0.5"
        onClick={() => { setDraft(value); setEditing(true) }}
      >
        <EditIcon />
      </button>
    </div>
  )
}
