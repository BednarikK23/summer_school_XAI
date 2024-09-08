import { useState } from "react";
import { useTours } from "../../hooks/useTours";
import SearchComponent from "../../components/search/SearchComponent";
import TablePagination from "../../components/pagination/TablePaginator";
import "./AdminTemplatePage.css";
import Block1_2 from "../../components/block1_2/block1_2.tsx";
import AdminChangeTourForm from "../../components/forms/tours/AminChangeTourForm.tsx";
import AdminCreateTourForm from "../../components/forms/tours/AdminCreateTourForm.tsx";

const AdminToursPage = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const { data: toursResponse, isFetching } = useTours(page, query);

    return (
        <>
            <div className={"admin-page"}>
                <AdminCreateTourForm label="Create Tour"/>
                <SearchComponent query={query} setQuery={setQuery} />

                {!isFetching && toursResponse && (
                    <ul className={"admin-tour__list-tours admin-list"}>
                    {toursResponse.items.map((tour) => (
                        <li key={tour.id} className={"admin-item"}>
                            <Block1_2 first={"Name:"} second={tour.name}/>
                            <Block1_2 first={"Location:"} second={tour.location}/>
                            <Block1_2 first={"status:"} second={tour.status}/>
                            <Block1_2 first={"Id"} second={tour.id}/>
                            <AdminChangeTourForm tour={tour ?? {}} label="Change Tour" />
                        </li>
                    ))}
                    </ul>
                )}
            </div>
            <TablePagination pagination={toursResponse?.pagination ?? { currentPage: 0, totalPages: 0 }} onSelect={setPage} />
        </>
    );
}

export default AdminToursPage;