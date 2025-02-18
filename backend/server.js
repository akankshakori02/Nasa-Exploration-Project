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
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});