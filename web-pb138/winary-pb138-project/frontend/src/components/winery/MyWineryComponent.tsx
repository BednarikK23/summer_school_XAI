import { useAtom } from "jotai";
import { whoAmIAtom } from "../../state/authAtom.ts";
import CreateWineryForm from "../forms/winery/CreateWineryForm.tsx";
import Button from "../buttons/Button.tsx";
import { useNavigate } from "react-router-dom";
import MyWineryOverview from "./MyWineryOverview.tsx";
import "./myWineryComponent.css";
import EditWineryForm from "../forms/winery/EditWineryForm.tsx";

const MyWineryComponent = () => {
  const [loggedUser] = useAtom(whoAmIAtom);
  const navigate = useNavigate();

  return (
    <div className="my-winery-page">
      {loggedUser?.vinery && loggedUser.vinery.length > 0 ? (
        <div className="my-winery-page-container">
          <MyWineryOverview wineryId={loggedUser.vinery[0].id} />
          <div className={"my-winery-page__buttons"}>
            <EditWineryForm winery={loggedUser.vinery[0] ?? {}} label="Edit Winery" />
            <Button onClick={() => navigate("/my-winery/wines")}>
              My offer
            </Button>
            <Button onClick={() => navigate("/my-winery/orders")}>
              My orders
            </Button>
            <Button onClick={() => navigate(`/my-winery/tours`)}>
              My tours
            </Button>
          </div>
        </div>
      ) : (
        <div className="my-winery-page-container">
          <h1 className={"container__title"}>Create new Winery:</h1>
          <CreateWineryForm label="Create Winery" />
        </div>
      )}
    </div>
  );
};

export default MyWineryComponent;
