import './Profile.css';
import React, { useContext, useEffect, useState } from 'react';

const UserComponent = ({Skin1, usuario, level, showButton}) => {

    return (
        <>
            <div className="user-info">
                <div className="user-avatar">
                    <img src={Skin1} alt="Avatar" />
                </div>
                <h2>{usuario}</h2>
                <p>LV {level}</p>
            </div>
        </>
    );
};

export default UserComponent;