import { useWinery } from "../../hooks/useWineries";
import "./myWineryOverview.css";

interface MyWineryOverviewProps {
    wineryId: string;
}

const MyWineryOverview = (props: MyWineryOverviewProps) => {
    const { data: winery } = useWinery(props.wineryId);

    return (
        <div className="my-winery-container">
            <label className="my-winery-container__label">Name</label>
            <span> {winery?.item.name}</span>
        </div>
    );
}

export default MyWineryOverview