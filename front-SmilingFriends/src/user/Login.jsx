import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './Login.css';
import { Link,  useNavigate } from 'react-router-dom';

export default function Login() {

  const { token, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // Hook de react-router-dom para navegar

  const handleSubmit = async (event) => {
      event.preventDefault();

      // console.log(isOnline);
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        correo: email,
        contrasena: password
      }).then((response) => {
        console.log('Loggin exitoso! Ahora puedes volver y loguearte');
        setError(false);
        setMsg(response.data.msg);
        const access_token = response.data.access_token;
        console.log(access_token);
        setToken(access_token);
        console.log("Se seteo el token: ", token);
        navigate('/');

      }).catch((error) => {

        console.error('Ocurrió un error:', error);
        setMsg(error.response.data.msg);
        setError(true); // aquí puede haber más lógica para tratar los errores
      });
    }

    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
            placeholder='Email'/>
          </label>
          <label>
            <input
              type="password"
              name="password"
              onChange={e => setPassword(e.target.value)}
              required
              placeholder='Password'/>
          </label>
          <input type="submit" value="Login" />
        </form>
        <div class = "register-link">Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}><a>Register</a></Link></div>
      </div>
    );
}
