import React from 'react';
import type { PaginationInfo } from '../../types/Client';
import './style.scss';

interface PaginationProps {
  paginationInfo: PaginationInfo;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  paginationInfo,
  onPageChange
}) => {
  const { currentPage, totalPages } = paginationInfo;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        Anterior
      </button>
      
      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="pagination-btn"
      >
        Próxima
      </button>
    </div>
  );
};