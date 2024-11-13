import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Sidebar from '../navbar/Sidebar'
import styled from 'styled-components'
import Instructions from '../game/Instructions'
import Nosotros from '../game/Nosotros'
import enanoImg from '../img/enano.png'
import fondoImg from '../img/fondo.png'

import Login from '../user/Login'
import Register from '../user/Register'
import Profile from '../profile/Profile'
import ModificarPerfil from '../profile/ModificarPerfil'
import Home from '../home/Home'
import AvailableGames from '../game/AvailableGames'
// Contenedor principal que usa Flexbox
const MainContainer = styled.div``

function Routing(){
    return (
        <BrowserRouter>
          <MainContainer>
            <Home/>
            <Sidebar />
              <Routes>
                <Route path="/" element={<App />} />
                <Route path={"/instructions"} element={<Instructions />}/>
                <Route path={"/nosotros"} element={<Nosotros />}/>
                <Route path={"/modificar-perfil"} element={<ModificarPerfil />}/>
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/register"} element={<Register/>} />
                <Route path={"/profile"} element={<Profile />}/>
                <Route path={"/available_games"} element={<AvailableGames />}/>
              </Routes>

          </MainContainer>
          <img src={enanoImg} className="enano" alt="Enano" />
        </BrowserRouter>
      );
}

export default Routing;