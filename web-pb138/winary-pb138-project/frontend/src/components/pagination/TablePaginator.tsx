import { Pagination as RespPagination } from "../../models/response";
import { FC } from "react";
import "./pagination.css";
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

type TablePaginationProps = {
  pagination: RespPagination;
  onSelect: (page: number) => void;
};

const hasPrev = ({ currentPage }: RespPagination) => {
  return currentPage > 1;
};

const hasNext = ({ currentPage, totalPages }: RespPagination) => {
  return currentPage < totalPages;
};

const getBefore = ({ currentPage }: RespPagination) => {
  const startPage = Math.max(1, currentPage - 3);
  return Array.from({ length: currentPage - startPage }, (_, i) => startPage + i);
};

const getAfter = ({ currentPage, totalPages }: RespPagination) => {
  const endPage = Math.min(totalPages, currentPage + 3);
  return Array.from({ length: endPage - currentPage }, (_, i) => currentPage + i + 1);
};

const TablePagination: FC<TablePaginationProps> = (props) => {
  const { pagination, onSelect } = props;

  return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst onClick={() => onSelect(1)} />
          </PaginationItem>
          {hasPrev(pagination) && (
              <PaginationItem>
                <PaginationPrevious
                    onClick={() => onSelect(pagination.currentPage - 1)}
                />
              </PaginationItem>
          )}
          {getBefore(pagination).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => onSelect(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
          ))}
          <PaginationItem className="paginator__item_active">
            <PaginationLink>
              {pagination.currentPage}
            </PaginationLink>
          </PaginationItem>
          {getAfter(pagination).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => onSelect(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
          ))}
          {hasNext(pagination) && (
              <PaginationItem>
                <PaginationNext
                    onClick={() => onSelect(pagination.currentPage + 1)}
                />
              </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLast onClick={() => onSelect(pagination.totalPages)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  );
};

export default TablePagination;
