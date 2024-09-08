import { useParams } from "react-router-dom";
import { useWinery } from "../../hooks/useWineries";
import MainWinesPage from "../wines/MainWinesPage.tsx";

const ShowWineryWinesPage = () => {
    const { id } = useParams();
    const { data: winery } = useWinery(id!);

    return (
        <MainWinesPage wineryId={id} label={`${winery?.item.name}'s products`}/>
    );
};

export default ShowWineryWinesPage;