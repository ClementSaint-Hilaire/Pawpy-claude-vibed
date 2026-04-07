import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'
import BottomTabBar from '../../components/sitter/BottomTabBar'
import { useUserProfile } from '../../store/userProfile'

function PencilIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15.232 5.232l3.536 3.536M9 13l6.293-6.293a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414L12 16H9v-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function SitterProfilDescription() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useUserProfile()
  const [text, setText] = useState(profile.description || '')

  function handleBlur() {
    updateProfile({ description: text })
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-16 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BackButton to="/sitter/profil" />
        <h1 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Description
        </h1>
      </div>

      {/* Textarea */}
      <div className="relative flex flex-col w-full rounded-xl bg-bg-secondary px-4 py-3 gap-2">
        <textarea
          className="w-full h-[300px] bg-transparent text-base leading-[1.2] tracking-[-0.16px] text-text-primary placeholder-text-tertiary resize-none outline-none"
          placeholder="Entrer le texte ici."
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={handleBlur}
        />
        <div className="absolute top-3 right-3 text-text-secondary pointer-events-none">
          <PencilIcon />
        </div>
      </div>

      <BottomTabBar activeTab="profil" />
    </div>
  )
}
