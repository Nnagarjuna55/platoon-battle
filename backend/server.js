const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { findWinningArrangement } = require('./logic');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/find-winner', (req, res) => {
    const { yourPlatoons, opponentPlatoons } = req.body;
    const result = findWinningArrangement(yourPlatoons, opponentPlatoons);
    res.json(result);
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
