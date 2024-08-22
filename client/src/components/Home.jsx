import { useEffect, useState } from 'react';
import { fetchBooks } from '../../api/api';
import BookListing from '../components/BookListing';
import { Link } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log(books);
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBooks();
  }, []);

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
        {books && books.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Books</h2>
            </div>
            <div className='flex flex-wrap gap-4'>
              {books.map((book) => (
                <BookListing book={book} key={book._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
