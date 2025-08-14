import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  isLoading: boolean;
  onGoToPage: (page: number) => void;
  onGoToNextPage: () => void;
  onGoToPreviousPage: () => void;
  onGoToFirstPage: () => void;
  onGoToLastPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalPosts,
  hasNextPage,
  hasPrevPage,
  isLoading,
  onGoToPage,
  onGoToNextPage,
  onGoToPreviousPage,
  onGoToFirstPage,
  onGoToLastPage,
}) => {
  // Generate page numbers để hiển thị
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Hiển thị tất cả pages nếu ít hơn maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic phức tạp hơn cho nhiều pages
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  if (totalPages <= 1) {
    return null; // Không hiển thị pagination nếu chỉ có 1 page
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white border rounded-lg shadow-sm">
      {/* Thông tin tổng quan */}
      <div className="text-sm text-gray-600">
        Trang {currentPage} / {totalPages} • Tổng {totalPosts} bài viết
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-2">
        {/* First page */}
        <button
          onClick={onGoToFirstPage}
          disabled={!hasPrevPage || isLoading}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Trang đầu"
        >
          ««
        </button>

        {/* Previous page */}
        <button
          onClick={onGoToPreviousPage}
          disabled={!hasPrevPage || isLoading}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Trang trước"
        >
          ‹
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-sm text-gray-400"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isCurrentPage = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onGoToPage(pageNum)}
                disabled={isLoading}
                className={`px-3 py-2 text-sm font-medium rounded-md disabled:cursor-not-allowed ${
                  isCurrentPage
                    ? "bg-blue-600 text-white border border-blue-600"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next page */}
        <button
          onClick={onGoToNextPage}
          disabled={!hasNextPage || isLoading}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Trang sau"
        >
          ›
        </button>

        {/* Last page */}
        <button
          onClick={onGoToLastPage}
          disabled={!hasNextPage || isLoading}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Trang cuối"
        >
          »»
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          Đang tải...
        </div>
      )}
    </div>
  );
};
