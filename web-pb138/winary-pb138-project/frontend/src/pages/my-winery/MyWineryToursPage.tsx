import { useAtom } from "jotai";
import { whoAmIAtom } from "../../state/authAtom";
import './MyWineryOrdersPage.css';
import MainToursPage from "../tours/MainToursPage";
import useRedirect from "../../hooks/useRedirect";
import { Navigate } from "react-router-dom";


const MyWineryToursPage = () => {
    const [loggedUser] = useAtom(whoAmIAtom);
    const wineryId = loggedUser && loggedUser.vinery.length > 0 ? loggedUser.vinery[0].id: "";
    const shouldRedirect = useRedirect(wineryId === "" ? true : false, 3000);

    if (shouldRedirect) {
        return <Navigate to="/not-found" />;
    }

    return (
        <>
            {wineryId !== "" && (
                <MainToursPage wineryId={wineryId} />
            )}
        </>
    );
};

export default MyWineryToursPage;