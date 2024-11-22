import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const { token } = useContext(AuthContext);

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

    // Manejar actualizaciones
    const handleEdit = (user) => {
        setEditingUser(user.id);
        setUpdatedData({ ...user });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        axios({
            method: 'patch',
            url: `${import.meta.env.VITE_BACKEND_URL}/users/update`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: updatedData
        })
        .then(() => {
            setUsers(users.map(user => (user.id === updatedData.id ? updatedData : user)));
            setEditingUser(null);
        })
        .catch(error => {
            console.error("Error al actualizar el usuario:", error);
            setError("Hubo un error al actualizar el usuario.");
        });
    };

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
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                {editingUser === user.id ? (
                                    <input
                                        type="text"
                                        name="usuario"
                                        value={updatedData.usuario || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.usuario
                                )}
                            </td>
                            <td>
                                {editingUser === user.id ? (
                                    <input
                                        type="email"
                                        name="correo"
                                        value={updatedData.correo || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.correo
                                )}
                            </td>
                            <td>
                                {editingUser === user.id ? (
                                    <>
                                        <button onClick={handleUpdate}>Guardar</button>
                                        <button onClick={() => setEditingUser(null)}>Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(user)}>Editar</button>
                                        <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
