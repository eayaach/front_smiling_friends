import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as GoIcons from 'react-icons/go';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';

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
  position: fixed;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-left: 1.5rem;
  margin-top: 4.5rem;
  z-index: 1000;

  div {
    width: 50px;
    height: 4px;
    background-color: white;
    margin: 5px 0;
    border-radius: 25px;
    transition: width 0.3s ease;
  }

  .one {
    width: 50px;
  }

  .two {
    width: 35px;
  }

  .three {
    width: 40px;
  }

  &:hover div {
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
  top: 0;
  left: ${({ $sidebar }) => ($sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  color: #fff;
`;

const SidebarWrap = styled.div`
  width: 100%;
  padding: 10%;
  margin-top: 40%;
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
    color: #00ffcc;
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`;

const StyledParagraph = styled.p`
  font-family: 'GenericTechno';
  color: #ffffff;
  color: inherit;
  margin: 0;
  align-items: center;
  font-size: 120%;
`;

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { isOnline } = useContext(AuthContext);
  console.log(isOnline);
  return (
    <>
      <Nav>
        <MenuIcon onClick={showSidebar}>
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </MenuIcon>
      </Nav>
      <SidebarNav $sidebar={sidebar}>
        <SidebarWrap>
          <Link to={isOnline ? './profile' : './login'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavElement>
              <NavIcon>
                <FaIcons.FaUser />
              </NavIcon>
              <StyledParagraph>{isOnline ? 'PROFILE' : 'LOGIN'}</StyledParagraph>
            </NavElement>
          </Link>

          <Link to="./login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavElement>
              <NavIcon>
                <IoIcons.IoIosStats />
              </NavIcon>
              <StyledParagraph>BOARD</StyledParagraph>
            </NavElement>
          </Link>

          <Link to="./instructions" style={{ textDecoration: 'none', color: 'inherit' }}>
            <NavElement>
              <NavIcon>
                <GoIcons.GoInfo />
              </NavIcon>
              <StyledParagraph>RULES</StyledParagraph>
            </NavElement>
          </Link>
        </SidebarWrap>
      </SidebarNav>
    </>
  );
}
