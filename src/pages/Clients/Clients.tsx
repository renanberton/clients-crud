import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Client } from '../../types/Client';
import { Pagination } from '../../components/Pagination/Pagination';
import { paginate } from '../../utils/pagination';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
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
}

export const Clients: React.FC<ClientsProps> = ({
  username,
  clients,
  onEditClient,
  onDeleteClient,
  onSelectClient,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16); // Padrão de 16 cards
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const navigate = useNavigate();

  const { paginatedItems, paginationInfo } = paginate(
    clients,
    currentPage,
    itemsPerPage
  );

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset para primeira página quando mudar o número de itens
  };

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
              <label htmlFor="itemsPerPage">Exibir: </label>
              <select 
                id="itemsPerPage"
                value={itemsPerPage} 
                onChange={handleItemsPerPageChange}
                className="items-per-page-select"
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="32">32</option>
                <option value="48">48</option>
              </select>
              <span> por página</span>
            </div>
          </div>

          <div className="clients-list">
            {paginatedItems.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum cliente cadastrado</p>
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
                      onClick={() => {
                        onEditClient(client);
                        navigate('/edit-client');
                      }}
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
              <Link to="/add-client" className="add-btn">
              Criar Cliente
            </Link>
          </div>

          {clients.length > 0 && (
            <Pagination
              paginationInfo={paginationInfo}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>

      {/* Modal de confirmação de exclusão */}
      {clientToDelete && (
        <DeleteConfirmationModal
          clientName={clientToDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};