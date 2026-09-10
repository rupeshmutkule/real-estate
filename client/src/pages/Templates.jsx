import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Templates() {
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const res = await api.get('/templates')
      setTemplates(res.data.templates || [])
    } catch (err) {
      console.error('Failed to load templates')
    }
  }

  return (
    <div>
      <h1>Message Templates</h1>
      
      <div style={{ background: 'white', marginTop: '30px', padding: '30px', borderRadius: '8px' }}>
        <h3>Available Variables</h3>
        <p style={{ marginTop: '10px', color: '#6b7280' }}>
          Use these in your messages: <code>{'{{name}}'}</code>, <code>{'{{property}}'}</code>, <code>{'{{city}}'}</code>
        </p>
        
        <div style={{ marginTop: '30px' }}>
          <h4>Example Template:</h4>
          <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '6px', marginTop: '10px', fontFamily: 'monospace' }}>
            Hello {'{{name}}'},<br/><br/>
            We have new {'{{property}}'} properties available in {'{{city}}'}.<br/><br/>
            Would you like to know more?<br/><br/>
            Regards,<br/>
            ABC Real Estate
          </div>
        </div>
      </div>
    </div>
  )
}
