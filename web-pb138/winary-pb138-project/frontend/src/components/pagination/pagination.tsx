import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import "./pagination.css";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={`paginator ${className}`}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul className={`paginator__links ${className}`} ref={ref} {...props} />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li className={`paginator__item ${className}`} ref={ref} {...props} />
));
PaginationItem.displayName = "PaginationItem";

const PaginationLink = ({ className, ...props }) => (
  <a className={`paginator__link ${className}`} {...props} />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={`paginator__link ${className}`}
    {...props}
  >
    <ChevronLeft />
    <span>Prev</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={`paginator__link ${className}`}
    {...props}
  >
    <span>Next</span>
    <ChevronRight />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span aria-hidden className={`paginator__ellipsis ${className}`} {...props}>
    <MoreHorizontal />
    <span className="sr-only">More pages</span>
  </span>
);

const PaginationFirst = ({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    className={`paginator__link ${className}`}
    onClick={onClick}
    {...props}
  >
    <span>First</span>
    <ChevronLeft />
  </PaginationLink>
);
PaginationFirst.displayName = "PaginationFirst";

const PaginationLast = ({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to last page"
    className={`paginator__link ${className}`}
    onClick={onClick}
    {...props}
  >
    <ChevronRight />
    <span>Last</span>
  </PaginationLink>
);
PaginationLast.displayName = "PaginationLast";

PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
};
