import { useState } from 'react'

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 3H21M21 3V9M21 3L14 10M9 21H3M3 21V15M3 21L10 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MinimizeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14 10L20 4M20 4H14M20 4V10M10 14L4 20M4 20H10M4 20V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="12" fill="#04341A" />
      <path d="M7 12L10.5 15.5L17 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center p-[2px] rounded-full w-[50px] h-[28px] shrink-0 transition-colors duration-200"
      style={{
        backgroundColor: active ? '#34c759' : '#d5d7d5',
        justifyContent: active ? 'flex-end' : 'flex-start',
      }}
    >
      <div className="w-6 h-6 rounded-full bg-white shadow-md" />
    </button>
  )
}

const FEATURES = [
  {
    title: 'Profil Boosté & customisable',
    description:
      'De nouvelles options de customisation son possible ! Ton profil apparaît également en priorité dans les résultats de recherche des propriétaires. Plus de visibilité = Plus de demandes qui arrivent directement dans ta boîte.',
  },
  {
    title: 'Badge Certifié',
    description:
      "Affiche un badge Premium sur ton profil pour te démarquer. Les propriétaires te repèrent en un coup d'œil comme un walker de confiance, vérifié par Pawpy.",
  },
  {
    title: 'Formations Pro',
    description:
      'Accède à des formations certifiantes pour enrichir tes compétences (premiers secours canins, comportement animal…). De quoi rassurer les propriétaires et justifier tes tarifs.',
  },
  {
    title: 'Missions sur Autopilote',
    description:
      'Configure tes critères (zone, horaires, type de chien) et laisse Pawpy te proposer automatiquement les missions qui te correspondent. Fini le scroll, tu reçois directement les bonnes opportunités.',
  },
  {
    title: 'Support Prioritaire',
    description:
      'Un souci avec une réservation ou un paiement ? Tu passes devant la file. Notre équipe te répond en priorité pour que rien ne freine ton activité.',
  },
]

interface PremiumModalProps {
  onClose: () => void
}

export default function PremiumModal({ onClose }: PremiumModalProps) {
  const [extended, setExtended] = useState(false)
  const [annuel, setAnnuel] = useState(true)

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-bg-primary rounded-t-[43px] flex flex-col p-4 w-full h-[92dvh] shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]">
        {/* Header */}
        <div className="flex items-center gap-6 w-full shrink-0 mb-4">
          <button
            onClick={onClose}
            className="flex items-center justify-center p-3 rounded-full bg-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] shrink-0"
          >
            <XIcon />
          </button>
          <div className="flex-1" />
          <button
            onClick={() => setExtended(e => !e)}
            className="flex items-center justify-center p-3 rounded-full shrink-0 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]"
            style={{ backgroundColor: '#04341a' }}
          >
            {extended ? <MinimizeIcon /> : <ExpandIcon />}
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex flex-col gap-8 overflow-y-auto pb-4">
          {/* Title */}
          <p className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Passez à Pawpy + pour bénéficier des aventages suivants :
          </p>

          {/* Features */}
          <div className="flex flex-col gap-1">
            {FEATURES.map(f => (
              <div
                key={f.title}
                className="bg-bg-primary flex flex-col gap-1 p-3 rounded-2xl shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]"
              >
                <div className="flex items-center gap-2 w-full">
                  <CheckCircleIcon />
                  <p className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px]">
                    {f.title}
                  </p>
                </div>
                {extended && (
                  <div className="flex items-start gap-2 w-full">
                    <div className="w-6 shrink-0" />
                    <p className="flex-1 text-[11px] text-text-secondary leading-[1.1]">
                      {f.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pricing + CTA */}
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-4">
              <p className="text-[11px] text-text-secondary leading-[1.1] text-right">Prix mensuel</p>
              <Toggle active={annuel} onToggle={() => setAnnuel(v => !v)} />
              <p className="text-[11px] text-text-secondary leading-[1.1]">Prix annuel</p>
            </div>
            <button
              className="flex items-center justify-center w-full py-4 px-4 rounded-full shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]"
              style={{ backgroundColor: '#04341a' }}
            >
              <span className="text-base font-semibold text-white leading-[1.2]">
                {annuel ? '50€ par an' : '5€ par mois'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
