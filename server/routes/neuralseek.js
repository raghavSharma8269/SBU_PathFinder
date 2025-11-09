const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config();


router.post('/', async (req, res) => {
  try {
    // Get dynamic prompt and variables from frontend
    const { prompt, variables } = req.body;

    // Construct the body for Maistro endpoint
    const requestBody = {
      prompt: prompt,
      variables: variables || {}
    };

    // Call NeuralSeek
    const response = await axios.post(process.env.NEURALSEEK_URL, requestBody, {
      headers: {
        'Authorization': `Bearer ${process.env.NEURALSEEK_API_KEY}}`,
        'Content-Type': 'application/json'
      }
    });

    // Return JSON from NeuralSeek directly
    res.status(200).json(response.data);
  } catch (err) {
    console.error('NeuralSeek request error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch response from NeuralSeek.' });
  }
});

module.exports = router;
