import { useState } from 'react'
import api from '../services/api'

export default function Email() {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    setSending(true)
    
    try {
      await api.post('/email/send', { email, subject, message })
      alert('Email sent successfully')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send email')
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      <h1>Send Email</h1>
      
      <form onSubmit={handleSend} style={{ marginTop: '30px', background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '600px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email Address</label>
          <input
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Subject</label>
          <input
            type="text"
            placeholder="New Property Update"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Message</label>
          <textarea
            placeholder="Hello, we have new properties available..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="6"
            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px' }}
            required
          />
        </div>

        <button type="submit" disabled={sending} style={{ padding: '12px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          {sending ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  )
}
