import { Link } from 'react-router-dom';
import { server } from '../constants/config';

const BookListing = ({ book }) => {
  // Construct the image URL
  const imageUrl = book.image
    ? `${server}/uploads/${book.image}`
    : 'https://via.placeholder.com/330x220?text=No+Image';

  return (
    <div className='bg-white shadow-md hover:shadow-lg overflow-hidden transition-shadow rounded-lg w-full sm:w-[330px]'>
      <Link to={`/book/${book._id}`}>
        <img
          src={imageUrl}
          alt='book cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {book.title}
          </p>
          <p className='text-sm text-gray-600 truncate w-full'>
            {book.author}
          </p>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {book.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            Genre: {book.genre}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BookListing;
