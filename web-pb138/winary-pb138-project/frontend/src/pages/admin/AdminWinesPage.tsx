import { useState } from "react";
import { useWines } from "../../hooks/useWines";
import TablePagination from "../../components/pagination/TablePaginator";
import SearchComponent from "../../components/search/SearchComponent";
import "./AdminTemplatePage.css";
import EditWineForm from "../../components/forms/wines/EditWineForm";
import CreateWineForm from "../../components/forms/wines/CreateWineForm";

const AdminWinesPage = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const { data: winesResponse, isFetching } = useWines(page, query);

    return (
        <>
            <div className="admin-page">
                <CreateWineForm label="Create wine" />

                <SearchComponent query={query} setQuery={setQuery}></SearchComponent>

                {!isFetching && winesResponse && (
                    <ul className="admin-list">
                        {winesResponse.items.map((wine) => (
                            <li className="admin-item" key={wine.id}>
                                <strong>{wine.name}</strong>
                                <p>Id: {wine.id}</p>
                                <EditWineForm wine={wine ?? {}} label="Edit Wine" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <TablePagination pagination={winesResponse?.pagination ?? { currentPage: 0, totalPages: 0 }} onSelect={setPage} />
        </>
    );
}

export default AdminWinesPage;
