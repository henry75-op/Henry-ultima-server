const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let botState = {
  status: 'stopped',
  symbol: 'EURUSD',
  balance: 0,
  equity: 0,
  profit: 0,
  positions: [],
  serverOnline: true
};

// MT5 EA sends data here
app.post('/update', (req, res) => {
  botState = { ...botState, ...req.body };
  res.json({ success: true });
});

// Mobile app gets data here
app.get('/status', (req, res) => {
  res.json(botState);
});

// Mobile app sends commands here
app.post('/command', (req, res) => {
  const { action, symbol } = req.body;
  if (action) botState.status = action;
  if (symbol) botState.symbol = symbol;
  res.json({ success: true, state: botState });
});

app.get('/', (req, res) => {
  res.send('HenryULTIMA PRO Server is Online ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HenryULTIMA PRO Server running on port ${PORT}`);
});
