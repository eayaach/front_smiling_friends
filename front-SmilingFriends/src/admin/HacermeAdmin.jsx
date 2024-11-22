import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';

const HacermeAdmin = () => {
    const [adminkey, setAdminkey] = useState("");
    const [error, setError] = useState(null);
    const { token, setIsAdmin , setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAdminSubmit = (event) => {
        event.preventDefault();

        if (adminkey === "12345") {
            axios({
                method: 'patch',
                url: `${import.meta.env.VITE_BACKEND_URL}/users/update`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: { is_admin: true }
            })
            .then(response => {
                // Aquí actualizamos el estado de isAdmin en el contexto
                setIsAdmin(true);  // Actualiza el estado en el contexto
                console.log(response.data);
                setToken(response.data.access_token);
                alert("¡Ahora eres un administrador!");
                navigate('/profile');  // Redirige a la vista de perfil
            })
            .catch(error => {
                console.error("Error al hacer administrador:", error);
                setError("Hubo un error al hacer administrador.");
            });
        } else if (adminkey === "54321") { // truco oculto para des-hacerse de admin
            axios({
                method: 'patch',
                url: `${import.meta.env.VITE_BACKEND_URL}/users/update`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: { is_admin: false }
            })
            .then(response => {
                setIsAdmin(false);  // Actualiza el estado en el contexto
                alert("¡Ya no eres un administrador!");
                navigate('/profile');  // Redirige a la vista de perfil
            }
            )
        } else {
            setError("Clave de administrador incorrecta.");
        }
    };

    const handleKeyChange = (event) => {
        setAdminkey(event.target.value);  // Actualiza el estado de la clave
    };

    return (
        <div className="section Login up">
            <div>
                <h2>Convertirse en Administrador</h2>

                {error && <p style={{ color: '#e74c3c', textAlign: 'center' }}>{error}</p>}

                <form className='form-gap' onSubmit={handleAdminSubmit}>
                    <label>Introduce la clave de administrador:</label>
                    <input
                        type="text"
                        value={adminkey}
                        onChange={handleKeyChange}
                        placeholder="Introduce la clave de administrador"
                    />
                    <button type="submit">Hacerme Admin</button>
                </form>
            </div>
        </div>
    );
};

export default HacermeAdmin;
