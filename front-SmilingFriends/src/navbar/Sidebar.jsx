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
  z-index: 1000;
`;

const NavIcon = styled(Link)`
  font-size: 3rem;
  color: #fff;
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
`;

const StyledParagraph = styled.p`
  font-family: 'Press Start 2P', cursive;
  color: #ffffff;
  margin: 0;
  align-items: center;
  font-size: 150%;
`;

export default function Sidebar() {

  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
        <Nav>
        <NavIcon to="#" onClick={showSidebar}>
            <FaIcons.FaBars />
        </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
                <NavElement>
                    <NavIcon to="#" ><FaIcons.FaUser/></NavIcon>
                    <StyledParagraph>LOGIN</StyledParagraph>
                </NavElement>
                <NavElement>
                    <NavIcon to="#" ><IoIcons.IoIosStats/></NavIcon>
                    <StyledParagraph>BOARD</StyledParagraph>
                </NavElement>
                <NavElement>
                  <NavIcon to="/instructions"><GoIcons.GoInfo /></NavIcon>
                  <StyledParagraph>RULES</StyledParagraph>
                </NavElement>
            </SidebarWrap>
        </SidebarNav>
    </>
  );
}