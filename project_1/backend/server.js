const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

dotenv.config();

const corsOptions = {
  origin: process.env.CORS_HOST_URL, // Разрешить только фронтенду с таким URL
  methods: 'GET,POST,PUT,DELETE', // Разрешить определённые HTTP методы
  allowedHeaders: 'Content-Type,Authorization', // Разрешить определённые заголовки
};

app.use(cors(corsOptions));
app.use(express.json());


// API Routes
const gamesRoutes = require('./routes/games');
const categoriesRoutes = require('./routes/categories');
const authRotes = require('./routes/auth');

app.use('/games', gamesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/auth', authRotes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
