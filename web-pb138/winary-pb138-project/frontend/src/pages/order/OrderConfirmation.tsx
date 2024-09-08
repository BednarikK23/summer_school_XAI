import { useNavigate } from "react-router-dom";
import useOrderData from "../../hooks/useOrderData";
import "./orderLayout.css";

const OrderConfirmation = () => {
    const { resetData } = useOrderData();
    const navigate = useNavigate();
    resetData();
    const handleReturn = () => {
        navigate("/wines");
    };


    return (
        <div className="order-content">
            <h1>Order was successfully sent.</h1>
            <span>You will recieve email with pick up date set by the winer.</span>
            <div className="order-buttons">
                <button onClick={handleReturn}>Continue Shopping</button>
            </div>
        </div>
    );
};

export default OrderConfirmation;
