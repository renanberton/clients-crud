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
      // Formata os valores para o padrão monetário
      setSalary(
        client.salary.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      );
      setCompanyValuation(
        client.companyValuation.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      );
    } else {
      // Limpa os campos no modo add
      setName('');
      setSalary('');
      setCompanyValuation('');
    }
  }, [mode, client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Converte os valores formatados de volta para número
    const salaryValue = parseFloat(
      salary.replace('R$', '').replace('.', '').replace(',', '.').trim()
    );
    
    const companyValue = parseFloat(
      companyValuation.replace('R$', '').replace('.', '').replace(',', '.').trim()
    );

    onSave({
      name: name.trim(),
      salary: salaryValue,
      companyValuation: companyValue,
      selected: client?.selected || false,
    });
  };

  const formatCurrency = (value: string): string => {
    // Remove tudo que não é número
    const digits = value.replace(/\D/g, '');
    
    if (digits === '') return '';
    
    // Converte para número e formata como moeda
    const number = parseInt(digits) / 100;
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Permite backspace e delete
    if (value.length < salary.length) {
      setSalary(value);
      return;
    }
    
    const formattedValue = formatCurrency(value);
    setSalary(formattedValue);
  };

  const handleCompanyValuationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Permite backspace e delete
    if (value.length < companyValuation.length) {
      setCompanyValuation(value);
      return;
    }
    
    const formattedValue = formatCurrency(value);
    setCompanyValuation(formattedValue);
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
              onChange={(e) => {
                // Permite apenas letras, espaços e acentos
                const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
                setName(value);
              }}
              className="form-input"
              required
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Digite o salário"
              value={salary}
              onChange={handleSalaryChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Valor da Empresa"
              value={companyValuation}
              onChange={handleCompanyValuationChange}
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