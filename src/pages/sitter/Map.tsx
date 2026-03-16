import { useNavigate } from 'react-router-dom'
import BottomTabBar from '../../components/sitter/BottomTabBar'

const mapImage = 'https://www.figma.com/api/mcp/asset/0de2ccb3-09da-4922-8bbd-210c11230149'

const glassLight = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] backdrop-blur-sm'
const glassDanger = 'bg-gradient-to-r from-[rgba(255,56,60,0.8)] to-[rgba(255,56,60,0.8)] shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] backdrop-blur-sm'
const glassAccent = 'bg-gradient-to-r from-brand/80 to-brand/80 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)] backdrop-blur-sm'

function BellIcon() {
  return (
    <svg width="19" height="21" viewBox="0 0 19 21" fill="none">
      <path d="M9.5 1C9.5 1 4 4 4 11V16H15V11C15 4 9.5 1 9.5 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 16C7.5 17.1046 8.39543 18 9.5 18C10.6046 18 11.5 17.1046 11.5 16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 16H17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
      <path d="M21 2H3C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H8L12 20L16 16H21C21.5523 16 22 15.5523 22 15V3C22 2.44772 21.5523 2 21 2Z" stroke="#010a05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 12H19M13 6L19 12L13 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function SitterMap() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Map background */}
      <div className="absolute inset-0">
        <img
          src={mapImage}
          alt="map"
          className="absolute w-[175.56%] max-w-none"
          style={{ left: '-37.78%', top: '-49.36%', height: '175.56%' }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-[62px] left-4 right-4 flex items-center justify-between z-10">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center justify-center w-12 h-12 rounded-full ${glassLight}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#010a05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Bell alert */}
          <button className={`flex items-center justify-center w-12 h-12 rounded-full ${glassDanger}`}>
            <BellIcon />
          </button>

          {/* Timer + message pill */}
          <div className={`flex items-center rounded-full h-12 ${glassLight}`}>
            <span
              className="w-12 text-center text-[14px] text-text-primary tracking-[-0.14px] leading-[1.2] font-normal px-3"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              32:22
            </span>
            <div className="flex items-center justify-center w-12 h-12">
              <ChatIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Start walk button */}
      <div className="absolute bottom-[127px] left-4 right-4 flex items-center justify-center z-10">
        <button
          className={`flex items-center justify-center gap-2 w-full py-4 px-4 rounded-full ${glassAccent} text-white`}
          onClick={() => {}}
        >
          <span
            className="text-[16px] font-medium leading-[1.2]"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Commencer la promenade
          </span>
          <ArrowIcon />
        </button>
      </div>

      {/* Bottom tab bar */}
      <BottomTabBar activeTab="home" />
    </div>
  )
}
