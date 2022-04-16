const express     = require('express');
const router      = express.Router();
const checkOrigin = require('../middleware/origin');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/users');
const { getUsers, getUser, signup, signin, editUser, deleteUser } = require('../controllers/mysql/authorization');

router.get('/', getItems);
router.get(      '/get', signin);
router.get(   '/:id', getItem)
router.get('/:Rfrnc', getItem);

router.get('/profile/:id', getUser);

router.post('/', createItem);
router.post('/register', signup);
router.post('/login', signin);

router.patch(   '/:id', updateItem);
router.patch('/:Rfrnc', updateItem);

router.delete(   '/:id', deleteItem);
router.delete('/:Rfrnc', deleteItem);

module.exports = router;