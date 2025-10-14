import React, { useState } from 'react';
import Home from './pages/Home';

type AppState = 'home' | 'clients';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('home');
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
    setCurrentView('clients');
  };

  return (
    <div className="App">
      {currentView === 'home' && (
        <Home onUsernameSubmit={handleUsernameSubmit} />
      )}
      
      {currentView === 'clients' && (
        <div style={styles.clientsContainer}>
          <h1>Olá, {username}!</h1>
          <p>Esta é a tela de clientes (em construção)</p>
          <button onClick={() => setCurrentView('home')}>
            Voltar para Home
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  clientsContainer: {
    padding: '2rem',
    textAlign: 'center' as const,
  },
};

export default App;