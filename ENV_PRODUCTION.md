# Production Environment Variables

This file lists all environment variables needed for production deployment on cPanel.

## ⚠️ Important
- **DO NOT** commit actual values to version control
- Add these in cPanel: **Node.js App Manager** → Your App → **Environment Variables**
- Use Session Pooler connection string (port 6543) for better performance

---

## 🔧 Backend Environment Variables

Add these to your **backend Node.js app** in cPanel:

```env
NODE_ENV=production
PORT=5050
HOST=0.0.0.0

# Database Connection (Use Session Pooler - port 6543)
# Get from: Supabase Dashboard → Project Settings → Database → Connection Pooling → Session mode
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.ussoyjjlauhggwsezbhy.supabase.co:6543/postgres?pgbouncer=true

# JWT Configuration
# Generate a strong secret: openssl rand -base64 32
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

# Supabase Configuration
# Get from: Supabase Dashboard → Project Settings → API
SUPABASE_URL=https://ussoyjjlauhggwsezbhy.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Frontend URL (for CORS)
FRONTEND_URL=https://mejorrasales.com

# Google Maps API (Optional)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

---

## 🎨 Frontend Environment Variables

Add these to your **frontend Node.js app** in cPanel:

```env
NODE_ENV=production
PORT=5050
HOST=0.0.0.0

# Next.js requires NEXT_PUBLIC_ prefix for client-side variables
NEXT_PUBLIC_API_URL=https://mejorrasales.com:5050/api
NEXT_PUBLIC_SUPABASE_URL=https://ussoyjjlauhggwsezbhy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

---

## 📋 How to Get Each Value

### 1. DATABASE_URL (Supabase)
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Project Settings** → **Database**
4. Scroll to **Connection Pooling** section
5. Select **Session mode**
6. Copy the connection string
7. Replace `[YOUR-PASSWORD]` with your database password

**Recommended**: Use Session Pooler (port 6543) for better performance and connection management.

### 2. JWT_SECRET
Generate a secure random string:
```bash
openssl rand -base64 32
```
Or use an online generator. Minimum 32 characters recommended.

### 3. Supabase Keys
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Project Settings** → **API**
4. Copy:
   - **anon/public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep secret!)

### 4. Google Maps API Key (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable **Maps JavaScript API**
4. Create credentials (API Key)
5. Copy the key

### 5. FRONTEND_URL
Your production domain:
- `https://mejorrasales.com`
- `https://www.mejorrasales.com` (if using www)

### 6. NEXT_PUBLIC_API_URL
Your backend API URL:
- `https://mejorrasales.com:5050/api` (VPS deployment on port 5050)
- `https://www.mejorrasales.com:5050/api` (if using www)

---

## ✅ Verification Checklist

After adding all variables:

- [ ] All backend variables added in cPanel
- [ ] All frontend variables added in cPanel
- [ ] DATABASE_URL uses Session Pooler (port 6543)
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] SUPABASE_SERVICE_ROLE_KEY is kept secret
- [ ] FRONTEND_URL matches your actual domain
- [ ] NEXT_PUBLIC_API_URL points to your backend
- [ ] All URLs use HTTPS (not HTTP)
- [ ] NODE_ENV is set to `production`

---

## 🔒 Security Notes

1. **Never commit actual values** to Git
2. **Use strong JWT_SECRET** - minimum 32 characters
3. **Keep SUPABASE_SERVICE_ROLE_KEY secret** - it has admin access
4. **Use HTTPS only** in production
5. **Rotate secrets periodically** for security
6. **Use Session Pooler** for database connections (better security and performance)

---

## 🐛 Troubleshooting

### "Connection timeout" errors
- Check if Supabase project is paused
- Use Session Pooler connection string (port 6543)
- Verify DATABASE_URL is correct

### "Invalid API key" errors
- Verify Supabase keys are correct
- Check that keys are from the correct project
- Ensure service_role key is used only in backend

### CORS errors
- Verify FRONTEND_URL matches your actual domain
- Check backend CORS configuration in `server.js`
- Ensure URLs use HTTPS in production

---

## 📞 Need Help?

Refer to:
- [CPANEL_DEPLOYMENT.md](./CPANEL_DEPLOYMENT.md) - Full deployment guide
- [Supabase Documentation](https://supabase.com/docs)
- [cPanel Node.js Documentation](https://docs.cpanel.net/cpanel/web-applications/node.js-applications/)


