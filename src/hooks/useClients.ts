import { useState, useEffect } from 'react';
import type { Client } from '../types/Client';

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('clients');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedClients, setSelectedClients] = useState<Client[]>([]);

  // Salvar no localStorage quando clients mudar
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      selected: false
    };
    setClients(prev => [...prev, newClient]);
  };

  const updateClient = (id: string, updatedClient: Partial<Client>) => {
    setClients(prev => 
      prev.map(client => 
        client.id === id ? { ...client, ...updatedClient } : client
      )
    );
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
    setSelectedClients(prev => prev.filter(client => client.id !== id));
  };

  const selectClient = (id: string) => {
    const client = clients.find(c => c.id === id);
    if (client && !client.selected) {
      updateClient(id, { selected: true });
      setSelectedClients(prev => [...prev, { ...client, selected: true }]);
    }
  };

  const unselectClient = (id: string) => {
    updateClient(id, { selected: false });
    setSelectedClients(prev => prev.filter(client => client.id !== id));
  };

  const clearSelected = () => {
    clients.forEach(client => {
      if (client.selected) {
        updateClient(client.id, { selected: false });
      }
    });
    setSelectedClients([]);
  };

  return {
    clients,
    selectedClients,
    addClient,
    updateClient,
    deleteClient,
    selectClient,
    unselectClient,
    clearSelected
  };
};