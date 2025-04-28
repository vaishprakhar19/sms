const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runSqlFile(filePath) {
  const connection = await mysql.createConnection({
    host: 'mysql-2aca9b8f-bhatiag417-663d.k.aivencloud.com',
    port: '15190',
    user: 'avnadmin',
    password: 'AVNS_zNcBYCpZkhXT2mtKeCG',
    database: 'sms_db'
  });

  try {
    console.log(`Running SQL file: ${filePath}`);
    const sql = fs.readFileSync(filePath, 'utf8');
    
    // Split the SQL file into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
        console.log('Executed statement successfully');
      }
    }
    
    console.log(`Successfully executed ${filePath}`);
  } catch (error) {
    console.error(`Error executing ${filePath}:`, error);
  } finally {
    await connection.end();
  }
}

async function main() {
  // First run the drop_tables.sql
  await runSqlFile(path.join(__dirname, 'src', 'db', 'drop_tables.sql'));
  
  // Then run the schema.sql
  await runSqlFile(path.join(__dirname, 'src', 'db', 'schema.sql'));
}

main().catch(console.error); 