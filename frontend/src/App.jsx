import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [yourInput, setYourInput] = useState('');
  const [opponentInput, setOpponentInput] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/find-winner', {
        yourPlatoons: yourInput,
        opponentPlatoons: opponentInput,
      });
      setResult(res.data.result);
    } catch (error) {
      setResult('Error occurred');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Platoon Battle Simulator</h1>

      <label>Your Platoons:</label>
      <textarea
        rows={3}
        value={yourInput}
        onChange={(e) => setYourInput(e.target.value)}
        placeholder="e.g. Spearmen#10;Militia#30;..."
        style={{ width: '100%', marginBottom: 10 }}
      />

      <label>Opponent Platoons:</label>
      <textarea
        rows={3}
        value={opponentInput}
        onChange={(e) => setOpponentInput(e.target.value)}
        placeholder="e.g. Militia#10;Spearmen#10;..."
        style={{ width: '100%', marginBottom: 10 }}
      />

      <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>
        Find Winning Arrangement
      </button>

      <div style={{ marginTop: 20 }}>
        <strong>Result:</strong>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default App;
