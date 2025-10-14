import React, { useState } from 'react';
import type { Client } from '../../types/Client';
import { Pagination } from '../../components/Pagination/Pagination';
import { paginate } from '../../utils/pagination';
import { Header } from '../../components/Header/Header';
import './style.scss';

interface SelectedClientsProps {
  username: string;
  selectedClients: Client[];
  onUnselectClient: (id: string) => void;
  onClearSelected: () => void;
}

export const SelectedClients: React.FC<SelectedClientsProps> = ({
  username,
  selectedClients,
  onUnselectClient,
  onClearSelected,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const { paginatedItems, paginationInfo } = paginate(
    selectedClients,
    currentPage,
    itemsPerPage
  );

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="selected-clients-page">
      <Header username={username} currentPage="selected-clients" />
      
      <main className="selected-clients-main">
        <div className="selected-clients-section">
          <div className="list-controls">
            <div className="records-count">
              <p>
                {selectedClients.length === 0 ? 'Nenhum' : selectedClients.length} 
                {selectedClients.length === 1 ? ' cliente selecionado' : ' clientes selecionados'}
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

          <div className="selected-clients-list">
            {paginatedItems.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum cliente selecionado</p>
              </div>
            ) : (
              paginatedItems.map(client => (
                <div key={client.id} className="selected-client-card">
                  <div className="client-info">
                    <h3>{client.name}</h3>
                    <p>Salário: R$ {client.salary.toLocaleString()}</p>
                    <p>Empresa: R$ {client.companyValuation.toLocaleString()}</p>
                  </div>
                  <div className="client-actions-selected">
                    <button
                      onClick={() => onUnselectClient(client.id)}
                      className="unselect-btn"
                      title="Remover da seleção"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedClients.length > 0 && (
            <>
              <div className="clear-section">
                <button onClick={onClearSelected} className="clear-btn">
                  Limpar Selecionados
                </button>
              </div>
              <Pagination
                paginationInfo={paginationInfo}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};