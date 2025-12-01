
# GroceryScout

An AI-powered grocery shopping website that helps users discover recipes and ingredients.

## Mock Users

**Admin**: admin@groceryscout.com / admin123  
**Customer**: customer@groceryscout.com / customer123

## Features

- User Authentication & Persistent Sessions
- Shopping Cart (saved to database)
- Order Placement & History
- Admin Dashboard (product/order management)
- AI Recipe Assistant (Gemini)
- Browse & Search Products

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- Zustand for state management
- Gemini API for AI-powered recipe generation
- External backend API for data persistence

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose (for backend services)
- Or: PostgreSQL 16 and Redis 7 installed locally

### Installation

#### 1. Start Backend Services

Using Docker Compose (recommended):
```bash
# From project root
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379
- Backend API on port 3000

Wait for services to be healthy, then run migrations:
```bash
cd backend
npm install
npm run migrate
cd ..
```

#### 2. Start Frontend

```bash
# Install frontend dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env if needed (defaults to http://localhost:3000)

# Update Gemini API key in src/services/geminiService.ts
# Replace "your-gemini-api-key-here" with your actual key

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:8080`.

#### Alternative: Manual Backend Setup

If not using Docker, see `backend/README.md` for manual setup instructions.

## Backend Architecture

The backend is included in the `backend/` directory with:

- **Node.js + Express + TypeScript** server
- **PostgreSQL** for data persistence
- **Redis** for sessions and token management
- **JWT authentication** with rotating refresh tokens
- **Rate limiting** and security middleware

### Backend Structure
```
backend/
├── src/
│   ├── config/          # Database and Redis configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth and validation middleware
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic (sessions, tokens)
│   ├── utils/           # JWT and password utilities
│   └── server.ts        # Express app entry point
├── migrations/          # Database migrations
├── package.json
└── tsconfig.json
```

### API Endpoints

**Authentication**:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/refresh` - Refresh access token (automatic)
- `POST /api/auth/logout` - Logout and invalidate session
- `GET /api/auth/me` - Get current authenticated user

**Products**:
- `GET /api/products` - List all products (public)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

**Recipes**:
- `GET /api/recipes` - Get user's saved recipes
- `POST /api/recipes` - Save new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

See `backend/README.md` for detailed documentation.

## Project Structure

```
src/
├── components/        # React components
│   ├── auth/         # Login and registration forms
│   ├── ui/           # Shadcn UI components
│   └── ...           # Other components
├── config/           # Configuration files
│   └── api.ts        # API endpoints configuration
├── data/             # Static data (will be replaced by API)
│   └── products.ts   # Product data
├── hooks/            # Custom React hooks
│   ├── useAuth.tsx   # Authentication hook
│   └── ...
├── pages/            # Page components
│   ├── Auth.tsx      # Login/Register page
│   ├── Index.tsx     # Main shopping page
│   ├── RecipesPage.tsx  # Saved recipes
│   └── ...
├── services/         # API services
│   ├── apiClient.ts  # HTTP client with auto-refresh
│   ├── authService.ts   # Authentication service
│   └── geminiService.ts # AI recipe generation
├── store/            # Zustand state management
│   ├── cartStore.ts  # Shopping cart state
│   └── productStore.ts  # Product filtering state
└── App.tsx          # Main app component
```

## AI Recipe Assistant

The application features an AI-powered recipe assistant that can generate recipes based on user input. The recipe assistant can:

- Generate recipes based on dish name and number of servings
- Display ingredients with quantities and prices matched to product database
- Provide step-by-step cooking instructions
- Allow adding all ingredients to the shopping cart
- Save recipes to your account (requires backend API)

**Note**: The Gemini API key in `src/services/geminiService.ts` needs to be updated with your own key.

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:3000
```

### Backend (backend/.env)
See `backend/.env.example` for all backend environment variables including database URLs, JWT secrets, and cookie configuration.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Authentication Flow

1. User registers/logs in via `/auth` page
2. Backend returns access token (15 min) and sets refresh token cookie (7 days)
3. Access token stored in memory, used for API requests
4. When access token expires, automatically refresh using refresh token
5. On logout, both tokens are invalidated on backend

## Security Features

- HttpOnly cookies for refresh tokens
- Automatic token refresh on expiry
- Protected routes requiring authentication
- Input validation on forms
- Secure password requirements (min 8 characters)

## API Integration

All API calls go through `src/services/apiClient.ts` which handles:
- Automatic bearer token injection
- Token refresh on 401 errors
- Cookie-based refresh token management
- Error handling and network errors

## License

This project is licensed under the MIT License.
