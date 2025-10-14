import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import { Clients } from './pages/Clients/Clients';
import { SelectedClients } from './pages/SelectedClients/SelectedClients';
import { ClientForm } from './components/ClientForm/ClientForm';
import { useClients } from './hooks/useClients';
import type { Client } from './types/Client';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  
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

  const handleEditClient = (clientData: Omit<Client, 'id'>) => {
    if (editingClient) {
      updateClient(editingClient.id, clientData);
      setEditingClient(null);
    }
  };

  const handleEditClick = (client: Client) => {
    setEditingClient(client);
  };

  const handleCancelForm = () => {
    setEditingClient(null);
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
                onEditClient={handleEditClick}
                onDeleteClient={deleteClient}
                onSelectClient={selectClient}
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
                onClearSelected={clearSelected} onNavigateToAll={function (): void {
                  throw new Error('Function not implemented.');
                } } onBackToHome={function (): void {
                  throw new Error('Function not implemented.');
                } }              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/add-client" 
          element={
            username ? (
              <ClientForm
                onSubmit={handleAddClient}
                onCancel={handleCancelForm}
                isEditing={false}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/edit-client" 
          element={
            username && editingClient ? (
              <ClientForm
                client={editingClient}
                onSubmit={handleEditClient}
                onCancel={handleCancelForm}
                isEditing={true}
              />
            ) : (
              <Navigate to="/clients" replace />
            )
          } 
        />
      </Routes>
    </div>
  );
}

export default App;