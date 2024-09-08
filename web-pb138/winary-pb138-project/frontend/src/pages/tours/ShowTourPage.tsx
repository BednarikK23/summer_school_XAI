import { useNavigate, useParams } from "react-router-dom";
import { useAddWineryToTour, useRemoveWineryFromTour, useTour } from "../../hooks/useTours";
import Button from "../../components/buttons/Button";
import { useAtom } from "jotai";
import { whoAmIAtom } from "../../state/authAtom";
import { TourAddWinery } from "../../models/tours";
import "./ShowTourPage.css";
// rest of the styles in showWinePage.css
import Block1_2 from "../../components/block1_2/block1_2.tsx";

const ShowTourPage = () => {
  const { id: tourId } = useParams();
  const [loggedUser] = useAtom(whoAmIAtom);
  const navigate = useNavigate();
  const haveWinery = loggedUser && loggedUser.vinery.length > 0;

  const { data: tourResponse, isFetching } = useTour(tourId!);
  const { mutateAsync: addWineryToTour } = useAddWineryToTour(tourId!);
  const { mutateAsync: removeWineryFromTour } = useRemoveWineryFromTour(tourId!);

  const handleAdd = () => {
    try {
      const wineryIdToAdd: string = loggedUser?.vinery[0].id ?? "";
      const values: TourAddWinery = {
        winerId: wineryIdToAdd
      };
      addWineryToTour.mutate(values);
    } catch (e) {
      // console.log(e);
    }
  }

  const handleDelete = () => {
    try {
      const wineryIdToAdd: string = loggedUser?.vinery[0].id ?? "";
      const values: TourAddWinery = {
        winerId: wineryIdToAdd
      };
      removeWineryFromTour.mutate(values);
    } catch (e) {
      // console.log(e);
    }
  }

  return (
    <div className={"main-show-page"}>
      <div className={"show-container"}>
        {!isFetching && tourResponse ?
          <>
            <div>
              <img
                src={"https://img2.10bestmedia.com/Images/Photos/354631/GettyImages-91319172_54_990x660.jpg"}
                alt={tourResponse?.item.name}
                className="show-image"
              />
            </div>
            <div className="show-content">
              <h1>{tourResponse?.item.name}</h1>
              <Block1_2 first="address: " second={tourResponse?.item.address} />
              <Block1_2 first="location: " second={tourResponse?.item.location} />
              <Block1_2 first="time: " second={new Date(tourResponse?.item.time ?? "").toLocaleDateString()} />
              <Block1_2 first="description: " second={tourResponse?.item.description} />

              <div className={"show-tour-page__participants"}>
                <h2>Participants:</h2>
                {tourResponse.item.participants.length > 0 &&
                  <ul className={"show-tour-page__participants-list"}>
                    {tourResponse?.item.participants.map((winery) => (
                      <li key={winery.id} className={"show-tour-page__participants-item"}>
                        {winery.name}
                        <Button onClick={() => navigate(`/wineries/${winery.id}`)}>Show winery</Button>
                        {winery.id === loggedUser?.vinery[0].id && <Button onClick={handleDelete}>Remove my winery</Button>}
                      </li>
                    ))}
                  </ul>}
                {tourResponse.item.participants.length == 0 &&
                  <p>no participants yet</p>}
              </div>

              <span className={"show-container-footer__buttons show-buttons"}>
                <div className="show-buttons">
                  {haveWinery && <Button onClick={() => handleAdd()}>Add My Winery</Button>}
                  <Button
                    type="button"
                    styles={{ backgroundColor: "black" }}
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                </div>
              </span>
            </div>
          </>
          :
          <p>Loading...</p>
        }
      </div>
    </div>
  );
}

export default ShowTourPage;