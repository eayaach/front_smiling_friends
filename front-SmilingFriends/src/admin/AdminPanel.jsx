import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const { token, userId } = useContext(AuthContext);

    // Cargar todos los usuarios al iniciar
    useEffect(() => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/users/all`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error("Error al cargar los usuarios:", error);
            setError("Hubo un error al cargar los usuarios.");
        });
    }, [token]);

    // Manejar eliminación
    const handleDelete = (userId) => {
        axios({
            method: 'delete',
            url: `${import.meta.env.VITE_BACKEND_URL}/users/destroy/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            setUsers(users.filter(user => user.id !== userId));
        })
        .catch(error => {
            console.error("Error al eliminar el usuario:", error);
            setError("Hubo un error al eliminar el usuario.");
        });
    };

    return (
        <div className="admin-panel">
            <h2>Panel de Administración</h2>

            {error && <p style={{ color: '#e74c3c', textAlign: 'center' }}>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {users
                    .filter(user => user.id !== parseInt(userId, 10)) // Filtra los usuarios con id diferente al guardado en localStorage
                    .map(user => (
                        <tr key={user.id}>
                            <td>{user.usuario}</td>
                            <td>{user.correo}</td>
                            <td>
                                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
            </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
