# Deployment Guide - Real Estate CRM

## 📦 Architecture

```
Frontend (Vercel)          Backend (Render/Railway)
    React App      →→→→    Express API + MongoDB
```

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

The frontend is already configured! Just update the production API URL.

### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Import Repository**: Click "New Project" → Import from GitHub
3. **Select**: `rupeshmutkule/real-estate`
4. **Root Directory**: Set to `client`
5. **Framework Preset**: Vite
6. **Environment Variables**: Add ONE variable:
   ```
   VITE_API_URL = https://your-backend-url.com/api
   ```
   (You'll update this after deploying backend)

7. **Deploy**: Click "Deploy"

### Step 3: Update After Backend Deployment

After deploying backend, update the `VITE_API_URL` in Vercel:
- Go to Project Settings → Environment Variables
- Edit `VITE_API_URL` to your actual backend URL
- Redeploy

---

## 🚀 Backend Deployment (Render.com - FREE)

### Step 1: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Deploy Backend

1. **New Web Service**
2. **Connect Repository**: `rupeshmutkule/real-estate`
3. **Configure**:
   - **Name**: `real-estate-crm-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Add Environment Variables

In Render dashboard, add these environment variables:

```env
PORT=5000
NODE_ENV=production

MONGO_URI=mongodb+srv://Rupesh:YOUR_PASSWORD@rupesh.lyhyirl.mongodb.net/RealEstateCRM?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

CLIENT_URL=https://your-vercel-app.vercel.app

BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=rupeshmutkule2005@gmail.com
BREVO_SENDER_NAME=Real Estate

WASENDER_API_URL=
WASENDER_API_KEY=
```

### Step 4: Update CORS

After deployment, copy your Render URL (e.g., `https://real-estate-crm-api.onrender.com`)

Update `CLIENT_URL` to your Vercel frontend URL.

---

## 🔄 Complete Deployment Flow

### 1. Deploy Backend First

```bash
# Render will use these from your GitHub repo
server/
  ├── package.json
  ├── src/
  └── ...
```

You'll get a URL like:
```
https://real-estate-crm-api.onrender.com
```

### 2. Update Vercel Environment

Go to Vercel → Your Project → Settings → Environment Variables

```
VITE_API_URL = https://real-estate-crm-api.onrender.com/api
```

### 3. Redeploy Vercel

In Vercel dashboard, click "Redeploy"

### 4. Update Backend CORS

In Render → Environment Variables

```
CLIENT_URL = https://your-app.vercel.app
```

Render will auto-redeploy.

---

## ✅ Final URLs

**Frontend**: `https://your-app.vercel.app`
**Backend API**: `https://real-estate-crm-api.onrender.com/api`

---

## 🔧 Alternative Backend Hosts

### Railway.app (Paid after trial)
- Similar to Render
- Better performance
- $5/month after trial

### Heroku (Paid)
- Classic option
- $7/month minimum

### Vercel (Can host both!)
- Deploy backend as Serverless Functions
- Keep both in one platform

---

## 📝 Environment Variables Summary

### Frontend (Vercel)
```
VITE_API_URL = https://your-backend-url.com/api
```

### Backend (Render/Railway)
```
PORT = 5000
NODE_ENV = production
MONGO_URI = mongodb+srv://...
JWT_SECRET = your_secret
CLIENT_URL = https://your-vercel-app.vercel.app
BREVO_API_KEY = xkeysib-...
BREVO_SENDER_EMAIL = your@email.com
BREVO_SENDER_NAME = Real Estate
WASENDER_API_URL = (optional)
WASENDER_API_KEY = (optional)
```

---

## 🔒 Security Checklist

Before deploying:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Update MongoDB Atlas IP whitelist to allow Render's IPs (or use 0.0.0.0/0)
- [ ] Verify `CLIENT_URL` matches your Vercel domain
- [ ] Test API health endpoint: `https://your-backend/api/health`
- [ ] Never commit `.env` files

---

## 🧪 Testing Deployment

1. **Test Backend Health**:
   ```
   https://your-backend-url.com/api/health
   ```
   Should return:
   ```json
   {
     "success": true,
     "message": "Real Estate CRM API running"
   }
   ```

2. **Test Frontend**:
   - Open your Vercel URL
   - Try to register a user
   - Check if API calls work

3. **Check MongoDB**:
   - Open MongoDB Compass
   - Verify `RealEstateCRM` database is created
   - Check `users` collection has data

---

## 🐛 Common Issues

### CORS Error
**Error**: "Access-Control-Allow-Origin"
**Fix**: Update `CLIENT_URL` in backend to match Vercel URL

### MongoDB Connection Failed
**Error**: "MongoServerError"
**Fix**: Check MongoDB Atlas IP whitelist includes Render IPs

### 404 on API calls
**Error**: "Cannot GET /api/contacts"
**Fix**: Verify `VITE_API_URL` in Vercel has `/api` at the end

### Build Failed on Vercel
**Error**: "Build failed"
**Fix**: 
1. Check Root Directory is set to `client`
2. Verify Framework Preset is `Vite`

---

## 📞 Support

If you face issues:
1. Check Vercel deployment logs
2. Check Render deployment logs
3. Verify environment variables are set correctly
4. Test backend health endpoint first

---

## 🎉 You're Done!

Your Real Estate CRM is now live!

- ✅ Frontend on Vercel (CDN, Fast)
- ✅ Backend on Render (Free tier)
- ✅ MongoDB Atlas (Cloud database)
- ✅ Brevo (Email service)

Share your live URL! 🚀
