import { Navigate, Outlet } from "react-router-dom";
import AdminNavbar from "../../components/navbar/adminNavbar";
import './adminLayout.css';
import { useAtom } from "jotai";
import { whoAmIAtom } from "../../state/authAtom";
import useRedirect from "../../hooks/useRedirect";

const AdminLayout = () => {
    const [loggedUser] = useAtom(whoAmIAtom);
    const isAdmin = loggedUser !== null && loggedUser.isAdmin;

    const shouldRedirect = useRedirect(!isAdmin, 3000);

    if (shouldRedirect) {
        return <Navigate to="/not-found" />;
    }
    return (
        <>
            {isAdmin && (
                <>
                    <AdminNavbar/>
                    <div className={"admin-layout"}>
                    <Outlet/>
                    </div>
                </>
            )}
        </>
    );
};

export default AdminLayout;