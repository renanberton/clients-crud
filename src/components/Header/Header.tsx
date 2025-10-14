import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Logo from '../../assets/logo.png';

interface HeaderProps {
  username: string;
  currentPage: 'clients' | 'selected-clients';
}

export const Header: React.FC<HeaderProps> = ({ username, currentPage }) => {
  return (
    <header>
      <div className="container">
        <img src={Logo} alt="Logo" />
        <div className="header-tabs">
          <Link 
            to="/clients" 
            className={currentPage === 'clients' ? 'active' : ''}
          >
            Clientes
          </Link>
          <Link 
            to="/selected-clients" 
            className={currentPage === 'selected-clients' ? 'active' : ''}
          >
            Clientes selecionados
          </Link>
          <Link to="/">
            Sair
          </Link>
        </div>
        <div className="header-right">
          Olá, <strong>{username}!</strong>
        </div>  
      </div>              
    </header>
  );
};