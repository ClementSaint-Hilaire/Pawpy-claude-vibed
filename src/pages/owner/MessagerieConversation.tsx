import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useConversations, type BookingMessage, type TextMessage } from '../../store/conversations'

const glassStyle =
  'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

function ChevronLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11 4H16M16 4V9M16 4L8 12M8 4H4V16H16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 10C5 13.866 8.13401 17 12 17C15.866 17 19 13.866 19 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 17V21M9 21H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BookingCard({ sitterName, sitterBio, date, time, amount }: Omit<BookingMessage, 'kind'>) {
  return (
    <div className="flex justify-end w-full">
      <div className="bg-brand-light rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl p-4 flex flex-col gap-4 w-[282px]">
        <div className="flex gap-3 items-start">
          <div className="w-[54px] h-[54px] rounded-full bg-[#9baea3] flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-2">
              <p className="flex-1 text-sm text-text-primary truncate leading-5">{sitterName}</p>
              <span className="text-text-secondary flex-shrink-0">
                <ExternalLinkIcon />
              </span>
            </div>
            <p className="text-[9px] text-text-secondary leading-[13px]">{sitterBio}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-[24px] font-bold text-[#140800] leading-[30px]">{date}</p>
          <p className="text-base font-medium text-text-secondary leading-[22px]">{time}</p>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-[#f0efeb] rounded-full px-3.5 py-[7px] text-[15px] text-[#140800] tracking-[-0.23px]">
            Décliner
          </button>
          <button className="flex-1 bg-[#003503] rounded-full px-3.5 py-[7px] text-[15px] text-white tracking-[-0.23px]">
            Payer {amount}€
          </button>
        </div>
      </div>
    </div>
  )
}

export default function OwnerMessagerieConversation() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { conversations, sendMessage, markRead } = useConversations()
  const [text, setText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversation = conversations.find((c) => c.id === id)

  useEffect(() => {
    if (id) markRead(id)
  }, [id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [conversation?.messages.length])

  function handleSend() {
    if (!text.trim() || !id) return
    sendMessage(id, { kind: 'text', from: 'owner', text: text.trim() } satisfies TextMessage)
    setText('')
  }

  if (!conversation) {
    return (
      <div className="flex flex-col h-full bg-bg-primary items-center justify-center">
        <p className="text-text-secondary">Conversation introuvable.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary relative">
      {/* Messages scroll area */}
      <div className="flex-1 overflow-y-auto pt-[130px] pb-[88px] px-4 flex flex-col gap-10">
        {conversation.messages.map((msg, i) => {
          if (msg.kind === 'text') {
            const isMine = msg.from === 'owner'
            return isMine ? (
              <div key={i} className="flex justify-end w-full">
                <div className="bg-brand-light rounded-tl-xl rounded-tr-xl rounded-bl-xl p-3 max-w-[282px]">
                  <p className="text-sm text-[#1d1d1f] leading-5 whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-start w-full">
                <div className="bg-bg-secondary rounded-tl-xl rounded-tr-xl rounded-br-xl p-3 max-w-[280px]">
                  <p className="text-sm text-[#1d1d1f] leading-5">{msg.text}</p>
                </div>
              </div>
            )
          }

          if (msg.kind === 'booking') {
            return <BookingCard key={i} {...msg} />
          }

          if (msg.kind === 'payment') {
            return (
              <div key={i} className="flex justify-start w-full">
                <div className="bg-[#003503] rounded-tl-xl rounded-tr-xl rounded-br-xl p-3 max-w-[280px] flex flex-col gap-2 text-[#f5f5f7]">
                  <p className="text-[20px] font-semibold leading-[26px]">{msg.title}</p>
                  <p className="text-sm leading-5">{msg.body}</p>
                </div>
              </div>
            )
          }

          return null
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 pt-[62px] px-4 pb-3 flex items-center justify-between">
        <button
          onClick={() => navigate('/owner/messagerie')}
          className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 text-text-primary ${glassStyle}`}
        >
          <ChevronLeftIcon />
        </button>
        <div className={`${glassStyle} px-4 h-[48px] flex items-center rounded-full`}>
          <span className="text-sm font-normal text-[#140800] tracking-[-0.14px]">{conversation.sitterName}</span>
        </div>
      </div>

      {/* Input bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-2 flex gap-4 items-center">
        <button
          className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 text-text-primary ${glassStyle}`}
        >
          <PlusIcon />
        </button>
        <div className={`${glassStyle} flex-1 flex items-center px-4 h-[48px] rounded-full gap-2`}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message"
            className="flex-1 bg-transparent outline-none text-base text-[#140800] placeholder:text-text-tertiary tracking-[-0.16px]"
          />
          <span className="text-text-tertiary flex-shrink-0">
            <MicIcon />
          </span>
        </div>
      </div>
    </div>
  )
}
