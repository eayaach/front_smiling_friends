import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';

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
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                margin: '0',
                padding: '0',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    boxSizing: 'border-box',
                }}
            >
                <h2 style={{ textAlign: 'center', fontSize: '24px', color: '#333' }}>Modificar Perfil</h2>
    
                {error && <p style={{ color: '#e74c3c', textAlign: 'center' }}>{error}</p>}
    
                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '14px', marginBottom: '5px', color: '#555' }}>Nombre de usuario:</label>
                        <input
                            type="text"
                            name="usuario"
                            value={userData.usuario || ''}
                            onChange={handleChange}
                            placeholder="Escribe tu nuevo nombre de usuario"
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                boxSizing: 'border-box',
                                outline: 'none',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '14px', marginBottom: '5px', color: '#555' }}>Correo:</label>
                        <input
                            type="email"
                            name="correo"
                            value={userData.correo || ''}
                            onChange={handleChange}
                            placeholder="Escribe tu nuevo correo"
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                boxSizing: 'border-box',
                                outline: 'none',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '14px', marginBottom: '5px', color: '#555' }}>Contrasena:</label>
                        <input
                            type="password"
                            name="contrasena"
                            value={userData.contrasena || ''}
                            onChange={handleChange}
                            placeholder="Introduce tu nueva contraseña"
                            style={{
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                boxSizing: 'border-box',
                                outline: 'none',
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#3498db',
                            color: '#fff',
                            padding: '10px 20px',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            marginTop: '20px',
                            fontFamily: 'GenericTechno',
                        }}
                    >
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
    

};


export default ModificarPerfil;
