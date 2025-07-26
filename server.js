const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/leaderboard', (req, res) => {
  db.all('SELECT username, score FROM leaderboard ORDER BY score DESC LIMIT 10', [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

app.post('/score', (req, res) => {
  const { username, score } = req.body;
  if (!username || !score) return res.status(400).json({error: "No username or score"});
  db.run('INSERT INTO leaderboard (username, score) VALUES (?, ?)', [username, score], function(err) {
    if (err) return res.status(500).json({error: err.message});
    res.json({success: true});
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});