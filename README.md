# Real Estate CRM

Full-stack MERN application for managing real estate contacts with WhatsApp and Email campaigns.

## Quick Start

1. **Start MongoDB**
```bash
mongod
```

2. **Start Backend**
```bash
cd server
npm run dev
```

3. **Start Frontend**
```bash
cd client
npm run dev
```

4. **Open Browser**
```
http://localhost:5173
```

## Configuration

Edit `server/.env`:

```env
# Database
MONGO_URI=mongodb://127.0.0.1:27017/real_estate_crm
JWT_SECRET=your_secret_key

# Brevo Email
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your@email.com
BREVO_SENDER_NAME=Real Estate

# WASender WhatsApp
WASENDER_API_URL=your_wasender_api_url
WASENDER_API_KEY=your_wasender_api_key

# Redis (Optional - for campaigns)
REDIS_URL=redis://127.0.0.1:6379
```

## Features

- Contact management (manual & Excel import)
- Phone normalization (91xxxxxxxxxx)
- WhatsApp campaigns via WASender
- Email campaigns via Brevo
- Message templates with variables `{{name}}`, `{{city}}`, `{{property}}`
- Campaign tracking & reports
- JWT authentication

## Excel Import Format

| Name  | Phone      | Email           | Property | City   |
|-------|------------|-----------------|----------|--------|
| Rahul | 9876543210 | rahul@gmail.com | 2BHK     | Pune   |
| Amit  | 9876543211 | amit@gmail.com  | Villa    | Mumbai |

## Tech Stack

- MongoDB + Mongoose
- Express.js
- React + Vite
- Node.js
- Brevo (Email)
- WASender (WhatsApp)
- BullMQ + Redis (Queue)
