import React, { useState } from 'react';
import type { Client } from '../../types/Client';
import { Pagination } from '../../components/Pagination/Pagination';
import { paginate } from '../../utils/pagination';
import './style.scss';

interface SelectedClientsProps {
  username: string;
  selectedClients: Client[];
  onUnselectClient: (id: string) => void;
  onClearSelected: () => void;
  onNavigateToAll: () => void;
  onBackToHome: () => void;
}

export const SelectedClients: React.FC<SelectedClientsProps> = ({
  username,
  selectedClients,
  onUnselectClient,
  onClearSelected,
  onNavigateToAll,
  onBackToHome
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { paginatedItems, paginationInfo } = paginate(
    selectedClients,
    currentPage,
    itemsPerPage
  );

  return (
    <div className="selected-clients-page">
      <header className="selected-clients-header">
        <div className="header-content">
          <h1>Olá, {username}</h1>
          <div className="header-actions">
            <button 
              onClick={onNavigateToAll}
              className="all-clients-btn"
            >
              Todos os Clientes
            </button>
            <button 
              onClick={onBackToHome}
              className="back-btn"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="selected-clients-main">
        <div className="selected-clients-section">
          <div className="section-header">
            <h2>Clientes Selecionados</h2>
            <button onClick={onClearSelected} className="clear-btn">
              Limpar Selecionados
            </button>
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
                    <p>Valor da Empresa: R$ {client.companyValuation.toLocaleString()}</p>
                  </div>
                  <div className="client-actions">
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
            <Pagination
              paginationInfo={paginationInfo}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>
    </div>
  );
};