import React from 'react';
import  Button from '../buttons/Button';

interface BasketItemProps {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

const BasketItem: React.FC<BasketItemProps> = (props) => {
    return (
        <div className="basket-item">
            <img src={props.imageUrl} alt={props.name} className="basket-image"/>
            <div className="basket-info">
                <div className="basket-name">{props.name}</div>
                <div className="basket-description">{props.description}</div>
                <div className="basket-quantity-controls">
                    <Button onClick={props.onDecrease}>-</Button>
                    <span>{props.quantity}</span>
                    <Button onClick={props.onIncrease}>+</Button>
                </div>
                <div className="basket-price">{props.price} Kč</div>
                <Button onClick={props.onRemove}>🗑️</Button>
            </div>
        </div>
    );
};

export default BasketItem;
