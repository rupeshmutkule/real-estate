import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/contacts').then(res => {
      setStats({ totalContacts: res.data.total })
    })
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
        <div style={cardStyle}>
          <h3>Total Contacts</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats?.totalContacts || 0}</p>
        </div>
        <div style={cardStyle}>
          <h3>Campaigns</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>0</p>
        </div>
        <div style={cardStyle}>
          <h3>Messages Sent</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>0</p>
        </div>
      </div>
    </div>
  )
}

const cardStyle = {
  background: 'white',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
}
