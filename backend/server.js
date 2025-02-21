const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing for incoming requests
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
res.json({
    "message": "Hello, use \"/apod\", \"/mars\" or \"/api/epic\" to get data"
  })
});

// Route for fetching APOD data 
app.get('/apod', async (req, res) => {
    // Optional parameter- Date, for fetching specific day's APOD image.
    const { date } = req.query;
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}${date?`&date=${date}`:''}`);
        res.json(response.data);
    } catch (error) {
        res.json({ error: 'Failed to fetch APOD data' })
    }
});

// Route for fetching Mars Rover data
app.get('/mars', async (req, res) => {
    try {
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.NASA_API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Mars-rover data:', error.message);
        res.status(500).json({ error: 'Failed to fetch Mars-Rover data' });
    }
});

// Route for fetching EPIC data
app.get('/api/epic', async (req, res) => {
    // Type parameter to determine image type (natural or enhanced)
    const { type = 'natural' } = req.query;
    try {
        const url = `https://api.nasa.gov/EPIC/api/${type}?api_key=${process.env.NASA_API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
      console.error('Error fetching EPIC data:', error);
      res.status(500).json({ error: 'Failed to fetch EPIC data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
module.exports = app;
