import { useNavigate } from 'react-router-dom'
import BottomTabBar from '../../components/sitter/BottomTabBar'
import { useConversations } from '../../store/conversations'
import { useUserProfile, fullName } from '../../store/userProfile'

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

function FilterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H21M6 12H18M10 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

interface ConversationRowProps {
  name: string
  subtitle: string
  hasNotification?: boolean
  onClick?: () => void
}

function ConversationRow({ name, subtitle, hasNotification = false, onClick }: ConversationRowProps) {
  return (
    <div onClick={onClick} className="flex gap-4 items-center h-[68px] border-t border-stroke/50 w-full cursor-pointer">
      <div className="w-[54px] h-[54px] rounded-full bg-[#9baea3] flex-shrink-0" />
      <div className="flex-1 flex flex-col justify-center gap-0.5 overflow-hidden">
        <p className="text-base font-medium text-text-primary leading-[1.2] truncate">{name}</p>
        <p className="text-base font-normal text-text-secondary leading-[1.2] tracking-[-0.16px] truncate">{subtitle}</p>
      </div>
      {hasNotification && (
        <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
      )}
      <span className="text-text-secondary flex-shrink-0">
        <ChevronRightIcon />
      </span>
    </div>
  )
}

export default function SitterMessagerie() {
  const navigate = useNavigate()
  const { conversations } = useConversations()
  const { profile } = useUserProfile()
  const myName = fullName(profile)
  const myConversations = conversations.filter((c) => c.sitterName === myName)

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-8">
        <h1 className="flex-1 text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Messagerie
        </h1>
        <button className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 ${glassStyle}`}>
          <span className="text-text-primary"><FilterIcon /></span>
        </button>
      </div>

      {/* Conversation list */}
      <div className="flex flex-col w-full">
        {myConversations.length === 0 && (
          <p className="text-base text-text-secondary leading-[1.2] tracking-[-0.16px]">
            Aucune conversation pour le moment.
          </p>
        )}
        {myConversations.map((conv) => (
          <ConversationRow
            key={conv.id}
            name={conv.ownerName}
            subtitle={conv.annonceTitle}
            hasNotification={false}
            onClick={() => navigate(`/sitter/messagerie/${conv.id}`)}
          />
        ))}
      </div>

      <BottomTabBar activeTab="messages" />
    </div>
  )
}
