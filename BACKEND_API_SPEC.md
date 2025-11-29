# Backend API Specification

This document outlines the API endpoints that your backend needs to implement for the GroceryScout frontend to work properly.

## Base URL
Configure via environment variable: `VITE_API_BASE_URL`

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**
```json
{
  "accessToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
```

**Set-Cookie Header:**
```
refreshToken=<JWT>; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

---

### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
```

**Set-Cookie Header:**
```
refreshToken=<JWT>; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

---

### POST /api/auth/refresh
Refresh access token using refresh token from cookie.

**Headers:**
```
Cookie: refreshToken=<JWT>
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGc..."
}
```

**Set-Cookie Header (rotated refresh token):**
```
refreshToken=<NEW_JWT>; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

---

### POST /api/auth/logout
Logout and invalidate session.

**Headers:**
```
Authorization: Bearer <accessToken>
Cookie: refreshToken=<JWT>
```

**Response (204 No Content)**

**Set-Cookie Header (clear cookie):**
```
refreshToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0
```

---

### GET /api/auth/me
Get current user information.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user"
}
```

---

## Product Endpoints

### GET /api/products
Get list of products with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search by product name
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)

**Response (200 OK):**
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Potato",
      "category": "Vegetables",
      "price": 18,
      "unit": "kg",
      "imageUrl": "https://cdn.example.com/products/potato.jpg",
      "popular": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "totalPages": 3
  }
}
```

---

### POST /api/products
Create a new product (Admin only).

**Headers:**
```
Authorization: Bearer <adminAccessToken>
```

**Request Body:**
```json
{
  "name": "Tomato",
  "category": "Vegetables",
  "price": 25,
  "unit": "kg",
  "imageUrl": "https://cdn.example.com/products/tomato.jpg",
  "popular": false
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "name": "Tomato",
  "category": "Vegetables",
  "price": 25,
  "unit": "kg",
  "imageUrl": "https://cdn.example.com/products/tomato.jpg",
  "popular": false
}
```

---

### PUT /api/products/:id
Update a product (Admin only).

**Headers:**
```
Authorization: Bearer <adminAccessToken>
```

**Request Body:**
```json
{
  "price": 30,
  "popular": true
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "name": "Tomato",
  "category": "Vegetables",
  "price": 30,
  "unit": "kg",
  "imageUrl": "https://cdn.example.com/products/tomato.jpg",
  "popular": true
}
```

---

### DELETE /api/products/:id
Delete a product (Admin only).

**Headers:**
```
Authorization: Bearer <adminAccessToken>
```

**Response (204 No Content)**

---

## Recipe Endpoints

### GET /api/recipes
Get user's saved recipes.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "recipes": [
    {
      "id": "uuid",
      "userId": "uuid",
      "name": "Aloo Jeera",
      "prepTime": "30 mins",
      "difficulty": "Easy",
      "servings": 4,
      "imageUrl": "https://images.unsplash.com/...",
      "ingredients": [
        {
          "name": "Potato",
          "quantity": "500g",
          "price": 18
        }
      ],
      "instructions": [
        "Step 1...",
        "Step 2..."
      ],
      "totalPrice": 85,
      "createdAt": "2025-11-29T10:00:00Z",
      "updatedAt": "2025-11-29T10:00:00Z"
    }
  ]
}
```

---

### POST /api/recipes
Save a new recipe.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request Body:**
```json
{
  "name": "Aloo Jeera",
  "prepTime": "30 mins",
  "difficulty": "Easy",
  "servings": 4,
  "imageUrl": "https://images.unsplash.com/...",
  "ingredients": [
    {
      "name": "Potato",
      "quantity": "500g",
      "price": 18
    }
  ],
  "instructions": [
    "Step 1...",
    "Step 2..."
  ],
  "totalPrice": 85
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "name": "Aloo Jeera",
  "prepTime": "30 mins",
  "difficulty": "Easy",
  "servings": 4,
  "imageUrl": "https://images.unsplash.com/...",
  "ingredients": [...],
  "instructions": [...],
  "totalPrice": 85,
  "createdAt": "2025-11-29T10:00:00Z",
  "updatedAt": "2025-11-29T10:00:00Z"
}
```

---

### PUT /api/recipes/:id
Update a recipe.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request Body:**
```json
{
  "servings": 6,
  "ingredients": [...]
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "name": "Aloo Jeera",
  "servings": 6,
  ...
}
```

---

### DELETE /api/recipes/:id
Delete a recipe.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (204 No Content)**

---

## Security Requirements

### JWT Tokens
- **Access Token**: Short-lived (15 minutes), returned in response body
- **Refresh Token**: Long-lived (7 days), stored in HttpOnly cookie
- Hash refresh tokens before storing in Redis
- Store JTI in Redis for revocation

### Cookie Configuration
```
Set-Cookie: refreshToken=<JWT>; 
  HttpOnly; 
  Secure; 
  SameSite=Strict; 
  Max-Age=604800; 
  Path=/api/auth
```

### CORS Configuration
Allow credentials and configure allowed origins properly:
```javascript
{
  origin: ['http://localhost:5173', 'https://yourdomain.com'],
  credentials: true
}
```

### Rate Limiting
- `/api/auth/login`: 5 requests per 15 minutes per IP
- `/api/auth/register`: 3 requests per hour per IP
- `/api/auth/refresh`: 10 requests per minute per user

### Input Validation
- Email: Valid email format, max 255 characters
- Password: Min 8 characters, max 128 characters
- Product names: Max 100 characters
- Sanitize all user inputs

---

## Error Response Format

All errors should follow this format:

```json
{
  "message": "Error description",
  "statusCode": 400,
  "errors": {
    "email": ["Invalid email format"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

Common status codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid credentials, expired token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 409: Conflict (e.g., email already exists)
- 429: Too Many Requests (rate limit exceeded)
- 500: Internal Server Error

---

## Redis Schema

### Session Storage
```
Key: session:{userId}:{sessionId}
Value: {
  userId: string,
  refreshTokenHash: string,
  createdAt: timestamp,
  expiresAt: timestamp
}
TTL: 7 days
```

### JTI Blacklist
```
Key: blacklist:{jti}
Value: "1"
TTL: Token expiry time
```

### Product Cache
```
Key: products:list:{category}:{page}
Value: JSON string of products array
TTL: 5 minutes
```

---

## Database Schema Requirements

### users table
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- first_name (VARCHAR, nullable)
- last_name (VARCHAR, nullable)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### user_roles table (for admin permissions)
- id (UUID, PK)
- user_id (UUID, FK)
- role (ENUM: 'admin', 'user')
- UNIQUE(user_id, role)

### products table
- id (UUID, PK)
- name (VARCHAR)
- category (VARCHAR)
- price (DECIMAL)
- unit (VARCHAR)
- image_url (TEXT)
- popular (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### recipes table
- id (UUID, PK)
- user_id (UUID, FK)
- name (VARCHAR)
- prep_time (VARCHAR)
- difficulty (VARCHAR)
- servings (INTEGER)
- image_url (TEXT)
- ingredients (JSONB)
- instructions (JSONB/TEXT ARRAY)
- total_price (DECIMAL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
