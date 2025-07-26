const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./leaderboard.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    score INTEGER
  )`);
});

module.exports = db;