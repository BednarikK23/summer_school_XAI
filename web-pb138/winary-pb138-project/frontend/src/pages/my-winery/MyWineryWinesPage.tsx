import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { whoAmIAtom } from "../../state/authAtom";
import useRedirect from "../../hooks/useRedirect";
import MainWinesPage from "../wines/MainWinesPage";

const MyWineryWinesPage = () => {
    const [loggedUser] = useAtom(whoAmIAtom);
    const wineryId = loggedUser && loggedUser.vinery && loggedUser.vinery.length > 0 ? loggedUser.vinery[0].id : "";

    const shouldRedirect = useRedirect(wineryId === "" ? true : false, 3000);

    if (shouldRedirect) {
        return <Navigate to="/not-found" />;
    }

    return (
        <>
            {wineryId !== "" && (
                <MainWinesPage wineryId={wineryId} label="My offer" allowEditWines={true}/>
            )}
        </>
    );
}

export default MyWineryWinesPage;