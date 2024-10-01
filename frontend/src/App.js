import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await axios.get('http://localhost:5000/generate', {
        params: { prompt },
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error generating content', error);
      setResponse('Error generating content');
    }
  };

  return (
    <div className="App">
      <h1>AI-Powered Learning Companion</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your learning prompt..."
      />
      <br />
      <button onClick={handleGenerate}>Generate AI Response</button>
      <h3>Response:</h3>
      <p>{response}</p>
    </div>
  );
}

export default App;
