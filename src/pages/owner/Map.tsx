import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomTabBar from '../../components/owner/BottomTabBar'

const mapImage = 'https://www.figma.com/api/mcp/asset/8e54d195-6bf1-4057-9a18-4687846a8b68'

const glassLight = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] backdrop-blur-sm'

function ChatIcon() {
  return (
    <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
      <path d="M21 2H3C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H8L12 20L16 16H21C21.5523 16 22 15.5523 22 15V3C22 2.44772 21.5523 2 21 2Z" stroke="#010a05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function OwnerMap() {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(32 * 60 + 22)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

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
          {/* Timer pill */}
          <div
            className={`flex items-center justify-center h-12 px-3 rounded-full ${glassLight}`}
            style={{ minWidth: '72px' }}
          >
            <span
              className="text-center text-[14px] text-[#010a05] tracking-[-0.14px] leading-[1.2] font-normal"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {mm}:{ss}
            </span>
          </div>

          {/* Chat button */}
          <button className={`flex items-center justify-center w-12 h-12 rounded-full ${glassLight}`}>
            <ChatIcon />
          </button>
        </div>
      </div>

      {/* Bottom tab bar */}
      <BottomTabBar activeTab="home" />
    </div>
  )
}
