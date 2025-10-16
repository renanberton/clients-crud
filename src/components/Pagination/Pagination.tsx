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
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; 
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="pagination">
      <div className="pagination-numbers">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => onPageChange(page)}
                className={`pagination-number ${page === currentPage ? 'active' : ''}`}
              >
                {page}
              </button>
            ) : (
              <span className="pagination-ellipsis">{page}</span>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
};