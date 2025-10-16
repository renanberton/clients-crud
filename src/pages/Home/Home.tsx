import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

interface HomeProps {
  onUsernameSubmit: (username: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onUsernameSubmit }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Página Inicial - Clients Crud';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onUsernameSubmit(username.trim());
      navigate('/clients');
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">
          Olá, seja bem-vindo!
        </h1>
        <form onSubmit={handleSubmit} className="home-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite o seu nome:"
            required
            className="home-input"
          />
          <button type="submit" className="home-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;