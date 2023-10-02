const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const { authRoutes } = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to handle URL encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to parse cookies
app.use(cookieParser());

MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to the database.');
        throw err;
    }

    console.log('Connected to MongoDB.');
    const db = client.db(process.env.DB_NAME);
    app.use('/api', authRoutes(db));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
