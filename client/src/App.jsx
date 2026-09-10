import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import ImportContacts from './pages/ImportContacts'
import Campaigns from './pages/Campaigns'
import WhatsApp from './pages/WhatsApp'
import Email from './pages/Email'
import Templates from './pages/Templates'
import Layout from './components/Layout'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="contacts/import" element={<ImportContacts />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="whatsapp" element={<WhatsApp />} />
            <Route path="email" element={<Email />} />
            <Route path="templates" element={<Templates />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
