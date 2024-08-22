const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Adjust the path as needed
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController'); // Adjust the path as needed

// Middleware for user authentication
const authMiddleware = require('../middleware/auth'); // Adjust the path as needed

// Routes for book management
router.get('/', getBooks);
router.post('/create', authMiddleware, upload.single('image'), createBook);
router.get('/:id', getBookById);
router.put('/:id', authMiddleware, upload.single('image'), updateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
