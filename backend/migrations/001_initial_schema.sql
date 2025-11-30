-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enum for roles
CREATE TYPE app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url TEXT,
    description TEXT,
    unit VARCHAR(20) DEFAULT 'ea',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    ingredients JSONB NOT NULL,
    instructions TEXT,
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_recipes_user_id ON recipes(user_id);

-- Insert sample products
INSERT INTO products (name, price, category, image_url, description, unit) VALUES
('Organic Bananas', 0.79, 'Fruits', '/lovable-uploads/e39d7000-4aea-4e2e-a7df-f30d3d6f0355.png', 'Fresh organic bananas', 'lb'),
('Whole Milk', 3.99, 'Dairy', '/lovable-uploads/01d45f20-f168-4a58-83d7-ffda01cc1c20.png', 'Fresh whole milk', 'gal'),
('Sourdough Bread', 4.49, 'Bakery', '/lovable-uploads/e7562586-56fb-4b70-9798-6b4859961b89.png', 'Artisan sourdough bread', 'loaf'),
('Free Range Eggs', 5.99, 'Dairy', '/lovable-uploads/15cfd47f-7a06-4c0f-b47f-a9d6ace8f0de.png', 'Farm fresh eggs', 'dozen'),
('Organic Carrots', 2.49, 'Vegetables', '/lovable-uploads/e2372449-59c9-4c1f-a292-15da93e1f45f.png', 'Fresh organic carrots', 'lb'),
('Chicken Breast', 8.99, 'Meat', '/lovable-uploads/f80a3b4d-e2fc-4cee-9902-c07fa513aadf.png', 'Boneless skinless chicken breast', 'lb')
ON CONFLICT DO NOTHING;
