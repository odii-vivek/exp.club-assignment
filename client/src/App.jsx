import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
// import HomePage from './components/HomePage';
// import BookList from './components/BookList';
// import BookDiscovery from './components/BookDiscovery';
// import Matchmaking from './components/Matchmaking';
// import Header from './components/Header';
// import EditBook from './components/EditBook';
// import CreateBook from './components/CreateBook';
// import BookDetails from './components/BookDetails';
// import ExchangeRequests from './components/ExchangeRequests';

function App() {
  return (
    <Router>
      <div>
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/home" element={<HomePage />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/books/edit/:bookId" element={<EditBook />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/discovery" element={<BookDiscovery />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/exchange-requests" element={<ExchangeRequests />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
