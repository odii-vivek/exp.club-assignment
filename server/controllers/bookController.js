const Book = require('../models/Book'); // Adjust the path as needed
const User = require('../models/User');
// Create a new book with an optional image

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, userId } = req.body;
    const image = req.file ? req.file.filename : null;

    // Create a new book instance
    const newBook = new Book({
      title,
      author,
      genre,
      owner: userId,
      image,
    });

    // Save the new book to the database
    const savedBook = await newBook.save();

    // Update the user's document by adding the new book's ID to the books array
    await User.findByIdAndUpdate(
      userId,
      { $push: { books: savedBook._id } },
      { new: true } // Return the updated document
    );

    res.status(201).json({ msg: 'Book listed successfully', book: savedBook });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ msg: 'Server error', error });
  }
};


// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('owner', 'name'); // Populate owner with user name
    // console.log(books);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'name');
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const image = req.file ? req.file.path : null;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, image },
      { new: true } // Return the updated document
    );

    if (!updatedBook) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(200).json({ msg: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

exports.getBooksByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID and populate their books with all fields
    const user = await User.findById(userId).populate('books');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if the user has any books
    if (!user.books || user.books.length === 0) {
      return res.status(200).json([]); // Return an empty array with a 200 status code
    }

    // Send the populated books as the response
    res.status(200).json(user.books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error', error });
  }
};



