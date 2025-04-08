const mysql = require("mysql");

// Create a connection pool with more reliable settings
const pool = mysql.createPool({
    host: 'mysql-2aca9b8f-bhatiag417-663d.k.aivencloud.com',
    port: '15190',
    user: 'avnadmin',
    password: 'AVNS_zNcBYCpZkhXT2mtKeCG',
    database: 'sms_db',
    connectionLimit: 10,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
    waitForConnections: true,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to MySQL database:", err);
        return;
    }
    console.log("Connected to MySQL database");
    connection.release();
});

// Handle errors
pool.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.');
    }
});

module.exports = pool;