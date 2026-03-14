import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from './pages/onboarding/Splash'
import Landing from './pages/onboarding/Landing'
import Signup from './pages/onboarding/Signup'
import Password from './pages/onboarding/Password'
import RoleSelection from './pages/onboarding/RoleSelection'
import Profile from './pages/onboarding/Profile'
import Verify from './pages/onboarding/Verify'
import Certification from './pages/onboarding/Certification'

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-[393px] h-[852px] bg-bg-primary relative overflow-hidden rounded-[40px]">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Landing />} />
          <Route path="/onboarding/signup" element={<Signup />} />
          <Route path="/onboarding/password" element={<Password />} />
          <Route path="/onboarding/role" element={<RoleSelection />} />
          <Route path="/onboarding/profile" element={<Profile />} />
          <Route path="/onboarding/verify" element={<Verify />} />
          <Route path="/onboarding/certification" element={<Certification />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
