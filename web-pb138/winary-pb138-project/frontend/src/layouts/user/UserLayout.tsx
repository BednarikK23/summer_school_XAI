import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";
import { whoAmIAtom } from "../../state/authAtom";
import useRedirect from "../../hooks/useRedirect";

const UserLayout = () => {
    const [loggedUser] = useAtom(whoAmIAtom);
    const shouldRedirect = useRedirect(loggedUser === null, 3000);

    if (shouldRedirect) {
        return <Navigate to="/not-found" />;
    }

    return (
        <>
            {loggedUser && (
                <Outlet/>
            )}
        </>
    );
}

export default UserLayout;
