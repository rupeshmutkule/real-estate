import { Outlet, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Home, Users, Upload, MessageCircle, Mail, BarChart, FileText } from 'lucide-react'

export default function Layout() {
  const { user, logout, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" />

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '250px', background: '#1f2937', color: 'white', padding: '20px' }}>
        <h1 style={{ marginBottom: '30px' }}>Real Estate CRM</h1>
        <nav>
          <Link to="/" style={linkStyle}><Home size={18} /> Dashboard</Link>
          <Link to="/contacts" style={linkStyle}><Users size={18} /> Contacts</Link>
          <Link to="/contacts/import" style={linkStyle}><Upload size={18} /> Import Excel</Link>
          <Link to="/campaigns" style={linkStyle}><BarChart size={18} /> Campaigns</Link>
          <Link to="/whatsapp" style={linkStyle}><MessageCircle size={18} /> WhatsApp</Link>
          <Link to="/email" style={linkStyle}><Mail size={18} /> Email</Link>
          <Link to="/templates" style={linkStyle}><FileText size={18} /> Templates</Link>
        </nav>
        <button onClick={logout} style={{ marginTop: '30px', padding: '10px', width: '100%' }}>Logout</button>
      </aside>
      <main style={{ flex: 1, padding: '30px', background: '#f3f4f6' }}>
        <Outlet />
      </main>
    </div>
  )
}

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '6px',
  marginBottom: '5px',
}
