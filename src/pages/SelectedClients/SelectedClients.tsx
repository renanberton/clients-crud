import React, { useState } from 'react';
import type { Client } from '../../types/Client';
import { Pagination } from '../../components/Pagination/Pagination';
import { paginate } from '../../utils/pagination';
import { Header } from '../../components/Header/Header';
import './style.scss';
import RemoveSelected from '../../assets/remove-selected.png';

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
  
  const hasManyCards = paginatedItems.length >= 4;

  return (
    <div className="clients-page"> 
      <Header username={username} currentPage="selected-clients" />      
      <main className="clients-main"> 
        <div className="clients-section"> 
          <h1>Clientes Selecionados:</h1>
          {/* Use a mesma classe clients-list com a lógica condicional */}
          <div className={`clients-list ${hasManyCards ? 'many-cards' : ''}`}>
            {paginatedItems.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum cliente selecionado</p>
              </div>
            ) : (
              paginatedItems.map(client => (
                <div key={client.id} className="client-card"> 
                  <div className="client-info">
                    <h3>{client.name}</h3>
                    <p>Salário: R$ {client.salary.toLocaleString()}</p>
                    <p>Empresa: R$ {client.companyValuation.toLocaleString()}</p>
                  </div>
                  <div className="client-actions-selected"> 
                    <img src={RemoveSelected} className='remove-selected-btn' onClick={() => onUnselectClient(client.id)} alt="Botão de remoção de cliente selecionado" />
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedClients.length > 0 && (
            <>
              <div className="clear-section">
                <button onClick={onClearSelected} className="add-btn">
                  Limpar Clientes Selecionados
                </button>
              </div>              
            </>
          )}
        </div>
      </main>
    </div>
  );
};