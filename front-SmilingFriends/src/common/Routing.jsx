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
import CreateGames from '../game/CreateGames'
import WaitingRoom from '../game/WaitingRoom'
import AdminPanel from '../admin/AdminPanel'
import HacermeAdmin from '../admin/HacermeAdmin'
// Contenedor principal que usa Flexbox
const MainContainer = styled.div``

function Routing(){
    return (
        <BrowserRouter>
            <Sidebar />
            <Home/>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path={"/instructions"} element={<Instructions />}/>
                <Route path={"/nosotros"} element={<Nosotros />}/>
                <Route path={"/modificar-perfil"} element={<ModificarPerfil />}/>
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/register"} element={<Register/>} />
                <Route path={"/profile"} element={<Profile />}/>
                <Route path={"/available_games"} element={<AvailableGames />}/>
                <Route path={"/create_games"} element={<CreateGames/>}/>
                <Route path={"/waiting_room/:id"} element={<WaitingRoom/>}/>
                <Route path={"/admin_panel"} element={<AdminPanel/>}/>
                <Route path={"/make_admin"} element={<HacermeAdmin/>}/>
              </Routes>
            <img src={enanoImg} className="enano" alt="Enano" />
        </BrowserRouter>
      );
}

export default Routing;