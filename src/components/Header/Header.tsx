import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Logo from '../../assets/logo.png';
import ClientIcon from '../../assets/client-logo.png';
import ClientSelectedIcon from '../../assets/client-selected-logo.png';
import HomeIcon from '../../assets/home-icon.png';
import ArrowLeftIcon from '../../assets/collapse-buttom.png';

interface HeaderProps {
  username: string;
  currentPage: 'home' | 'clients' | 'selected-clients';
}

export const Header: React.FC<HeaderProps> = ({ username, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header>
        <div className="container">
          <div className="header-left">
            <button 
              className="hamburger-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <img src={Logo} alt="Logo" />
          </div>
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

      <div className={`sidebar-overlay ${sidebarOpen ? 'sidebar-overlay--open' : ''}`} 
           onClick={() => setSidebarOpen(false)} />
      
      <div className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <img src={Logo} alt="Logo" width={100} height={50} />
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <img src={ArrowLeftIcon} alt="Fechar" className="sidebar-close-icon" />
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link 
            to="/" 
            className={`sidebar-nav-item ${currentPage === 'home' ? 'sidebar-nav-item--active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <img src={HomeIcon} alt="Home" className="sidebar-nav-icon" />
            Home
          </Link>
          <Link 
            to="/clients" 
            className={`sidebar-nav-item ${currentPage === 'clients' ? 'sidebar-nav-item--active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <img src={ClientIcon} alt="Clientes" className="sidebar-nav-icon" />
            Clientes
          </Link>
          <Link 
            to="/selected-clients" 
            className={`sidebar-nav-item ${currentPage === 'selected-clients' ? 'sidebar-nav-item--active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <img src={ClientSelectedIcon} alt="Clientes Selecionados" className="sidebar-nav-icon" />
            Clientes Selecionados
          </Link>
        </nav>
      </div>
    </>
  );
};