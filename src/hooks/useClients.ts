import { useState, useEffect } from 'react';
import type { Client } from '../types/Client';
import { apiService } from '../services/api';

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar clientes da API ao inicializar
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Carregando clientes da API...');
      // Agora passando page=1 e limit=50 para pegar mais itens
      const apiClients = await apiService.getUsers(1, 50);
      console.log('✅ Clientes carregados:', apiClients);
      setClients(apiClients);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('❌ Erro ao carregar clientes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Atualizar selectedClients sempre que clients mudar
  useEffect(() => {
    const selected = clients.filter(client => client.selected);
    setSelectedClients(selected);
    console.log('📋 SelectedClients atualizado:', selected);
  }, [clients]);

  const addClient = async (clientData: Omit<Client, 'id'>) => {
    try {
      setError(null);
      const newClient = await apiService.createUser(clientData);
      setClients(prev => [...prev, newClient]);
      return newClient;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar cliente';
      setError(errorMessage);
      console.error('❌ Erro ao criar cliente:', err);
      throw err;
    }
  };

  const updateClient = async (id: string, updatedClient: Partial<Client>) => {
    try {
      setError(null);
      console.log('🔄 Atualizando cliente:', id, updatedClient);
      const updated = await apiService.updateUser(id, updatedClient);
      
      const clientWithSelection = {
        ...updated,
        selected: updatedClient.selected !== undefined ? updatedClient.selected : updated.selected
      };
      
      setClients(prev => 
        prev.map(client => 
          client.id === id ? { ...client, ...clientWithSelection } : client
        )
      );
      
      console.log('✅ Cliente atualizado com sucesso:', clientWithSelection);
      return clientWithSelection;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar cliente';
      setError(errorMessage);
      console.error('❌ Erro ao atualizar cliente:', err);
      throw err;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      setError(null);
      await apiService.deleteUser(id);
      setClients(prev => prev.filter(client => client.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar cliente';
      setError(errorMessage);
      console.error('❌ Erro ao deletar cliente:', err);
      throw err;
    }
  };

  const selectClient = async (id: string) => {
    try {
      console.log('🎯 Selecionando cliente:', id);
      await updateClient(id, { selected: true });
      console.log('✅ Cliente selecionado com sucesso');
    } catch (err) {
      console.error('❌ Erro ao selecionar cliente:', err);
      throw err;
    }
  };

  const unselectClient = async (id: string) => {
    try {
      console.log('🎯 Desselecionando cliente:', id);
      await updateClient(id, { selected: false });
    } catch (err) {
      console.error('❌ Erro ao desselecionar cliente:', err);
      throw err;
    }
  };

  const clearSelected = async () => {
    try {
      setError(null);
      console.log('🗑️ Limpando selecionados...');
      
      const updatePromises = selectedClients.map(client =>
        apiService.updateUser(client.id, { selected: false })
      );
      
      await Promise.all(updatePromises);
      await loadClients();
      console.log('✅ Selecionados limpos com sucesso');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao limpar selecionados';
      setError(errorMessage);
      console.error('❌ Erro ao limpar selecionados:', err);
      throw err;
    }
  };

  return {
    clients,
    selectedClients,
    loading,
    error,
    addClient,
    updateClient,
    deleteClient,
    selectClient,
    unselectClient,
    clearSelected,
    reloadClients: loadClients,
  };
};