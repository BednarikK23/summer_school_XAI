import { useNavigate, useParams } from "react-router-dom";
import { useWinery } from "../../hooks/useWineries";
import Block1_2 from "../../components/block1_2/block1_2.tsx";
import Button from "../../components/buttons/Button.tsx";
// css styles in showWinePage.css

const MainShowWineryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: winery, isFetching } = useWinery(id!);

  return (
    <div className="main-show-page">
      <div className={"show-container"}>
        {!isFetching && winery ? (
          <>
            <div>
              <img
                src={"../../../public/winaryDefault.webp"}
                alt={winery.item.name}
                className="show-image"
              />
            </div>
            <div className="show-content">
              <h2 className={"show-content__name"}>{winery?.item.name}</h2>
              <Block1_2 first={"Location: "} second={winery.item.location} />
              <Block1_2 first={"Opening hours: "}
                second={`${winery.item.openingTime} - ${winery.item.closingTime}`} />
              <Block1_2 first={"Description: "} second={winery.item.description} />
              <Block1_2 first={"Pick-up address: "} second={winery.item.address} />
              <Block1_2 first={"Ico "} second={winery.item.ico} />
              <Block1_2 first={"Contact email "} second={winery.item.email} />
              <Block1_2 first={"Contact phone "} second={winery.item.phone} />
              <span className={"show-container-footer__buttons show-buttons"}>
                <div className="show-buttons">
                  <Button
                    type="button"
                    onClick={() => navigate("wines", { relative: "path" })}
                  >
                    Show Offer
                  </Button>
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
        ) : (
          <p>Loading..</p>
        )}

      </div>
    </div>
  );
};

export default MainShowWineryPage;
