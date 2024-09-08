import { useNavigate, useParams } from "react-router-dom";
import { useWine } from "../../hooks/useWines";
import Block1_2 from "../../components/block1_2/block1_2.tsx";
import { useState } from "react";
import useOrderData from "../../hooks/useOrderData";
import './showWinePage.css';
import red_wine from '../../assets/red_wine.jpg';
import white_wine from '../../assets/white_wine.jpg';
import rose_wine from '../../assets/rose_wine.png';
import PopUp from "../../components/popup/PopUp.tsx";
import Button from "../../components/buttons/Button.tsx";
import { usePopUp } from "../../hooks/usePopUp.ts";

const MainShowWinePage = () => {
    const { id } = useParams();
    const { data: wineData, isFetching } = useWine(id!);
    const { orderData, updateOrderData } = useOrderData();
    const navigate = useNavigate();
    const [amount, setAmount] = useState(1);
    const { popUpStack , showPopUp } = usePopUp();

    const handleAddToBasket = () => {
        if (amount <= 0) {
          return;
        }
        const itemIndex = orderData.products?.findIndex(item => item.wine.id === id);
        const products = [...orderData?.products || []];

        if (itemIndex !== undefined && itemIndex !== -1) {
            products[itemIndex].quantity += amount;
        } else {
            products.push({ wine: wineData?.item!, quantity: amount });
        }
        updateOrderData({ ...orderData, products: products, wineryId: wineData?.item.wineryId });

        showPopUp("Added to basket.");
    };
    const canOrder = (((orderData.products.length > 0) ? orderData.products[0].wine.wineryId : undefined) === wineData?.item.wineryId) || (orderData.products.length == 0);

    return (
        <div className="main-show-page">
            <div className="show-container">
                {isFetching ? (
                    <p>Loading...</p>
                ) : wineData ? (
                  <>
                  <div>
                      {wineData.item.type == "RED" && <img src={red_wine} alt="red wine" className={"show-image"}/>}
                      {wineData.item.type == "WHITE" && <img src={white_wine} alt="white wine" className={"show-image"}/>}
                      {wineData.item.type == "ROSE" && <img src={rose_wine} alt="rose wine" className={"show-image"}/>}
                  </div>
                  <div className={"show-content"}>
                      <h2 className={"show-content__name"}>{wineData.item.name}</h2>
                      <Block1_2 first={"Type: "} second={wineData.item.type} strong={true}/>
                      <Block1_2 first={"Year: "} second={wineData.item.year} strong={true}/>
                      <Block1_2 first={"Alcohol: "} second={`${wineData.item.alcoholPercentage.toFixed(2)}%`}
                                strong={true}/>
                      <Block1_2 first={"Sugar: "}
                                second={`${wineData.item.sugarGramsPerLiter.toFixed(2)} gram/liter`} strong={true}/>
                      <Block1_2 first={"Glycerol: "}
                                second={`${wineData.item.glycerolGramsPerLiter.toFixed(2)} gram/liter`}
                                strong={true}/>
                      <Block1_2 first={"Acidity: "}
                                second={`${wineData.item.totalAcidityGramsPerLiter.toFixed(2)} gram/liter`}
                                strong={true}/>
                      <Block1_2 first={"PH: "} second={`${wineData.item.pH.toFixed(2)}%`}
                                strong={true}/>
                      <Block1_2 first={"Attribution:"} second={wineData.item.attribution} strong={true}/>
                      <Block1_2 first={"Description: "} second={wineData.item.description} strong={true}/>
                      <Block1_2 first={"Price: "} second={`${wineData.item.price} CZK`} strong={true}/>

                      <div className={"show-container__footer show-container-footer"}>
                        <span className={"show-container-footer__order"}>
                            <input
                              className="show-order__amount-input" type="number" value={amount}
                              onChange={(e) => setAmount(parseInt(e.target.value))}
                            />
                            <Button type="button" onClick={handleAddToBasket}
                                    disabled={!(canOrder || wineData === undefined)}>Add to basket </Button>
                        </span>

                          {(!canOrder) &&
                            <p id="error-can-order">Nelze objednat z dvou vináren naráz, prosím první dokončete
                                objednávku nebo vypráznděte košík.</p>
                          }
                        <span className={"show-container-footer__buttons show-buttons"}>
                            <Button
                              type="button"
                              onClick={(() => wineData ? navigate(`../../wineries/${wineData.item.wineryId}`) : "#")}
                            >Show Winery</Button>

                            <Button
                              type="button"
                              styles={{backgroundColor: "black"}}
                              onClick={() => navigate(-1)}
                            > Back
                            </Button>
                        </span>
                      </div>
                  </div>
                  </>
                ) : (
                  <p>No data available for this wine.</p>
                )}
            </div>
            {popUpStack.map((message: string, index: number) => (
                <PopUp key={index} message={message} />
            ))}
        </div>
    );
};

export default MainShowWinePage;
