import styled from 'styled-components';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as GoIcons from 'react-icons/go';
import React, {createContext, useContext , useState, useEffect} from "react";


const Nav = styled.div`
  height: 10%;
  width: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  top: 0%;


`;

const NavIcon = styled.div`
  font-size: 3rem;
  color: #fff;
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: inherit;
`;

const MenuIcon = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-left: 2rem;
  z-index: 1000;



  div {
    width: 50px;
    height: 4px;
    background-color: white;
    margin: 5px 0;
    border-radius: 25px;
    transition: width 0.3s ease;
  }
  /* Estilos específicos para cada línea */

  .one {
    /* Estilos para el primer div */
    width: 50px;
  }

  .two {
    /* Estilos para el segundo div */
    width: 35px;
  }

  .three {
    /* Estilos para el tercer div */
    width: 40px;
  }

  &:hover div{
    width: 50px;

  }
`;

const SidebarNav = styled.nav`
  background: #15171c;
  height: 100vh;
  width: 250px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0; /* Se ajusta en la parte superior */
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')}; /* Muestra/oculta la Sidebar */
  transition: 350ms; /* Animación suave para mostrar/ocultar */
  z-index: 999; /* Asegura que la Sidebar esté encima del contenido */

  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  color: #fff;
`;

const SidebarWrap = styled.div`
  width: 100%;
  padding: 10%;
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  gap: 10%;
`;

const NavElement = styled.div`
  margin-left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 22%;
  align-items: center;

  &:hover {
    color:  #00FFCC;
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`;

const StyledParagraph = styled.p`
  font-family: "GenericTechno";
  color: #ffffff;
  color: inherit;
  margin: 0;
  align-items: center;
  font-size: 120%;
`;

export default function Sidebar() {

  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
        <Nav>
        <MenuIcon to="#" onClick={showSidebar}>
            <div class="one"></div>
            <div class="two"></div>
            <div class="three"></div>
        </MenuIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
                <Link to="./login" style={{ textDecoration: 'none', color: 'inherit' }}>

                  <NavElement>
                      <NavIcon to="./login" ><FaIcons.FaUser/></NavIcon>
                      <StyledParagraph>LOGIN</StyledParagraph>
                  </NavElement>

                </Link>

                <Link to="./login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <NavElement to="#" >
                      <NavIcon><IoIcons.IoIosStats/></NavIcon>
                      <StyledParagraph >BOARD</StyledParagraph>
                  </NavElement>
                </Link>


                <Link to="./instructions" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <NavElement>
                    <NavIcon><GoIcons.GoInfo /></NavIcon>
                    <StyledParagraph>RULES</StyledParagraph>
                  </NavElement>
                </Link>
            </SidebarWrap>
        </SidebarNav>
    </>
  );
}