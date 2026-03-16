import { Routes, Route, Navigate } from 'react-router-dom'
import { AnnoncesProvider } from './store/annonces'
import { ConversationsProvider } from './store/conversations'
import Splash from './pages/onboarding/Splash'
import Landing from './pages/onboarding/Landing'
import Signup from './pages/onboarding/Signup'
import Password from './pages/onboarding/Password'
import RoleSelection from './pages/onboarding/RoleSelection'
import Profile from './pages/onboarding/Profile'
import Verify from './pages/onboarding/Verify'
import Certification from './pages/onboarding/Certification'
import Formation from './pages/onboarding/Formation'
import SitterHome from './pages/sitter/Home'
import SitterProfil from './pages/sitter/Profil'
import SitterMessagerie from './pages/sitter/Messagerie'
import SitterRecherche from './pages/sitter/Recherche'
import SitterMessagerieConversation from './pages/sitter/MessagerieConversation'
import SitterProfilTransactions from './pages/sitter/ProfilTransactions'
import OwnerHome from './pages/owner/Home'
import OwnerProfil from './pages/owner/Profil'
import OwnerMessagerie from './pages/owner/Messagerie'
import OwnerRecherche from './pages/owner/Recherche'
import OwnerMessagerieConversation from './pages/owner/MessagerieConversation'
import OwnerProfilTransactions from './pages/owner/ProfilTransactions'
import SitterMap from './pages/sitter/Map'
import OwnerMap from './pages/owner/Map'

function App() {
  return (
    <AnnoncesProvider>
    <ConversationsProvider>
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
          <Route path="/onboarding/formation" element={<Formation />} />
          <Route path="/sitter/home" element={<SitterHome />} />
          <Route path="/sitter/profil" element={<SitterProfil />} />
          <Route path="/sitter/messagerie" element={<SitterMessagerie />} />
          <Route path="/sitter/messagerie/:id" element={<SitterMessagerieConversation />} />
          <Route path="/sitter/recherche" element={<SitterRecherche />} />
          <Route path="/sitter/profil/transactions" element={<SitterProfilTransactions />} />
          <Route path="/owner/home" element={<OwnerHome />} />
          <Route path="/owner/profil" element={<OwnerProfil />} />
          <Route path="/owner/messagerie" element={<OwnerMessagerie />} />
          <Route path="/owner/messagerie/:id" element={<OwnerMessagerieConversation />} />
          <Route path="/owner/recherche" element={<OwnerRecherche />} />
          <Route path="/owner/profil/transactions" element={<OwnerProfilTransactions />} />
          <Route path="/sitter/map" element={<SitterMap />} />
          <Route path="/owner/map" element={<OwnerMap />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
    </ConversationsProvider>
    </AnnoncesProvider>
  )
}

export default App
