import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import '../common/index.css';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [partidas, setPartidas] = useState([]); // Estado inicial para partidas
    const [error, setError] = useState(null);
    const { token, userId } = useContext(AuthContext);

    // Cargar usuarios al montar
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

    // Cargar partidas al montar
    useEffect(() => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/partidas/all`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("Partidas recibidas:", response.data);
            setPartidas(response.data.partidas || []);
        })
        .catch(error => {
            console.error("Error al cargar las partidas:", error);
            setError("Hubo un error al cargar las partidas.");
        });
    }, [token]);

    // Manejar eliminación de usuarios
    const handleDeleteUser = (userId) => {
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

    // Manejar eliminación de partidas
    const handleDeletePartida = (idPartida) => {
        axios({
            method: 'post',
            url: `${import.meta.env.VITE_BACKEND_URL}/partidas/destroy`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: { id_partida: idPartida }
        })
        .then(() => {
            setPartidas(partidas.filter(partida => partida.id !== idPartida));
        })
        .catch(error => {
            console.error("Error al eliminar la partida:", error);
            setError("Hubo un error al eliminar la partida.");
        });
    };

    return (
        <div className="admin-panel">
            <h2>Panel de Administración</h2>

            {error && <p style={{ color: '#e74c3c', textAlign: 'center' }}>{error}</p>}

            {/* Tabla de Usuarios */}
            <h3>Usuarios</h3>
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
                        .filter(user => user.id !== parseInt(userId, 10))
                        .map(user => (
                            <tr key={user.id}>
                                <td>{user.usuario}</td>
                                <td>{user.correo}</td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Tabla de Partidas */}
            <h3>Partidas</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Jugadores</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(partidas) && partidas.map(partida => (
                        <tr key={partida.id}>
                            <td>{partida.nombre}</td>
                            <td>{partida.jugadores_actuales} / {partida.jugadores_max}</td>
                            <td>
                                <button onClick={() => handleDeletePartida(partida.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
