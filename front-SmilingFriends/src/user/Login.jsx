import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { SocketContext } from '../contexts/sockets/SocketContext';

export default function Login() {
  const { token, setToken, userId, setUserId } = useContext(AuthContext);
  const { connectSocket } = useContext(SocketContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
      correo: email,
      contrasena: password
    })
      .then((response) => {
        console.log('Loggin exitoso! Ahora puedes volver y loguearte');
        setError(false);
        setMsg(response.data.msg);
        setUserId(response.data.id);
        connectSocket(response.data.id);
        const access_token = response.data.access_token;
        setToken(access_token);
        navigate('/');
      })
      .catch((error) => {
        console.error('Ocurrió un error:', error);
        if (error.response && error.response.data && error.response.data.msg) {
          setMsg(error.response.data.msg);
        } else {
          setMsg("Usuario no encontrado o credenciales incorrectas");
        }
        setError(true);
      });
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder='Email' />
        </label>
        <label>
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            required
            placeholder='Password' />
        </label>
        <input type="submit" value="Login" />
      </form>
      
      {error && <div className="error-message">{msg}</div>}

      <div className="register-link">
        Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>Register</Link>
      </div>
    </div>
  );
}
