# GroceryScout Setup Guide

Complete setup instructions for running GroceryScout locally.

## Quick Start (Docker)

1. **Start all services**:
```bash
docker-compose up -d
```

2. **Wait for services to be ready** (30-60 seconds):
```bash
docker-compose logs -f backend
# Wait until you see "Server running on port 3000"
# Press Ctrl+C to exit logs
```

3. **Run database migrations**:
```bash
cd backend
npm install
npm run migrate
cd ..
```

4. **Create an admin user** (optional, for managing products):
```bash
cd backend
node -r dotenv/config scripts/create-admin.js
# Follow the prompts
cd ..
```

5. **Start the frontend**:
```bash
npm install
npm run dev
```

6. **Access the application**:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000

## Manual Setup (Without Docker)

### 1. Install Dependencies

**Required**:
- Node.js 20+
- PostgreSQL 16
- Redis 7

### 2. Setup PostgreSQL

```bash
# Create database
createdb groceryscout

# Or using psql
psql -U postgres
CREATE DATABASE groceryscout;
\q
```

### 3. Setup Redis

```bash
# Start Redis (macOS with Homebrew)
brew services start redis

# Or start manually
redis-server
```

### 4. Configure Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and update:
# - DATABASE_URL (your PostgreSQL connection string)
# - REDIS_URL (your Redis connection string)
# - JWT secrets (generate strong random strings)
nano .env
```

### 5. Run Migrations

```bash
npm run migrate
```

### 6. Create Admin User (Optional)

```bash
node -r dotenv/config scripts/create-admin.js
```

### 7. Start Backend

```bash
npm run dev
# Backend will run on http://localhost:3000
```

### 8. Configure Frontend

Open a new terminal:

```bash
# From project root
cp .env.example .env

# Install dependencies
npm install

# Update Gemini API key in src/services/geminiService.ts
# (Replace "your-gemini-api-key-here" with your actual key)
```

### 9. Start Frontend

```bash
npm run dev
# Frontend will run on http://localhost:8080
```

## Testing the Setup

### 1. Test Backend Health

```bash
curl http://localhost:3000/health
# Expected: {"status":"ok"}
```

### 2. Test Registration

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### 3. Test Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

### 4. Test Products Endpoint

```bash
curl http://localhost:3000/api/products
```

## Common Issues

### "Connection refused" errors

**Problem**: Backend can't connect to PostgreSQL or Redis

**Solution**:
1. Check if services are running:
   ```bash
   # PostgreSQL
   pg_isready
   
   # Redis
   redis-cli ping
   ```

2. Verify connection strings in `backend/.env`

### "Migration failed" errors

**Problem**: Database migrations can't run

**Solution**:
1. Ensure database exists:
   ```bash
   psql -U postgres -l | grep groceryscout
   ```

2. Check DATABASE_URL format:
   ```
   postgresql://username:password@host:port/database
   ```

3. Ensure PostgreSQL user has proper permissions

### "Port already in use" errors

**Problem**: Port 3000, 5432, or 6379 is already in use

**Solution**:
1. Change the port in configuration files
2. Or stop the conflicting service:
   ```bash
   # Find process using port
   lsof -i :3000
   
   # Kill process
   kill -9 <PID>
   ```

### Frontend shows "Network error"

**Problem**: Frontend can't connect to backend

**Solution**:
1. Verify backend is running on port 3000
2. Check VITE_API_BASE_URL in `.env`
3. Open browser console for detailed error messages

## Environment Variables Reference

### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:3000
```

### Backend (backend/.env)
```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/groceryscout

# Redis
REDIS_URL=redis://localhost:6379

# JWT (generate strong secrets for production!)
JWT_ACCESS_SECRET=your-super-secret-access-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# CORS
FRONTEND_URL=http://localhost:8080

# Cookies
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false  # Set to true in production with HTTPS
```

## Generating Strong JWT Secrets

```bash
# macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Production Deployment

For production deployment:

1. **Set strong JWT secrets**
2. **Enable HTTPS** and set `COOKIE_SECURE=true`
3. **Use managed database services** (e.g., AWS RDS, Heroku Postgres)
4. **Use managed Redis** (e.g., Redis Cloud, AWS ElastiCache)
5. **Set proper CORS origins**
6. **Enable rate limiting** (already configured in code)
7. **Use environment variable management** (e.g., AWS Secrets Manager)
8. **Set up monitoring and logging**
9. **Use a process manager** (e.g., PM2) for the backend

See `backend/README.md` for more production deployment details.

## Getting Help

If you encounter issues:

1. Check the logs:
   ```bash
   # Docker
   docker-compose logs -f
   
   # Backend (manual setup)
   cd backend && npm run dev
   
   # Frontend
   npm run dev
   ```

2. Verify all services are running:
   ```bash
   # Docker
   docker-compose ps
   
   # Manual
   pg_isready && redis-cli ping && echo "Services OK"
   ```

3. Check the API directly:
   ```bash
   curl http://localhost:3000/health
   curl http://localhost:3000/api/products
   ```

4. Review `BACKEND_API_SPEC.md` for API details
5. Review `backend/README.md` for backend-specific documentation
