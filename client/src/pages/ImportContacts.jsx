import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function ImportContacts() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUpload = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const res = await api.post('/contacts/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setPreview(res.data)
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async () => {
    try {
      await api.post('/contacts/import', { contacts: preview.preview })
      alert(`Successfully imported ${preview.new} contacts`)
      navigate('/contacts')
    } catch (err) {
      alert('Import failed')
    }
  }

  return (
    <div>
      <h1>Import Contacts from Excel</h1>
      
      <form onSubmit={handleUpload} style={{ marginTop: '30px', background: 'white', padding: '30px', borderRadius: '8px' }}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: '15px' }}
          required
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          {loading ? 'Uploading...' : 'Upload & Preview'}
        </button>
      </form>

      {preview && (
        <div style={{ marginTop: '30px', background: 'white', padding: '30px', borderRadius: '8px' }}>
          <h2>Preview</h2>
          <p>Total: {preview.total} | New: {preview.new} | Duplicates: {preview.duplicates}</p>
          
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Property</th>
                <th style={thStyle}>City</th>
              </tr>
            </thead>
            <tbody>
              {preview.preview.map((contact, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{contact.name}</td>
                  <td style={tdStyle}>{contact.phone}</td>
                  <td style={tdStyle}>{contact.email}</td>
                  <td style={tdStyle}>{contact.property}</td>
                  <td style={tdStyle}>{contact.city}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleImport} style={{ marginTop: '20px', padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Confirm Import
          </button>
        </div>
      )}
    </div>
  )
}

const thStyle = { padding: '12px', textAlign: 'left', fontWeight: '600', borderBottom: '2px solid #e5e7eb' }
const tdStyle = { padding: '12px', borderBottom: '1px solid #e5e7eb' }
