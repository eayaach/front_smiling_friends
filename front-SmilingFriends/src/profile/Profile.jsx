import './Profile.css';
import {cargar_cartas, cargar_mapas, cargar_skins} from '../common/images';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {token} = useContext(AuthContext);
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [mapas, setMapas] = useState({});
    const [skins, setSkins] = useState({});
    const [selectedMap, setSelectedMap] = useState(data.mapID);
    const [selectedSkin, setSelectedSkin] = useState(data.imageID);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchImages() {
            const mapas = await cargar_mapas();
            setMapas(mapas);
            const skins = await cargar_skins();
            setSkins(skins);
        }

        fetchImages();
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/users/me`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setData(response.data);
            setError(false);
            setProgress(((response.data.progress) / 10) * 100);

            setSelectedMap(response.data.mapID);  // Asigna el mapID actual
            setSelectedSkin(response.data.imageID);  // Asigna el imageID actual
        })
        .catch(error => {
            setData({});
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [token]);

    const handleEditProfile = () => {
        navigate('/modificar-perfil');
    };

    const handleImageClick = async (type, id) => {
        const endpoint = `${import.meta.env.VITE_BACKEND_URL}/users/update`;
    
        // Definir los datos a enviar
        const updateData = {
            ...(type === 'mapa' && { map_id: id }), // Actualiza el mapa si se hace clic en una imagen de mapa
            ...(type === 'skin' && { skin_id: id }), // Actualiza la skin si se hace clic en una imagen de skin
        };
    
        try {
            const response = await axios.patch(endpoint, updateData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.status === 200) {
                // Actualiza el estado local si la actualización fue exitosa
                if (type === 'mapa') setSelectedMap(id);
                if (type === 'skin') setSelectedSkin(id);
            } else {
                console.error('Error al actualizar la imagen');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    

    return (
        <>
            <div className='section'>
                {loading ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p>Hubo un error al cargar los datos.</p>
                ) : (
                    <div className="profile-container">
                        <div className="user-info">
                            <div className="user-avatar">
                                <img src={skins[selectedSkin]} alt="Avatar" />
                            </div>
                            <h2>{data.usuario}</h2>
                            <p>LV {data.level}</p>
                            <div className="level-bar">
                                <div className="level-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                            <button onClick={handleEditProfile}>
                                Editar Perfil
                            </button>
                        </div>

                        <div className="content-section">
                            <div className="section-header">MAPAS</div>
                            <div className="maps-section">
                                <div className="maps">
                                    {Object.keys(mapas).map(clave => ( 
                                        <img
                                            key={clave}
                                            id={clave}
                                            src={mapas[clave]}
                                            alt={clave}
                                            className={clave == selectedMap ? 'resaltado' : ''}
                                            onClick={() => handleImageClick('mapa', clave)} // Llamada al hacer clic en el mapa
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="section-header">SKINS</div>
                            <div className="skins-section">
                                <div className="skins">
                                    {Object.keys(skins).map(clave => (
                                        <img
                                            key={clave}
                                            id={clave}
                                            src={skins[clave]}
                                            alt={clave}
                                            className={clave == selectedSkin ? 'resaltado' : ''}
                                            onClick={() => handleImageClick('skin', clave)} // Llamada al hacer clic en la skin
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;
