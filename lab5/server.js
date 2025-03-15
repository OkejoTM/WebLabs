const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

dotenv.config();

app.use(cors());
app.use(express.json());

// API Routes
const gamesRoutes = require('./routes/games');
const categoriesRoutes = require('./routes/categories');
const authRotes = require('./routes/auth');
const authenticateToken = require("./middlewares/auth");

app.use('/api/games', gamesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/auth', authRotes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
