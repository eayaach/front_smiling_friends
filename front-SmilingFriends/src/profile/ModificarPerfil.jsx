import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import './ModificarPerfil.css'

const ModificarPerfil = () => {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(null);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/users/me`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            console.error("Error al cargar los datos del perfil:", error);
            setError("Hubo un error al cargar los datos.");
        });
    }, [token]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios({
            method: 'patch',
            url: `${import.meta.env.VITE_BACKEND_URL}/users/update`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: userData
        })
        .then(response => {
            navigate('/profile');
        })
        .catch(error => {
            console.error("Error al actualizar el perfil:", error);
            setError("Hubo un error al actualizar el perfil.");
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className="section Login up">
            <div>
                <h2>Modificar Perfil</h2>
    
                {error && <p style={{ color: '#e74c3c', textAlign: 'center' }}>{error}</p>}
    
                <form className='form-gap' onSubmit={handleSubmit}>
                        <label>Nombre de usuario:</label>
                        <input
                            type="text"
                            name="usuario"
                            value={userData.usuario || ''}
                            onChange={handleChange}
                            placeholder="Escribe tu nuevo nombre de usuario"
                        />
    
                        <label>Correo:</label>
                        <input
                            type="email"
                            name="correo"
                            value={userData.correo || ''}
                            onChange={handleChange}
                            placeholder="Escribe tu nuevo correo"
                        />
                        <label>Contrasena:</label>
                        <input
                            type="password"
                            name="contrasena"
                            value={userData.contrasena || ''}
                            onChange={handleChange}
                            placeholder="Introduce tu nueva contraseña"
                        />
                    <button
                        type="submit"
                    >
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
    

};


export default ModificarPerfil;
