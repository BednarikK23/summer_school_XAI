import { useState } from 'react';
import { useWineries } from '../../hooks/useWineries';
import TablePagination from '../../components/pagination/TablePaginator';
import './wineriesPage.css';
import SearchComponentWinery from '../../components/search/searchComponentWinery';
import WineryCard from "../../components/wineryCard/wineryCard.tsx";
import { FiltersWinery } from "../../components/search/constantsFilters.ts";

const MainWineriesPage = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<FiltersWinery>({});
    const [query, setQuery] = useState("");
    const { data: wineryResponse, isFetching } =
      useWineries(page, query, filters.location, filters.openingTime,
        filters.closingTime, filters.wineType, filters.orderOpen, filters.orderClose);

    return (
        <>
            <div className="main-wineries-page">
                <h1>Our Wineries</h1>
                <SearchComponentWinery query={query} setQuery={setQuery} setFilters={setFilters} />
                <div className="wineries-content">
                    {!isFetching && wineryResponse && (
                        <ul className="winery-list">
                            {wineryResponse.items.map((winery) => (
                                <WineryCard winery={winery} key={winery.id} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <TablePagination pagination={wineryResponse?.pagination ?? { currentPage: 0, totalPages: 0 }}
                onSelect={setPage} />
        </>
    );
};

export default MainWineriesPage;
