import React from 'react';
import './Profile.css';
import Mapa1 from '../img/mapa_1.jpg';
import Mapa2 from '../img/mapa_2.jpg';
import Mapa3 from '../img/mapa_3.jpg';
import Skin1 from '../img/skin_1.jpg';
import Skin2 from '../img/skin_2.jpg';

const Profile = () => {
    return (
        <div className="profile-container">

            <div className="user-info">
                <div className="user-avatar">
                    <img src={Skin1} alt="Avatar" />
                </div>
                <h2>USUARIO</h2>
                <p>LV 2</p>
                <div className="level-bar">
                    <div className="level-fill" style={{ width: '50%' }}></div>
                </div>
            </div>

            <div className="content-section">

                {/* Título y Contenido de Mapas */}
                <div className="section-header">MAPAS</div>
                <div className="maps-section">
                    <div className="maps">
                        <img src={Mapa1} alt="Mapa 1" />
                        <img src={Mapa2} alt="Mapa 2" />
                        <img src={Mapa3} alt="Mapa 3" />
                    </div>
                    <div className="maps-buttons">
                        {/* <button className="next-button">→</button> */}
                    </div>
                </div>

                {/* Título y Contenido de Skins */}
                <div className="section-header">SKINS</div>
                <div className="skins-section">
                    <div className="skins">
                        <img src={Skin1} alt="Skin 1" />
                        <img src={Skin2} alt="Skin 2" />
                        {/* <button className="next-button">→</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
