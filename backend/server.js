const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route for fetching APOD data
app.get('/apod', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
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
        console.error('Error fetching NEO data:', error.message);
        res.status(500).json({ error: 'Failed to fetch NEO data' });
    }
});

// Route for fetching EPIC data
app.get('/epic', async (req, res) => {
    try {
        const url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.NASA_API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching NEO data:', error.message);
        res.status(500).json({ error: 'Failed to fetch NEO data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})