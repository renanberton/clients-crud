import type { Client } from '../types/Client';

const API_BASE_URL = '/api';

interface ApiUser {
  id: string;
  name: string;
  salary: number;
  companyValuation: number;
  selected?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const getHeaders = () => ({
  'Content-Type': 'application/json',
});

const clientToApiUser = (client: Client): ApiUser => ({
  id: client.id,
  name: client.name,
  salary: client.salary,
  companyValuation: client.companyValuation,
  selected: client.selected
});

const apiUserToClient = (apiUser: ApiUser): Client => ({
  id: apiUser.id,
  name: apiUser.name,
  salary: apiUser.salary,
  companyValuation: apiUser.companyValuation,
  selected: apiUser.selected || false
});

export const apiService = {
  async getUsers(page: number = 1, limit: number = 50): Promise<Client[]> {
    try {
      const url = `${API_BASE_URL}/users?page=${page}&limit=${limit}`;
      console.log('🔍 FETCHING FROM:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(),
      });

      console.log('🔍 RESPONSE STATUS:', response.status);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuários: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('🔍 RESPONSE DATA:', responseData);

      let usersArray: ApiUser[] = [];

      if (responseData.clients && Array.isArray(responseData.clients)) {
        usersArray = responseData.clients;
        console.log('✅ DADOS ENCONTRADOS EM responseData.clients');
      } else if (Array.isArray(responseData)) {
        usersArray = responseData;
        console.log('✅ DADOS ENCONTRADOS COMO ARRAY DIRETO');
      } else {
        console.warn('⚠️ ESTRUTURA DESCONHECIDA:', responseData);
        return [];
      }

      console.log('🔍 USERS ARRAY ENCONTRADO:', usersArray.length, 'usuários');
      return usersArray.map(apiUserToClient);

    } catch (error) {
      console.error('❌ Erro ao buscar usuários:', error);
      throw error;
    }
  },

  async updateUser(id: string, updates: Partial<Client>): Promise<Client> {
    try {
      console.log('🔄 UPDATE USER - ID:', id, 'Updates:', updates);
      
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar usuário: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('✅ UPDATE USER - Sucesso:', responseData);
      
      let updatedApiUser: ApiUser;
      
      if (responseData.client) {
        updatedApiUser = responseData.client;
      } else if (responseData.data) {
        updatedApiUser = responseData.data;
      } else {
        updatedApiUser = responseData;
      }
      
      return apiUserToClient({
        ...updatedApiUser,
        selected: updates.selected !== undefined ? updates.selected : updatedApiUser.selected
      });
    } catch (error) {
      console.error('❌ Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  async getUserById(id: string): Promise<Client> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar usuário: ${response.status}`);
      }

      const responseData = await response.json();
      
      let apiUser: ApiUser;
      if (responseData.client) {
        apiUser = responseData.client;
      } else if (responseData.data) {
        apiUser = responseData.data;
      } else {
        apiUser = responseData;
      }
      
      return apiUserToClient(apiUser);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  },

  async createUser(client: Omit<Client, 'id'>): Promise<Client> {
    try {
      const apiUser = clientToApiUser({ ...client, id: 'temp' });

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(apiUser),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar usuário: ${response.status}`);
      }

      const responseData = await response.json();
      
      let newApiUser: ApiUser;
      if (responseData.client) {
        newApiUser = responseData.client;
      } else if (responseData.data) {
        newApiUser = responseData.data;
      } else {
        newApiUser = responseData;
      }
      
      return apiUserToClient(newApiUser);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar usuário: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  },
};