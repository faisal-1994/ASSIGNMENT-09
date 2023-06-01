const express = require('express');
const router = express.Router();
const Book = require('./book');

// GET /books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /books/:id
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /books
router.post('/books', async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;
    const book = new Book({ title, author, description, publishedYear });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /books/:id
router.put('/books/:id', async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, publishedYear },
      { new: true }
    );
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /books/:id
router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
