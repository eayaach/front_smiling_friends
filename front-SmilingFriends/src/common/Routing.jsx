import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Sidebar from '../navbar/Sidebar'
import styled from 'styled-components'
import Instructions from '../game/Instructions'
import enanoImg from '../img/enano.png'
import fondoImg from '../img/fondo.png'
// Contenedor principal que usa Flexbox
const MainContainer = styled.div`
  display: flex;
  height: 100vh; /* Ocupa toda la altura de la ventana */
  background-image: url(${fondoImg});
`;

// Estilo para el contenido principal
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10%;
  overflow-y: auto; /* Permite desplazamiento si el contenido es muy grande */
`;

function Routing(){
    return (
        <BrowserRouter>
          <MainContainer>
            <Sidebar />
            <MainContent>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path={"/instructions"} element={<Instructions />}/>
              </Routes>
            </MainContent>
          </MainContainer>
          <img src={enanoImg} className="enano" alt="Enano" />
        </BrowserRouter>
      );
}

export default Routing;