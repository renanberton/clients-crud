import React, { useState, useEffect } from 'react';
import type { Client } from '../../types/Client';
import './style.scss';

interface ClientFormModalProps {
  mode: 'add' | 'edit';
  client?: Client;
  onSave: (client: Omit<Client, 'id'>) => void;
  onCancel: () => void;
}

export const ClientFormModal: React.FC<ClientFormModalProps> = ({
  mode,
  client,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [companyValuation, setCompanyValuation] = useState('');

  useEffect(() => {
    if (mode === 'edit' && client) {
      setName(client.name);
      setSalary(client.salary.toString());
      setCompanyValuation(client.companyValuation.toString());
    }
  }, [mode, client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      name,
      salary: Number(salary),
      companyValuation: Number(companyValuation),
      selected: false,
    });
  };

  return (
    <div className="client-form-overlay">
      <div className="client-form-modal">
        <button className="close-btn" onClick={onCancel}>
          ×
        </button>
        
        <h2>{mode === 'add' ? 'Criar Cliente' : 'Editar Cliente'}</h2>
        
        <form className="client-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Digite o nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Digite o salário"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Valor da Empresa"
              value={companyValuation}
              onChange={(e) => setCompanyValuation(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {mode === 'add' ? 'Adicionar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};