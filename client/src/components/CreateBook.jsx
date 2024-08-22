import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../../api/api';

const genresList = [
  'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 
  'Mystery', 'Biography', 'Romance', 'Thriller', 
  'Historical', 'Self-Help', 'Poetry'
];

const BookListing = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState(genresList[0]);
  const [customGenre, setCustomGenre] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomGenre, setIsCustomGenre] = useState(false);
  const navigate = useNavigate();

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    if (selectedGenre === 'Custom Genre') {
      setIsCustomGenre(true);
      setGenre('');
    } else {
      setIsCustomGenre(false);
      setGenre(selectedGenre);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalGenre = isCustomGenre ? customGenre : genre;
    const userId = JSON.parse(localStorage.getItem('user'))?.id; // Extract userId from local storage

    if (!userId || title.trim() === '' || author.trim() === '' || finalGenre.trim() === '') {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', finalGenre);
    formData.append('userId', userId); // Add userId to form data
    if (image) {
      formData.append('image', image);
    }

    try {
      await createBook(formData);
      navigate('/');
    } catch (err) {
      const errMsg = err.response?.data?.msg || 'An error occurred. Please try again.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl w-full md:w-1/2">
        <div className="w-full px-5">
          <h2 className="text-2xl font-bold text-slate-700">List a New Book</h2>
          <p className="text-sm mt-4 text-slate-700">Fill in the details to list your book</p>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-gray-400">
                Book Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Book Title"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-emerald-500 focus:bg-white focus:outline-none"
                autoFocus
                required
                disabled={isLoading}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="author" className="block text-gray-700">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter Author's Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-emerald-500 focus:bg-white focus:outline-none"
                required
                disabled={isLoading}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="genre" className="block text-gray-700">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={isCustomGenre ? 'Custom Genre' : genre}
                onChange={handleGenreChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-emerald-500 focus:bg-white focus:outline-none"
                required
                disabled={isLoading}
              >
                {genresList.map((genreOption) => (
                  <option key={genreOption} value={genreOption}>
                    {genreOption}
                  </option>
                ))}
                <option value="Custom Genre">Custom Genre</option>
              </select>

              {isCustomGenre && (
                <input
                  type="text"
                  id="customGenre"
                  name="customGenre"
                  value={customGenre}
                  onChange={(e) => setCustomGenre(e.target.value)}
                  placeholder="Enter Custom Genre"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-emerald-500 focus:bg-white focus:outline-none"
                  required
                  disabled={isLoading}
                />
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="image" className="block text-gray-700">
                Upload Book Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-emerald-500 focus:bg-white focus:outline-none"
                accept="image/*"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-500 mb-4 mt-2 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full block bg-[#92E3A9] hover:bg-[#7edb97] focus:bg-[#7edb97] text-white font-semibold rounded-lg px-4 py-3 mt-6"
              disabled={isLoading}
            >
              {isLoading ? 'Listing Book...' : 'List Book'}
            </button>
          </form>
        </div>

        <div className="hidden md:block w-1/2">
          <img
            src="../logo2.png"
            className="rounded-2xl w-full h-full object-cover"
            alt="Book"
          />
        </div>
      </div>
    </div>
  );
};

export default BookListing;
