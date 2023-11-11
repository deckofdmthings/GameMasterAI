require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const gameSessionRouter = require('./routes/gameSession');
const gameStateRoutes = require('./routes/gameState'); 

app.use(cors());

// Placed after the routes you don't want it to affect
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:8080' // Or whatever you set in the "proxy" attribute in your Vue app's package.json
}));

app.use('/api/game-session', gameSessionRouter);
app.use('/api/game-state', gameStateRoutes);

// Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Removed testUser endpoint
// app.get('/api/test', (req, res) => {
//     const testUser = { _id: '123456', email: 'test@example.com' };
//     res.json({ user: testUser });
// });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
