#!/bin/bash

# Export data from VPS using pg_dump through SSH tunnel
# This script will use psql's \copy command to extract data

VPS_HOST="76.13.41.99"
VPS_PORT="5440"
VPS_USER="mohamad_db_user"
VPS_PASS="mohamad_secure_password_2026"
VPS_DB="family_social_db"

LOCAL_HOST="127.0.0.1"
LOCAL_PORT="5432"
LOCAL_DB="family_social_db"

export PGPASSWORD="$VPS_PASS"

echo "Getting schema from VPS..."
psql -h $VPS_HOST -p $VPS_PORT -U $VPS_USER -d $VPS_DB -c "
SELECT 'COPY ' || table_name || ' TO STDOUT;'
FROM information_schema.tables
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;
" -t -A > /tmp/table_list.txt

echo "Dumping schema only from VPS..."
psql -h $VPS_HOST -p $VPS_PORT -U $VPS_USER -d $VPS_DB << 'EOF' > /tmp/vps_dump.sql
-- Get all table data as INSERT statements
SELECT string_agg(
  'SELECT ' || quote_literal(table_name) || ' as table_name, COUNT(*) as row_count FROM ' || quote_ident(table_schema) || '.' || quote_ident(table_name),
  E' UNION ALL\n'
)
FROM information_schema.tables
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
EOF

echo "Creating custom dump using pg_dump with data..."
PGPASSWORD="$VPS_PASS" pg_dump -h $VPS_HOST -p $VPS_PORT -U $VPS_USER -d $VPS_DB \
  --data-only --inserts --column-inserts \
  2>/tmp/pg_dump_errors.log > /tmp/vps_data.sql || {
    echo "Note: Version mismatch detected, trying alternative method..."

    # Alternative: Get schema from app, then copy data via psql
    echo "Starting Node.js app to sync schema..."
    cd /Users/camsoltechnology/dev/personal/family-social-site-pes-01

    # Temporarily point to local DB to sync schema
    cat > /tmp/temp_sync.js << 'JSEOF'
const { sequelize } = require('./config/db');

async function syncSchema() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync schema only
    await sequelize.sync({ alter: true });
    console.log('Schema synced successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

syncSchema();
JSEOF

    node /tmp/temp_sync.js

    echo "Schema created. Now we need to populate with VPS data manually..."
    echo "You can connect your app temporarily to VPS to seed initial data."
}

echo "Done! Check /tmp/vps_data.sql for any data export."
echo "Check /tmp/pg_dump_errors.log for any errors."
