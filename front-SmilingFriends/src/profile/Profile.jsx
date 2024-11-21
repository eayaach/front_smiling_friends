import './Profile.css';
import {cargar_cartas, cargar_mapas, cargar_skins} from '../common/images'
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

    useEffect(() => {
        async function fetchImages() {
            const mapas = await cargar_mapas();
            console.log(mapas);
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
            console.log(data);
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

    return (
        <>  <div className='section'>
            {loading ? (<p>Cargando...</p>) : error ? (<p>Hubo un error al cargar los datos.</p>) : (
                <div className="profile-container">

                    <div className="user-info">
                        <div className="user-avatar">
                            <img src={skins[data.imageID]} alt="Avatar" />
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
                                <img id={clave} src={mapas[clave]} alt={clave} />
                            ))}
                            </div>
                        </div>

                        <div className="section-header">SKINS</div>
                        <div className="skins-section">
                            <div className="skins">
                            {Object.keys(skins).map(clave => (
                                <img src={skins[clave]} alt={clave} />
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
