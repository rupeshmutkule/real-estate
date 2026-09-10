import { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadContacts()
  }, [search])

  const loadContacts = async () => {
    const res = await api.get('/contacts', { params: { search } })
    setContacts(res.data.contacts)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Contacts</h1>
        <Link to="/contacts/import" style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
          Import Excel
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #d1d5db', borderRadius: '6px' }}
      />
      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Property</th>
              <th style={thStyle}>City</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={tdStyle}>{contact.name}</td>
                <td style={tdStyle}>{contact.phone}</td>
                <td style={tdStyle}>{contact.email}</td>
                <td style={tdStyle}>{contact.property}</td>
                <td style={tdStyle}>{contact.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle = { padding: '12px', textAlign: 'left', fontWeight: '600' }
const tdStyle = { padding: '12px' }
