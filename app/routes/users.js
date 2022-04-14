const express     = require('express');
const router      = express.Router();
const checkOrigin = require('../middleware/origin');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/users');

router.get(      '/', checkOrigin, getItems);
router.get(   '/:id', checkOrigin, getItem)
router.get('/:Rfrnc', checkOrigin, getItem);

router.post('/', checkOrigin, createItem);

router.patch(   '/:id', checkOrigin, updateItem);
router.patch('/:Rfrnc', checkOrigin, updateItem);

router.delete(   '/:id', checkOrigin, deleteItem);
router.delete('/:Rfrnc', checkOrigin, deleteItem);

module.exports = router;