import React, { useState, useEffect } from 'react';
import type { Client } from '../../types/Client';
import { Pagination } from '../../components/Pagination/Pagination';
import { paginate } from '../../utils/pagination';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import { ClientFormModal } from '../../components/ClientFormModal/ClientFormModal';
import './style.scss';
import Add from '../../assets/add.png';
import Edit from '../../assets/edit.png';
import Remove from '../../assets/remove.png';
import { Header } from '../../components/Header/Header';

interface ClientsProps {
  username: string;
  clients: Client[];
  selectedClients: Client[];
  onEditClient: (client: Client) => void;
  onDeleteClient: (id: string) => void;
  onSelectClient: (id: string) => void;
  onAddClient: (client: Omit<Client, 'id'>) => void;
}

export const Clients: React.FC<ClientsProps> = ({
  username,
  clients,
  onEditClient,
  onDeleteClient,
  onSelectClient,
  onAddClient,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { paginatedItems, paginationInfo } = paginate(
    clients,
    currentPage,
    itemsPerPage
  );

  useEffect(() => {
    document.title = 'Página de Clientes - Clients Crud';
  }, []);

  const hasManyCards = paginatedItems.length >= 4;

  const handleApiError = (error: unknown) => {
    console.error('API Error:', error);
    
    if (error instanceof TypeError) {
      setApiError('Erro de conexão. Verifique sua internet e tente novamente.');
      return;
    }
    
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as { response?: { status?: number } };
      const status = apiError.response?.status;
      
      if (status === 404) {
        setApiError('Serviço não encontrado.');
      } else if (status === 500) {
        setApiError('Erro interno do servidor. Tente novamente mais tarde.');
      } else if (status === 400) {
        setApiError('Dados inválidos. Verifique as informações.');
      } else {
        setApiError('Erro na comunicação com o servidor.');
      }
    } else {
      setApiError('Erro inesperado. Tente novamente.');
    }
  };

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
  };

  const handleConfirmDelete = async () => {
    if (clientToDelete) {
      setLoading(true);
      setApiError(null);
      
      try {
        await onDeleteClient(clientToDelete.id);
        setClientToDelete(null);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setClientToDelete(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);    
    const validatedValue = Math.min(Math.max(value, 0), 100);
    setItemsPerPage(validatedValue);
    setCurrentPage(1);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleEditClick = (client: Client) => {
    setEditingClient(client);
    setShowEditModal(true);
  };

  const handleAddClient = async (clientData: Omit<Client, 'id'>) => {
    setLoading(true);
    setApiError(null);
    
    try {
      await onAddClient(clientData);
      setShowAddModal(false);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClient = async (clientData: Omit<Client, 'id'>) => {
    if (editingClient) {
      setLoading(true);
      setApiError(null);
      
      try {
        const updatedClient: Client = {
          ...clientData,
          id: editingClient.id,
          selected: editingClient.selected 
        };
        await onEditClient(updatedClient);
        setShowEditModal(false);
        setEditingClient(null);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingClient(null);
  };

  return (
    <div className="clients-page">
      <Header username={username} currentPage="clients" />
      {apiError && (
        <div className="error-banner">
          <div className="error-content">
            <span>⚠️ {apiError}</span>
            <button 
              onClick={() => setApiError(null)}
              className="error-close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Carregando...</div>
        </div>
      )}

      <main className="clients-main">
        <div className="clients-section">
          <div className="list-controls">
            <div className="records-count">
              <p>
                {clients.length === 0 ? 'Nenhum' : <strong>{clients.length}</strong>} 
                {clients.length === 1 ? ' cliente encontrado:' : ' clientes encontrados:'}
              </p>
            </div>
            <div className="items-per-page-selector">
              <label htmlFor="itemsPerPage">Clientes por Página: </label>
              <input
                id="itemsPerPage"
                type="number"
                min="1"
                max="100"
                value={itemsPerPage}
                onChange={handleInputChange}
                className="items-per-page-input"
              />
            </div>
          </div>

          <div className={`clients-list ${hasManyCards ? 'many-cards' : ''}`}>
            {paginatedItems.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum cliente cadastrado</p>
                <button 
                  onClick={handleAddClick}
                  className="add-btn"
                >
                  Criar Primeiro Cliente
                </button>
              </div>
            ) : (
              paginatedItems.map(client => (
                <div key={client.id} className="client-card">
                  <div className="client-info">
                    <h3>{client.name}</h3>
                    <p>Salário: R$ {client.salary.toLocaleString()}</p>
                    <p>Empresa: R$ {client.companyValuation.toLocaleString()}</p>
                  </div>
                  <div className="client-actions">
                    {!client.selected && (
                      <button
                        onClick={() => onSelectClient(client.id)}
                        className="select-btn"
                        title="Selecionar cliente"
                      >
                        <img src={Add} alt="Selecionar" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEditClick(client)}
                      className="edit-btn"
                    >
                      <img src={Edit} alt="Editar" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(client)}
                      className="delete-btn"
                    >
                      <img src={Remove} alt="Remover" />
                    </button>
                  </div>
                </div>
              ))
            )}
            {paginatedItems.length > 0 && (
              <button 
                onClick={handleAddClick}
                className="add-btn"
              >
                Criar Cliente
              </button>
            )}
          </div>

          {clients.length > 0 && (
            <Pagination
              paginationInfo={paginationInfo}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>

      {clientToDelete && (
        <DeleteConfirmationModal
          clientName={clientToDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showAddModal && (
        <ClientFormModal
          mode="add"
          onSave={handleAddClient}
          onCancel={handleCloseModals}
        />
      )}

      {showEditModal && editingClient && (
        <ClientFormModal
          mode="edit"
          client={editingClient}
          onSave={handleEditClient}
          onCancel={handleCloseModals}
        />
      )}
    </div>
  );
};