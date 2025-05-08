const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors({
    origin: "*",
}));
app.use(express.json());

const DATA_FILE = 'location.json';

app.use((req, res, next)=>{
    console.log(req.url);
    next()
})



// Receive GPS data from Arduino
app.post('/update-location', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log("Received data from Arduino:");
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    if (!latitude || !longitude) return res.status(400).send('Invalid data');

    const data = { latitude, longitude, timestamp: new Date().toISOString() };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data));
    res.send({ status: 'success' });
});

// Serve the latest GPS location
app.get('/get-location', (req, res) => {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE);
        res.json(JSON.parse(data));
    } else {
        res.json({ latitude: null, longitude: null });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
