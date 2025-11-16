# Dominion City Directory

**Fostering Sincere and Brotherly Patronage Within the Household of Faith**

A faith-based directory connecting brethren with skilled workers, artisans, and businesses within the church community. Built with Next.js and Node.js.

## Mission

This directory exists to strengthen the bonds of fellowship in the Body of Christ by making it easy for brethren to find and support one another in business, craftsmanship, and skilled services. We encourage everyone to:

- ✓ **Be Excellent** - Deliver quality work and service
- ✓ **Be Honest** - Practice truthfulness and fair pricing
- ✓ **Be Brotherly** - Treat one another with love and sincerity

## Features

### Public Features
- 🔍 Search by name, skill, business, or city
- 📍 Filter by state (all 36 Nigerian states + FCT)
- 🏷️ Browse by skill/category with custom entry option
- 📄 View detailed profiles with contact information and church branch
- ⛪ Church branch/assembly affiliation displayed
- ✨ Featured listings section

### Admin Features
- 🔐 Secure admin login with JWT authentication
- ➕ Add skilled workers and businesses
- ✏️ Edit existing profiles
- ❌ Delete listings
- 📊 Dashboard with statistics
- 🖼️ Upload profile images
- ⛪ Track church branch affiliation
- 🏷️ 36+ predefined categories plus custom entry

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, PostgreSQL
- **Authentication:** JWT
- **File Upload:** Multer

## Color Palette

- **Dark Blue:** #0A1F44 (Primary background)
- **Gold:** #D4AF37 (Accents, buttons, highlights)
- **White:** #FFFFFF (Content, cards)

## Installation

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Setup Instructions

1. **Clone the repository**
   ```bash
   cd "Dominion City Project"
   ```

2. **Install dependencies for all projects**
   ```bash
   npm run install-all
   ```

3. **Set up PostgreSQL database**
   ```bash
   # Create a PostgreSQL database
   createdb dominion_city

   # Run the database initialization script
   psql dominion_city < backend/config/db-init.sql

   # Initialize admin user (properly hashed password)
   cd backend
   npm run init-db
   cd ..
   ```

4. **Configure environment variables**

   Create `backend/.env` file:
   ```env
   PORT=5000
   NODE_ENV=development

   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=dominion_city
   DB_USER=postgres
   DB_PASSWORD=your_password

   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d

   # Admin Credentials
   ADMIN_EMAIL=admin@dominioncity.com
   ADMIN_PASSWORD=admin123

   ```

   Create `frontend/.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Start the application**

   From the root directory:
   ```bash
   npm run dev
   ```

   Or start separately:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

## Usage

### Access the Application

- **Public Site:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
- **Backend API:** http://localhost:5000/api

### Default Admin Credentials

- **Email:** admin@dominioncity.com
- **Password:** admin123

## Project Structure

```
.
├── frontend/              # Next.js frontend application
│   ├── app/              # App router pages
│   │   ├── page.tsx     # Homepage
│   │   ├── results/     # Search results page
│   │   ├── business/    # Business profile pages
│   │   └── admin/       # Admin dashboard
│   ├── components/      # React components
│   ├── lib/            # API utilities
│   └── ...
├── backend/             # Node.js backend application
│   ├── config/         # Database configuration
│   ├── middleware/     # Auth middleware
│   ├── routes/         # API routes
│   ├── server.js       # Main server file
│   └── ...
└── package.json        # Root package.json
```

## API Endpoints

### Public Endpoints

- `GET /api/businesses` - Get all active businesses
- `GET /api/businesses/:id` - Get single business
- `GET /api/businesses/featured/list` - Get featured businesses
- `GET /api/businesses/meta/categories` - Get all categories
- `GET /api/businesses/meta/cities` - Get all cities
- `GET /api/businesses/meta/states` - Get all states

### Admin Endpoints (Require Authentication)

- `POST /api/auth/login` - Admin login
- `GET /api/admin/businesses` - Get all businesses (admin view)
- `POST /api/admin/businesses` - Create new business
- `PUT /api/admin/businesses/:id` - Update business
- `DELETE /api/admin/businesses/:id` - Delete business
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

## Features in Detail

### Homepage
- Faith-based mission statement and values
- Search bar with "How to Use" instructions
- Skill/service category buttons for browsing
- Featured listings section
- Responsive design with gold accents

### Search & Results
- Filter by skill/category (with custom entry option)
- Filter by city (with custom entry option)
- Filter by state (all 36 Nigerian states + FCT)
- Real-time search
- Profile cards with images
- Click to view full profile

### Profile Page
- Complete individual/business information
- Contact details (phone, email, WhatsApp)
- Church branch/assembly affiliation
- Social media links
- View counter

### Admin Dashboard
- Statistics overview
- Recent listings
- Add/Edit/Delete operations
- Filter and search
- Status management (active/inactive)
- Church branch tracking
- Custom category support

## Deployment

### VPS Deployment (Recommended for mejorrasales.com)

For deploying to a VPS server with domain `mejorrasales.com` on port `5050`:

1. See **[VPS_DEPLOYMENT.md](./VPS_DEPLOYMENT.md)** for complete step-by-step guide
2. Configure environment variables (see **[ENV_PRODUCTION.md](./ENV_PRODUCTION.md)**)
3. Use PM2 to manage processes
4. Set up Nginx reverse proxy (optional)
5. Configure SSL with Let's Encrypt

**Quick Start:**
```bash
# Backend
cd backend
npm install --production
pm2 start server.js --name "mejorrasales-backend"

# Frontend
cd frontend
npm install
npm run build
pm2 start server.js --name "mejorrasales-frontend"
```

### Alternative Deployment Options

#### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

#### Backend (Render/AWS)

1. Set up PostgreSQL database (or use Supabase)
2. Configure environment variables
3. Set up file storage for images (Supabase Storage recommended)
4. Deploy Node.js app

## Development

### Running in Development

```bash
npm run dev
```

This runs both frontend and backend concurrently.

### Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run install-all` - Install all dependencies

## License

MIT

## Author

Dominion City Directory

---

Built with ❤️ for Dominion City
