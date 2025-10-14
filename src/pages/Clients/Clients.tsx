import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Client } from '../../types/Client';
import { Pagination } from '../../components/Pagination/Pagination';
import { paginate } from '../../utils/pagination';
import './style.scss';
import Logo from '../../assets/logo.png';

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
  selectedClients,
  onEditClient,
  onDeleteClient,
  onSelectClient,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const { paginatedItems, paginationInfo } = paginate(
    clients,
    currentPage,
    itemsPerPage
  );

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="clients-page">
      <header>
        <div className="container">
          <img src={Logo} alt="" />
            <div className="header-tabs">
              <Link to="/clients" >
                Clientes
              </Link>
              <Link to="/selected-clients">
                Clientes selecionados
              </Link>
              <Link to="/">
                Sair
              </Link>
            </div>
            <div className="header-right">
                Olá, <strong>{username}!</strong>
            </div>  
          </div>              
      </header>

      <main className="clients-main">
        <div className="clients-section">
          <div className="section-header">
            <h2>Todos os Clientes</h2>
            <Link to="/add-client" className="add-btn">
              Novo Cliente
            </Link>
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
                    <p>Valor da Empresa: R$ {client.companyValuation.toLocaleString()}</p>
                  </div>
                  <div className="client-actions">
                    {!client.selected && (
                      <button
                        onClick={() => onSelectClient(client.id)}
                        className="select-btn"
                        title="Selecionar cliente"
                      >
                        +
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onEditClient(client);
                        navigate('/edit-client');
                      }}
                      className="edit-btn"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDeleteClient(client.id)}
                      className="delete-btn"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))
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
    </div>
  );
};