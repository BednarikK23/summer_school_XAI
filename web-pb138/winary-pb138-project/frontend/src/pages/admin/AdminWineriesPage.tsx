import { useState } from "react";
import { useWineries } from "../../hooks/useWineries";
import SearchComponent from "../../components/search/SearchComponent";
import TablePagination from "../../components/pagination/TablePaginator";
import Block1_2 from "../../components/block1_2/block1_2.tsx";
import "./AdminTemplatePage.css";
import EditWineryForm from "../../components/forms/winery/EditWineryForm.tsx";

const AdminWineriesPage = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const { data: wineryResponse, isFetching } = useWineries(page, query);

    return (
        <>
            <div className={"admin-page"}>
                <SearchComponent query={query} setQuery={setQuery}/>
                {!isFetching && wineryResponse && (
                    <ul className="admin-list">
                        {wineryResponse.items.map((winery) => (
                            <li className="admin-item admin-wineries-item" key={winery.id}>
                                <Block1_2 first={"Name: "} second={winery.name} />
                                <Block1_2 first={"Location: "} second={winery.location} />
                                <Block1_2 first={"Winery Id: "} second={winery.id} />
                                <Block1_2 first={"Owner Id: "} second={winery.ownerId} />
                                <EditWineryForm winery={winery ?? {}} label="Edit Winery" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <TablePagination pagination={wineryResponse?.pagination ?? { currentPage: 0, totalPages: 0 }} onSelect={setPage} />
        </>
    );
}

export default AdminWineriesPage;