import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function Formation() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full bg-bg-primary items-center justify-center px-4 gap-8">
      <p className="text-lg font-medium text-text-primary tracking-[-0.36px]">
        PAGE FORMATION
      </p>
      <Button onClick={() => navigate('/sitter/home')}>
        Commencer
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  )
}
