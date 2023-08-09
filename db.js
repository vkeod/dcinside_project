const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: 'db.teamlog.kr',
  user: 'psj',
  password: '10307',
  database: 'psj'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + db.threadId);
});

module.exports = db;
