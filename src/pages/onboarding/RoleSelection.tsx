import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'
import Button from '../../components/ui/Button'
import PageDots from '../../components/ui/PageDots'
import { useUserProfile } from '../../store/userProfile'

export default function RoleSelection() {
  const navigate = useNavigate()
  const { updateProfile } = useUserProfile()
  const [selected, setSelected] = useState<'owner' | 'walker' | null>(null)

  const handleNext = () => {
    if (!selected) return
    localStorage.setItem('role', selected)
    updateProfile({ role: selected })
    navigate('/onboarding/profile')
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-16 pb-8 px-4 gap-6">
      <div className="flex items-center justify-between">
        <BackButton to="/onboarding/password" />
        <PageDots total={6} current={4} />
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          À présent, comment souhaitez-vous utilisez Pawpy ?
        </h1>

        <div className="flex flex-col flex-1 gap-4">
          <button
            onClick={() => setSelected('walker')}
            className={`flex-1 flex items-center justify-center p-6 rounded-3xl transition-opacity active:opacity-70 ${
              selected === 'walker' ? 'bg-brand-light ring-2 ring-brand' : 'bg-brand-light'
            }`}
          >
            <span className="text-[28px] font-semibold text-text-primary leading-[1.2] tracking-[-0.56px]">
              Promeneurs
            </span>
          </button>
          <button
            onClick={() => setSelected('owner')}
            className={`flex-1 flex items-center justify-center p-6 rounded-3xl transition-opacity active:opacity-70 ${
              selected === 'owner' ? 'bg-brand-light ring-2 ring-brand' : 'bg-brand-light'
            }`}
          >
            <span className="text-[28px] font-semibold text-text-primary leading-[1.2] tracking-[-0.56px] text-center">
              Propriétaire{'\n'}de chiens
            </span>
          </button>
        </div>
      </div>

      <Button onClick={handleNext} disabled={!selected} className={!selected ? 'opacity-50' : ''}>
        Étape suivante
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  )
}
