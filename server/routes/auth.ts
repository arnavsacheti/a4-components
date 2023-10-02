import express from 'express';
import jwt from 'jsonwebtoken';

export function authRoutes(db: any) {
    const router = express.Router();

    router.post('/login', async (req, res) => {
        console.log('Login request received for username:', req.body.username);

        const { username, password } = req.body;
        const usersCollection = db.collection(process.env.DB_USERS_COLLECTION);

        const user = await usersCollection.findOne({ username, password });

        if (user) {
            console.log('User authenticated successfully. Sending token.');

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
            res.cookie('token', token, { httpOnly: true });
            res.json({ success: true });
        } else {
            console.log('Invalid username or password for:', req.body.username);

            res.json({ success: false, message: 'Invalid username or password' });
        }
    });

    router.post('/register', async (req, res) => {
        console.log('Registration request received for username:', req.body.username);

        const { username, password } = req.body;
        const usersCollection = db.collection(process.env.DB_USERS_COLLECTION);

        const existingUser = await usersCollection.findOne({ username });

        if (existingUser) {
            console.log('Username already exists:', req.body.username);

            res.json({ success: false, message: 'Username already exists' });
        } else {
            console.log('Registering new user:', req.body.username);

            await usersCollection.insertOne({ username, password });
            res.json({ success: true });
        }
    });

    router.get('/check-auth', (req, res) => {
        console.log('Checking authentication for token:', req.cookies.token);

        const token = req.cookies.token;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
                if (err) {
                    console.log('Token verification failed:', err.message);
                    res.status(401).send('Not authenticated');
                } else {
                    console.log('Token verified successfully for user ID:', decoded.id);
                    res.status(200).send('Authenticated');
                }
            });
        } else {
            console.log('No authentication token found in cookies.');
            res.status(401).send('Not authenticated');
        }
    });

    return router;
}
