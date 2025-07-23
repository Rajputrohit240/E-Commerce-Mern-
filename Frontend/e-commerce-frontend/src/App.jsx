// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';  // Optional, for custom styling

// Components for different pages
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Nav from './Components/Nav';

function App() {
  return (
    <>
    <Nav></Nav>
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My Website</h1>
          <nav>
            <ul>
              {/* <li>
                <Link to="/">Home</Link>
              </li> */}
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            
          </Routes>
        </main>
      </div>
     
    </Router>

    </>


  );
}

export default App;
