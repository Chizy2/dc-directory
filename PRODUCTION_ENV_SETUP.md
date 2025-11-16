# Production Environment Variables Setup

This document outlines the required environment variables for deploying to VPS at `mejorrasales.com` on port `5050`.

## 🔧 Required Environment Variables

### Frontend Environment Variables

Set these in your **frontend `.env.production`** file for VPS deployment:

```env
NODE_ENV=production
PORT=5050
HOST=0.0.0.0
NEXT_PUBLIC_API_URL=https://mejorrasales.com:5050/api
NEXT_PUBLIC_SUPABASE_URL=https://ussoyjjlauhggwsezbhy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Important Notes:**
- `NEXT_PUBLIC_API_URL` must point to your backend API
- If your backend is accessible via reverse proxy at `https://www.mejorrasales.com/api` (without port), use that instead
- The port `5050` is based on your backend configuration

### Backend Environment Variables

Set these in your **backend `.env`** file for VPS deployment:

```env
NODE_ENV=production
PORT=5050
HOST=0.0.0.0
FRONTEND_URL=https://mejorrasales.com
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=https://ussoyjjlauhggwsezbhy.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Important Notes:**
- `PORT=5050` - This is the port your backend runs on
- `HOST=0.0.0.0` - Required for VPS to bind to all interfaces
- `FRONTEND_URL` - Used for CORS configuration
- Use Supabase **Session Pooler** connection string (port 6543) for better performance:
  ```
  postgresql://postgres:[PASSWORD]@db.ussoyjjlauhggwsezbhy.supabase.co:6543/postgres?pgbouncer=true
  ```

## 📝 Changes Made for Production

### 1. Frontend API Configuration (`frontend/lib/api.ts`)
- ✅ Removed hardcoded localhost fallback
- ✅ Added smart URL detection for production domain
- ✅ Falls back to `https://www.mejorrasales.com:5050/api` if env var not set
- ✅ Still supports localhost for development

### 2. Backend CORS Configuration (`backend/server.js`)
- ✅ Added `https://www.mejorrasales.com` and `https://mejorrasales.com` to allowed origins
- ✅ Removed hardcoded localhost from production builds
- ✅ Localhost only included in development mode
- ✅ Supports both www and non-www versions

### 3. Next.js Image Configuration (`frontend/next.config.js`)
- ✅ Added production domain to image domains
- ✅ Added Supabase storage domain
- ✅ Localhost only included in development

## 🚀 Deployment Steps

1. **Set Environment Variables:**
   - Create `backend/.env` with backend variables
   - Create `frontend/.env.production` with frontend variables
   - See `VPS_DEPLOYMENT.md` for detailed VPS setup instructions

2. **Start Applications:**
   - Use PM2: `pm2 start backend/server.js --name "mejorrasales-backend"`
   - Use PM2: `pm2 start frontend/server.js --name "mejorrasales-frontend"`
   - Or use systemd/service manager

3. **Verify Configuration:**
   - Test backend: `https://mejorrasales.com:5050/api/health`
   - Test frontend: Visit `https://mejorrasales.com:5050`
   - Try creating a business from the admin panel

## 🔍 Troubleshooting

### Issue: "Cannot create business - localhost errors"

**Solution:**
1. Verify `NEXT_PUBLIC_API_URL` is set correctly in frontend environment variables
2. Check browser console for the actual API URL being used
3. Ensure backend CORS includes your frontend domain
4. Restart both applications after setting environment variables

### Issue: CORS errors

**Solution:**
1. Verify `FRONTEND_URL` is set in backend environment variables
2. Check that both `https://www.mejorrasales.com` and `https://mejorrasales.com` are in CORS origins
3. Ensure backend is running and accessible

### Issue: API connection timeout

**Solution:**
1. Verify backend is running on port 5050
2. Check that `NEXT_PUBLIC_API_URL` points to the correct backend URL
3. If using reverse proxy, ensure it's configured correctly
4. Test backend health endpoint directly

## 📞 Support

If issues persist:
1. Check PM2 logs: `pm2 logs` or application logs
2. Verify all environment variables are set correctly
3. Ensure Supabase project is active (not paused)
4. Test backend API directly: `curl https://mejorrasales.com:5050/api/health`
5. See `VPS_DEPLOYMENT.md` for detailed troubleshooting

