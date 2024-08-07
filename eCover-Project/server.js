import express from'express';
import connectDB from './config/db.js';
import cors from'cors'

const app = express();

import bodyParser from 'body-parser';
import routerUser from './routes/api/users.js';
import routerAuth from './routes/api/auth.js';
import routerPosts from './routes/api/posts.js';
import routerProfile from './routes/api/profile.js';
import routerPSD from './routes/api/ag_psd.js';
import dotenv from 'dotenv';
dotenv.config();

// Parse URL-encoded request body
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// Parse JSON bodies
app.use(bodyParser.json({ limit: '500mb' }));

app.use(cors({
    origin: [
        'https://atomicecovers.com',
        'http://localhost:3000',
    ], // Allow requests from this origin only
    methods: "*", // Allow specific HTTP methods
    allowedHeaders: "*", // Allow specific headers
  }));


// Connect Database
connectDB();

// Init Middleware
app.use(express.json ({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', routerUser);
app.use('/api/auth', routerAuth);
app.use('/api/profile', routerProfile);
app.use('/api/posts', routerPosts);

app.use('/api/ag-psd', routerPSD);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port " , PORT));
