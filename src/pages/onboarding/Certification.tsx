import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'
import Button from '../../components/ui/Button'
import PageDots from '../../components/ui/PageDots'

export default function Certification() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-16 pb-8 px-4 gap-6">
      <div className="flex items-center justify-between">
        <BackButton to="/onboarding/verify" />
        <PageDots total={5} current={5} />
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Pawpy repose sur le principe de certification
        </h1>

        <div className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px] flex flex-col gap-4">
          <p>
            Afin d'instaurer un climat de confiance, les promeneurs devront insérer leur certification.
          </p>
          <p>
            Si vous n'en avez pas Pawpy propose une{' '}
            <button
              onClick={() => navigate('/onboarding/formation')}
              className="text-brand underline"
            >
              formation accessible ici
            </button>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button variant="secondary">
          Importer ma certification ACACED
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4V16M12 16L7 11M12 16L17 11M4 20H20" stroke="#010a05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        <Button onClick={() => navigate('/onboarding/formation')}>
          Passer la certification Pawpy
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 20l1.5-3 1.5 2 1.5-2 1.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>
    </div>
  )
}
