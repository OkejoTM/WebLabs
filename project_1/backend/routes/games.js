const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middlewares/auth');

const prisma = new PrismaClient();
const router = express.Router();

// Получение игры
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const game = await prisma.game.findUnique({
      where: { id: parseInt(id) },
    });
    if (!game) {
      return res.status(404).json({ error: 'Игра не найдена' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при загрузке игры' });
  }
});

// Создание игры
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, price, bought, genres, categoryId } = req.body;
  try {
    const game = await prisma.game.create({
      data: {
        title,
        description,
        price,
        bought,
        genres,
        categoryId,
      },
    });
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка создания игры' });
  }
});

// Редактирование игры
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, price, bought, genres, categoryId } = req.body;

  try {
    const game = await prisma.game.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        price,
        bought,
        genres,
        categoryId,
      },
    });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении игры' });
  }
});

// Удаление игры
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.game.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Игра удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления игры' });
  }
});

module.exports = router;
