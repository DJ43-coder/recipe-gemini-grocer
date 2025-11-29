
# GroceryScout

An AI-powered grocery shopping website that helps users discover recipes and ingredients.

## Features

- Browse grocery products by category
- Search functionality for finding specific products
- AI-powered recipe assistant (powered by Gemini)
- Shopping cart functionality
- User authentication with JWT tokens
- Responsive design for all device sizes
- Recipe saving capabilities

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- Zustand for state management
- Gemini API for AI-powered recipe generation
- External backend API for data persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A running backend API (see BACKEND_API_SPEC.md)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd grocery-scout
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:
```
VITE_API_BASE_URL=http://localhost:3000
```

4. Update the Gemini API key in `src/services/geminiService.ts`

5. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Backend API Setup

This frontend requires a backend API to handle:
- User authentication (login/register/logout)
- Product data management
- Recipe storage
- Session management with Redis

See `BACKEND_API_SPEC.md` for complete API specification including:
- All required endpoints
- Request/response formats
- Authentication flow with JWT + refresh tokens
- Security requirements
- Database schema
- Redis configuration

### Key Backend Requirements

1. **Authentication**
   - JWT-based with short-lived access tokens (15 min)
   - Long-lived refresh tokens (7 days) in HttpOnly cookies
   - Redis for session storage and token revocation

2. **Security**
   - HTTPS in production
   - CORS configured for frontend origin
   - Rate limiting on auth endpoints
   - Input validation and sanitization

3. **Database**
   - PostgreSQL with users, user_roles, products, recipes tables
   - See BACKEND_API_SPEC.md for full schema

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

```bash
# Backend API URL
VITE_API_BASE_URL=http://localhost:3000
```

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
