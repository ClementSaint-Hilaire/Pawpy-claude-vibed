import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'
import Button from '../../components/ui/Button'
import PageDots from '../../components/ui/PageDots'
import { useSitterProfiles } from '../../store/sitterProfiles'
import { useUserProfile } from '../../store/userProfile'

export default function Certification() {
  const navigate = useNavigate()
  const { registerSitterProfile } = useSitterProfiles()
  const { profile } = useUserProfile()

  function handleComplete(badges: string[]) {
    registerSitterProfile({
      firstName: profile.firstName,
      lastName: profile.lastName,
      postal: profile.postal,
      age: profile.age,
      description: profile.description || `${profile.postal} - Promeneur certifié`,
      badges,
      rating: 5.0,
    })
    navigate('/sitter/home')
  }

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

        <div className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px] flex flex-col gap-4">
          <p>
            Afin d'instaurer un climat de confiance, les promeneurs devront insérer leur certification.
          </p>
          <p>
            Si vous n'en avez pas Anomi propose une{' '}
            <span className="underline cursor-pointer">formation accessible ici</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button variant="secondary" onClick={() => handleComplete(['ACACED'])}>
          Importer ma certification ACACED
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4V16M12 16L7 11M12 16L17 11M4 20H20" stroke="#010a05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        <Button onClick={() => handleComplete(['Pawpy lvl 1'])}>
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
