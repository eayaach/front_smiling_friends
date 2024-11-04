import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Sidebar from '../navbar/Sidebar'
import styled from 'styled-components'

// Contenedor principal que usa Flexbox
const MainContainer = styled.div`
  display: flex;
  height: 100vh; /* Ocupa toda la altura de la ventana */
  background-image: url("../../img/fondo.png");
`;

// Estilo para el contenido principal
const MainContent = styled.div`
  flex: 1;
  padding: 10%;
  overflow-y: auto; /* Permite desplazamiento si el contenido es muy grande */
`;

function Routing(){
    return (
        <BrowserRouter>
          <Sidebar/>
          <MainContainer>
            <MainContent>
              <Routes>
                <Route path="/" element={<App />} />
                {/* Agrega más rutas aquí si es necesario */}
              </Routes>
            </MainContent>
          </MainContainer>
        </BrowserRouter>
      );
}

export default Routing;