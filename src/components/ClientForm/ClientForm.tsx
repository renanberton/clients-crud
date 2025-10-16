import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Client } from '../../types/Client';
import './style.scss';

interface ClientFormProps {
  client?: Client;
  onSubmit: (clientData: Omit<Client, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  client,
  onSubmit,
  isEditing = false
}) => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [companyValuation, setCompanyValuation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (client) {
      setName(client.name);
      setSalary(client.salary.toString());
      setCompanyValuation(client.companyValuation.toString());
    }
  }, [client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() && salary && companyValuation) {
      onSubmit({
        name: name.trim(),
        salary: Number(salary),
        companyValuation: Number(companyValuation)
      });
      navigate('/clients');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate('/clients');
    }
  };

  const handleClose = () => {
    navigate('/clients');
  };

  return (
    <div className="client-form-overlay" onClick={handleOverlayClick}>
      <div className="client-form-modal">
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
        
        <h2>
          {isEditing ? 'Editar cliente' : 'Criar cliente:'}
        </h2>
        
        <form onSubmit={handleSubmit} className="client-form">
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Digite o salário"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              value={companyValuation}
              onChange={(e) => setCompanyValuation(e.target.value)}
              placeholder="Digite o valor da empresa"
              required
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {isEditing ? 'Atualizar cliente' : 'Criar cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
};