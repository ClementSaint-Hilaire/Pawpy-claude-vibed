import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'
import Button from '../../components/ui/Button'
import PageDots from '../../components/ui/PageDots'

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor"/>
    </svg>
  )
}

export default function OwnerCertificationInfo() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-16 pb-8 px-4 gap-6">
      <div className="flex items-center justify-between">
        <BackButton to="/onboarding/profile" />
        <PageDots total={6} current={6} />
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Pawpy repose sur la certification de ses promeneurs
        </h1>

        <div className="flex flex-col gap-4 text-base text-text-primary leading-[1.2] tracking-[-0.16px]">
          <p>
            Afin d'instaurer un climat de confiance, les promeneurs devront insérer leur certification.
          </p>
          <p>
            Si vous n'en avez pas, Anomi propose une{' '}
            <span className="underline">formation accessible ici</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button variant="secondary" onClick={() => {}}>
          Je veux en savoir plus
          <InfoIcon />
        </Button>
        <Button onClick={() => navigate('/onboarding')}>
          J'ai compris !
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>
    </div>
  )
}
