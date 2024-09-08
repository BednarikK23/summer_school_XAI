import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import SearchComponent from "../../components/search/SearchComponent";
import ChangeUserDialog from "../../components/forms/user/ChangeUserDialog";
import TablePagination from "../../components/pagination/TablePaginator";
import "./AdminTemplatePage.css"
import "./AdminUsersPage.css";
import Block1_2 from "../../components/block1_2/block1_2.tsx";
import CreateWineryForm from "../../components/forms/winery/CreateWineryForm.tsx";
import CreateUserForm from "../../components/forms/user/CreateUserForm.tsx";

const AdminUsersPage = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const { data: usersResponse, isFetching } = useUsers(page, query);

    return (
        <>
            <div className={"admin-page"}>
                <CreateUserForm label="Create User"/>
                <SearchComponent query={query} setQuery={setQuery} />

                {!isFetching && usersResponse && (
                    <ul className="admin-list">
                        {usersResponse.items.map((user) => (
                            <li className="admin-item" key={user.id}>
                                <div className="admin-user-list__text">
                                    <Block1_2 first={"Name: "} second={user.name} />
                                    <Block1_2 first={"Email: "} second={user.email} />
                                    <Block1_2 first={"Id"} second={user.id} />
                                </div>
                                <div className="admin-user-list__buttons">
                                    <ChangeUserDialog user={user ?? {}} label="Change User" />
                                    <CreateWineryForm ownerId={user.id} label="Create Winery" />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <TablePagination pagination={usersResponse?.pagination ?? { currentPage: 0, totalPages: 0 }} onSelect={setPage} />
        </>
    );
}

export default AdminUsersPage;