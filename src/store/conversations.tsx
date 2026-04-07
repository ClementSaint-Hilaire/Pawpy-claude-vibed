import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type TextMessage = { kind: 'text'; from: 'owner' | 'sitter'; text: string }
export type BookingMessage = {
  kind: 'booking'
  sitterName: string
  sitterBio: string
  date: string
  time: string
  amount: number
}
export type PaymentMessage = { kind: 'payment'; title: string; body: string }
export type Message = TextMessage | BookingMessage | PaymentMessage

export interface Conversation {
  id: string
  annonceId: string
  annonceTitle: string
  ownerName: string
  sitterName: string
  sitterId: string
  messages: Message[]
  isNew: boolean
}

interface ConversationsContextValue {
  conversations: Conversation[]
  startConversation: (annonceId: string, annonceTitle: string, ownerName: string, sitterName: string, sitterId: string) => string
  sendMessage: (convId: string, message: Message) => void
  markRead: (convId: string) => void
  deleteConversation: (convId: string) => void
}

const ConversationsContext = createContext<ConversationsContextValue | null>(null)
const STORAGE_KEY = 'pawpy_conversations'

function loadFromStorage(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Conversation[]
  } catch {
    // ignore parse errors
  }
  return []
}

function saveToStorage(conversations: Conversation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
}

export function ConversationsProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(loadFromStorage)

  // Sync changes made in other tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setConversations(JSON.parse(e.newValue) as Conversation[])
        } catch {
          // ignore parse errors
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  function startConversation(annonceId: string, annonceTitle: string, ownerName: string, sitterName: string, sitterId: string): string {
    const stored = loadFromStorage()
    const existing = stored.find(
      (c) => c.annonceId === annonceId && c.sitterName === sitterName,
    )
    if (existing) return existing.id

    const id = crypto.randomUUID()
    const initialMessage: TextMessage = {
      kind: 'text',
      from: 'sitter',
      text: `Bonjour, je suis intéressé(e) par votre annonce "${annonceTitle}". Je serais disponible pour promener vos chiens !`,
    }
    const newConv: Conversation = {
      id,
      annonceId,
      annonceTitle,
      ownerName,
      sitterName,
      sitterId,
      messages: [initialMessage],
      isNew: true,
    }
    setConversations(prev => {
      const next = [...prev, newConv]
      saveToStorage(next)
      return next
    })
    return id
  }

  function sendMessage(convId: string, message: Message) {
    setConversations(prev => {
      const next = prev.map((c) =>
        c.id === convId
          ? { ...c, messages: [...c.messages, message], isNew: true }
          : c,
      )
      saveToStorage(next)
      return next
    })
  }

  function markRead(convId: string) {
    setConversations(prev => {
      const next = prev.map((c) => (c.id === convId ? { ...c, isNew: false } : c))
      saveToStorage(next)
      return next
    })
  }

  function deleteConversation(convId: string) {
    setConversations(prev => {
      const next = prev.filter((c) => c.id !== convId)
      saveToStorage(next)
      return next
    })
  }

  return (
    <ConversationsContext.Provider value={{ conversations, startConversation, sendMessage, markRead, deleteConversation }}>
      {children}
    </ConversationsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConversations() {
  const ctx = useContext(ConversationsContext)
  if (!ctx) throw new Error('useConversations must be used inside ConversationsProvider')
  return ctx
}
