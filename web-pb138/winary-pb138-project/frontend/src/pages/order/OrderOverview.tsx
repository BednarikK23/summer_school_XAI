import { useNavigate } from "react-router-dom";
import useOrderData from "../../hooks/useOrderData";
import { useOrderCreate } from "../../hooks/useOrder";
import { OrderCreate } from "../../models/order";
import Button from "../../components/buttons/Button";
import "./orderOverview.css";

const OrderOverview = () => {
    const { orderData } = useOrderData();
    const { mutateAsync: createOrder } = useOrderCreate();
    const navigate = useNavigate();
    
    const submitOrder = () => {
        const products = orderData.products?.map(item => (
            {
                wineId: item.wine.id,
                quantity: item.quantity,
                price: parseInt(item.wine.price)
            }
        ));
        const order: OrderCreate = {
            fullName: orderData.fullName!,
            phoneNumber: orderData.phoneNumber!,
            email: orderData.email!,
            items: products!,
            totalAmount: orderData.totalAmount!,
            pickupDateFrom: orderData.pickUpDateFrom!,
            pickupDateTo: orderData.pickUpDateTo!,
            vinaryId: orderData.wineryId!,
            status: 'PENDING'
        };
        try {
            createOrder.mutate(order);
            navigate('../confirmation', { relative: 'path' });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="order-overview-container">
            <div className="order-overview-info">
                <h2 className="order-overview-info__header">Customer details</h2>
                <div className="label-data-container">
                    <label>Name</label>
                    <span className="label-data-container__span">{orderData.fullName}</span>
                </div>
                <div className="label-data-container">
                    <label>Phone</label>
                    <span className="label-data-container__span">{orderData.phoneNumber}</span>
                </div>
                <div className="label-data-container">
                    <label>Email</label>
                    <span className="label-data-container__span">{orderData.email}</span>
                </div>
            </div>
            <div className="order-overview-info">
                <h2 className="order-overview-info__header">Ordered products</h2>
                <ul className="products-container">
                    {orderData.products?.map((product) => (
                        <li className="order-overview-product" key={product.wine.id}>
                            <div className="info-photo-container">
                                <div className="info-photo-container__photo"></div>
                                <span>{product.quantity}x</span>
                                <span>{product.wine.name}</span>
                            </div>
                            <span>{product.wine.price}Kč</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="order-overview-info">
                <h2 className="order-overview-info__header">Order details</h2>
                <div className="label-data-container">
                    <label>Pick up date from</label>
                    <span className="label-data-container__span">{orderData.pickUpDateFrom ?? "To be set by the winer."}</span>
                </div>
                <div className="label-data-container">
                    <label>Pick up date to</label>
                    <span className="label-data-container__span">{orderData.pickUpDateTo ?? "To be set by the winer."}</span>
                </div>
                <div className="label-data-container">
                    <label>Products amount</label>
                    <span className="label-data-container__span">{orderData.totalAmount}</span>
                </div>
            </div>
            <div className="form-buttons">
                <Button type="button" onClick={() => navigate('../customer-details', { relative: 'path' })}>Back</Button>
                <Button type="button" onClick={submitOrder}>Send Order</Button>
            </div>
        </div>
    );
};

export default OrderOverview;
