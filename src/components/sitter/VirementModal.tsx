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

function ChevronLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

interface FormField {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
}

function Field({ label, placeholder, value, onChange }: FormField) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px]">{label}</p>
      <div className="bg-bg-secondary border border-stroke rounded-xl p-3 w-full">
        <input
          className="w-full text-base font-normal leading-[1.2] tracking-[-0.16px] bg-transparent outline-none text-text-primary placeholder:text-text-tertiary"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

interface SummaryRow {
  label: string
  value: string
  bold?: boolean
}

function SummaryLine({ label, value, bold }: SummaryRow) {
  return (
    <div className="flex gap-8 items-end w-full">
      <p className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px] shrink-0">{label}</p>
      <p className={`flex-1 text-base leading-[1.2] text-text-primary text-right min-w-0 ${bold ? 'font-semibold' : 'font-normal'}`}>
        {value}
      </p>
    </div>
  )
}

interface Props {
  balance: string
  onClose: () => void
}

export default function VirementModal({ balance, onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Step 2 form state
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [pays, setPays] = useState('')
  const [iban, setIban] = useState('')
  const [bic, setBic] = useState('')

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  function handleConfirm() {
    // Transfer confirmed — close modal
    handleClose()
  }

  const destinataire = [prenom, nom].filter(Boolean).join(' ') || '{nom_destinataire}'

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
          {/* Left button */}
          {step === 1 ? (
            <button
              onClick={handleClose}
              className={`flex items-center justify-center p-3 rounded-full ${glassStyle} text-text-primary shrink-0`}
            >
              <XIcon />
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => (s - 1) as 1 | 2)}
              className={`flex items-center justify-center p-3 rounded-full ${glassStyle} text-text-primary shrink-0`}
            >
              <ChevronLeftIcon />
            </button>
          )}

          <p className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] text-center">
            Transfère d'argent
          </p>

          {/* Right button */}
          {step === 3 ? (
            <div className="w-12 h-12 shrink-0" /> /* spacer to keep title centered */
          ) : (
            <button
              onClick={() => setStep((s) => (s + 1) as 2 | 3)}
              className={`flex items-center justify-center p-3 rounded-full ${glassAccentStyle} shrink-0`}
            >
              <ChevronRightIcon />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 flex flex-col pb-10 px-4">
          {step === 1 && (
            <div className="flex flex-col gap-8 items-center pt-16">
              {/* Amount */}
              <p className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px] text-center">
                {balance}
              </p>

              {/* Payment method dropdown */}
              <div className="bg-bg-secondary rounded-2xl p-3 w-full flex items-center gap-2">
                <div className="flex-1 flex flex-col gap-2">
                  <p className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px]">
                    Virement bancaire classique
                  </p>
                  <p className="text-[11px] font-normal text-text-secondary leading-[1.1]">
                    Affichez vos coordonnée bancaires pour transférer des fonds depuis un compte bancaire externe.
                  </p>
                </div>
                <div className="shrink-0 text-text-secondary rotate-180">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8 pt-16">
              <Field
                label="Prénom du destinataire"
                placeholder="Entrer votre prénom"
                value={prenom}
                onChange={setPrenom}
              />
              <Field
                label="Nom du destinataire"
                placeholder="Entrer votre nom"
                value={nom}
                onChange={setNom}
              />
              <Field
                label="Pays du compte du destinataire"
                placeholder="FR** **** **** **** **** **** ***"
                value={pays}
                onChange={setPays}
              />
              <Field
                label="IBAN"
                placeholder="FR** **** **** **** **** **** ***"
                value={iban}
                onChange={setIban}
              />
              <Field
                label="BIC"
                placeholder="********"
                value={bic}
                onChange={setBic}
              />
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-8 pt-16">
              <p className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px]">
                En cliquant sur "Je confirme" vous validez le transfère et les informations suivante&nbsp;&nbsp;:
              </p>

              <div className="flex flex-col gap-4">
                <SummaryLine label="Montant :" value={balance} bold />
                <SummaryLine label="Moyen :" value="Virement bancaire" bold />
                <SummaryLine label="Destinataire :" value={destinataire} bold />
                <SummaryLine label="IBAN :" value={iban || '{IBAN}'} bold />
                <SummaryLine label="BIC :" value={bic || '{BIC}'} bold />
              </div>

              <button
                onClick={handleConfirm}
                className={`flex items-center justify-center gap-2 py-4 px-6 rounded-full ${glassAccentStyle} w-full`}
              >
                <span className="text-base font-semibold text-white leading-[1.2]">Je confirme</span>
                <CheckIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

