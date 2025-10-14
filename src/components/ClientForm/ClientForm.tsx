import React, { useState, useEffect } from 'react';
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
  onCancel,
  isEditing = false
}) => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [companyValuation, setCompanyValuation] = useState('');

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
    }
  };

  return (
    <div className="client-form-overlay">
      <div className="client-form-modal">
        <h2 className="client-form-title">
          {isEditing ? 'Editar cliente' : 'Criar cliente'}
        </h2>
        
        <form onSubmit={handleSubmit} className="client-form">
          <div className="form-group">
            <label className="form-label">Digite o nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Digite o salário:</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Digite o valor da empresa:</label>
            <input
              type="number"
              value={companyValuation}
              onChange={(e) => setCompanyValuation(e.target.value)}
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