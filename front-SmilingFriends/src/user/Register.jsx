import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './Login.css';
import { Link,  useNavigate } from 'react-router-dom';


export default function Register() {
    const { token, setToken } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

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
            </label>
            <label>
              <input
                type="usuario"
                name="usuario"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder='Username'/>
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
