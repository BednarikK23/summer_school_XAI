import React from 'react';

type OrderSummaryProps = {
    itemsTotal: number;
    deliveryCharge: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ( props
                                                   ) => {
    const total = props.itemsTotal + props.deliveryCharge;
    return (
        <div className="order-summary">
            <h4>Order Summary</h4>
            <div className="summary-row">
                <span>Items Total</span>
                <span>{props.itemsTotal} Kč</span>
            </div>
            <div className="summary-row">
                <span>Packaging</span>
                <span>{props.deliveryCharge} Kč</span>
            </div>
            <div className="summary-row total">
                <strong>To Pay</strong>
                <strong>{total} Kč</strong>
            </div>
        </div>
    );
};

export default OrderSummary;
