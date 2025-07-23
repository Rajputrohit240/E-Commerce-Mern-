// src/Signup.jsx
import React from 'react';

function Signup() {
  return (
    <div>
      <h1>Sign Up </h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
