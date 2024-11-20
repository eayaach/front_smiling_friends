import React from 'react';

function PartidaWidget({creador, actuales, max}) {
    const handleUserJoin = () => {
        return;
    }
    return (
        <>
        <div className="box">
            <h2> {`Partida de ${creador}`}</h2>
            <h3> {`${actuales}/${max}`}</h3>
            <button onClick={handleUserJoin}> Unirse</button>
        </div>
        </>
    )
}

export default PartidaWidget;