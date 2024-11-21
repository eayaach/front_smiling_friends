import React, { useContext } from 'react';
import styled from 'styled-components';
import * as IoIcons from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext';

const HomeIcon = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 1);
  width: 70px;
  font-size: 3.5em;
  cursor: pointer;
  position: fixed;
  top: 1.5rem;
  right: 1rem;
  z-index: 1000;
`;

const LogoutIcon = styled(HomeIcon)`
  right: 80px;
`;

export default function Home() {
  const { isOnline, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <HomeIcon>
          <IoIcons.IoMdHome />
        </HomeIcon>
      </Link>

      {isOnline && (
        <LogoutIcon onClick={handleLogout}>
          <IoIcons.IoIosLogOut />
        </LogoutIcon>
      )}
    </>
  );
}
