// routes/categories.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middlewares/auth');

const prisma = new PrismaClient();
const router = express.Router();


// Получение категории по ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при загрузке категории' });
  }
});

  
// Получение всех категорий
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения категорий' });
  }
});

// Получение игр по категории
router.get('/:id/games', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
      const games = await prisma.game.findMany({
        where: { categoryId: parseInt(id) },
      });
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения игр по категории' });
    }
  });

  router.post('/', authenticateToken, async (req, res) => {
    const { name } = req.body;
    try {
      const category = await prisma.category.create({
        data: { name },
      });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка создания категории' });
    }
  });
  
  router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      const category = await prisma.category.update({
        where: { id: parseInt(id) },
        data: { name },
      });
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при обновлении категории' });
    }
  });
  
  router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
      const category = await prisma.category.delete({
        where: { id: parseInt(id) },
      });
  
      await prisma.game.deleteMany({
        where: {
          categoryId: parseInt(id),
        },
      });
  
      res.status(200).json({ message: 'Категория и связанные игры удалены' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка удаления категории' });
    }
  });
  

module.exports = router;
