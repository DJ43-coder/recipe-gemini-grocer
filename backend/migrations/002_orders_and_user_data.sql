-- Migration: Add orders, order_items, saved_recipes, and user_carts tables
-- Also add mock admin and customer users

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  delivery_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Saved recipes table (user's saved recipes for later)
CREATE TABLE IF NOT EXISTS saved_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

CREATE INDEX idx_saved_recipes_user_id ON saved_recipes(user_id);

-- User carts table (persist cart items)
CREATE TABLE IF NOT EXISTS user_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE INDEX idx_user_carts_user_id ON user_carts(user_id);

-- Insert mock admin user (password: admin123)
-- Hashed with bcrypt (10 rounds): admin123
INSERT INTO users (id, email, password_hash, first_name, last_name)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@groceryscout.com',
  '$2b$10$rKGZYvRS5z.cIm0qV5w4huNzYXVfF8P8mXqE8qYvF5xGqJh5qYH2S',
  'Admin',
  'User'
) ON CONFLICT (email) DO NOTHING;

-- Assign admin role
INSERT INTO user_roles (user_id, role)
VALUES ('11111111-1111-1111-1111-111111111111', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Insert mock customer user (password: customer123)
-- Hashed with bcrypt (10 rounds): customer123
INSERT INTO users (id, email, password_hash, first_name, last_name)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'customer@groceryscout.com',
  '$2b$10$8Zj8YvRS5z.cIm0qV5w4huNzYXVfF8P8mXqE8qYvF5xGqJh5qYH3T',
  'John',
  'Customer'
) ON CONFLICT (email) DO NOTHING;

-- Assign customer/user role
INSERT INTO user_roles (user_id, role)
VALUES ('22222222-2222-2222-2222-222222222222', 'user')
ON CONFLICT (user_id, role) DO NOTHING;

-- Add some sample saved recipes for the customer
INSERT INTO recipes (id, user_id, title, ingredients, instructions, image_url)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  'Vegetable Curry',
  '["Tomatoes", "Onions", "Potatoes", "Curry Powder", "Coconut Milk"]',
  'Sauté onions, add vegetables and curry powder, simmer with coconut milk.',
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd'
) ON CONFLICT DO NOTHING;
