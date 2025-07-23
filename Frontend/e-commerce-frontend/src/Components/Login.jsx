// src/Login.jsx
import React from 'react';

function Login() {
  return (
    <div>
      <h1>Log In</h1>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
