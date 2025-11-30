# GroceryScout Backend

Backend API for GroceryScout built with Node.js, Express, TypeScript, PostgreSQL, and Redis.

## Features

- JWT-based authentication with rotating refresh tokens
- User registration and login
- Product management (CRUD operations)
- Recipe management per user
- Redis session storage and token management
- Rate limiting on auth endpoints
- Role-based access control (admin/user)

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 16
- **Cache/Sessions**: Redis 7
- **Authentication**: JWT with HttpOnly cookies

## Getting Started

### Prerequisites

- Node.js 20+
- Docker and Docker Compose (recommended)
- Or: PostgreSQL 16 and Redis 7 installed locally

### Installation

1. **Install dependencies**:
```bash
cd backend
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
```

Edit `.env` and update the values (especially JWT secrets in production).

3. **Start infrastructure with Docker**:
```bash
# From project root
docker-compose up -d postgres redis
```

4. **Run database migrations**:
```bash
npm run migrate
```

5. **Start the development server**:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

### Running with Docker Compose

To run the entire stack (backend + postgres + redis):

```bash
# From project root
docker-compose up
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get tokens
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout and invalidate tokens
- `GET /api/auth/me` - Get current user (requires auth)

### Products

- `GET /api/products` - List products (public)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Recipes

- `GET /api/recipes` - Get user's recipes (requires auth)
- `POST /api/recipes` - Save new recipe (requires auth)
- `PUT /api/recipes/:id` - Update recipe (requires auth)
- `DELETE /api/recipes/:id` - Delete recipe (requires auth)

## Database Schema

### Users Table
- `id` (UUID, primary key)
- `email` (unique)
- `password_hash`
- `first_name`, `last_name`
- `created_at`, `updated_at`

### User Roles Table
- `id` (UUID, primary key)
- `user_id` (foreign key to users)
- `role` (enum: 'admin', 'user')

### Products Table
- `id` (UUID, primary key)
- `name`, `price`, `category`
- `image_url`, `description`, `unit`
- `created_at`, `updated_at`

### Recipes Table
- `id` (UUID, primary key)
- `user_id` (foreign key to users)
- `title`, `ingredients` (JSONB), `instructions`
- `total_price`
- `created_at`, `updated_at`

## Security Features

- Passwords hashed with bcrypt (12 rounds)
- JWT access tokens (15min expiry)
- JWT refresh tokens (7 days expiry) stored as HttpOnly cookies
- Refresh token rotation on every refresh
- Token hashing before Redis storage
- JTI blacklist for revoked tokens
- Rate limiting on auth endpoints
- CORS configured for frontend origin
- Helmet.js security headers

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run migrate` - Run database migrations

## Environment Variables

See `.env.example` for all required environment variables.

## Testing

Example curl commands:

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","firstName":"John","lastName":"Doe"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:3000/api/products
```

### Get Current User
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Production Deployment

1. Set strong JWT secrets in environment variables
2. Enable `COOKIE_SECURE=true` for HTTPS
3. Configure proper `COOKIE_DOMAIN`
4. Use managed PostgreSQL and Redis services
5. Set up SSL/TLS certificates
6. Configure rate limiting appropriately
7. Set up monitoring and logging
8. Use a process manager like PM2

## License

MIT
