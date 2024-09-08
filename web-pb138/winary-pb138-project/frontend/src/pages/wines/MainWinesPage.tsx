import { useWines } from "../../hooks/useWines";
import { useState } from "react";
import TablePagination from "../../components/pagination/TablePaginator";
import './winesPage.css';
import SearchComponentWine from "../../components/search/SearchComponentWine.tsx";
import WineCard from "../../components/wineCard/wineCard.tsx";
import { normalizeFilters } from "../../utils/normalizeFilters.ts";
import { useWineryWines } from "../../hooks/useWineries.ts";
import CreateWineForm from "../../components/forms/wines/CreateWineForm.tsx";
import { FiltersWine } from "../../components/search/constantsFilters.ts";

interface MainWinesPageProps {
    wineryId?: string;
    label?: string;
    allowEditWines?: boolean;
}

const MainWinesPage = ({wineryId, label, allowEditWines}: MainWinesPageProps) => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState<FiltersWine>({});
    const normalizedFilters = normalizeFilters(filters);


    const { data: winesResponse, isFetching } =
      wineryId === undefined ?
      useWines(page, query, normalizedFilters.wineType,
        normalizedFilters.alcoholMax, normalizedFilters.sugarMax,
        normalizedFilters.priceMax, normalizedFilters.priceMin, normalizedFilters.year,
        normalizedFilters.sortPrice, normalizedFilters.sortYear)
      :
      useWineryWines(wineryId, page, query, normalizedFilters.wineType,
        normalizedFilters.alcoholMax, normalizedFilters.sugarMax,
        normalizedFilters.priceMax, normalizedFilters.priceMin, normalizedFilters.year,
        normalizedFilters.sortPrice, normalizedFilters.sortYear);

    return (
        <>
            <div className="main-wines-page">
                <h1>{label ? label : "Our Products"}</h1>
                <SearchComponentWine query={query} setQuery={setQuery} setFilters={setFilters} filters={filters} />
                <div className="wines-content">
                    {!isFetching && winesResponse && (
                        <ul className="wine-list">
                            {winesResponse.items.map((wine) => (
                                <WineCard wine={wine} key={wine.id} allowEdit={allowEditWines ? allowEditWines : false} />
                            ))}
                            {allowEditWines && (
                                <li className={"plus-wine"}>
                                    <CreateWineForm wineryId={wineryId} label="+" />
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
            <TablePagination pagination={winesResponse?.pagination ?? { currentPage: 0, totalPages: 0 }} onSelect={setPage} />
        </>
    );
};

export default MainWinesPage;
