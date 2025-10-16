import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Clients } from './pages/Clients/Clients';
import { SelectedClients } from './pages/SelectedClients/SelectedClients';
import { useClients } from './hooks/useClients';
import type { Client } from './types/Client';
import './App.css';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState(''); 
  
  const {
    clients,
    selectedClients,
    addClient,
    updateClient,
    deleteClient,
    selectClient,
    unselectClient,
    clearSelected
  } = useClients();

  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
  };

  const handleAddClient = (clientData: Omit<Client, 'id'>) => {
    addClient(clientData);
  };

  const handleEditClient = (client: Client) => {
    updateClient(client.id, {
      name: client.name,
      salary: client.salary,
      companyValuation: client.companyValuation,
      selected: client.selected
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route 
          path="/" 
          element={
            <Home onUsernameSubmit={handleUsernameSubmit} />
          } 
        />
        
        <Route 
          path="/clients" 
          element={
            username ? (
              <Clients
                username={username}
                clients={clients}
                selectedClients={selectedClients}
                onEditClient={handleEditClient}  
                onDeleteClient={deleteClient}
                onSelectClient={selectClient}
                onAddClient={handleAddClient}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/selected-clients" 
          element={
            username ? (
              <SelectedClients
                username={username}
                selectedClients={selectedClients}
                onUnselectClient={unselectClient}
                onClearSelected={clearSelected} 
                />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </div>
  );
}

export default App;