//packages
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

/* Routes */
import { app, server } from './socket/socket.js';
import authRoutes from './routes/authRoute.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

/* utils */
import connectToDB from './config/db.js';

/* Database */
dotenv.config();
connectToDB();

const port = process.env.PORT || 5001;

const __dirname = path.resolve();

/* Middlewares */
app.use(express.json());
app.use(cookieParser());

/* Routes */
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

/* Static files */
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
