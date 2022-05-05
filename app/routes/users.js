const express     = require('express');
const router      = express.Router();
const checkOrigin = require('../middleware/origin');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/users');
const { upload, helperImg } = require('../utils/storage');

router.get(      '/', checkOrigin, getItems);
router.get(   '/:id', checkOrigin, getItem)
router.get('/:Rfrnc', checkOrigin, getItem);

router.post('/', checkOrigin, createItem);
router.post('/upload', upload.single('file'), (req, res) => {
    helperImg(req.file.path,  `micro-resize-${req.file.filename}`, 20);
    helperImg(req.file.path,  `small-resize-${req.file.filename}`, 100);
    helperImg(req.file.path, `medium-resize-${req.file.filename}`, 500);
    helperImg(req.file.path, ` large-resize-${req.file.filename}`, 1000);
    res.send({ data: 'Image upload successful!!' });
});

router.patch(   '/:id', checkOrigin, updateItem);
router.patch('/:Rfrnc', checkOrigin, updateItem);

router.delete(   '/:id', checkOrigin, deleteItem);
router.delete('/:Rfrnc', checkOrigin, deleteItem);

module.exports = router;