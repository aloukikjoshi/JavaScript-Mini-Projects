const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Your Spoonacular API key (set this in .env file as SPOONACULAR_API_KEY)
const API_KEY = process.env.SPOONACULAR_API_KEY || 'your-api-key-here';
const BASE_URL = 'https://api.spoonacular.com/recipes';

// Route to search recipes with filters
app.get('/api/recipes/search', async (req, res) => {
  try {
    const { 
      query = '', 
      diet = '', 
      intolerances = '', 
      number = 12,
      offset = 0 
    } = req.query;

    const params = {
      apiKey: API_KEY,
      query,
      number: parseInt(number),
      offset: parseInt(offset),
      addRecipeInformation: true,
      fillIngredients: true
    };

    // Add diet filter if specified
    if (diet) {
      params.diet = diet;
    }

    // Add intolerances filter if specified
    if (intolerances) {
      params.intolerances = intolerances;
    }

    const response = await axios.get(`${BASE_URL}/complexSearch`, { params });
    
    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Search recipes error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recipes',
      error: error.response?.data || error.message
    });
  }
});

// Route to get detailed recipe information
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: false
      }
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Get recipe details error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recipe details',
      error: error.response?.data || error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Recipe Finder API is running!',
    timestamp: new Date().toISOString()
  });
});

// Serve the main HTML file for all other routes (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Recipe Finder running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});