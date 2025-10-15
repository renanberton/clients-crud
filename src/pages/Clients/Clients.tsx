import React, { useState } from 'react';
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

  const { paginatedItems, paginationInfo } = paginate(
    clients,
    currentPage,
    itemsPerPage
  );

  const hasManyCards = paginatedItems.length >= 4;

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
  };

  const handleConfirmDelete = () => {
    if (clientToDelete) {
      onDeleteClient(clientToDelete.id);
      setClientToDelete(null);
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

  const handleAddClient = (clientData: Omit<Client, 'id'>) => {
    onAddClient(clientData);
    setShowAddModal(false);
  };

 const handleEditClient = (clientData: Omit<Client, 'id'>) => {
  if (editingClient) {   
    const updatedClient: Client = {
      ...clientData,
      id: editingClient.id,
      selected: editingClient.selected 
    };
    onEditClient(updatedClient);
    setShowEditModal(false);
    setEditingClient(null);
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
      <main className="clients-main">
        <div className="clients-section">
          <div className="list-controls">
            <div className="records-count">
              <p>
                {clients.length === 0 ? 'Nenhum' : <strong>{clients.length}</strong>} 
                {clients.length === 1 ? ' registro encontrado' : ' registros encontrados'}
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
                  className="add-btn-first"
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

      {/* Modais */}
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