import { useEffect, useState } from 'react';
import { fetchBooks } from '../../api/api';
import BookListing from '../components/BookListing';
import { Link } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);

        // Extract unique authors and genres
        const uniqueAuthors = [...new Set(data.map((book) => book.author))];
        const uniqueGenres = [...new Set(data.map((book) => book.genre))];
        setAuthors(uniqueAuthors);
        setGenres(uniqueGenres);

        // Initially display all books
        setFilteredBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBooks();
  }, []);

  useEffect(() => {
    // Filter books based on selected author and genre
    let filtered = books;

    if (selectedAuthor) {
      filtered = filtered.filter((book) => book.author === selectedAuthor);
    }

    if (selectedGenre) {
      filtered = filtered.filter((book) => book.genre === selectedGenre);
    }

    setFilteredBooks(filtered);
  }, [selectedAuthor, selectedGenre, books]);

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Discover Your Next <span className='text-slate-500'>Great Read</span>
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Find a wide range of books that match your interests.
        </div>
        <Link
          to={'/book/create'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Add a New Book
        </Link>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        <div className='flex gap-4'>
          {/* Author Filter */}
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className='border p-2 rounded'
          >
            <option value=''>All Authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          {/* Genre Filter */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className='border p-2 rounded'
          >
            <option value=''>All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {filteredBooks && filteredBooks.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Book Listings:</h2>
            </div>
            <div className='flex flex-wrap gap-4'>
              {filteredBooks.map((book) => (
                <BookListing book={book} key={book._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
