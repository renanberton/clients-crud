import React from 'react';
import './style.scss';

interface DeleteConfirmationModalProps {
  clientName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  clientName,
  onConfirm,
  onCancel
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="delete-modal-overlay" onClick={handleOverlayClick}>
      <div className="delete-modal">
        <button className="close-btn" onClick={onCancel}>
          ×
        </button>
        
        <h2>Excluir cliente:</h2>
        
        <div className="delete-modal-content">
          <p>Você está prestes a excluir o cliente: <strong>{clientName}</strong></p>
          
          <div className="delete-actions">
            <button 
              type="button" 
              onClick={onConfirm}
              className="delete-confirm-btn"
            >
              Excluir cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};