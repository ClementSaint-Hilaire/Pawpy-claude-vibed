import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'
import PageDots from '../../components/ui/PageDots'

export default function RoleSelection() {
  const navigate = useNavigate()

  const selectRole = (role: 'owner' | 'walker') => {
    localStorage.setItem('role', role)
    navigate('/onboarding/profile')
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-16 pb-8 px-4 gap-6">
      <div className="flex items-center justify-between">
        <BackButton to="/onboarding/password" />
        <PageDots total={5} current={2} />
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Comment souhaitez vous profitez de la plateforme ?
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => selectRole('owner')}
          className="flex items-center justify-center gap-1 w-full px-5 py-[14px] bg-brand-light text-text-primary text-[17px] leading-[22px] tracking-[-0.43px] rounded-full active:opacity-70 transition-opacity"
        >
          <span>Je suis propriétaire de chien</span>
          <span>🐕</span>
        </button>
        <button
          onClick={() => selectRole('walker')}
          className="flex items-center justify-center gap-1 w-full px-5 py-[14px] bg-brand text-bg-primary text-[17px] leading-[22px] tracking-[-0.43px] rounded-full active:opacity-70 transition-opacity"
        >
          <span>Je suis promeneur de chien</span>
          <span>🦮</span>
        </button>
      </div>
    </div>
  )
}
