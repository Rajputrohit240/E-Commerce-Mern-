import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create and style this CSS file

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">MyShop</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Product</Link></li>
        <li className="dropdown">
          <button onClick={toggleDropdown}>Category</button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/category/electronics">Electronics</Link></li>
              <li><Link to="/category/fashion">Fashion</Link></li>
              <li><Link to="/category/grocery">Grocery</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/logout">Logout</Link></li>
        <li className="cart">
          <Link to="/cart">
            <img src="/cart-icon.png" alt="Cart" />
            <span className="cart-badge">3</span> {/* Example cart item count */}
          </Link>
        </li>
        <li><Link to="/profile">My Profile</Link></li>
      </ul>
      <div className="hamburger-menu">
        <div className="hamburger-icon" onClick={toggleDropdown}>
          &#9776;
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
