import { useState, useEffect } from 'react'

const glassStyle =
  'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'
const glassAccentStyle =
  'bg-gradient-to-r from-brand/80 to-brand/80 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]'

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
      <path d="M5 12L10 17L19 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface Props {
  amount: string
  onClose: () => void
  onConfirm: (justification: string) => void
}

export default function RemboursementModal({ amount, onClose, onConfirm }: Props) {
  const [visible, setVisible] = useState(false)
  const [justification, setJustification] = useState('')

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  function handleConfirm() {
    onConfirm(justification)
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-end"
    >
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />
      {/* Sheet */}
      <div
        className="relative w-full bg-bg-primary rounded-tl-[38px] rounded-tr-[38px] flex flex-col h-[92dvh] overflow-hidden transition-transform duration-300 ease-out"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-6 px-4 py-4 shrink-0">
          <button
            onClick={handleClose}
            className={`flex items-center justify-center p-3 rounded-full ${glassStyle} text-text-primary shrink-0`}
          >
            <XIcon />
          </button>

          <p className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] text-center">
            Remboursement
          </p>

          {/* Spacer to keep title centered */}
          <div className="w-12 h-12 shrink-0" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-8 px-4 pt-16 pb-10 overflow-y-auto">
          {/* Amount */}
          <p className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px] text-center">
            {amount}
          </p>

          {/* Justification field */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-1.5">
              <p className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px]">
                Indiquer l'objet du remboursement
              </p>
              <p className="text-base font-normal text-[#d12e34] leading-[1.2]">*</p>
            </div>
            <div className="bg-bg-secondary border border-stroke rounded-xl p-3 w-full h-[300px]">
              <textarea
                className="w-full h-full text-base font-normal leading-[1.2] tracking-[-0.16px] bg-transparent outline-none resize-none text-text-primary placeholder:text-text-tertiary"
                placeholder="Entrer votre justification ici"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
              />
            </div>
          </div>

          {/* Disclaimer */}
          <p className="flex-1 flex items-end text-base font-normal text-text-secondary leading-[1.2] tracking-[-0.16px]">
            En cliquant sur le bouton ci-dessus, vous confirmez le remboursement total du montant indiqué ci-dessous à la personne originaire du paiement
          </p>

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            className={`flex items-center justify-center gap-2 py-4 px-6 rounded-full ${glassAccentStyle} w-full`}
          >
            <span className="text-base font-semibold text-white leading-[1.2]">Je confirme</span>
            <CheckIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
