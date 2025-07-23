import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Contact from './Contact';

function Nav() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/product" element={<div>Product Page</div>} />
        <Route path="/category/:id" element={<div>Category Page</div>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/logout" element={<div>Logout Page</div>} />
        <Route path="/cart" element={<div>Cart Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
      </Routes>
    </Router>
  );
}

export default Nav;
