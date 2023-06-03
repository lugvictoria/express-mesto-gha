const express = require('express');
const {
  getAllCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const router = express.Router();

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;
