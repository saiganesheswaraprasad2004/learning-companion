const express = require('express');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Set up Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/generate', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = req.query.prompt || 'Tell me about AI';
    
    const result = await model.generateContent(prompt);
    res.json(result.response.text());
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating content');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
