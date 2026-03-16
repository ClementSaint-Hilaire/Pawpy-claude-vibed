import { useNavigate } from 'react-router-dom'

type ActiveTab = 'profil' | 'home' | 'messages'

interface BottomTabBarProps {
  activeTab: ActiveTab
}

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20C4 17.3333 6.66667 15 12 15C17.3333 15 20 17.3333 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <path d="M2 8.5L10 2.5L18 8.5V18.5C18 19.0523 17.5523 19.5 17 19.5H13V14.5H7V19.5H3C2.44772 19.5 2 19.0523 2 18.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
      <path d="M21 2H3C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H8L12 20L16 16H21C21.5523 16 22 15.5523 22 15V3C22 2.44772 21.5523 2 21 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function OwnerBottomTabBar({ activeTab }: BottomTabBarProps) {
  const navigate = useNavigate()

  const tabs: { key: ActiveTab; label: string; icon: React.ReactNode; route: string }[] = [
    { key: 'profil', label: 'Mon Profil', icon: <UserIcon />, route: '/owner/profil' },
    { key: 'home', label: 'Accueil', icon: <HomeIcon />, route: '/owner/home' },
    { key: 'messages', label: 'Messages', icon: <ChatIcon />, route: '/owner/messagerie' },
  ]

  return (
    <div className="absolute bottom-0 left-0 w-full h-[95px] flex flex-col items-center justify-start pt-2">
      <div className={`flex gap-3 items-center justify-center rounded-full w-[361px]`}>
        {/* Main 3-tab pill */}
        <div className={`flex flex-1 items-center justify-center px-1 py-1 rounded-full ${glassStyle}`}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => navigate(tab.route)}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 px-7 rounded-full transition-colors ${
                  isActive ? 'bg-stroke' : ''
                }`}
              >
                <span className={isActive ? 'text-brand' : 'text-text-primary'}>
                  {tab.icon}
                </span>
                <span
                  className={`text-[11px] leading-[1.1] whitespace-nowrap ${
                    isActive ? 'font-bold text-brand' : 'font-normal text-text-primary'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search pill */}
        <button
          onClick={() => navigate('/owner/recherche')}
          className={`flex items-center justify-center w-16 h-full py-4 rounded-full ${glassStyle}`}
        >
          <span className="text-text-primary">
            <SearchIcon />
          </span>
        </button>
      </div>
    </div>
  )
}
