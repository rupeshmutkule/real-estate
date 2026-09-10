import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    api.get('/campaigns').then(res => setCampaigns(res.data.campaigns))
  }, [])

  return (
    <div>
      <h1>Campaigns</h1>
      
      <div style={{ background: 'white', marginTop: '30px', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Channel</th>
              <th style={thStyle}>Recipients</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Created</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign._id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={tdStyle}>{campaign.name}</td>
                <td style={tdStyle}>{campaign.channel}</td>
                <td style={tdStyle}>{campaign.totalRecipients}</td>
                <td style={tdStyle}>{campaign.status}</td>
                <td style={tdStyle}>{new Date(campaign.createdAt).toLocaleDateString()}</td>
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
