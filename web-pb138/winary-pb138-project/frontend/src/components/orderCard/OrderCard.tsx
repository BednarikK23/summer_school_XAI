import { Order } from "../../models/order";
import EditOrderForm from "../forms/order/EditOrderForm";
import "./orderCard.css";
import { formatDate } from "../../utils/dateFormat.ts";

interface OrderCardProps {
    order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
    return (
        <li key={order.id} className="order-card">
            <h2 className="order-card__header">Order details</h2>
            <div className="order-card-info">
                <label className="order-card-info__label">Customer Name</label>
                <span className="order-card-info__span">{order.customerName}</span>
            </div>
            <div className="order-card-info">
                <label className="order-card-info__label">Contact Email</label>
                <span className="order-card-info__span">{order.contactEmail}</span>
            </div>
            <div className="order-card-info">
                <label className="order-card-info__label">Contact Phone</label>
                <span className="order-card-info__span">{order.contactPhone}</span>
            </div>
            <div className="order-card-info">
                <label className="order-card-info__label">Items</label>
                <ul className={"order-card-product-container"}>
                    {order.items.map(item => (
                        <li className="order-card-product-content" key={item.id}>
                            <div className="order-card-product-content__image"></div>
                            <div>
                                <div>{item.wineId}</div>
                                <div>{item.unitPrice}Kč</div>
                                <div>{item.quantity}x</div>
                            </div>
                        </li>
                ))}
            </ul>
            </div>
            <div className="order-card-info">
                <label className="order-card-info__label">Order date</label>
                <span className="order-card-info__span">{formatDate(order.orderDate)!}</span>
            </div>
            <div className="order-card-info">
                <label className="order-card-info__label">Pick up date from</label>
                <span className="order-card-info__span">{order.pickupDateFrom ? formatDate(order.pickupDateFrom)! : "-"}</span>
            </div>
            <div className="order-card-info">
                <label className="order-card-info__label">Pick up date to</label>
                <span className="order-card-info__span">{order.pickupDateTo ? formatDate(order.pickupDateTo)! : "-"}</span>
            </div>
            <div className="order-card-info">
                <label className="order-card-info__label">Status</label>
                <span className="order-card-info__span">{order.status}</span>
            </div>
            <EditOrderForm order={order ?? {}} label="Edit Order" />
        </li>
    );
};

export default OrderCard;