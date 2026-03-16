import { createContext, useContext, useState, type ReactNode } from 'react'

export interface UserProfile {
  email: string
  firstName: string
  lastName: string
  postal: string
  role: 'owner' | 'walker' | null
}

interface UserProfileContextValue {
  profile: UserProfile
  updateProfile: (partial: Partial<UserProfile>) => void
}

const STORAGE_KEY = 'pawpy_user_profile'

const DEFAULT_PROFILE: UserProfile = {
  email: '',
  firstName: '',
  lastName: '',
  postal: '',
  role: null,
}

function loadFromStorage(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) } as UserProfile
  } catch {
    // ignore
  }
  // Fallback: migrate role from legacy key
  const legacyRole = localStorage.getItem('role') as 'owner' | 'walker' | null
  return { ...DEFAULT_PROFILE, role: legacyRole }
}

function saveToStorage(profile: UserProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

const UserProfileContext = createContext<UserProfileContextValue | null>(null)

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(loadFromStorage)

  function updateProfile(partial: Partial<UserProfile>) {
    setProfile(prev => {
      const next = { ...prev, ...partial }
      saveToStorage(next)
      return next
    })
  }

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserProfile() {
  const ctx = useContext(UserProfileContext)
  if (!ctx) throw new Error('useUserProfile must be used inside UserProfileProvider')
  return ctx
}

/** Returns "Prénom Nom" or a fallback */
export function fullName(profile: UserProfile): string {
  const name = `${profile.firstName} ${profile.lastName}`.trim()
  return name || 'Utilisateur'
}
