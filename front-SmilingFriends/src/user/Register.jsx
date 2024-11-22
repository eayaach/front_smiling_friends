import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import axios from 'axios';
import './Login.css';
import { Link,  useNavigate } from 'react-router-dom';
import { SocketContext } from '../contexts/sockets/SocketContext';

export default function Register() {

    const { token, setToken, userId, setUserId } = useContext(AuthContext);
    const { connectSocket} = useContext(SocketContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!name || name.length < 3 || name.length > 50) {
            newErrors.name = "El nombre debe tener entre 3 y 50 caracteres.";
        }

        if (!username || username.length < 3 || username.length > 30) {
            newErrors.username = "El usuario debe tener entre 3 y 30 caracteres.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // retorna true si no hay errores
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            setError(true);
            return;
        }

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
            usuario: username,
            correo: email,
            nombre: name,
            contrasena: password
          }).then((response) => {


            console.log('Registro exitoso! Ahora puedes volver y loguearte');
            setError(false);
            setMsg(response.data.msg);
            console.log(msg);
            const access_token = response.data.access_token;
            console.log(access_token);
            setToken(access_token);
            console.log("Se seteo el token: ", token);

            const user_id = response.data.id;
            console.log(user_id);
            setUserId(user_id);
            connectSocket(user_id);
            navigate('/');

          }).catch((error) => {

            console.error('Ocurrió un error:', error);
            setMsg(error.response.data.msg);
            console.log(msg);
            setError(true); // aquí puede haber más lógica para tratar los errores
          });
    }

    return (
      <>
        <div className="Login">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="nombre"
                name="nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              placeholder='Name'/>
              {errors.name && <div className="error">{errors.name}</div>}
            </label>
            <label>
              <input
                type="usuario"
                name="usuario"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder='Username'/>
              {errors.username && <div className="error">{errors.username}</div>}
            </label>
            <label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              placeholder='Email'/>
            </label>
            <label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder='Password'/>
            </label>
            <input type="submit" value="Register" />
          </form>
        </div>
        {msg.length > 0 && <div className="Msg"> {msg} </div>}

      </>
    );
}
