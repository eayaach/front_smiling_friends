import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form>
          <label>
            <input
              type="email"
              name="email"
              required
            placeholder='Email'/>
          </label>
          <label>
            <input
              type="password"
              name="password"
              required
              placeholder='Password'/>
          </label>
          <input type="submit" value="Login" />
        </form>
        <div class = "register-link">Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}><a>Register</a></Link></div>
      </div>
    );
}
