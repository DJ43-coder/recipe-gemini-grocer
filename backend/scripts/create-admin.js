const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('\n🔐 Create Admin User\n');

    const email = await question('Admin email: ');
    const password = await question('Admin password (min 8 chars): ');
    const firstName = await question('First name (optional): ');
    const lastName = await question('Last name (optional): ');

    if (!email || !password || password.length < 8) {
      console.error('\n❌ Email and password (min 8 chars) are required');
      process.exit(1);
    }

    const client = await pool.connect();

    try {
      // Check if user exists
      const existing = await client.query('SELECT id FROM users WHERE email = $1', [email]);
      
      if (existing.rows.length > 0) {
        console.error('\n❌ User with this email already exists');
        process.exit(1);
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 12);

      // Create user
      const result = await client.query(
        'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id',
        [email, passwordHash, firstName || null, lastName || null]
      );

      const userId = result.rows[0].id;

      // Assign admin role
      await client.query(
        'INSERT INTO user_roles (user_id, role) VALUES ($1, $2)',
        [userId, 'admin']
      );

      console.log('\n✅ Admin user created successfully!');
      console.log(`   Email: ${email}`);
      console.log(`   User ID: ${userId}`);
      console.log('\nYou can now login with these credentials.\n');

    } finally {
      client.release();
    }
  } catch (error) {
    console.error('\n❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
    rl.close();
  }
}

createAdmin();
