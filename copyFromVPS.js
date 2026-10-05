const { Sequelize } = require('sequelize');

// VPS Database Connection
const vpsDB = new Sequelize(
  'family_social_db',
  'mohamad_db_user',
  'mohamad_secure_password_2026',
  {
    host: '76.13.41.99',
    port: 5440,
    dialect: 'postgres',
    logging: false
  }
);

// Local Database Connection
const localDB = new Sequelize(
  'family_social_db',
  process.env.USER || '',
  '',
  {
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  }
);

async function copyDatabase() {
  try {
    console.log('Connecting to VPS database...');
    await vpsDB.authenticate();
    console.log('✓ Connected to VPS database');

    console.log('Connecting to local database...');
    await localDB.authenticate();
    console.log('✓ Connected to local database');

    // Get list of all tables from VPS
    const [vpsTablesList] = await vpsDB.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log(`\nFound ${vpsTablesList.length} tables in VPS database\n`);

    for (const { table_name } of vpsTablesList) {
      try {
        console.log(`Syncing table: ${table_name}...`);

        // Get data from VPS
        const [rows] = await vpsDB.query(`SELECT * FROM "${table_name}"`);

        if (rows.length === 0) {
          console.log(`  ⊘ No data in ${table_name}`);
          continue;
        }

        // Clear local table (check if it exists first)
        try {
          await localDB.query(`TRUNCATE TABLE "${table_name}" CASCADE`);
        } catch (e) {
          console.log(`  ⚠ Table ${table_name} doesn't exist locally, skipping...`);
          continue;
        }

        // Get column names from first row
        const columns = Object.keys(rows[0]);
        const columnList = columns.map(c => `"${c}"`).join(', ');

        // Insert data in batches
        const batchSize = 50;
        for (let i = 0; i < rows.length; i += batchSize) {
          const batch = rows.slice(i, i + batchSize);

          const values = batch.map(row => {
            const vals = columns.map(col => {
              const val = row[col];
              if (val === null) return 'NULL';
              if (typeof val === 'boolean') return val ? 'true' : 'false';
              if (typeof val === 'number') return val;
              if (Array.isArray(val)) {
                if (val.length === 0) return 'ARRAY[]::text[]';
                return `ARRAY[${val.map(v => `'${String(v).replace(/'/g, "''")}'`).join(',')}]`;
              }
              if (val instanceof Date) return `'${val.toISOString()}'`;
              // Escape single quotes and backslashes
              const escaped = String(val).replace(/\\/g, '\\\\').replace(/'/g, "''");
              return `'${escaped}'`;
            }).join(', ');
            return `(${vals})`;
          }).join(',\n    ');

          const insertQuery = `
            INSERT INTO "${table_name}" (${columnList})
            VALUES ${values}
            ON CONFLICT DO NOTHING;
          `;

          try {
            await localDB.query(insertQuery);
          } catch (error) {
            console.log(`  ⚠ Error inserting batch: ${error.message}`);
            // Try inserting rows one by one
            for (const row of batch) {
              try {
                const singleValues = columns.map(col => {
                  const val = row[col];
                  if (val === null) return 'NULL';
                  if (typeof val === 'boolean') return val ? 'true' : 'false';
                  if (typeof val === 'number') return val;
                  if (Array.isArray(val)) {
                    if (val.length === 0) return 'ARRAY[]::text[]';
                    return `ARRAY[${val.map(v => `'${String(v).replace(/'/g, "''")}'`).join(',')}]`;
                  }
                  if (val instanceof Date) return `'${val.toISOString()}'`;
                  const escaped = String(val).replace(/\\/g, '\\\\').replace(/'/g, "''");
                  return `'${escaped}'`;
                }).join(', ');

                await localDB.query(`
                  INSERT INTO "${table_name}" (${columnList})
                  VALUES (${singleValues})
                  ON CONFLICT DO NOTHING;
                `);
              } catch (e) {
                console.log(`    ✗ Skipped one row: ${e.message}`);
              }
            }
          }
        }

        console.log(`  ✓ Synced ${rows.length} rows from ${table_name}`);
      } catch (error) {
        console.log(`  ✗ Error syncing ${table_name}:`, error.message);
      }
    }

    console.log('\n✓ Database copy complete!');

    await vpsDB.close();
    await localDB.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

copyDatabase();
