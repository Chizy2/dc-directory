# 🚀 VPS Deployment Guide for mejorrasales.com

This guide will help you deploy the Dominion City Directory application to a VPS server with the domain `mejorrasales.com`:
- **Backend**: Port `5050`
- **Frontend**: Port `3000`
- **Database**: Supabase

## 📋 Prerequisites

- VPS with Ubuntu 20.04+ or similar Linux distribution
- Domain `mejorrasales.com` pointing to your VPS IP
- SSH access to your VPS
- Node.js 18.x or 20.x installed
- PM2 or similar process manager (recommended)
- Nginx or Apache for reverse proxy (optional but recommended)

---

## 🔧 Step 1: Server Setup

### 1.1 Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js

```bash
# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### 1.3 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 1.4 Install Nginx (for reverse proxy - optional)

```bash
sudo apt install -y nginx
```

---

## 📦 Step 2: Upload Application Files

### 2.1 Create Application Directory

```bash
# Create directory for the application
sudo mkdir -p /var/www/mejorrasales
sudo chown -R $USER:$USER /var/www/mejorrasales
cd /var/www/mejorrasales
```

### 2.2 Upload Files

Upload your project files to `/var/www/mejorrasales/` using one of these methods:

**Option A: Using Git (Recommended)**
```bash
git clone <your-repo-url> .
```

**Option B: Using SCP**
```bash
# From your local machine
scp -r /path/to/project/* user@your-vps-ip:/var/www/mejorrasales/
```

**Option C: Using SFTP**
Use an SFTP client like FileZilla to upload files.

---

## 🔐 Step 3: Configure Environment Variables

### 3.1 Backend Environment Variables

Create `/var/www/mejorrasales/backend/.env`:

```env
NODE_ENV=production
PORT=5050
HOST=0.0.0.0

# Database Connection (Use Session Pooler - port 6543)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.ussoyjjlauhggwsezbhy.supabase.co:6543/postgres?pgbouncer=true

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

# Supabase Configuration
SUPABASE_URL=https://ussoyjjlauhggwsezbhy.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Frontend URL (for CORS)
FRONTEND_URL=https://mejorrasales.com

# Google Maps API (Optional)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3.2 Frontend Environment Variables

Create `/var/www/mejorrasales/frontend/.env.production`:

```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Next.js requires NEXT_PUBLIC_ prefix for client-side variables
# Backend API runs on port 5050
NEXT_PUBLIC_API_URL=https://mejorrasales.com:5050/api
NEXT_PUBLIC_SUPABASE_URL=https://ussoyjjlauhggwsezbhy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**⚠️ Important:** Replace placeholder values with your actual credentials from Supabase Dashboard.

---

## 📦 Step 4: Install Dependencies

### 4.1 Install Backend Dependencies

```bash
cd /var/www/mejorrasales/backend
npm install --production
```

### 4.2 Install Frontend Dependencies and Build

```bash
cd /var/www/mejorrasales/frontend
npm install
npm run build
```

---

## 🚀 Step 5: Start Applications with PM2

### 5.1 Start Backend

```bash
cd /var/www/mejorrasales/backend
pm2 start server.js --name "mejorrasales-backend"
```

### 5.2 Start Frontend

```bash
cd /var/www/mejorrasales/frontend
pm2 start server.js --name "mejorrasales-frontend"
```

### 5.3 Save PM2 Configuration

```bash
pm2 save
pm2 startup
# Follow the instructions to enable PM2 on system boot
```

### 5.4 Check Status

```bash
pm2 status
pm2 logs
```

---

## 🌐 Step 6: Configure Nginx Reverse Proxy (Recommended)

### 6.1 Create Nginx Configuration

Create `/etc/nginx/sites-available/mejorrasales`:

```nginx
server {
    listen 80;
    server_name mejorrasales.com www.mejorrasales.com;

    # Redirect HTTP to HTTPS (after SSL setup)
    # return 301 https://$server_name$request_uri;

    # Proxy frontend (port 3000) and backend API (port 5050)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # API routes - backend runs on port 5050
    location /api {
        proxy_pass http://localhost:5050;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6.2 Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/mejorrasales /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 Step 7: Configure SSL with Let's Encrypt

### 7.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 7.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d mejorrasales.com -d www.mejorrasales.com
```

Follow the prompts to complete the SSL setup.

### 7.3 Update Nginx Configuration

After SSL is installed, update the Nginx config to redirect HTTP to HTTPS and use port 443.

---

## 🔥 Step 8: Configure Firewall

### 8.1 Allow Required Ports

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3000/tcp  # Frontend port (if not using reverse proxy)
sudo ufw allow 5050/tcp  # Backend API port (if not using reverse proxy)
sudo ufw enable
```

---

## ✅ Step 9: Verify Deployment

### 9.1 Test Backend API

```bash
curl http://localhost:5050/api/health
curl http://localhost:5050/api/health/db
```

### 9.2 Test Frontend

Open in browser:
- `http://mejorrasales.com:3000` (if not using reverse proxy)
- `http://mejorrasales.com` (if using reverse proxy)
- `https://mejorrasales.com` (after SSL setup)

### 9.3 Check PM2 Logs

```bash
pm2 logs mejorrasales-backend
pm2 logs mejorrasales-frontend
```

---

## 🔄 Step 10: Update Application

### 10.1 Pull Latest Changes

```bash
cd /var/www/mejorrasales
git pull origin main
```

### 10.2 Rebuild Frontend (if needed)

```bash
cd /var/www/mejorrasales/frontend
npm install
npm run build
```

### 10.3 Restart Applications

```bash
pm2 restart mejorrasales-backend
pm2 restart mejorrasales-frontend
```

---

## 🐛 Troubleshooting

### Application Not Starting

```bash
# Check PM2 logs
pm2 logs

# Check if ports are in use
sudo netstat -tulpn | grep 3000  # Frontend
sudo netstat -tulpn | grep 5050  # Backend

# Restart PM2
pm2 restart all
```

### Database Connection Issues

- Verify Supabase project is not paused
- Check DATABASE_URL uses Session Pooler (port 6543)
- Verify credentials are correct

### CORS Errors

- Verify FRONTEND_URL in backend `.env` matches your domain
- Check backend CORS configuration in `backend/server.js`
- Ensure URLs use HTTPS in production

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📊 Monitoring

### PM2 Monitoring

```bash
# View real-time monitoring
pm2 monit

# View application info
pm2 info mejorrasales-backend
pm2 info mejorrasales-frontend

# View logs
pm2 logs --lines 100
```

### System Resources

```bash
# Check system resources
htop

# Check disk space
df -h

# Check memory
free -h
```

---

## 🔒 Security Best Practices

1. **Keep system updated**: `sudo apt update && sudo apt upgrade`
2. **Use strong passwords**: For database, JWT secrets, etc.
3. **Enable firewall**: Configure UFW properly
4. **Use SSL**: Always use HTTPS in production
5. **Restrict SSH**: Use key-based authentication
6. **Regular backups**: Backup database and application files
7. **Monitor logs**: Regularly check PM2 and Nginx logs
8. **Keep dependencies updated**: Run `npm audit` regularly

---

## 📝 Environment Variables Reference

See `ENV_PRODUCTION.md` for detailed information about each environment variable.

---

## 🎉 Success Checklist

- [ ] Backend running on port 5050
- [ ] Frontend running on port 3000
- [ ] PM2 managing both processes
- [ ] Nginx configured (if using reverse proxy)
- [ ] SSL certificate installed
- [ ] Domain pointing to VPS
- [ ] Health endpoints responding
- [ ] Frontend loads correctly
- [ ] API endpoints working
- [ ] Database connected
- [ ] CORS configured correctly
- [ ] Firewall configured

---

## 📞 Additional Resources

- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)

---

**Last Updated**: [Date]
**Domain**: mejorrasales.com
**Backend Port**: 5050
**Frontend Port**: 3000
**Database**: Supabase

